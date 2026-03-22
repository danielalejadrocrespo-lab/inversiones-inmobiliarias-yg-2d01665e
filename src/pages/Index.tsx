import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search, Home, Building2, ShieldCheck, ArrowRight, Star, TrendingUp, Users, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { PropertyCard } from '@/components/PropertyCard';
import { supabase } from '@/integrations/supabase/client';
import type { Property } from '@/lib/types';
import logo from '@/assets/logo.jpeg';
import promoImg from '@/assets/yg-promo.jpg';

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
      {/* Hero – dark style inspired by reference */}
      <section className="relative bg-primary overflow-hidden">
        {/* Decorative gradient orbs */}
        <div className="absolute top-10 right-10 w-80 h-80 bg-accent/8 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-gold/6 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col items-center pt-10 pb-6 px-4">
          {/* Centered Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div className="w-36 h-36 md:w-44 md:h-44 rounded-full ring-4 ring-accent/40 overflow-hidden shadow-2xl shadow-accent/20">
              <img src={logo} alt="YG Inversiones Inmobiliarias" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-accent font-body font-bold text-sm md:text-base tracking-[0.3em] uppercase mb-4"
          >
            Inversiones Inmobiliarias
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-primary-foreground text-center leading-tight mb-8"
          >
            Encuentra tu{' '}
            <span className="text-gradient">propiedad ideal</span>
          </motion.h1>

          {/* Promo Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="w-full max-w-2xl rounded-2xl overflow-hidden ring-4 ring-accent/30 shadow-2xl shadow-black/40"
          >
            <img
              src={promoImg}
              alt="Yuranci García – Asesor Inmobiliario YG Inversiones"
              className="w-full h-auto object-cover"
            />
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 mb-4"
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
              <Phone size={20} /> Contáctanos
            </Link>
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="relative z-10">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 100L60 90C120 80 240 60 360 50C480 40 600 40 720 45C840 50 960 60 1080 65C1200 70 1320 70 1380 70L1440 70V100H0Z" fill="hsl(40, 30%, 97%)" />
          </svg>
        </div>
      </section>

      {/* Stats bar */}
      <section className="relative -mt-4 z-10 container mx-auto px-4">
        <div className="bg-card rounded-2xl shadow-card p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 md:divide-x divide-border">
          {[
            { icon: TrendingUp, value: '20+', label: 'Años de experiencia' },
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
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
          <span className="text-accent font-body font-semibold text-sm uppercase tracking-widest">Nuestros Servicios</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3">¿Qué ofrecemos?</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Home, title: 'Casas', description: 'Amplias casas familiares en las mejores ubicaciones del país', gradient: 'from-accent/10 to-accent/5' },
            { icon: Building2, title: 'Apartamentos', description: 'Modernos apartamentos con todas las comodidades que necesitas', gradient: 'from-primary/10 to-primary/5' },
            { icon: ShieldCheck, title: 'Confianza', description: 'Más de 10 años respaldando tu inversión con profesionalismo', gradient: 'from-gold/10 to-gold/5' },
          ].map((service, i) => (
            <motion.div key={service.title} custom={i + 1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
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
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <span className="text-accent font-body font-semibold text-sm uppercase tracking-widest">Explora</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3">Propiedades Destacadas</h2>
              <p className="text-muted-foreground mt-2 font-body">Las mejores opciones seleccionadas para ti</p>
            </motion.div>
            <Link to="/propiedades" className="hidden sm:flex items-center gap-2 bg-accent/10 text-accent px-5 py-2.5 rounded-xl font-body font-semibold text-sm hover:bg-accent hover:text-accent-foreground transition-all duration-300">
              Ver todas <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {displayProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayProperties.map((p, i) => (
                <motion.div key={p.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <PropertyCard property={p} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6">
                <Search className="h-10 w-10 text-muted-foreground/40" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Aún no hay propiedades publicadas</h3>
              <p className="text-muted-foreground font-body">Próximamente nuevas propiedades disponibles</p>
            </div>
          )}

          <Link to="/propiedades" className="sm:hidden flex items-center justify-center gap-2 mt-8 bg-accent text-accent-foreground px-6 py-3 rounded-xl font-body font-bold text-sm">
            Ver todas las propiedades <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="relative bg-primary rounded-3xl p-12 md:p-16 text-center overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">¿Listo para encontrar tu hogar?</h2>
              <p className="text-primary-foreground/70 font-body text-lg mb-8 max-w-xl mx-auto">Contáctanos hoy y te ayudaremos a encontrar la propiedad perfecta para ti y tu familia</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contacto" className="inline-flex items-center gap-2 bg-gradient-warm text-accent-foreground px-8 py-4 rounded-xl font-body font-bold text-lg hover:shadow-xl hover:shadow-accent/25 transition-all duration-300">
                  Contáctanos ahora
                </Link>
                <a href="https://wa.me/584167405367" target="_blank" rel="noopener noreferrer"
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
