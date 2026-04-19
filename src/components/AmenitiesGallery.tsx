'use client'

import Image from 'next/image'

const amenityImages = [
  {
    src: 'https://images.unsplash.com/photo-1575425186775-b8de9a427e67?w=800&q=80',
    name: 'Indoor Pool',
    description: 'Heated swimming pool with jacuzzi'
  },
  {
    src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    name: 'Fitness Center',
    description: '24/7 state-of-the-art gym'
  },
  {
    src: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80',
    name: 'Spa & Wellness',
    description: 'Full-service spa treatments'
  },
  {
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    name: 'Fine Dining',
    description: 'Award-winning restaurant'
  },
  {
    src: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80',
    name: 'Rooftop Bar',
    description: 'Panoramic city views'
  },
  {
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    name: 'Business Center',
    description: 'Fully equipped workspaces'
  },
]

export function AmenitiesGallery() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <p className="text-accent uppercase tracking-wider text-sm font-semibold mb-4">Our Facilities</p>
          <h2 className="font-heading text-4xl md:text-5xl text-primary mb-4">Hotel Amenities</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {amenityImages.map((amenity, i) => (
            <div
              key={i}
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <Image
                src={amenity.src}
                alt={amenity.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-heading text-white text-xl">{amenity.name}</h3>
                <p className="text-white/80 text-sm">{amenity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
