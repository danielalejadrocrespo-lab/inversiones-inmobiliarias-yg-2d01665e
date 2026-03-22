import { Phone, Mail, MapPin, MessageCircle, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function ContactPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="text-accent font-body font-semibold text-sm uppercase tracking-widest">Hablemos</span>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground mt-2 mb-2">Contacto</h1>
          <p className="text-muted-foreground font-body text-lg mb-8">¿Tienes preguntas? Estamos aquí para ayudarte.</p>
        </motion.div>

        <div className="bg-card border border-border/50 rounded-2xl p-8 md:p-10 space-y-6 shadow-card">
          {[
            {
              icon: Phone,
              title: 'Teléfono',
              content: (
                <div className="space-y-1">
                  <a href="tel:+584167405367" className="text-muted-foreground text-sm hover:text-accent transition-colors font-body block">+58 416-7405367</a>
                  <a href="tel:+584121472995" className="text-muted-foreground text-sm hover:text-accent transition-colors font-body block">+58 412-1472995</a>
                </div>
              ),
            },
            {
              icon: Mail,
              title: 'Email',
              content: (
                <a href="mailto:yuranci1212@gmail.com" className="text-muted-foreground text-sm hover:text-accent transition-colors font-body">yuranci1212@gmail.com</a>
              ),
            },
            {
              icon: Instagram,
              title: 'Instagram',
              content: (
                <a href="https://www.instagram.com/inmobiliaria_yg?igsh=dWs3ZTBwY2k4emcz" target="_blank" rel="noopener noreferrer" className="text-muted-foreground text-sm hover:text-accent transition-colors font-body">@inmobiliaria_yg</a>
              ),
            },
            {
              icon: MapPin,
              title: 'Ubicación',
              content: <p className="text-muted-foreground text-sm font-body">Venezuela</p>,
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-warm flex items-center justify-center flex-shrink-0">
                <item.icon className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground mb-1">{item.title}</h3>
                {item.content}
              </div>
            </motion.div>
          ))}

          <motion.div custom={4} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <a href="https://wa.me/584167405367" target="_blank" rel="noopener noreferrer" className="block mt-4">
              <button className="w-full bg-success text-success-foreground py-4 rounded-xl font-body font-bold text-base hover:shadow-lg hover:shadow-success/20 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
                <MessageCircle size={20} /> Escríbenos por WhatsApp
              </button>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
