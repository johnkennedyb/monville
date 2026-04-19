'use client'

import { Room } from '@prisma/client'
import { formatCurrency } from '@/lib/utils'
import { Phone, MessageCircle, Mail } from 'lucide-react'

interface BookingFormProps {
  room: Room
  unavailableDates: string[]
}

export function BookingForm({ room }: BookingFormProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-xl">
      <h3 className="font-heading text-2xl text-primary mb-4">{room.name}</h3>

      <div className="mb-6">
        <p className="text-gray-600 text-sm mb-2">{room.size} • {room.bedType} • Max {room.maxGuests} guests</p>
        <p className="text-3xl font-heading font-semibold text-primary">{formatCurrency(room.price)}<span className="text-sm font-normal text-gray-500"> / night</span></p>
      </div>

      <div className="bg-accent/10 border border-accent/30 rounded-lg p-5 mb-4">
        <p className="text-primary font-heading text-lg mb-3">Book This Room</p>
        <p className="text-sm text-gray-600 mb-4">
          To book this room, please contact us directly:
        </p>

        <div className="space-y-3">
          <a
            href="tel:+16502816056"
            className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
              <Phone size={20} className="text-primary" />
            </div>
            <div>
              <p className="font-semibold text-primary text-sm">Call Us</p>
              <p className="text-gray-600 text-sm">+1 (650) 281-6056</p>
            </div>
          </a>

          <a
            href="https://wa.me/16502816056"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <MessageCircle size={20} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-primary text-sm">WhatsApp</p>
              <p className="text-gray-600 text-sm">+1 (650) 281-6056</p>
            </div>
          </a>

          <a
            href="mailto:reservations@monville.com"
            className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <Mail size={20} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-primary text-sm">Email</p>
              <p className="text-gray-600 text-sm">reservations@monville.com</p>
            </div>
          </a>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        Reference: {room.name} @ {formatCurrency(room.price)}/night
      </p>
    </div>
  )
}
