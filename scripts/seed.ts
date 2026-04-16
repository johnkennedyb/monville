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

  // Create sample rooms with high-quality Unsplash images
  const rooms = [
    {
      name: 'Deluxe Room',
      description: 'Elegant comfort with city views and premium amenities. Perfect for business travelers or couples seeking a luxurious retreat in the heart of Montreal.',
      price: 229,
      size: '28 m²',
      maxGuests: 2,
      bedType: '1 King Bed',
      amenities: 'City View, WiFi, Air Conditioning, Mini Bar, Room Service, Smart TV',
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
      isAvailable: true,
    },
    {
      name: 'Executive Suite',
      description: 'Spacious suite with separate living area and panoramic views. Ideal for extended stays or guests who desire extra space and sophistication.',
      price: 349,
      size: '45 m²',
      maxGuests: 2,
      bedType: '1 King Bed',
      amenities: 'Panoramic View, WiFi, Air Conditioning, Living Room, Premium Toiletries, Nespresso Machine',
      imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
      isAvailable: true,
    },
    {
      name: 'Premium Suite',
      description: 'Ultimate luxury with premium finishes and exclusive lounge access. Experience the finest accommodations Montreal has to offer.',
      price: 499,
      size: '65 m²',
      maxGuests: 3,
      bedType: '1 King + Sofa Bed',
      amenities: 'Lounge Access, WiFi, Air Conditioning, Butler Service, Jacuzzi, Private Balcony',
      imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80',
      isAvailable: true,
    },
    {
      name: 'Superior Double',
      description: 'Modern comfort with two queen beds, perfect for families or friends traveling together. Features contemporary design and all essential amenities.',
      price: 279,
      size: '32 m²',
      maxGuests: 4,
      bedType: '2 Queen Beds',
      amenities: 'City View, WiFi, Air Conditioning, Mini Fridge, Work Desk, Rain Shower',
      imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80',
      isAvailable: true,
    },
    {
      name: 'Junior Suite',
      description: 'A perfect blend of luxury and comfort with a cozy sitting area. Ideal for guests who appreciate extra space and elegant furnishings.',
      price: 299,
      size: '38 m²',
      maxGuests: 2,
      bedType: '1 King Bed',
      amenities: 'Garden View, WiFi, Air Conditioning, Sitting Area, Premium Linens, Bluetooth Speaker',
      imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80',
      isAvailable: true,
    },
    {
      name: 'Penthouse Suite',
      description: 'The crown jewel of Monville Hotel. Spectacular 360° views of Montreal, private terrace, and unparalleled luxury for the most discerning guests.',
      price: 899,
      size: '120 m²',
      maxGuests: 4,
      bedType: '2 King Beds',
      amenities: '360° City Views, Private Terrace, WiFi, Personal Butler, Private Bar, Steinway Piano, In-Room Dining',
      imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&q=80',
      isAvailable: true,
    },
    {
      name: 'Classic Room',
      description: 'Comfortable and well-appointed room with all essential amenities. A perfect choice for budget-conscious travelers who still want quality accommodation.',
      price: 179,
      size: '22 m²',
      maxGuests: 2,
      bedType: '1 Queen Bed',
      amenities: 'WiFi, Air Conditioning, Flat-screen TV, Coffee Maker, Daily Housekeeping',
      imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=80',
      isAvailable: true,
    },
    {
      name: 'Family Suite',
      description: 'Spacious two-bedroom suite designed for families. Kids will love the gaming console and separate living area gives parents their own space.',
      price: 459,
      size: '75 m²',
      maxGuests: 6,
      bedType: '2 King + 2 Twin Beds',
      amenities: '2 Bedrooms, WiFi, Air Conditioning, Gaming Console, Kitchenette, Board Games, Cribs Available',
      imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
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
