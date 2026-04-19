import Image from 'next/image'
import { notFound } from 'next/navigation'
import { BookingForm } from '@/components/BookingForm'
import { Bed, Users, Maximize, Wifi, Wind, Coffee, Sparkles, Check } from 'lucide-react'

const allRooms = [
  { id: '1', name: 'Classic 101', description: 'Comfortable room with modern amenities and cozy atmosphere.', price: 179, size: '22 m²', maxGuests: 2, bedType: '1 Queen Bed', amenities: 'WiFi, Air Conditioning, Flat-screen TV, Mini Fridge, Room Service', imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80' },
  { id: '2', name: 'Classic 102', description: 'Elegant space with refined furnishings and city views.', price: 189, size: '22 m²', maxGuests: 2, bedType: '1 Queen Bed', amenities: 'WiFi, Air Conditioning, Smart TV, Mini Bar, Coffee Machine', imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80' },
  { id: '3', name: 'Classic 103', description: 'Spacious accommodation with comfortable bed and workspace.', price: 189, size: '22 m²', maxGuests: 2, bedType: '1 Queen Bed', amenities: 'WiFi, Air Conditioning, Flat-screen TV, Work Desk', imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80' },
  { id: '4', name: 'Classic 104', description: 'Cozy retreat with premium bedding and modern amenities.', price: 199, size: '22 m²', maxGuests: 2, bedType: '1 Queen Bed', amenities: 'WiFi, Air Conditioning, Smart TV, Mini Fridge', imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80' },
  { id: '5', name: 'Deluxe 201', description: 'Elegant comfort with city views and premium amenities.', price: 229, size: '28 m²', maxGuests: 2, bedType: '1 King Bed', amenities: 'City View, WiFi, Air Conditioning, Mini Bar, Room Service', imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80' },
  { id: '6', name: 'Deluxe 202', description: 'Modern luxury with panoramic windows and plush bedding.', price: 239, size: '28 m²', maxGuests: 2, bedType: '1 King Bed', amenities: 'City View, WiFi, Air Conditioning, Smart TV, Premium Linens', imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&q=80' },
  { id: '7', name: 'Deluxe 203', description: 'Sophisticated space featuring contemporary design.', price: 239, size: '28 m²', maxGuests: 2, bedType: '1 King Bed', amenities: 'Garden View, WiFi, Air Conditioning, Nespresso Machine', imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=80' },
  { id: '8', name: 'Deluxe Twin 204', description: 'Perfect for friends with two double beds.', price: 249, size: '30 m²', maxGuests: 3, bedType: '2 Double Beds', amenities: 'City View, WiFi, Air Conditioning, Mini Bar, Safe', imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80' },
  { id: '9', name: 'Superior 301', description: 'Enhanced comfort with separate seating area.', price: 279, size: '32 m²', maxGuests: 2, bedType: '1 King Bed', amenities: 'City View, WiFi, Air Conditioning, Smart TV, Work Desk', imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80' },
  { id: '10', name: 'Superior 302', description: 'Luxurious retreat with premium amenities.', price: 289, size: '32 m²', maxGuests: 2, bedType: '1 King Bed', amenities: 'Panoramic View, WiFi, Air Conditioning, Living Area', imageUrl: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=1200&q=80' },
  { id: '11', name: 'Superior 303', description: 'Contemporary elegance with stunning city views.', price: 289, size: '32 m²', maxGuests: 2, bedType: '1 King Bed', amenities: 'River View, WiFi, Air Conditioning, Fireplace, Jacuzzi', imageUrl: 'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=1200&q=80' },
  { id: '12', name: 'Superior Double 304', description: 'Spacious room perfect for families.', price: 299, size: '35 m²', maxGuests: 4, bedType: '2 Queen Beds', amenities: 'City View, WiFi, Air Conditioning, Mini Fridge, Rain Shower', imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80' },
  { id: '13', name: 'Junior Suite 401', description: 'A perfect blend of luxury with cozy sitting area.', price: 329, size: '38 m²', maxGuests: 2, bedType: '1 King Bed', amenities: 'Garden View, WiFi, Air Conditioning, Sitting Area, Bluetooth Speaker', imageUrl: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=1200&q=80' },
  { id: '14', name: 'Junior Suite 402', description: 'Spacious suite with separate living space.', price: 339, size: '38 m²', maxGuests: 2, bedType: '1 King Bed', amenities: 'Panoramic View, WiFi, Air Conditioning, Living Room, Kitchenette', imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80' },
  { id: '15', name: 'Junior Suite Twin 403', description: 'Family-friendly suite with two queen beds.', price: 349, size: '42 m²', maxGuests: 4, bedType: '2 Queen Beds', amenities: 'City View, WiFi, Air Conditioning, Living Area, Kitchenette', imageUrl: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1200&q=80' },
  { id: '16', name: 'Executive Suite 501', description: 'Premium suite with panoramic views.', price: 399, size: '45 m²', maxGuests: 2, bedType: '1 King Bed', amenities: 'Panoramic View, WiFi, Air Conditioning, Living Room, Nespresso', imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80' },
  { id: '17', name: 'Executive Suite 502', description: 'Luxurious space for extended stays.', price: 409, size: '45 m²', maxGuests: 2, bedType: '1 King Bed', amenities: 'Skyline View, WiFi, Air Conditioning, Home Theater, Wine Cooler', imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80' },
  { id: '18', name: 'Executive Suite Plus 503', description: 'Extra space with sofa bed for additional guests.', price: 449, size: '55 m²', maxGuests: 3, bedType: '1 King + Sofa', amenities: 'River View, WiFi, Air Conditioning, Kitchenette, Washer', imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80' },
  { id: '19', name: 'Premium Suite 601', description: 'Ultimate luxury with exclusive amenities.', price: 549, size: '65 m²', maxGuests: 3, bedType: '1 King + Sofa Bed', amenities: 'Lounge Access, WiFi, Air Conditioning, Butler Service, Jacuzzi', imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80' },
  { id: '20', name: 'Premium Suite 602', description: 'Spacious luxury with private balcony.', price: 559, size: '65 m²', maxGuests: 3, bedType: '1 King + Sofa Bed', amenities: 'Private Balcony, WiFi, Air Conditioning, Butler Service, Wine Cooler', imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80' },
  { id: '21', name: 'Premium Suite Double 603', description: 'Two bedrooms for ultimate comfort.', price: 599, size: '75 m²', maxGuests: 4, bedType: '2 King Beds', amenities: 'Lounge Access, WiFi, Air Conditioning, Private Bar, Butler Service', imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80' },
  { id: '22', name: 'Family Suite 701', description: 'Spacious two-bedroom suite for families.', price: 459, size: '75 m²', maxGuests: 6, bedType: '2 King + 2 Twin', amenities: '2 Bedrooms, WiFi, Air Conditioning, Gaming Console, Kitchenette', imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80' },
  { id: '23', name: 'Honeymoon Suite 801', description: 'Romantic getaway with mood lighting.', price: 599, size: '50 m²', maxGuests: 2, bedType: '1 King Bed', amenities: 'Romantic Decor, WiFi, Air Conditioning, Jacuzzi, Champagne Service', imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&q=80' },
  { id: '24', name: 'Business Suite 802', description: 'Executive accommodation with boardroom.', price: 379, size: '40 m²', maxGuests: 2, bedType: '1 King Bed', amenities: 'Business Center Access, WiFi, Air Conditioning, Conference Table', imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80' },
  { id: '25', name: 'Wellness Suite 803', description: 'Wellness-focused with spa amenities.', price: 699, size: '60 m²', maxGuests: 2, bedType: '1 King Bed', amenities: 'Steam Room, WiFi, Air Conditioning, Massage Chair, Yoga Kit', imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80' },
  { id: '26', name: 'Penthouse Suite 901', description: 'Spectacular 360° views of Montreal.', price: 899, size: '120 m²', maxGuests: 4, bedType: '2 King Beds', amenities: '360° City Views, Private Terrace, WiFi, Personal Butler, Private Bar', imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&q=80' },
  { id: '27', name: 'Presidential Suite 902', description: 'Unparalleled luxury for VIP guests.', price: 1299, size: '200 m²', maxGuests: 6, bedType: '3 King Beds', amenities: '360° Views, Private Elevator, WiFi, Chef Kitchen, Steinway Piano', imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80' },
  { id: '28', name: 'Royal Suite 903', description: 'The crown jewel of Monville Hotel.', price: 1599, size: '250 m²', maxGuests: 8, bedType: '4 King Beds', amenities: 'Grand Piano, Private Elevator, WiFi, In-Room Dining, Spa Access', imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80' },
]

interface RoomPageProps {
  params: { id: string }
}

function getRoom(id: string) {
  return allRooms.find(room => room.id === id)
}

export default function RoomPage({ params }: RoomPageProps) {
  const room = getRoom(params.id)

  if (!room) {
    notFound()
  }

  const unavailableDates: string[] = []

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
