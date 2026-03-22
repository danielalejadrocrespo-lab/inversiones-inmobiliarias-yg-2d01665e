import { Link } from 'react-router-dom';
import { Bed, Bath, Maximize, Car, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Property } from '@/lib/types';
import { formatPrice, propertyTypeLabels, operationLabels } from '@/lib/types';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const firstImage = property.images?.[0];

  return (
    <Link to={`/propiedad/${property.id}`} className="group block">
      <div className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 border border-border/50 hover:border-accent/20 hover:-translate-y-1">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {firstImage ? (
            <img
              src={firstImage}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground font-body">
              Sin imagen
            </div>
          )}
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="absolute top-3 left-3 flex gap-2">
            <Badge className="bg-gradient-warm text-accent-foreground border-0 shadow-lg font-body font-bold text-xs px-3 py-1">
              {operationLabels[property.operation]}
            </Badge>
            <Badge className="bg-card/90 backdrop-blur-sm text-foreground border-0 font-body font-medium text-xs px-3 py-1">
              {propertyTypeLabels[property.property_type]}
            </Badge>
          </div>
        </div>

        <div className="p-5">
          <p className="text-2xl font-bold text-accent font-heading">{formatPrice(property.price)}</p>
          <h3 className="font-heading text-lg font-semibold mt-1.5 text-foreground line-clamp-1 group-hover:text-accent transition-colors duration-300">
            {property.title}
          </h3>

          {(property.city || property.neighborhood) && (
            <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1.5 font-body">
              <MapPin className="h-3.5 w-3.5 text-accent/60" />
              {[property.neighborhood, property.city].filter(Boolean).join(', ')}
            </p>
          )}

          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border/50 text-sm text-muted-foreground font-body">
            {property.property_type !== 'terreno' && (
              <>
                {property.bedrooms != null && property.bedrooms > 0 && (
                  <span className="flex items-center gap-1.5">
                    <Bed className="h-4 w-4 text-primary/60" /> {property.bedrooms}
                  </span>
                )}
                {property.bathrooms != null && property.bathrooms > 0 && (
                  <span className="flex items-center gap-1.5">
                    <Bath className="h-4 w-4 text-primary/60" /> {property.bathrooms}
                  </span>
                )}
              </>
            )}
            {property.area_m2 != null && (
              <span className="flex items-center gap-1.5">
                <Maximize className="h-4 w-4 text-primary/60" /> {property.area_m2} m²
              </span>
            )}
            {property.parking_spaces != null && property.parking_spaces > 0 && (
              <span className="flex items-center gap-1.5">
                <Car className="h-4 w-4 text-primary/60" /> {property.parking_spaces}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
