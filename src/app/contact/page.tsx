import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react'

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-primary text-white">
        <div className="container-custom text-center">
          <h1 className="font-heading text-5xl md:text-6xl mb-4">Contact Us</h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            We would love to hear from you. Reach out for reservations, inquiries, or special requests.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Info */}
            <div>
              <h2 className="font-heading text-3xl text-primary mb-8">Get in Touch</h2>

              <div className="space-y-6 mb-12">
                {[
                  { icon: MapPin, title: 'Address', lines: ['Monville hotel Montreal Canada'] },
                  { icon: Phone, title: 'Phone', lines: ['+1 (650) 281-6056 (Call & WhatsApp)'] },
                  { icon: Clock, title: 'Reception', lines: ['Open 24 Hours', 'Concierge Available'] },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-1">{item.title}</h3>
                      {item.lines.map((line, j) => (
                        <p key={j} className="text-gray-600">{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="h-80 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2796.7142361042436!2d-73.5634529234617!3d45.50378427107555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91a5a33d11f6d%3A0x6e61b8e8d5e1c9b0!2s1041%20Rue%20de%20Bleury%2C%20Montr%C3%A9al%2C%20QC%20H2Z%201M7%2C%20Canada!5e0!3m2!1sen!2sus!4v1704067200000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale-[20%]"
                />
              </div>
            </div>

            {/* Contact Actions */}
            <div className="space-y-6">
              <div className="bg-accent/10 border border-accent/30 rounded-lg p-6">
                <h3 className="font-heading text-xl text-primary mb-4">Book Your Stay</h3>
                <p className="text-gray-600 mb-6">
                  Ready to experience Monville? Contact us directly to make your reservation and arrange payment.
                </p>
                <div className="space-y-4">
                  <a
                    href="https://wa.me/16502816056"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-primary">WhatsApp</p>
                      <p className="text-gray-600">+1 (650) 281-6056</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="bg-primary text-white p-6 rounded-lg">
                <h3 className="font-heading text-lg mb-3">Payment Information</h3>
                <p className="text-white/80 text-sm mb-4">
                  For bookings and payments, please contact us directly at:
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-accent" />
                    <span>+1 (650) 281-6056</span>
                  </div>
                  <p className="text-white/60 text-xs mt-4">
                    We accept bank transfers and other payment arrangements. Contact us for details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
