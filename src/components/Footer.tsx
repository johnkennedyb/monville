'use client'

import Link from 'next/link'
import { Facebook, Instagram, Twitter, Linkedin, ArrowUp, MapPin, Phone, Mail } from 'lucide-react'

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="bg-primary text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link href="/" className="flex flex-col mb-6">
              <span className="font-heading text-3xl font-semibold text-accent tracking-wider">Monville</span>
              <span className="text-[11px] uppercase tracking-[3px] text-white/60">Hotel Montreal</span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Experience the perfect blend of contemporary luxury and timeless elegance in the heart of Montreal.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-accent hover:border-accent hover:text-primary transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Rooms', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  <Link href={`/${link.toLowerCase()}`} className="text-white/70 hover:text-accent transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/70 text-sm break-words">
                <MapPin size={18} className="text-accent flex-shrink-0 mt-0.5" />
                <span className="break-words">1041 Rue de Bleury, Montreal, QC H2Z 1M7</span>
              </li>
              <li className="flex items-center gap-3 text-white/70 text-sm break-all">
                <Phone size={18} className="text-accent flex-shrink-0" />
                <span>+1 (514) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-white/70 text-sm break-all">
                <Mail size={18} className="text-accent flex-shrink-0" />
                <span>info@monville.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Newsletter</h4>
            <p className="text-white/70 text-sm mb-4">Subscribe for exclusive offers and updates</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-accent min-w-0"
              />
              <button type="submit" className="btn btn-primary py-3 px-4 whitespace-nowrap">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12 pt-8 border-t border-white/10">
          <p className="text-white/50 text-sm text-center sm:text-left">© 2024 Monville Hotel. All rights reserved.</p>
          <button onClick={scrollToTop} className="w-11 h-11 bg-accent text-primary rounded-full flex items-center justify-center hover:bg-accent-light transition-all flex-shrink-0">
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  )
}
