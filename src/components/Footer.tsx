import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import logo from '@/assets/logo.jpeg';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Logo" className="h-10 w-10 rounded" />
              <span className="font-heading text-lg font-bold">Inversiones Inmobiliaria YG</span>
            </div>
            <p className="text-sm opacity-70">
              Ventas y alquileres de inmuebles. Tu aliado de confianza en bienes raíces.
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
            <div className="flex flex-col gap-3 text-sm opacity-70">
              <a href="tel:+584167405367" className="flex items-center gap-2 hover:opacity-100">
                <Phone className="h-4 w-4" /> +58 416-7405367
              </a>
              <a href="tel:+584121472995" className="flex items-center gap-2 hover:opacity-100">
                <Phone className="h-4 w-4" /> +58 412-1472995
              </a>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> info@inversionesyg.com
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm opacity-50">
          © {new Date().getFullYear()} Inversiones Inmobiliaria YG. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
