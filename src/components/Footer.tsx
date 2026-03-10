import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Home className="h-5 w-5" />
              <span className="font-heading text-lg font-bold">InmoVista</span>
            </div>
            <p className="text-sm opacity-70">
              Tu portal inmobiliario de confianza. Encuentra tu hogar ideal.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-3">Navegación</h4>
            <div className="flex flex-col gap-2 text-sm opacity-70">
              <Link to="/" className="hover:opacity-100 transition-opacity">Inicio</Link>
              <Link to="/propiedades" className="hover:opacity-100 transition-opacity">Propiedades</Link>
              <Link to="/contacto" className="hover:opacity-100 transition-opacity">Contacto</Link>
            </div>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-3">Contacto</h4>
            <div className="flex flex-col gap-2 text-sm opacity-70">
              <p>info@inmovista.com</p>
              <p>+52 (55) 1234-5678</p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-background/20 text-center text-sm opacity-50">
          © {new Date().getFullYear()} InmoVista. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
