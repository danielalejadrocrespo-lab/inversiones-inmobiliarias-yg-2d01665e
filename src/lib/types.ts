export type PropertyType = 'casa' | 'departamento' | 'terreno' | 'local_comercial';
export type OperationType = 'venta' | 'renta';

export interface Property {
  id: string;
  title: string;
  description: string | null;
  price: number;
  property_type: PropertyType;
  operation: OperationType;
  address: string | null;
  city: string | null;
  neighborhood: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  area_m2: number | null;
  parking_spaces: number | null;
  images: string[] | null;
  featured: boolean | null;
  active: boolean | null;
  created_at: string;
  updated_at: string;
}

export const propertyTypeLabels: Record<PropertyType, string> = {
  casa: 'Casa',
  departamento: 'Departamento',
  terreno: 'Terreno',
  local_comercial: 'Local Comercial',
};

export const operationLabels: Record<OperationType, string> = {
  venta: 'Venta',
  renta: 'Renta',
};

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
