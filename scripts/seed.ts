import { prisma } from '../src/lib/db'
import bcrypt from 'bcryptjs'

async function main() {
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

  // Create 50 diverse rooms with high-quality Unsplash images
  const roomImages = [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80',
    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80',
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80',
    'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&q=80',
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=80',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80',
    'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=1200&q=80',
    'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=1200&q=80',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80',
    'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=1200&q=80',
    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80',
    'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&q=80',
    'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1200&q=80',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80',
  ]

  const roomTypes = [
    // Classic Rooms (101-110) - Budget-friendly
    { prefix: 'Classic', basePrice: 179, size: '22 m²', beds: '1 Queen Bed', guests: 2 },
    // Deluxe Rooms (201-215) - Standard comfort
    { prefix: 'Deluxe', basePrice: 229, size: '28 m²', beds: '1 King Bed', guests: 2 },
    { prefix: 'Deluxe Twin', basePrice: 249, size: '30 m²', beds: '2 Double Beds', guests: 3 },
    // Superior Rooms (301-315) - Enhanced comfort
    { prefix: 'Superior', basePrice: 279, size: '32 m²', beds: '1 King Bed', guests: 2 },
    { prefix: 'Superior Double', basePrice: 299, size: '35 m²', beds: '2 Queen Beds', guests: 4 },
    // Junior Suites (401-410) - Living area
    { prefix: 'Junior Suite', basePrice: 329, size: '38 m²', beds: '1 King Bed', guests: 2 },
    { prefix: 'Junior Suite Twin', basePrice: 349, size: '42 m²', beds: '2 Queen Beds', guests: 4 },
    // Executive Suites (501-515) - Premium
    { prefix: 'Executive Suite', basePrice: 399, size: '45 m²', beds: '1 King Bed', guests: 2 },
    { prefix: 'Executive Suite Plus', basePrice: 449, size: '55 m²', beds: '1 King + Sofa', guests: 3 },
    // Premium Suites (601-610) - Luxury
    { prefix: 'Premium Suite', basePrice: 549, size: '65 m²', beds: '1 King + Sofa Bed', guests: 3 },
    { prefix: 'Premium Suite Double', basePrice: 599, size: '75 m²', beds: '2 King Beds', guests: 4 },
    // Family & Specialty (701-720) - Special accommodations
    { prefix: 'Family Suite', basePrice: 459, size: '75 m²', beds: '2 King + 2 Twin', guests: 6 },
    { prefix: 'Honeymoon Suite', basePrice: 599, size: '50 m²', beds: '1 King Bed', guests: 2 },
    { prefix: 'Accessible Room', basePrice: 229, size: '30 m²', beds: '1 King Bed', guests: 2 },
    { prefix: 'Business Suite', basePrice: 379, size: '40 m²', beds: '1 King Bed', guests: 2 },
    { prefix: 'Wellness Suite', basePrice: 699, size: '60 m²', beds: '1 King Bed', guests: 2 },
    // Penthouse Levels (801-805) - Ultra luxury
    { prefix: 'Penthouse Suite', basePrice: 899, size: '120 m²', beds: '2 King Beds', guests: 4 },
    { prefix: 'Presidential Suite', basePrice: 1299, size: '200 m²', beds: '3 King Beds', guests: 6 },
    { prefix: 'Royal Suite', basePrice: 1599, size: '250 m²', beds: '4 King Beds', guests: 8 },
  ]

  const amenitySets = [
    'WiFi, Air Conditioning, Flat-screen TV, Mini Fridge, Room Service',
    'WiFi, Air Conditioning, Smart TV, Mini Bar, Coffee Machine, Safe',
    'City View, WiFi, Air Conditioning, Smart TV, Work Desk, Premium Linens',
    'Garden View, WiFi, Air Conditioning, Balcony, Nespresso Machine, Bathrobes',
    'Panoramic View, WiFi, Air Conditioning, Living Area, Kitchenette, Washer',
    'River View, WiFi, Air Conditioning, Fireplace, Jacuzzi, Private Terrace',
    'Skyline View, WiFi, Air Conditioning, Home Theater, Wine Cooler, Butler Service',
    'Mountain View, WiFi, Air Conditioning, Steam Room, Massage Chair, Yoga Kit',
    'Pool View, WiFi, Air Conditioning, Outdoor Shower, Private Garden, BBQ Grill',
    '360° View, WiFi, Air Conditioning, Grand Piano, Private Elevator, Chef Kitchen',
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
    'Executive accommodation with boardroom table and business center access.',
    'Wellness-focused room with air purification and meditation space.',
    'Heritage suite featuring antique furnishings and artwork.',
    'Modern minimalist design with smart home technology throughout.',
    'Mediterranean-inspired decor with terracotta and warm woods.',
    'Asian fusion elegance with zen garden view and tea ceremony setup.',
    'Art deco glamour with velvet furnishings and gold accents.',
  ]

  const rooms = []
  let roomNumber = 101
  
  for (let i = 0; i < 100; i++) {
    const type = roomTypes[i % roomTypes.length]
    const floor = Math.floor(roomNumber / 100)
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
    
    roomNumber += (Math.random() > 0.7 ? 2 : 1) // Skip some numbers for realism
    if (roomNumber % 100 > 20) roomNumber = ((Math.floor(roomNumber / 100) + 1) * 100) + 1
    if (roomNumber > 899) roomNumber = 101
  }

  // Clear existing rooms and create fresh ones
  await prisma.room.deleteMany({})
  
  for (const room of rooms) {
    await prisma.room.create({
      data: room,
    })
  }

  console.log('Seed completed successfully!')
  console.log('Admin login: admin@monville.com / admin123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
