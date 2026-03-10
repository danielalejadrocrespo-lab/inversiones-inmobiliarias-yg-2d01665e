import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ContactForm } from '@/components/ContactForm';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Contacto</h1>
          <p className="text-muted-foreground mb-8">Estamos aquí para ayudarte a encontrar tu propiedad ideal.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold">Teléfono</p>
                  <p className="text-muted-foreground">+52 (55) 1234-5678</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-muted-foreground">info@inmovista.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold">Dirección</p>
                  <p className="text-muted-foreground">Av. Reforma 123, CDMX</p>
                </div>
              </div>

              <a href="https://wa.me/5215512345678" target="_blank" rel="noopener noreferrer">
                <Button className="bg-success text-success-foreground hover:bg-success/90 w-full" size="lg">
                  <MessageCircle className="h-5 w-5 mr-2" /> Contactar por WhatsApp
                </Button>
              </a>
            </div>

            <ContactForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
