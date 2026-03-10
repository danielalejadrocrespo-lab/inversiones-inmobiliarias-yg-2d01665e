import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PropertyCard } from '@/components/PropertyCard';
import { supabase } from '@/integrations/supabase/client';
import type { Property, OperationType } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

export default function PropertiesPage() {
  const [searchParams] = useSearchParams();
  const opParam = searchParams.get('operation') as OperationType | null;
  const [activeTab, setActiveTab] = useState<'all' | 'venta' | 'renta'>(opParam === 'renta' ? 'renta' : opParam === 'venta' ? 'venta' : 'all');

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const { data } = await supabase
        .from('properties')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });
      return (data ?? []) as Property[];
    },
  });

  const filtered = useMemo(() => {
    if (activeTab === 'all') return properties;
    return properties.filter((p) => p.operation === activeTab);
  }, [properties, activeTab]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-1">Propiedades</h1>
          <p className="text-muted-foreground mb-6">Encuentra tu próxima inversión</p>

          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            <Button
              size="sm"
              variant={activeTab === 'all' ? 'default' : 'outline'}
              onClick={() => setActiveTab('all')}
            >
              Todos
            </Button>
            <Button
              size="sm"
              variant={activeTab === 'venta' ? 'default' : 'outline'}
              onClick={() => setActiveTab('venta')}
            >
              En Venta
            </Button>
            <Button
              size="sm"
              variant={activeTab === 'renta' ? 'default' : 'outline'}
              onClick={() => setActiveTab('renta')}
            >
              En Alquiler
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-80 rounded-lg bg-muted animate-pulse" />
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg">No se encontraron propiedades.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
