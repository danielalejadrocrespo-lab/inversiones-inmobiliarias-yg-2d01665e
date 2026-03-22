import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search, Home, Building2, ShieldCheck, ArrowRight, Star, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { PropertyCard } from '@/components/PropertyCard';
import { supabase } from '@/integrations/supabase/client';
import type { Property } from '@/lib/types';
import heroBg from '@/assets/hero-bg.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
};

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
    <div>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <img src={heroBg} alt="Propiedad moderna" className="absolute inset-0 w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-transparent" />

        {/* Decorative orbs */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-56 h-56 bg-accent/8 rounded-full blur-3xl" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm text-accent-foreground px-5 py-2 rounded-full text-sm font-body font-semibold mb-8 border border-accent/30"
          >
            <Star className="h-4 w-4 text-accent" fill="currentColor" />
            Más de 10 años de experiencia
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-heading font-extrabold text-4xl md:text-5xl lg:text-7xl text-primary-foreground mb-6 leading-[1.1]"
          >
            Tu hogar ideal
            <span className="block text-gradient mt-2">te espera</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-primary-foreground/80 text-lg md:text-xl mb-10 font-body max-w-2xl mx-auto leading-relaxed"
          >
            Encuentra las mejores propiedades en venta y alquiler con
            <span className="font-semibold text-primary-foreground"> Inversiones Inmobiliaria YG</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/propiedades"
              className="inline-flex items-center gap-2 bg-gradient-warm text-accent-foreground px-8 py-4 rounded-xl font-body font-bold text-lg hover:shadow-xl hover:shadow-accent/25 hover:-translate-y-0.5 transition-all duration-300"
            >
              <Search size={20} /> Ver Propiedades
            </Link>
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground border border-primary-foreground/20 px-8 py-4 rounded-xl font-body font-bold text-lg hover:bg-primary-foreground/20 transition-all duration-300"
            >
              Contáctanos
            </Link>
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(40, 30%, 97%)" />
          </svg>
        </div>
      </section>

      {/* Stats bar */}
      <section className="relative -mt-6 z-10 container mx-auto px-4">
        <div className="bg-card rounded-2xl shadow-card p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 md:divide-x divide-border">
          {[
            { icon: TrendingUp, value: '10+', label: 'Años de experiencia' },
            { icon: Home, value: '100+', label: 'Propiedades gestionadas' },
            { icon: Users, value: '500+', label: 'Clientes satisfechos' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="flex items-center gap-4 md:justify-center"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <stat.icon className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground font-body">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="container mx-auto px-4 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="text-center mb-16"
        >
          <span className="text-accent font-body font-semibold text-sm uppercase tracking-widest">Nuestros Servicios</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3">
            ¿Qué ofrecemos?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Home,
              title: 'Casas',
              description: 'Amplias casas familiares en las mejores ubicaciones del país',
              gradient: 'from-accent/10 to-accent/5',
            },
            {
              icon: Building2,
              title: 'Apartamentos',
              description: 'Modernos apartamentos con todas las comodidades que necesitas',
              gradient: 'from-primary/10 to-primary/5',
            },
            {
              icon: ShieldCheck,
              title: 'Confianza',
              description: 'Más de 10 años respaldando tu inversión con profesionalismo',
              gradient: 'from-gold/10 to-gold/5',
            },
          ].map((service, i) => (
            <motion.div
              key={service.title}
              custom={i + 1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="group relative bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-500 border border-border/50 hover:border-accent/20 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-warm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-3 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground font-body leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Properties */}
      <section className="bg-card py-20 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
            >
              <span className="text-accent font-body font-semibold text-sm uppercase tracking-widest">Explora</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3">
                Propiedades Destacadas
              </h2>
              <p className="text-muted-foreground mt-2 font-body">Las mejores opciones seleccionadas para ti</p>
            </motion.div>
            <Link
              to="/propiedades"
              className="hidden sm:flex items-center gap-2 bg-accent/10 text-accent px-5 py-2.5 rounded-xl font-body font-semibold text-sm hover:bg-accent hover:text-accent-foreground transition-all duration-300"
            >
              Ver todas <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {displayProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayProperties.map((p, i) => (
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
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                Aún no hay propiedades publicadas
              </h3>
              <p className="text-muted-foreground font-body">
                Próximamente nuevas propiedades disponibles
              </p>
            </div>
          )}

          <Link
            to="/propiedades"
            className="sm:hidden flex items-center justify-center gap-2 mt-8 bg-accent text-accent-foreground px-6 py-3 rounded-xl font-body font-bold text-sm"
          >
            Ver todas las propiedades <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="relative bg-primary rounded-3xl p-12 md:p-16 text-center overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

            <div className="relative">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                ¿Listo para encontrar tu hogar?
              </h2>
              <p className="text-primary-foreground/70 font-body text-lg mb-8 max-w-xl mx-auto">
                Contáctanos hoy y te ayudaremos a encontrar la propiedad perfecta para ti y tu familia
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/contacto"
                  className="inline-flex items-center gap-2 bg-gradient-warm text-accent-foreground px-8 py-4 rounded-xl font-body font-bold text-lg hover:shadow-xl hover:shadow-accent/25 transition-all duration-300"
                >
                  Contáctanos ahora
                </Link>
                <a
                  href="https://wa.me/584167405367"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-primary-foreground/20 text-primary-foreground px-8 py-4 rounded-xl font-body font-bold text-lg hover:bg-primary-foreground/10 transition-all duration-300"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
