import { MapPin, Phone, Mail, Clock } from 'lucide-react'

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
                  { icon: MapPin, title: 'Address', lines: ['1041 Rue de Bleury', 'Montreal, QC H2Z 1M7', 'Canada'] },
                  { icon: Phone, title: 'Phone', lines: ['+1 (514) 123-4567', '+1 (514) 123-4568'] },
                  { icon: Mail, title: 'Email', lines: ['reservations@monville.com', 'info@monville.com'] },
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

            {/* Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="font-heading text-2xl text-primary mb-6">Send a Message</h2>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded focus:border-accent focus:outline-none"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded focus:border-accent focus:outline-none"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded focus:border-accent focus:outline-none"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded focus:border-accent focus:outline-none"
                    placeholder="+1 (514) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Subject</label>
                  <select className="w-full px-4 py-3 border-2 border-gray-200 rounded focus:border-accent focus:outline-none">
                    <option>General Inquiry</option>
                    <option>Reservation Request</option>
                    <option>Special Event</option>
                    <option>Feedback</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded focus:border-accent focus:outline-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-full py-4">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
