import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import logo from '@/assets/logo.jpeg';

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/propiedades', label: 'Propiedades' },
  { href: '/contacto', label: 'Contacto' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAdmin } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-card/95 backdrop-blur-xl shadow-lg border-b border-border/50'
          : 'bg-card/80 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-18">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <img
              src={logo}
              alt="Inversiones Inmobiliaria YG"
              className="h-14 w-14 rounded-xl object-cover ring-2 ring-accent/20 group-hover:ring-accent/50 transition-all duration-300"
            />
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-warm opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </div>
          <div className="hidden sm:block">
            <span className="font-heading font-bold text-lg text-foreground leading-tight block">
              Inversiones Inmobiliaria
            </span>
            <span className="text-accent font-heading font-semibold text-sm">YG</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`relative px-4 py-2 rounded-lg font-body font-semibold text-sm tracking-wide transition-all duration-200 ${
                location.pathname === link.href
                  ? 'text-accent bg-accent/10'
                  : 'text-foreground hover:text-accent hover:bg-accent/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              to="/admin"
              className="ml-2 bg-gradient-warm text-accent-foreground px-5 py-2.5 rounded-lg font-body font-bold text-sm hover:shadow-lg hover:shadow-accent/20 transition-all duration-300"
            >
              Admin
            </Link>
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground p-2 rounded-lg hover:bg-muted transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <nav className="md:hidden glass border-t border-border/50 px-4 pb-4 pt-2 space-y-1 animate-fade-in">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-lg font-body font-semibold text-sm transition-all ${
                location.pathname === link.href
                  ? 'text-accent bg-accent/10'
                  : 'text-foreground hover:text-accent hover:bg-accent/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="block bg-gradient-warm text-accent-foreground px-4 py-3 rounded-lg font-body font-bold text-sm text-center mt-2"
            >
              Admin
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
