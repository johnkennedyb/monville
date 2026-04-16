import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { Bed, Users, Maximize } from 'lucide-react'

export const dynamic = 'force-dynamic'

async function getAllRooms() {
  try {
    return await prisma.room.findMany({
      where: { isAvailable: true },
    })
  } catch {
    return []
  }
}

export default async function RoomsPage() {
  const rooms = await getAllRooms()

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 bg-primary text-white">
        <div className="container-custom text-center">
          <h1 className="font-heading text-5xl md:text-6xl mb-4">Our Rooms & Suites</h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Discover our collection of elegantly appointed rooms and suites, each designed to provide the ultimate in comfort and style.
          </p>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <div key={room.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 group">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={room.imageUrl}
                    alt={room.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-end justify-between">
                      <div>
                        <span className="text-accent font-heading text-3xl font-bold">${room.price}</span>
                        <span className="text-white/80 text-sm"> / night</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-2xl text-primary mb-3">{room.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{room.description}</p>

                  <div className="flex gap-6 text-sm text-gray-500 mb-4 pb-4 border-b">
                    <span className="flex items-center gap-2">
                      <Bed size={16} className="text-accent" />
                      {room.bedType}
                    </span>
                    <span className="flex items-center gap-2">
                      <Users size={16} className="text-accent" />
                      {room.maxGuests} Guests
                    </span>
                    <span className="flex items-center gap-2">
                      <Maximize size={16} className="text-accent" />
                      {room.size}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {room.amenities.split(',').slice(0, 4).map((amenity, i) => (
                      <span key={i} className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                        {amenity.trim()}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/rooms/${room.id}`}
                    className="btn btn-primary w-full"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
