import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Bed, Bath, Maximize, Car, MapPin, ArrowLeft, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ContactForm } from '@/components/ContactForm';
import { supabase } from '@/integrations/supabase/client';
import { formatPrice, propertyTypeLabels, operationLabels, type Property } from '@/lib/types';
import { useState } from 'react';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const [showContact, setShowContact] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

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

  const whatsappMsg = property
    ? encodeURIComponent(`Hola, me interesa la propiedad: ${property.title} - ${formatPrice(property.price)}`)
    : '';

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-20 container mx-auto px-4 py-16">
          <div className="animate-pulse space-y-4">
            <div className="h-96 bg-muted rounded-lg" />
            <div className="h-8 bg-muted rounded w-1/2" />
            <div className="h-4 bg-muted rounded w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-20 container mx-auto px-4 py-16 text-center">
          <h1 className="font-heading text-2xl">Propiedad no encontrada</h1>
          <Link to="/propiedades"><Button className="mt-4">Ver propiedades</Button></Link>
        </div>
      </div>
    );
  }

  const images = property.images ?? [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <Link to="/propiedades" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" /> Volver a propiedades
          </Link>

          {/* Image gallery */}
          <div className="mb-8">
            {images.length > 0 ? (
              <>
                <div className="aspect-[16/9] rounded-lg overflow-hidden bg-muted mb-2">
                  <img src={images[selectedImage]} alt={property.title} className="w-full h-full object-cover" />
                </div>
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto py-2">
                    {images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${i === selectedImage ? 'border-primary' : 'border-transparent'}`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="aspect-[16/9] rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                Sin imágenes
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Details */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex gap-2 mb-2">
                  <Badge className="bg-primary text-primary-foreground">{operationLabels[property.operation]}</Badge>
                  <Badge variant="secondary">{propertyTypeLabels[property.property_type]}</Badge>
                </div>
                <h1 className="font-heading text-3xl font-bold text-foreground">{property.title}</h1>
                <p className="text-3xl font-bold text-accent mt-2 font-body">{formatPrice(property.price)}</p>
                {property.operation === 'renta' && <span className="text-muted-foreground text-sm"> /mes</span>}
              </div>

              {(property.address || property.city || property.neighborhood) && (
                <p className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {[property.address, property.neighborhood, property.city].filter(Boolean).join(', ')}
                </p>
              )}

              {/* Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {property.bedrooms != null && property.bedrooms > 0 && (
                  <div className="flex items-center gap-2 bg-secondary rounded-lg p-3">
                    <Bed className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Recámaras</p>
                      <p className="font-semibold">{property.bedrooms}</p>
                    </div>
                  </div>
                )}
                {property.bathrooms != null && property.bathrooms > 0 && (
                  <div className="flex items-center gap-2 bg-secondary rounded-lg p-3">
                    <Bath className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Baños</p>
                      <p className="font-semibold">{property.bathrooms}</p>
                    </div>
                  </div>
                )}
                {property.area_m2 != null && (
                  <div className="flex items-center gap-2 bg-secondary rounded-lg p-3">
                    <Maximize className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Área</p>
                      <p className="font-semibold">{property.area_m2} m²</p>
                    </div>
                  </div>
                )}
                {property.parking_spaces != null && property.parking_spaces > 0 && (
                  <div className="flex items-center gap-2 bg-secondary rounded-lg p-3">
                    <Car className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Estacionamiento</p>
                      <p className="font-semibold">{property.parking_spaces}</p>
                    </div>
                  </div>
                )}
              </div>

              {property.description && (
                <div>
                  <h2 className="font-heading text-xl font-semibold mb-2">Descripción</h2>
                  <p className="text-muted-foreground whitespace-pre-line">{property.description}</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <a
                href={`https://wa.me/5215512345678?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full bg-success text-success-foreground hover:bg-success/90" size="lg">
                  <MessageCircle className="h-5 w-5 mr-2" /> WhatsApp
                </Button>
              </a>

              <Button variant="outline" className="w-full" size="lg" onClick={() => setShowContact(!showContact)}>
                Enviar mensaje
              </Button>

              {showContact && <ContactForm propertyId={property.id} />}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
