import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, ArrowUpRight } from 'lucide-react';
import logo from '@/assets/logo.jpeg';

export function Footer() {
  return (
    <footer className="relative bg-primary text-primary-foreground overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src={logo} alt="Inversiones Inmobiliaria YG" className="h-16 w-16 rounded-xl ring-2 ring-primary-foreground/20" />
              <div>
                <span className="font-heading font-bold text-lg block">Inversiones Inmobiliaria</span>
                <span className="text-accent font-heading font-semibold text-sm">YG</span>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/60 leading-relaxed max-w-xs">
              Tu aliado de confianza en inversiones inmobiliarias. Encontramos la propiedad perfecta para ti.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-5 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-accent rounded-full" />
              Contacto
            </h4>
            <div className="flex flex-col gap-4 text-sm">
              <a href="tel:+584167405367" className="flex items-center gap-3 text-primary-foreground/60 hover:text-accent transition-colors group">
                <div className="w-9 h-9 rounded-lg bg-primary-foreground/5 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                +58 416-7405367
              </a>
              <a href="tel:+584121472995" className="flex items-center gap-3 text-primary-foreground/60 hover:text-accent transition-colors group">
                <div className="w-9 h-9 rounded-lg bg-primary-foreground/5 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                +58 412-1472995
              </a>
              <a href="mailto:yuranci1212@gmail.com" className="flex items-center gap-3 text-primary-foreground/60 hover:text-accent transition-colors group">
                <div className="w-9 h-9 rounded-lg bg-primary-foreground/5 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                yuranci1212@gmail.com
              </a>
              <a href="https://www.instagram.com/inmobiliaria_yg?igsh=dWs3ZTBwY2k4emcz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-primary-foreground/60 hover:text-accent transition-colors group">
                <div className="w-9 h-9 rounded-lg bg-primary-foreground/5 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Instagram className="h-4 w-4" />
                </div>
                @inmobiliaria_yg
              </a>
              <p className="flex items-center gap-3 text-primary-foreground/60">
                <div className="w-9 h-9 rounded-lg bg-primary-foreground/5 flex items-center justify-center">
                  <MapPin className="h-4 w-4" />
                </div>
                Venezuela
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-5 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-accent rounded-full" />
              Enlaces
            </h4>
            <div className="flex flex-col gap-3 text-sm">
              {[
                { to: '/', label: 'Inicio' },
                { to: '/propiedades', label: 'Propiedades' },
                { to: '/contacto', label: 'Contacto' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-primary-foreground/60 hover:text-accent transition-colors flex items-center gap-1 group"
                >
                  {link.label}
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/40">
          © {new Date().getFullYear()} Inversiones Inmobiliaria YG. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
