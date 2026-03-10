import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import type { PropertyType, OperationType } from '@/lib/types';

export interface Filters {
  search: string;
  propertyType: PropertyType | 'all';
  operation: OperationType | 'all';
  minPrice: string;
  maxPrice: string;
  city: string;
}

interface PropertyFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  cities: string[];
}

const defaultFilters: Filters = {
  search: '',
  propertyType: 'all',
  operation: 'all',
  minPrice: '',
  maxPrice: '',
  city: 'all',
};

export function PropertyFilters({ filters, onChange, cities }: PropertyFiltersProps) {
  const hasFilters = JSON.stringify(filters) !== JSON.stringify(defaultFilters);

  return (
    <div className="bg-card rounded-lg border p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar propiedades..."
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Select value={filters.operation} onValueChange={(v) => onChange({ ...filters, operation: v as OperationType | 'all' })}>
          <SelectTrigger><SelectValue placeholder="Operación" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="venta">Venta</SelectItem>
            <SelectItem value="renta">Renta</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.propertyType} onValueChange={(v) => onChange({ ...filters, propertyType: v as PropertyType | 'all' })}>
          <SelectTrigger><SelectValue placeholder="Tipo" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="casa">Casa</SelectItem>
            <SelectItem value="departamento">Departamento</SelectItem>
            <SelectItem value="terreno">Terreno</SelectItem>
            <SelectItem value="local_comercial">Local Comercial</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.city || 'all'} onValueChange={(v) => onChange({ ...filters, city: v })}>
          <SelectTrigger><SelectValue placeholder="Ciudad" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {cities.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="number"
          placeholder="Precio mín."
          value={filters.minPrice}
          onChange={(e) => onChange({ ...filters, minPrice: e.target.value })}
        />

        <Input
          type="number"
          placeholder="Precio máx."
          value={filters.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: e.target.value })}
        />
      </div>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={() => onChange(defaultFilters)}>
          <X className="h-4 w-4 mr-1" /> Limpiar filtros
        </Button>
      )}
    </div>
  );
}

export { defaultFilters };
