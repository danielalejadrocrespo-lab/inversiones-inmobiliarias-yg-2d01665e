import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search, Home, Building2, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PropertyCard } from '@/components/PropertyCard';
import { supabase } from '@/integrations/supabase/client';
import type { Property } from '@/lib/types';
import heroBg from '@/assets/hero-bg.jpg';

const Index = () => {
  const { data: featured = [] } = useQuery({
    queryKey: ['featured-properties'],
    queryFn: async () => {
      const { data } = await supabase
        .from('properties')
        .select('*')
        .eq('active', true)
        .eq('featured', true)
        .limit(6);
      return (data ?? []) as Property[];
    },
  });

  const { data: recent = [] } = useQuery({
    queryKey: ['recent-properties'],
    queryFn: async () => {
      const { data } = await supabase
        .from('properties')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false })
        .limit(6);
      return (data ?? []) as Property[];
    },
  });

  const displayProperties = featured.length > 0 ? featured : recent;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <img
          src={heroBg}
          alt="Propiedad moderna"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/60" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
            Tu hogar ideal te espera
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 font-body">
            Encuentra las mejores propiedades en venta y alquiler con Inversiones Inmobiliaria YG
          </p>
          <Link to="/propiedades">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-body text-base px-8">
              <Search className="h-5 w-5 mr-2" /> Ver Propiedades
            </Button>
          </Link>
        </div>
      </section>

      {/* Services */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Home className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-heading text-xl font-semibold mb-2">Casas</h3>
            <p className="text-muted-foreground">Amplias casas familiares en las mejores ubicaciones</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Building2 className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-heading text-xl font-semibold mb-2">Apartamentos</h3>
            <p className="text-muted-foreground">Modernos apartamentos con todas las comodidades</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-heading text-xl font-semibold mb-2">Confianza</h3>
            <p className="text-muted-foreground">Más de 10 años respaldando tu inversión</p>
          </div>
        </div>
      </section>

      {/* Properties */}
      <section className="bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground">Propiedades Destacadas</h2>
              <p className="text-muted-foreground mt-1">Explora nuestras propiedades más recientes</p>
            </div>
            <Link to="/propiedades">
              <Button variant="ghost" className="text-primary">
                Ver todas <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>

          {displayProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                Aún no hay propiedades publicadas
              </h3>
              <p className="text-muted-foreground">
                El administrador puede agregar propiedades desde el panel de admin.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
