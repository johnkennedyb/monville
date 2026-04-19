import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, Award, Clock, MapPin } from 'lucide-react'
import { AmenitiesGallery } from '@/components/AmenitiesGallery'
import { HotelTeam } from '@/components/HotelTeam'

const featuredRooms = [
  { id: 1, name: 'Deluxe 201', description: 'Elegant comfort with city views and premium amenities. Perfect for business travelers or couples seeking a luxurious retreat.', price: 229, size: '28 m²', maxGuests: 2, bedType: '1 King Bed', amenities: 'City View, WiFi, Air Conditioning, Mini Bar, Room Service', imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80' },
  { id: 2, name: 'Executive Suite 501', description: 'Spacious suite with separate living area and panoramic views. Ideal for extended stays or guests who desire extra space.', price: 399, size: '45 m²', maxGuests: 2, bedType: '1 King Bed', amenities: 'Panoramic View, WiFi, Air Conditioning, Living Room, Nespresso', imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80' },
  { id: 3, name: 'Premium Suite 601', description: 'Ultimate luxury with premium finishes and exclusive lounge access. Experience the finest accommodations Montreal has to offer.', price: 549, size: '65 m²', maxGuests: 3, bedType: '1 King + Sofa Bed', amenities: 'Lounge Access, WiFi, Air Conditioning, Butler Service, Jacuzzi', imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80' },
]

export default function HomePage() {
  const rooms = featuredRooms

  return (
    <>
      {/* Hero */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3"
          alt="Monville Hotel"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 max-w-4xl mx-auto px-4">
          <p className="text-sm uppercase tracking-[4px] text-accent mb-4">Welcome to</p>
          <h1 className="font-heading text-6xl md:text-8xl font-semibold mb-6 tracking-wider">
            Monville Hotel
          </h1>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-16 h-px bg-accent" />
            <p className="text-lg uppercase tracking-wider">Montreal, Canada</p>
            <span className="w-16 h-px bg-accent" />
          </div>
          <p className="text-xl mb-10 text-white/90">
            Experience luxury and elegance in the heart of the city
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/rooms" className="btn btn-primary">
              Book Your Stay
            </Link>
            <Link href="/rooms" className="btn btn-secondary">
              Explore Rooms
            </Link>
          </div>
        </div>
        <Link href="#booking" className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <ChevronDown size={32} />
        </Link>
      </section>

      {/* Booking Bar */}
      <section id="booking" className="bg-primary -mt-16 relative z-30 py-8">
        <div className="container-custom">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-xl">
            <form className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 items-end">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                  Check In
                </label>
                <input type="date" className="w-full px-4 py-3 border-2 border-gray-200 rounded focus:border-accent focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                  Check Out
                </label>
                <input type="date" className="w-full px-4 py-3 border-2 border-gray-200 rounded focus:border-accent focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                  Guests
                </label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded focus:border-accent focus:outline-none">
                  {[1, 2, 3, 4].map(n => (
                    <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              <Link href="/rooms" className="btn btn-primary py-3">
                Check Availability
              </Link>
            </form>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-accent mb-4 block">About Us</span>
              <h2 className="font-heading text-4xl md:text-5xl text-primary mb-6">
                A Boutique Hotel Experience in the Heart of Montreal
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Monville Hotel offers a unique blend of contemporary elegance and timeless charm.
                Located in the vibrant heart of Montreal, our boutique hotel provides an intimate
                atmosphere where every detail is crafted for your comfort and enjoyment.
              </p>
              <div className="grid grid-cols-3 gap-8 mt-10">
                {[
                  { icon: Award, title: 'Award Winning', desc: 'Recognized as one of Montreal\'s finest' },
                  { icon: Clock, title: '24/7 Service', desc: 'Round-the-clock concierge' },
                  { icon: MapPin, title: 'Prime Location', desc: 'Steps from Old Montreal' },
                ].map((feature, i) => (
                  <div key={i} className="text-center">
                    <feature.icon className="w-8 h-8 text-accent mx-auto mb-3" />
                    <h4 className="font-semibold text-primary mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-500">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 -right-4 -bottom-4 border-2 border-accent rounded-lg" />
              <Image
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3"
                alt="Hotel Interior"
                width={600}
                height={700}
                className="rounded-lg shadow-xl relative z-10 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Hotel Management Team */}
      <HotelTeam />

      {/* Amenities Gallery */}
      <AmenitiesGallery />

      {/* Featured Rooms */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent mb-4 block">Accommodations</span>
            <h2 className="font-heading text-4xl md:text-5xl text-primary mb-4">Our Rooms & Suites</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each room is designed for ultimate comfort with thoughtful touches throughout
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <div key={room.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group">
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={room.imageUrl}
                    alt={room.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded">
                    <span className="font-heading text-2xl font-semibold text-primary">${room.price}</span>
                    <span className="text-gray-500 text-sm">/ night</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-2xl text-primary mb-2">{room.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{room.description}</p>
                  <div className="flex gap-4 text-sm text-gray-500 mb-4 pb-4 border-b">
                    <span>{room.bedType}</span>
                    <span>{room.maxGuests} Guests</span>
                    <span>{room.size}</span>
                  </div>
                  <Link href={`/rooms/${room.id}`} className="btn btn-primary w-full">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/rooms" className="btn btn-primary px-12">
              View All Rooms
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
