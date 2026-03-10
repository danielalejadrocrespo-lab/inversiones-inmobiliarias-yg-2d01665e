import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PropertyCard } from '@/components/PropertyCard';
import { PropertyFilters, defaultFilters, type Filters } from '@/components/PropertyFilters';
import { supabase } from '@/integrations/supabase/client';
import type { Property, OperationType } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function PropertiesPage() {
  const [searchParams] = useSearchParams();
  const opParam = searchParams.get('operation') as OperationType | null;

  const [filters, setFilters] = useState<Filters>({
    ...defaultFilters,
    operation: opParam || 'all',
  });

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

  const cities = useMemo(() => {
    const set = new Set(properties.map((p) => p.city).filter(Boolean) as string[]);
    return Array.from(set).sort();
  }, [properties]);

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (filters.operation !== 'all' && p.operation !== filters.operation) return false;
      if (filters.propertyType !== 'all' && p.property_type !== filters.propertyType) return false;
      if (filters.city !== 'all' && p.city !== filters.city) return false;
      if (filters.minPrice && p.price < Number(filters.minPrice)) return false;
      if (filters.maxPrice && p.price > Number(filters.maxPrice)) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.city?.toLowerCase().includes(q) ||
          p.neighborhood?.toLowerCase().includes(q) ||
          p.address?.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [properties, filters]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-6">Propiedades</h1>
          <PropertyFilters filters={filters} onChange={setFilters} cities={cities} />

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-80 rounded-lg" />
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {filtered.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg">No se encontraron propiedades con esos filtros.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
