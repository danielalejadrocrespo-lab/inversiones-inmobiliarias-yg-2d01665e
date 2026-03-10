import { Navigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Mail, MailOpen } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function AdminMessagesPage() {
  const { isAdmin, loading } = useAuth();
  const queryClient = useQueryClient();

  const { data: messages = [] } = useQuery({
    queryKey: ['admin-messages'],
    queryFn: async () => {
      const { data } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      return data ?? [];
    },
    enabled: isAdmin,
  });

  const markReadMutation = useMutation({
    mutationFn: async ({ id, read }: { id: string; read: boolean }) => {
      await supabase.from('contact_messages').update({ read }).eq('id', id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-messages'] }),
  });

  if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  if (!isAdmin) return <Navigate to="/admin/login" replace />;

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link to="/admin" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" /> Volver al panel
        </Link>

        <h1 className="font-heading text-2xl font-bold mb-6">Mensajes ({messages.length})</h1>

        <div className="space-y-4">
          {messages.map((m) => (
            <div key={m.id} className={`bg-card border rounded-lg p-4 ${!m.read ? 'border-primary/30' : ''}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{m.name}</p>
                    {!m.read && <Badge className="bg-accent text-accent-foreground text-xs">Nuevo</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">{m.email} {m.phone && `• ${m.phone}`}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {format(new Date(m.created_at), "d 'de' MMMM, yyyy HH:mm", { locale: es })}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => markReadMutation.mutate({ id: m.id, read: !m.read })}
                  title={m.read ? 'Marcar como no leído' : 'Marcar como leído'}
                >
                  {m.read ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                </Button>
              </div>
              <p className="mt-3 text-sm">{m.message}</p>
            </div>
          ))}
          {messages.length === 0 && (
            <p className="text-center py-8 text-muted-foreground">No hay mensajes aún.</p>
          )}
        </div>
      </div>
    </div>
  );
}
