import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import Link from 'next/link'
import { formatCurrency, formatDate } from '@/lib/utils'

export default async function AdminDashboard() {
  const session = await getServerSession()
  if (!session) redirect('/admin/login')

  const [rooms, bookings] = await Promise.all([
    prisma.room.findMany(),
    prisma.booking.findMany({ include: { room: true }, orderBy: { createdAt: 'desc' } }),
  ])

  const stats = {
    totalRooms: rooms.length,
    totalBookings: bookings.length,
    confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
    pendingBookings: bookings.filter(b => b.status === 'pending').length,
    revenue: bookings.filter(b => b.status === 'confirmed').reduce((sum, b) => sum + b.totalPrice, 0),
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-primary text-white p-6">
        <div className="container-custom flex items-center justify-between">
          <h1 className="font-heading text-2xl">Admin Dashboard</h1>
          <Link href="/" className="text-sm hover:text-accent">View Website</Link>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total Rooms', value: stats.totalRooms },
            { label: 'Total Bookings', value: stats.totalBookings },
            { label: 'Confirmed', value: stats.confirmedBookings },
            { label: 'Pending', value: stats.pendingBookings },
            { label: 'Revenue', value: formatCurrency(stats.revenue) },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className="font-heading text-2xl text-primary">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Rooms */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-xl text-primary">Rooms</h2>
              <Link href="/admin/rooms/new" className="btn btn-primary text-sm py-2 px-4">
                + Add Room
              </Link>
            </div>
            <div className="space-y-3">
              {rooms.map(room => (
                <div key={room.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-semibold">{room.name}</p>
                    <p className="text-sm text-gray-500">${room.price}/night · {room.maxGuests} guests</p>
                  </div>
                  <Link href={`/admin/rooms/${room.id}/edit`} className="text-accent hover:underline text-sm">
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="font-heading text-xl text-primary mb-4">Recent Bookings</h2>
            <div className="space-y-3 max-h-96 overflow-auto">
              {bookings.slice(0, 10).map(booking => (
                <div key={booking.id} className="p-3 bg-gray-50 rounded text-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{booking.guestName}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-gray-500">{booking.room.name}</p>
                  <p className="text-gray-500">{formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}</p>
                  <p className="font-semibold text-accent">{formatCurrency(booking.totalPrice)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
