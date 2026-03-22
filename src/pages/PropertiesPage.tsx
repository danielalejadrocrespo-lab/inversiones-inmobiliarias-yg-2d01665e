import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PropertyCard } from '@/components/PropertyCard';
import { supabase } from '@/integrations/supabase/client';
import type { Property, OperationType } from '@/lib/types';
import { Search } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

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
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="text-accent font-body font-semibold text-sm uppercase tracking-widest">Catálogo</span>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground mt-2 mb-2">Propiedades</h1>
          <p className="text-muted-foreground font-body text-lg mb-8">Encuentra tu próxima inversión</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-10 p-1 bg-muted rounded-xl w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2.5 rounded-lg font-body font-semibold text-sm transition-all duration-300 ${
                activeTab === tab.key
                  ? 'bg-accent text-accent-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <PropertyCard property={p} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6">
              <Search className="h-10 w-10 text-muted-foreground/40" />
            </div>
            <p className="text-lg text-muted-foreground font-body">No se encontraron propiedades.</p>
          </div>
        )}
      </div>
    </div>
  );
}
