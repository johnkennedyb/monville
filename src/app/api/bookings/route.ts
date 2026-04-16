import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { roomId, checkIn, checkOut, guests, guestName, guestEmail, guestPhone, specialRequests, totalPrice } = body

    const booking = await prisma.booking.create({
      data: {
        roomId,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        guests,
        guestName,
        guestEmail,
        guestPhone,
        specialRequests,
        totalPrice,
        status: 'pending',
        paymentStatus: 'pending',
      },
    })

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: { room: true },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(bookings)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}
