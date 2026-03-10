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
          <p className="text-muted-foreground mb-8">Contáctame y da el siguiente paso con confianza.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="font-semibold">Teléfonos</p>
                  <p className="text-muted-foreground">+58 416-7405367</p>
                  <p className="text-muted-foreground">+58 412-1472995</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-muted-foreground">info@inversionesyg.com</p>
                </div>
              </div>

              <div className="bg-card border rounded-lg p-6 space-y-3">
                <p className="font-heading font-semibold text-lg">Asesor Inmobiliario</p>
                <p className="text-foreground font-medium">Yuranci Garcia</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ Asesoría inmobiliaria personalizada</li>
                  <li>✓ Publicidad efectiva</li>
                  <li>✓ Gestión y revisión de documentación</li>
                  <li>✓ Bienes raíces con respaldo legal</li>
                </ul>
              </div>

              <a href="https://wa.me/584167405367" target="_blank" rel="noopener noreferrer">
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
