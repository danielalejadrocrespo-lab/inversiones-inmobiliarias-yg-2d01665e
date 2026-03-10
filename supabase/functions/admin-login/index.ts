import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { password } = await req.json();
    const adminPassword = Deno.env.get("ADMIN_PASSWORD");
    const adminEmail = Deno.env.get("ADMIN_EMAIL");

    if (!adminPassword || !adminEmail) {
      return new Response(
        JSON.stringify({ error: "Server misconfigured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (password !== adminPassword) {
      return new Response(
        JSON.stringify({ error: "Clave incorrecta" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Try to sign in first
    let { data, error } = await supabase.auth.signInWithPassword({
      email: adminEmail,
      password: adminPassword,
    });

    // If user doesn't exist, create it
    if (error) {
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email: adminEmail,
        password: adminPassword,
        email_confirm: true,
      });

      if (createError) {
        console.error("Create user error:", createError);
        return new Response(
          JSON.stringify({ error: "Error creando usuario admin" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Assign admin role
      const { error: roleError } = await supabase
        .from("user_roles")
        .insert({ user_id: newUser.user.id, role: "admin" });

      if (roleError) {
        console.error("Role assign error:", roleError);
      }

      // Now sign in
      const result = await supabase.auth.signInWithPassword({
        email: adminEmail,
        password: adminPassword,
      });
      data = result.data;
      error = result.error;
    }

    if (error || !data?.session) {
      return new Response(
        JSON.stringify({ error: "Error de autenticación" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("Unexpected error:", e);
    return new Response(
      JSON.stringify({ error: "Error interno" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
