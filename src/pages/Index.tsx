import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search, Home, Building2, MapPin, ArrowRight } from 'lucide-react';
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
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-background mb-4">
            Encuentra tu hogar ideal
          </h1>
          <p className="text-lg md:text-xl text-background/80 mb-8 font-body">
            Explora las mejores propiedades en venta y renta
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/propiedades?operation=venta">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-body">
                <Home className="h-5 w-5 mr-2" /> Comprar
              </Button>
            </Link>
            <Link to="/propiedades?operation=renta">
              <Button size="lg" variant="outline" className="border-background/40 text-background hover:bg-background/10 font-body">
                <Building2 className="h-5 w-5 mr-2" /> Rentar
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Properties */}
      {displayProperties.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground">
                {featured.length > 0 ? 'Propiedades Destacadas' : 'Propiedades Recientes'}
              </h2>
              <p className="text-muted-foreground mt-1">
                Las mejores opciones disponibles para ti
              </p>
            </div>
            <Link to="/propiedades">
              <Button variant="ghost" className="text-primary">
                Ver todas <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </section>
      )}

      {displayProperties.length === 0 && (
        <section className="container mx-auto px-4 py-24 text-center">
          <Search className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
            Aún no hay propiedades
          </h2>
          <p className="text-muted-foreground">
            Pronto tendremos las mejores opciones para ti. ¡Vuelve pronto!
          </p>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Index;
