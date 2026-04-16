import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { BookingForm } from '@/components/BookingForm'
import { Bed, Users, Maximize, Wifi, Wind, Coffee, Sparkles, Check } from 'lucide-react'

interface RoomPageProps {
  params: { id: string }
}

async function getRoom(id: string) {
  const room = await prisma.room.findUnique({
    where: { id },
    include: {
      bookings: {
        where: {
          status: { in: ['confirmed', 'pending'] },
        },
        select: {
          checkIn: true,
          checkOut: true,
        },
      },
    },
  })
  return room
}

export default async function RoomPage({ params }: RoomPageProps) {
  const room = await getRoom(params.id)

  if (!room) {
    notFound()
  }

  const unavailableDates = room.bookings.flatMap(booking => {
    const dates = []
    let current = new Date(booking.checkIn)
    const end = new Date(booking.checkOut)
    while (current < end) {
      dates.push(current.toISOString().split('T')[0])
      current.setDate(current.getDate() + 1)
    }
    return dates
  })

  const allAmenities = [
    { icon: Wifi, text: 'High-Speed WiFi' },
    { icon: Wind, text: 'Climate Control' },
    { icon: Coffee, text: 'Coffee Maker' },
    { icon: Sparkles, text: 'Daily Housekeeping' },
    ...room.amenities.split(',').map(a => ({ icon: Check, text: a.trim() })),
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px]">
        <Image
          src={room.imageUrl}
          alt={room.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container-custom pb-16">
          <span className="text-accent uppercase tracking-wider text-sm font-semibold mb-2 block">
            Starting from ${room.price}/night
          </span>
          <h1 className="font-heading text-5xl md:text-6xl text-white">{room.name}</h1>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="font-heading text-3xl text-primary mb-6">Room Overview</h2>
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                {room.description}
              </p>

              <div className="grid grid-cols-3 gap-6 mb-10 p-6 bg-white rounded-lg shadow">
                <div className="text-center">
                  <Bed className="w-8 h-8 text-accent mx-auto mb-2" />
                  <p className="font-semibold text-primary">{room.bedType}</p>
                </div>
                <div className="text-center">
                  <Users className="w-8 h-8 text-accent mx-auto mb-2" />
                  <p className="font-semibold text-primary">{room.maxGuests} Guests</p>
                </div>
                <div className="text-center">
                  <Maximize className="w-8 h-8 text-accent mx-auto mb-2" />
                  <p className="font-semibold text-primary">{room.size}</p>
                </div>
              </div>

              <h3 className="font-heading text-2xl text-primary mb-6">Amenities</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {allAmenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                    <amenity.icon className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-gray-700">{amenity.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:sticky lg:top-24 h-fit">
              <BookingForm 
                room={room} 
                unavailableDates={unavailableDates}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
