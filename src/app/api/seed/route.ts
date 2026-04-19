import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10)
    await prisma.user.upsert({
      where: { email: 'admin@monville.com' },
      update: {},
      create: {
        email: 'admin@monville.com',
        name: 'Admin',
        password: adminPassword,
        role: 'admin',
      },
    })

    // Room images
    const roomImages = [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&q=80',
    ]

    const roomTypes = [
      { prefix: 'Classic', basePrice: 179, size: '22 m²', beds: '1 Queen Bed', guests: 2 },
      { prefix: 'Deluxe', basePrice: 229, size: '28 m²', beds: '1 King Bed', guests: 2 },
      { prefix: 'Superior', basePrice: 279, size: '32 m²', beds: '1 King Bed', guests: 2 },
      { prefix: 'Junior Suite', basePrice: 329, size: '38 m²', beds: '1 King Bed', guests: 2 },
      { prefix: 'Executive Suite', basePrice: 399, size: '45 m²', beds: '1 King Bed', guests: 2 },
      { prefix: 'Premium Suite', basePrice: 549, size: '65 m²', beds: '1 King + Sofa Bed', guests: 3 },
      { prefix: 'Family Suite', basePrice: 459, size: '75 m²', beds: '2 King + 2 Twin', guests: 6 },
      { prefix: 'Penthouse Suite', basePrice: 899, size: '120 m²', beds: '2 King Beds', guests: 4 },
    ]

    const amenitySets = [
      'WiFi, Air Conditioning, Flat-screen TV, Mini Fridge, Room Service',
      'WiFi, Air Conditioning, Smart TV, Mini Bar, Coffee Machine, Safe',
      'City View, WiFi, Air Conditioning, Smart TV, Work Desk, Premium Linens',
      'Garden View, WiFi, Air Conditioning, Balcony, Nespresso Machine, Bathrobes',
      'Panoramic View, WiFi, Air Conditioning, Living Area, Kitchenette, Washer',
      'River View, WiFi, Air Conditioning, Fireplace, Jacuzzi, Private Terrace',
    ]

    const descriptions = [
      'Comfortable room with modern amenities and cozy atmosphere.',
      'Elegant space with refined furnishings and city views.',
      'Spacious accommodation with separate living area for relaxation.',
      'Luxurious retreat featuring premium amenities and stunning vistas.',
      'Contemporary design meets classic comfort in this beautiful room.',
      'Perfect for extended stays with full kitchenette and work space.',
      'Romantic getaway featuring mood lighting and champagne service.',
      'Family-friendly space with connecting rooms and child amenities.',
    ]

    // Clear and create rooms
    await prisma.room.deleteMany({})

    const rooms = []
    let roomNumber = 101

    for (let i = 0; i < 100; i++) {
      const type = roomTypes[i % roomTypes.length]
      const variation = Math.floor(i / roomTypes.length) + 1

      rooms.push({
        name: `${type.prefix} ${roomNumber}`,
        description: descriptions[i % descriptions.length],
        price: type.basePrice + (variation * 10),
        size: type.size,
        maxGuests: type.guests,
        bedType: type.beds,
        amenities: amenitySets[i % amenitySets.length],
        imageUrl: roomImages[i % roomImages.length],
        isAvailable: true,
      })

      roomNumber += (Math.random() > 0.7 ? 2 : 1)
      if (roomNumber % 100 > 20) roomNumber = ((Math.floor(roomNumber / 100) + 1) * 100) + 1
      if (roomNumber > 899) roomNumber = 101
    }

    for (const room of rooms) {
      await prisma.room.create({ data: room })
    }

    return NextResponse.json({ success: true, message: `Created ${rooms.length} rooms` })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
