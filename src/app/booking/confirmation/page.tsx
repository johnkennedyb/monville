import { prisma } from '@/lib/db'
import { formatDate, formatCurrency } from '@/lib/utils'
import { CheckCircle } from 'lucide-react'

interface ConfirmationPageProps {
  searchParams: { id?: string }
}

export default async function ConfirmationPage({ searchParams }: ConfirmationPageProps) {
  if (!searchParams.id) {
    return (
      <div className="pt-32 pb-20 text-center">
        <p>Booking ID not found</p>
      </div>
    )
  }

  const booking = await prisma.booking.findUnique({
    where: { id: searchParams.id },
    include: { room: true },
  })

  if (!booking) {
    return (
      <div className="pt-32 pb-20 text-center">
        <p>Booking not found</p>
      </div>
    )
  }

  return (
    <section className="pt-32 pb-20 bg-gray-50 min-h-screen">
      <div className="container-custom max-w-2xl">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          
          <h1 className="font-heading text-3xl text-primary mb-4">Booking Confirmed!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for choosing Monville Hotel. Your reservation has been confirmed.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 text-left mb-8">
            <h2 className="font-heading text-xl text-primary mb-4">Booking Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Booking ID</span>
                <span className="font-mono">{booking.id.slice(0, 8).toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Room</span>
                <span className="font-semibold">{booking.room.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-in</span>
                <span>{formatDate(booking.checkIn)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-out</span>
                <span>{formatDate(booking.checkOut)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Guests</span>
                <span>{booking.guests}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold border-t pt-3">
                <span>Total Paid</span>
                <span className="text-accent">{formatCurrency(booking.totalPrice)}</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            A confirmation email has been sent to {booking.guestEmail}
          </p>

          <a href="/" className="btn btn-primary inline-block">
            Return to Home
          </a>
        </div>
      </div>
    </section>
  )
}
