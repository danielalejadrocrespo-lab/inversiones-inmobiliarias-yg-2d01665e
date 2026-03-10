import { useState } from 'react';
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
  const location = useLocation();
  const { isAdmin } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Inversiones Inmobiliaria YG" className="h-12 w-auto" />
          <span className="font-heading font-bold text-lg text-primary hidden sm:block">
            Inversiones Inmobiliaria YG
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`font-heading font-medium text-sm tracking-wide transition-colors hover:text-accent ${
                location.pathname === link.href ? 'text-accent' : 'text-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              to="/admin"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-heading font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Admin
            </Link>
          )}
        </nav>

        {/* Mobile toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <nav className="md:hidden bg-card border-t px-4 pb-4 space-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className={`block font-heading font-medium text-sm py-2 transition-colors hover:text-accent ${
                location.pathname === link.href ? 'text-accent' : 'text-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to={isAdmin ? '/admin' : '/admin/login'}
            onClick={() => setIsOpen(false)}
            className="block bg-primary text-primary-foreground px-4 py-2 rounded-md font-heading font-semibold text-sm text-center"
          >
            Admin
          </Link>
        </nav>
      )}
    </header>
  );
}
