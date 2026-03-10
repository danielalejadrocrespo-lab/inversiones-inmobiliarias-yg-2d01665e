import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-1">Contacto</h1>
          <p className="text-muted-foreground mb-8">¿Tienes preguntas? Estamos aquí para ayudarte.</p>

          <div className="bg-card border rounded-lg p-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Phone className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="font-semibold">Teléfono</p>
                <a href="tel:+584167405367" className="text-muted-foreground hover:text-primary transition-colors">+58 416-7405367</a>
                <br />
                <a href="tel:+584121472995" className="text-muted-foreground hover:text-primary transition-colors">+58 412-1472995</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Mail className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-muted-foreground">info@inmobiliariayg.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="font-semibold">Ubicación</p>
                <p className="text-muted-foreground">Venezuela</p>
              </div>
            </div>

            <a href="https://wa.me/584167405367" target="_blank" rel="noopener noreferrer" className="block">
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg">
                <MessageCircle className="h-5 w-5 mr-2" /> Escríbenos por WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
