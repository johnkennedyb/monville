'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Phone } from 'lucide-react'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Rooms', href: '/rooms' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg py-3' : 'bg-transparent py-5'
      }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex flex-col">
            <span className={`font-heading text-2xl font-semibold tracking-wider ${isScrolled ? 'text-accent' : 'text-accent'
              }`}>Monville</span>
            <span className={`text-[10px] uppercase tracking-[3px] ${isScrolled ? 'text-gray-500' : 'text-white/80'
              }`}>Hotel Montreal</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium uppercase tracking-wider transition-colors hover:text-accent ${isScrolled ? 'text-gray-800' : 'text-white'
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <span className={`flex items-center gap-2 text-sm ${isScrolled ? 'text-gray-800' : 'text-white'
              }`}>
              <Phone size={16} />
              +1 (650) 281-6056
            </span>
            <Link href="/rooms" className="btn btn-primary text-sm py-2 px-6">
              Book Now
            </Link>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} className={isScrolled ? 'text-gray-800' : 'text-white'} /> : <Menu size={24} className={isScrolled ? 'text-gray-800' : 'text-white'} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-6 py-3 text-gray-800 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/rooms" className="block mx-6 mt-4 btn btn-primary text-center">
              Book Now
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
