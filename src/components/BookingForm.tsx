'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { Room } from '@prisma/client'
import { formatCurrency } from '@/lib/utils'
import { differenceInDays } from 'date-fns'

interface BookingFormProps {
  room: Room
  unavailableDates: string[]
}

export function BookingForm({ room, unavailableDates }: BookingFormProps) {
  const router = useRouter()
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [guestPhone, setGuestPhone] = useState('')
  const [specialRequests, setSpecialRequests] = useState('')
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const nights = checkIn && checkOut ? differenceInDays(new Date(checkOut), new Date(checkIn)) : 0
  const totalPrice = nights * room.price

  const handleCreateBooking = async () => {
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId: room.id,
          checkIn,
          checkOut,
          guests,
          guestName,
          guestEmail,
          guestPhone,
          specialRequests,
          totalPrice,
        }),
      })

      if (!res.ok) throw new Error('Failed to create booking')

      return await res.json()
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setLoading(false)
      throw err
    }
  }

  const handleApprove = async (data: any, actions: any) => {
    try {
      const order = await actions.order.capture()

      const booking = await handleCreateBooking()

      await fetch('/api/bookings/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: booking.id,
          paymentId: order.id,
        }),
      })

      router.push(`/booking/confirmation?id=${booking.id}`)
    } catch (err) {
      setError('Payment failed. Please try again.')
      setLoading(false)
    }
  }

  const isUnavailable = (date: string) => unavailableDates.includes(date)

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl">
      <h3 className="font-heading text-2xl text-primary mb-6">Book This Room</h3>

      {step === 1 && (
        <>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Check In</label>
              <input
                type="date"
                value={checkIn}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded focus:border-accent focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Check Out</label>
              <input
                type="date"
                value={checkOut}
                min={checkIn || new Date().toISOString().split('T')[0]}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded focus:border-accent focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Guests</label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded focus:border-accent focus:outline-none"
              >
                {[...Array(room.maxGuests)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1} Guest{i > 0 ? 's' : ''}</option>
                ))}
              </select>
            </div>
          </div>

          {nights > 0 && (
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">{nights} night{nights > 1 ? 's' : ''} x {formatCurrency(room.price)}</span>
                <span className="font-semibold">{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-lg font-heading font-semibold text-primary">
                <span>Total</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
            </div>
          )}

          <button
            onClick={() => setStep(2)}
            disabled={!checkIn || !checkOut || nights <= 0}
            className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                required
                className="w-full px-4 py-2 border-2 border-gray-200 rounded focus:border-accent focus:outline-none"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border-2 border-gray-200 rounded focus:border-accent focus:outline-none"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Phone *</label>
              <input
                type="tel"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                required
                className="w-full px-4 py-2 border-2 border-gray-200 rounded focus:border-accent focus:outline-none"
                placeholder="+1 (514) 123-4567"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Special Requests</label>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded focus:border-accent focus:outline-none"
                placeholder="Any special requests or preferences..."
              />
            </div>
          </div>

          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between text-lg font-heading font-semibold text-primary">
              <span>Total to Pay</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
          </div>

          <PayPalButtons
            createOrder={(_, actions) => {
              return actions.order.create({
                intent: 'CAPTURE',
                purchase_units: [
                  {
                    amount: {
                      value: totalPrice.toString(),
                      currency_code: 'CAD',
                    },
                    description: `Booking: ${room.name} - ${nights} night(s)`,
                  },
                ],
              })
            }}
            onApprove={handleApprove}
            onError={() => setError('Payment failed. Please try again.')}
          />

          <button
            onClick={() => setStep(1)}
            className="w-full mt-4 text-gray-500 hover:text-primary text-sm"
          >
            ← Back to dates
          </button>
        </>
      )}

      {error && (
        <p className="text-red-500 text-sm mt-4">{error}</p>
      )}

      {loading && (
        <div className="mt-4 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full mx-auto" />
          <p className="text-sm text-gray-600 mt-2">Processing your booking...</p>
        </div>
      )}
    </div>
  )
}
