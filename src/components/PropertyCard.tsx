import { Link } from 'react-router-dom';
import { Bed, Bath, Maximize, Car, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Property } from '@/lib/types';
import { formatPrice, propertyTypeLabels, operationLabels } from '@/lib/types';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const firstImage = property.images?.[0];

  return (
    <Link to={`/propiedad/${property.id}`}>
      <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300 border-border/50">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {firstImage ? (
            <img
              src={firstImage}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              Sin imagen
            </div>
          )}
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge className="bg-primary text-primary-foreground">
              {operationLabels[property.operation]}
            </Badge>
            <Badge variant="secondary">
              {propertyTypeLabels[property.property_type]}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <p className="text-xl font-bold text-accent font-body">{formatPrice(property.price)}</p>
          <h3 className="font-heading text-lg font-semibold mt-1 text-foreground line-clamp-1">
            {property.title}
          </h3>
          {(property.city || property.neighborhood) && (
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {[property.neighborhood, property.city].filter(Boolean).join(', ')}
            </p>
          )}
          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
            {property.property_type !== 'terreno' && (
              <>
                {property.bedrooms != null && property.bedrooms > 0 && (
                  <span className="flex items-center gap-1"><Bed className="h-4 w-4" /> {property.bedrooms}</span>
                )}
                {property.bathrooms != null && property.bathrooms > 0 && (
                  <span className="flex items-center gap-1"><Bath className="h-4 w-4" /> {property.bathrooms}</span>
                )}
              </>
            )}
            {property.area_m2 != null && (
              <span className="flex items-center gap-1"><Maximize className="h-4 w-4" /> {property.area_m2} m²</span>
            )}
            {property.parking_spaces != null && property.parking_spaces > 0 && (
              <span className="flex items-center gap-1"><Car className="h-4 w-4" /> {property.parking_spaces}</span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
