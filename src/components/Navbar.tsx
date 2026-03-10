import { Link } from 'react-router-dom';
import { Home, Building2, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

export function Navbar() {
  const { isAdmin } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Home className="h-6 w-6 text-primary" />
          <span className="font-heading text-xl font-bold text-foreground">InmoVista</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/propiedades" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Propiedades
          </Link>
          <Link to="/contacto" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Contacto
          </Link>
          {isAdmin && (
            <Link to="/admin">
              <Button size="sm" variant="outline">
                <Building2 className="h-4 w-4 mr-1" />
                Admin
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
