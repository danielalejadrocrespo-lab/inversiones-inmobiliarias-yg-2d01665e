import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import logo from '@/assets/logo.jpeg';

export function Navbar() {
  const { isAdmin } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Inversiones Inmobiliaria YG" className="h-10 w-10 object-contain rounded" />
          <span className="font-heading text-lg font-bold text-primary">Inversiones Inmobiliaria YG</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hidden sm:block">
            Inicio
          </Link>
          <Link to="/propiedades" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Propiedades
          </Link>
          <Link to="/contacto" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Contacto
          </Link>
          {isAdmin && (
            <Link to="/admin">
              <Button size="sm">Admin</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
