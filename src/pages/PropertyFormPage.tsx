import { useState, useRef, useCallback } from 'react';
import { useNavigate, useParams, Navigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Upload, X, Loader2, GripVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import type { Property, PropertyType, OperationType } from '@/lib/types';

interface FormData {
  title: string;
  description: string;
  price: string;
  property_type: PropertyType;
  operation: OperationType;
  address: string;
  city: string;
  neighborhood: string;
  bedrooms: string;
  bathrooms: string;
  area_m2: string;
  parking_spaces: string;
  featured: boolean;
  active: boolean;
  images: string[];
}

const emptyForm: FormData = {
  title: '', description: '', price: '', property_type: 'casa', operation: 'venta',
  address: '', city: '', neighborhood: '', bedrooms: '0', bathrooms: '0',
  area_m2: '', parking_spaces: '0', featured: false, active: true, images: [],
};

export default function PropertyFormPage() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { isAdmin, loading: authLoading } = useAuth();
  const queryClient = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState<FormData>(emptyForm);

  const { isLoading: loadingProperty } = useQuery({
    queryKey: ['edit-property', id],
    queryFn: async () => {
      const { data } = await supabase.from('properties').select('*').eq('id', id!).single();
      if (data) {
        const p = data as Property;
        setForm({
          title: p.title,
          description: p.description || '',
          price: String(p.price),
          property_type: p.property_type,
          operation: p.operation,
          address: p.address || '',
          city: p.city || '',
          neighborhood: p.neighborhood || '',
          bedrooms: String(p.bedrooms ?? 0),
          bathrooms: String(p.bathrooms ?? 0),
          area_m2: p.area_m2 ? String(p.area_m2) : '',
          parking_spaces: String(p.parking_spaces ?? 0),
          featured: p.featured ?? false,
          active: p.active ?? true,
          images: p.images ?? [],
        });
      }
      return data;
    },
    enabled: isEdit && isAdmin,
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        title: form.title,
        description: form.description || null,
        price: Number(form.price),
        property_type: form.property_type,
        operation: form.operation,
        address: form.address || null,
        city: form.city || null,
        neighborhood: form.neighborhood || null,
        bedrooms: Number(form.bedrooms) || 0,
        bathrooms: Number(form.bathrooms) || 0,
        area_m2: form.area_m2 ? Number(form.area_m2) : null,
        parking_spaces: Number(form.parking_spaces) || 0,
        featured: form.featured,
        active: form.active,
        images: form.images,
      };

      if (isEdit) {
        const { error } = await supabase.from('properties').update(payload).eq('id', id!);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('properties').insert([payload]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-properties'] });
      toast({ title: isEdit ? 'Propiedad actualizada' : 'Propiedad creada' });
      navigate('/admin');
    },
    onError: () => {
      toast({ title: 'Error', description: 'No se pudo guardar la propiedad', variant: 'destructive' });
    },
  });

  const handleUpload = async (files: FileList) => {
    setUploading(true);
    const newImages: string[] = [];

    for (const file of Array.from(files)) {
      const ext = file.name.split('.').pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from('property-images').upload(path, file);
      if (!error) {
        const { data } = supabase.storage.from('property-images').getPublicUrl(path);
        newImages.push(data.publicUrl);
      }
    }

    setForm((f) => ({ ...f, images: [...f.images, ...newImages] }));
    setUploading(false);
  };

  const removeImage = (index: number) => {
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== index) }));
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= form.images.length) return;
    setForm((f) => {
      const imgs = [...f.images];
      const [moved] = imgs.splice(fromIndex, 1);
      imgs.splice(toIndex, 0, moved);
      return { ...f, images: imgs };
    });
  };

  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => setDragIndex(index);
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (targetIndex: number) => {
    if (dragIndex !== null && dragIndex !== targetIndex) {
      moveImage(dragIndex, targetIndex);
    }
    setDragIndex(null);
  };

  if (authLoading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  if (!isAdmin) return <Navigate to="/admin/login" replace />;

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link to="/admin" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" /> Volver al panel
        </Link>

        <h1 className="font-heading text-2xl font-bold mb-6">
          {isEdit ? 'Editar Propiedad' : 'Nueva Propiedad'}
        </h1>

        <form
          onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }}
          className="space-y-6 bg-card border rounded-lg p-6"
        >
          {/* Basic info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label>Título *</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required maxLength={200} />
            </div>

            <div>
              <Label>Tipo de Propiedad *</Label>
              <Select value={form.property_type} onValueChange={(v) => setForm({ ...form, property_type: v as PropertyType })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="casa">Casa</SelectItem>
                  <SelectItem value="departamento">Departamento</SelectItem>
                  <SelectItem value="terreno">Terreno</SelectItem>
                  <SelectItem value="local_comercial">Local Comercial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Operación *</Label>
              <Select value={form.operation} onValueChange={(v) => setForm({ ...form, operation: v as OperationType })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="venta">Venta</SelectItem>
                  <SelectItem value="renta">Renta</SelectItem>
                  <SelectItem value="alquiler">Alquiler</SelectItem>
                  <SelectItem value="venta_y_alquiler">Venta o Alquiler</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Precio *</Label>
              <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required min={0} />
            </div>

            <div>
              <Label>Área (m²)</Label>
              <Input type="number" value={form.area_m2} onChange={(e) => setForm({ ...form, area_m2: e.target.value })} min={0} />
            </div>
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Dirección</Label>
              <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} maxLength={200} />
            </div>
            <div>
              <Label>Colonia</Label>
              <Input value={form.neighborhood} onChange={(e) => setForm({ ...form, neighborhood: e.target.value })} maxLength={100} />
            </div>
            <div>
              <Label>Ciudad</Label>
              <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} maxLength={100} />
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label>Recámaras</Label>
              <Input type="number" value={form.bedrooms} onChange={(e) => setForm({ ...form, bedrooms: e.target.value })} min={0} />
            </div>
            <div>
              <Label>Baños</Label>
              <Input type="number" value={form.bathrooms} onChange={(e) => setForm({ ...form, bathrooms: e.target.value })} min={0} />
            </div>
            <div>
              <Label>Estacionamiento</Label>
              <Input type="number" value={form.parking_spaces} onChange={(e) => setForm({ ...form, parking_spaces: e.target.value })} min={0} />
            </div>
          </div>

          <div>
            <Label>Descripción</Label>
            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={5} maxLength={5000} />
          </div>

          {/* Images */}
          <div>
            <Label>Imágenes</Label>
            <p className="text-xs text-muted-foreground mt-1">Arrastra para reordenar o usa las flechas. La primera imagen será la principal.</p>
            <div className="mt-2 flex flex-wrap gap-3">
              {form.images.map((img, i) => (
                <div
                  key={`${img}-${i}`}
                  draggable
                  onDragStart={() => handleDragStart(i)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(i)}
                  className={`relative w-28 h-28 rounded-md overflow-hidden border group cursor-grab active:cursor-grabbing transition-all ${
                    dragIndex === i ? 'opacity-50 scale-95' : ''
                  } ${i === 0 ? 'ring-2 ring-primary' : ''}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  {i === 0 && (
                    <span className="absolute top-0 left-0 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded-br-md font-medium">
                      Principal
                    </span>
                  )}
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/60 px-1 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button type="button" onClick={() => moveImage(i, i - 1)} disabled={i === 0} className="text-white disabled:opacity-30 p-0.5">
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </button>
                    <span className="text-white text-[10px]">{i + 1}/{form.images.length}</span>
                    <button type="button" onClick={() => moveImage(i, i + 1)} disabled={i === form.images.length - 1} className="text-white disabled:opacity-30 p-0.5">
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="w-28 h-28 border-2 border-dashed rounded-md flex flex-col items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              >
                {uploading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Upload className="h-6 w-6" />}
                <span className="text-xs mt-1">{uploading ? 'Subiendo' : 'Subir'}</span>
              </button>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => e.target.files && handleUpload(e.target.files)}
            />
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Switch checked={form.featured} onCheckedChange={(v) => setForm({ ...form, featured: v })} />
              <Label>Destacada</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={form.active} onCheckedChange={(v) => setForm({ ...form, active: v })} />
              <Label>Activa</Label>
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="submit" disabled={saveMutation.isPending}>
              {saveMutation.isPending ? 'Guardando...' : isEdit ? 'Actualizar' : 'Crear Propiedad'}
            </Button>
            <Link to="/admin"><Button variant="outline" type="button">Cancelar</Button></Link>
          </div>
        </form>
      </div>
    </div>
  );
}
