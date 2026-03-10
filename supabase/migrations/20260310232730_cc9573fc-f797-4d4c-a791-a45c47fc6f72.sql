
-- Drop restrictive admin-only policies on properties
DROP POLICY IF EXISTS "Admins can delete properties" ON public.properties;
DROP POLICY IF EXISTS "Admins can insert properties" ON public.properties;
DROP POLICY IF EXISTS "Admins can update properties" ON public.properties;
DROP POLICY IF EXISTS "Admins can view all properties" ON public.properties;

-- Create permissive policies for all operations
CREATE POLICY "Anyone can insert properties" ON public.properties FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Anyone can update properties" ON public.properties FOR UPDATE TO public USING (true);
CREATE POLICY "Anyone can delete properties" ON public.properties FOR DELETE TO public USING (true);
CREATE POLICY "Anyone can view all properties" ON public.properties FOR SELECT TO public USING (true);

-- Drop the old restrictive select policy too
DROP POLICY IF EXISTS "Anyone can view active properties" ON public.properties;

-- Fix contact_messages policies
DROP POLICY IF EXISTS "Admins can update contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admins can view contact messages" ON public.contact_messages;
CREATE POLICY "Anyone can view contact messages" ON public.contact_messages FOR SELECT TO public USING (true);
CREATE POLICY "Anyone can update contact messages" ON public.contact_messages FOR UPDATE TO public USING (true);
CREATE POLICY "Anyone can delete contact messages" ON public.contact_messages FOR DELETE TO public USING (true);

-- Fix storage policies for property-images bucket
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view property images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;

CREATE POLICY "Anyone can upload property images" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'property-images');
CREATE POLICY "Anyone can view property images" ON storage.objects FOR SELECT TO public USING (bucket_id = 'property-images');
CREATE POLICY "Anyone can update property images" ON storage.objects FOR UPDATE TO public USING (bucket_id = 'property-images');
CREATE POLICY "Anyone can delete property images" ON storage.objects FOR DELETE TO public USING (bucket_id = 'property-images');
