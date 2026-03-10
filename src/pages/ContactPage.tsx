import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="font-heading font-bold text-3xl text-foreground mb-2">Contacto</h1>
        <p className="text-muted-foreground mb-8">¿Tienes preguntas? Estamos aquí para ayudarte.</p>

        <div className="bg-card border rounded-xl p-8 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Phone className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground">Teléfono</h3>
              <a href="tel:+584167405367" className="text-muted-foreground text-sm hover:text-primary transition-colors">+58 416-7405367</a>
              <br />
              <a href="tel:+584121472995" className="text-muted-foreground text-sm hover:text-primary transition-colors">+58 412-1472995</a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Mail className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground">Email</h3>
              <p className="text-muted-foreground text-sm">info@inmobiliariayg.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground">Ubicación</h3>
              <p className="text-muted-foreground text-sm">Venezuela</p>
            </div>
          </div>

          <a href="https://wa.me/584167405367" target="_blank" rel="noopener noreferrer" className="block">
            <button className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-heading font-bold text-base hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              <MessageCircle size={20} /> Escríbenos por WhatsApp
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
