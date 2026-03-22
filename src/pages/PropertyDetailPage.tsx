import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Bed, Bath, Maximize, Car, MapPin, ArrowLeft, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { ContactForm } from '@/components/ContactForm';
import { supabase } from '@/integrations/supabase/client';
import { formatPrice, propertyTypeLabels, operationLabels, type Property } from '@/lib/types';
import { useState } from 'react';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const [showContact, setShowContact] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const { data: property, isLoading } = useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      const { data } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id!)
        .single();
      return data as Property | null;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-muted animate-pulse rounded-2xl h-96 mb-6" />
        <div className="bg-muted animate-pulse rounded-2xl h-40" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-lg text-muted-foreground font-body">Propiedad no encontrada</p>
        <Link to="/propiedades" className="text-accent hover:underline mt-4 inline-block font-body font-semibold">
          Volver a propiedades
        </Link>
      </div>
    );
  }

  const images = property.images && property.images.length > 0 ? property.images : ['/placeholder.svg'];
  const whatsappMsg = encodeURIComponent(`Hola, me interesa la propiedad: ${property.title} - ${formatPrice(property.price)}`);

  const prevImage = () => setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () => setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <Link to="/propiedades" className="inline-flex items-center text-sm text-muted-foreground hover:text-accent mb-6 font-body font-medium transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" /> Volver a propiedades
        </Link>

        {/* Image gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden mb-8 shadow-card"
        >
          <div className="aspect-[16/9] bg-muted">
            <img src={images[currentImage]} alt={property.title} className="w-full h-full object-cover" />
          </div>
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm text-foreground rounded-xl p-2.5 hover:bg-card transition-colors shadow-lg"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm text-foreground rounded-xl p-2.5 hover:bg-card transition-colors shadow-lg"
              >
                <ChevronRight size={24} />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-card/60 backdrop-blur-sm rounded-full px-3 py-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      i === currentImage ? 'bg-accent w-6' : 'bg-foreground/30 hover:bg-foreground/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
          <span className={`absolute top-4 left-4 px-4 py-1.5 rounded-xl text-xs font-body font-bold uppercase tracking-wider shadow-lg ${
            property.operation === 'venta'
              ? 'bg-gradient-warm text-accent-foreground'
              : 'bg-accent text-accent-foreground'
          }`}>
            {operationLabels[property.operation]}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <p className="text-3xl font-bold text-accent font-heading">{formatPrice(property.price)}</p>
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-2">{property.title}</h1>
            </div>

            {(property.address || property.city || property.neighborhood) && (
              <p className="flex items-center gap-2 text-muted-foreground font-body">
                <MapPin className="h-4 w-4 text-accent/60" />
                {[property.address, property.neighborhood, property.city].filter(Boolean).join(', ')}
              </p>
            )}

            {/* Features */}
            <div className="flex flex-wrap items-center gap-4">
              {property.bedrooms != null && property.bedrooms > 0 && (
                <div className="flex items-center gap-2 bg-muted px-4 py-2.5 rounded-xl text-sm font-body">
                  <Bed size={18} className="text-primary/60" /> {property.bedrooms} Hab.
                </div>
              )}
              {property.bathrooms != null && property.bathrooms > 0 && (
                <div className="flex items-center gap-2 bg-muted px-4 py-2.5 rounded-xl text-sm font-body">
                  <Bath size={18} className="text-primary/60" /> {property.bathrooms} Baños
                </div>
              )}
              {property.area_m2 != null && (
                <div className="flex items-center gap-2 bg-muted px-4 py-2.5 rounded-xl text-sm font-body">
                  <Maximize size={18} className="text-primary/60" /> {property.area_m2} m²
                </div>
              )}
              {property.parking_spaces != null && property.parking_spaces > 0 && (
                <div className="flex items-center gap-2 bg-muted px-4 py-2.5 rounded-xl text-sm font-body">
                  <Car size={18} className="text-primary/60" /> {property.parking_spaces} Est.
                </div>
              )}
            </div>

            {property.description && (
              <div className="bg-card border border-border/50 rounded-2xl p-6">
                <h2 className="font-heading text-xl font-bold mb-3">Descripción</h2>
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed font-body">{property.description}</p>
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <a
              href={`https://wa.me/584167405367?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <button className="w-full bg-success text-success-foreground py-4 rounded-xl font-body font-bold hover:shadow-lg hover:shadow-success/20 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
                <MessageCircle size={20} /> WhatsApp
              </button>
            </a>

            <button
              onClick={() => setShowContact(!showContact)}
              className="w-full border-2 border-accent/20 text-foreground py-4 rounded-xl font-body font-bold hover:border-accent hover:bg-accent/5 transition-all duration-300"
            >
              Enviar mensaje
            </button>

            {showContact && <ContactForm propertyId={property.id} />}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
