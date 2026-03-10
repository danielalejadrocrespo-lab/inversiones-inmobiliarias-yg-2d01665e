import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Bed, Bath, Maximize, Car, MapPin, ArrowLeft, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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
        <div className="bg-muted animate-pulse rounded-lg h-96 mb-6" />
        <div className="bg-muted animate-pulse rounded-lg h-40" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-lg text-muted-foreground">Propiedad no encontrada</p>
        <Link to="/propiedades" className="text-accent hover:underline mt-4 inline-block">
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
    <div className="py-8">
      <div className="container mx-auto px-4">
        <Link to="/propiedades" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" /> Volver a propiedades
        </Link>

        {/* Image gallery with arrows */}
        <div className="relative rounded-xl overflow-hidden mb-8">
          <div className="aspect-[16/9] bg-muted">
            <img src={images[currentImage]} alt={property.title} className="w-full h-full object-cover" />
          </div>
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-foreground/50 text-background rounded-full p-2 hover:bg-foreground/70 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-foreground/50 text-background rounded-full p-2 hover:bg-foreground/70 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      i === currentImage ? 'bg-accent' : 'bg-background/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
          <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-heading font-bold uppercase tracking-wider ${
            property.operation === 'venta'
              ? 'bg-primary text-primary-foreground'
              : 'bg-accent text-accent-foreground'
          }`}>
            {operationLabels[property.operation]}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <p className="text-3xl font-bold text-accent font-heading">{formatPrice(property.price)}</p>
              <h1 className="font-heading text-2xl font-bold text-foreground mt-2">{property.title}</h1>
            </div>

            {(property.address || property.city || property.neighborhood) && (
              <p className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {[property.address, property.neighborhood, property.city].filter(Boolean).join(', ')}
              </p>
            )}

            {/* Features */}
            <div className="flex items-center gap-6 text-muted-foreground">
              {property.bedrooms != null && property.bedrooms > 0 && (
                <span className="flex items-center gap-1.5"><Bed size={18} /> {property.bedrooms} Hab.</span>
              )}
              {property.bathrooms != null && property.bathrooms > 0 && (
                <span className="flex items-center gap-1.5"><Bath size={18} /> {property.bathrooms} Baños</span>
              )}
              {property.area_m2 != null && (
                <span className="flex items-center gap-1.5"><Maximize size={18} /> {property.area_m2} m²</span>
              )}
              {property.parking_spaces != null && property.parking_spaces > 0 && (
                <span className="flex items-center gap-1.5"><Car size={18} /> {property.parking_spaces} Est.</span>
              )}
            </div>

            {property.description && (
              <div>
                <h2 className="font-heading text-xl font-semibold mb-3">Descripción</h2>
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{property.description}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <a
              href={`https://wa.me/584167405367?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <button className="w-full bg-success text-success-foreground py-3 rounded-lg font-heading font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                <MessageCircle size={20} /> WhatsApp
              </button>
            </a>

            <button
              onClick={() => setShowContact(!showContact)}
              className="w-full border border-border py-3 rounded-lg font-heading font-semibold hover:bg-muted transition-colors"
            >
              Enviar mensaje
            </button>

            {showContact && <ContactForm propertyId={property.id} />}
          </div>
        </div>
      </div>
    </div>
  );
}
