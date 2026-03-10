import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import logo from '@/assets/logo.jpeg';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <img src={logo} alt="Inversiones Inmobiliaria YG" className="h-16 w-16 rounded mb-4" />
            <p className="text-sm opacity-70">
              Tu aliado de confianza en inversiones inmobiliarias. Encontramos la propiedad perfecta para ti.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-lg mb-3">Contacto</h4>
            <div className="flex flex-col gap-3 text-sm opacity-70">
              <a href="tel:+584167405367" className="flex items-center gap-2 hover:opacity-100">
                <Phone className="h-4 w-4" /> +58 416-7405367
              </a>
              <a href="tel:+584121472995" className="flex items-center gap-2 hover:opacity-100">
                <Phone className="h-4 w-4" /> +58 412-1472995
              </a>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> info@inmobiliariayg.com
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Venezuela
              </p>
            </div>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-lg mb-3">Enlaces</h4>
            <div className="flex flex-col gap-2 text-sm opacity-70">
              <Link to="/" className="hover:opacity-100 transition-opacity">Inicio</Link>
              <Link to="/propiedades" className="hover:opacity-100 transition-opacity">Propiedades</Link>
              <Link to="/contacto" className="hover:opacity-100 transition-opacity">Contacto</Link>
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
