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

  // Create sample rooms
  const rooms = [
    {
      name: 'Deluxe Room',
      description: 'Elegant comfort with city views and premium amenities. Perfect for business travelers or couples seeking a luxurious retreat in the heart of Montreal.',
      price: 229,
      size: '28 m²',
      maxGuests: 2,
      bedType: '1 King Bed',
      amenities: 'City View, WiFi, Air Conditioning, Mini Bar, Room Service',
      imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
      isAvailable: true,
    },
    {
      name: 'Executive Suite',
      description: 'Spacious suite with separate living area and panoramic views. Ideal for extended stays or guests who desire extra space and sophistication.',
      price: 349,
      size: '45 m²',
      maxGuests: 2,
      bedType: '1 King Bed',
      amenities: 'Panoramic View, WiFi, Air Conditioning, Living Room, Premium Toiletries',
      imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1548&q=80',
      isAvailable: true,
    },
    {
      name: 'Premium Suite',
      description: 'Ultimate luxury with premium finishes and exclusive lounge access. Experience the finest accommodations Montreal has to offer.',
      price: 499,
      size: '65 m²',
      maxGuests: 3,
      bedType: '1 King + Sofa Bed',
      amenities: 'Lounge Access, WiFi, Air Conditioning, Butler Service, Jacuzzi',
      imageUrl: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=1744&q=80',
      isAvailable: true,
    },
  ]

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
