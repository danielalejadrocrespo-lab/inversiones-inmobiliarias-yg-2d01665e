import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2, LogOut, Home, Eye, EyeOff, MessageSquare } from 'lucide-react';
import { formatPrice, propertyTypeLabels, operationLabels, type Property } from '@/lib/types';
import { toast } from '@/hooks/use-toast';

export default function AdminDashboard() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const queryClient = useQueryClient();

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['admin-properties'],
    queryFn: async () => {
      const { data } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });
      return (data ?? []) as Property[];
    },
    enabled: isAdmin,
  });

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

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('properties').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-properties'] });
      toast({ title: 'Propiedad eliminada' });
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, active }: { id: string; active: boolean }) => {
      const { error } = await supabase.from('properties').update({ active }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-properties'] });
    },
  });

  if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  if (!user || !isAdmin) return <Navigate to="/admin/login" replace />;

  const unreadMessages = messages.filter((m) => !m.read).length;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-5 w-5 text-primary" />
              <span className="font-heading font-bold">InmoVista</span>
            </Link>
            <Badge variant="secondary">Admin</Badge>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/admin/mensajes">
              <Button variant="ghost" size="sm">
                <MessageSquare className="h-4 w-4 mr-1" />
                Mensajes
                {unreadMessages > 0 && (
                  <Badge className="ml-1 bg-accent text-accent-foreground text-xs">{unreadMessages}</Badge>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-1" /> Salir
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-heading text-2xl font-bold">Propiedades ({properties.length})</h1>
          <Link to="/admin/propiedad/nueva">
            <Button>
              <Plus className="h-4 w-4 mr-1" /> Agregar Propiedad
            </Button>
          </Link>
        </div>

        <div className="bg-card border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Imagen</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Operación</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    {p.images?.[0] ? (
                      <img src={p.images[0]} alt="" className="w-16 h-12 object-cover rounded" />
                    ) : (
                      <div className="w-16 h-12 bg-muted rounded" />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{p.title}</TableCell>
                  <TableCell>{propertyTypeLabels[p.property_type]}</TableCell>
                  <TableCell>{operationLabels[p.operation]}</TableCell>
                  <TableCell>{formatPrice(p.price)}</TableCell>
                  <TableCell>
                    <Badge variant={p.active ? 'default' : 'secondary'}>
                      {p.active ? 'Activa' : 'Inactiva'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleActiveMutation.mutate({ id: p.id, active: !p.active })}
                        title={p.active ? 'Desactivar' : 'Activar'}
                      >
                        {p.active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Link to={`/admin/propiedad/${p.id}`}>
                        <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          if (confirm('¿Eliminar esta propiedad?')) {
                            deleteMutation.mutate(p.id);
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {properties.length === 0 && !isLoading && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No hay propiedades aún. ¡Agrega la primera!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
