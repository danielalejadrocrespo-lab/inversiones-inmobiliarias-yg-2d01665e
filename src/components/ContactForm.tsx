import { useState } from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Nombre requerido').max(100),
  email: z.string().trim().email('Email inválido').max(255),
  phone: z.string().trim().max(20).optional(),
  message: z.string().trim().min(1, 'Mensaje requerido').max(1000),
});

interface ContactFormProps {
  propertyId?: string;
}

export function ContactForm({ propertyId }: ContactFormProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      toast({ title: 'Error', description: parsed.error.errors[0].message, variant: 'destructive' });
      return;
    }

    setLoading(true);
    const { error } = await supabase.from('contact_messages').insert({
      ...parsed.data,
      property_id: propertyId ?? null,
    });
    setLoading(false);

    if (error) {
      toast({ title: 'Error', description: 'No se pudo enviar el mensaje', variant: 'destructive' });
    } else {
      toast({ title: '¡Enviado!', description: 'Nos pondremos en contacto contigo pronto.' });
      setForm({ name: '', email: '', phone: '', message: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-card border rounded-lg p-4">
      <h3 className="font-heading font-semibold text-lg">Envíanos un mensaje</h3>
      <div>
        <Label htmlFor="name">Nombre *</Label>
        <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required maxLength={100} />
      </div>
      <div>
        <Label htmlFor="email">Email *</Label>
        <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required maxLength={255} />
      </div>
      <div>
        <Label htmlFor="phone">Teléfono</Label>
        <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={20} />
      </div>
      <div>
        <Label htmlFor="message">Mensaje *</Label>
        <Textarea id="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required maxLength={1000} rows={4} />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar mensaje'}
      </Button>
    </form>
  );
}
