import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { PropertyCard } from '@/components/PropertyCard';
import { supabase } from '@/integrations/supabase/client';
import type { Property, OperationType } from '@/lib/types';
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

  const tabs = [
    { key: 'all' as const, label: 'Todos' },
    { key: 'venta' as const, label: 'En Venta' },
    { key: 'renta' as const, label: 'En Alquiler' },
  ];

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="font-heading font-bold text-3xl text-foreground mb-2">Propiedades</h1>
        <p className="text-muted-foreground mb-8">Encuentra tu próxima inversión</p>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg font-heading font-semibold text-sm transition-colors ${
                activeTab === tab.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
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
  );
}
