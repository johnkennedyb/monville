'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface EditRoomPageProps {
  params: { id: string }
}

export default function EditRoomPage({ params }: EditRoomPageProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    size: '',
    maxGuests: '2',
    bedType: '',
    amenities: '',
    imageUrl: '',
    isAvailable: true,
  })

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch('/api/rooms')
        if (res.ok) {
          const rooms = await res.json()
          const room = rooms.find((r: any) => r.id === params.id)
          if (room) {
            setFormData({
              name: room.name,
              description: room.description,
              price: room.price.toString(),
              size: room.size,
              maxGuests: room.maxGuests.toString(),
              bedType: room.bedType,
              amenities: room.amenities,
              imageUrl: room.imageUrl,
              isAvailable: room.isAvailable,
            })
          }
        }
      } catch (error) {
        console.error('Error fetching room:', error)
      } finally {
        setFetchLoading(false)
      }
    }

    fetchRoom()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`/api/rooms/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          maxGuests: parseInt(formData.maxGuests),
        }),
      })

      if (res.ok) {
        router.push('/admin')
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this room?')) return

    try {
      const res = await fetch(`/api/rooms/${params.id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        router.push('/admin')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const inputClass = "w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-accent focus:border-accent outline-none"

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container-custom max-w-2xl">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="font-heading text-2xl text-primary mb-6">Edit Room</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Room Name</label>
              <input
                type="text"
                required
                className={inputClass}
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                required
                rows={3}
                className={inputClass}
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Price per Night ($)</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  className={inputClass}
                  value={formData.price}
                  onChange={e => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Max Guests</label>
                <input
                  type="number"
                  required
                  min="1"
                  className={inputClass}
                  value={formData.maxGuests}
                  onChange={e => setFormData({ ...formData, maxGuests: e.target.value })}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Room Size</label>
                <input
                  type="text"
                  placeholder="e.g. 35 m²"
                  className={inputClass}
                  value={formData.size}
                  onChange={e => setFormData({ ...formData, size: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Bed Type</label>
                <input
                  type="text"
                  placeholder="e.g. 1 King Bed"
                  className={inputClass}
                  value={formData.bedType}
                  onChange={e => setFormData({ ...formData, bedType: e.target.value })}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input
                type="url"
                required
                className={inputClass}
                value={formData.imageUrl}
                onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Amenities (comma separated)</label>
              <input
                type="text"
                placeholder="WiFi, Air Conditioning, Mini Bar, ..."
                className={inputClass}
                value={formData.amenities}
                onChange={e => setFormData({ ...formData, amenities: e.target.value })}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isAvailable"
                checked={formData.isAvailable}
                onChange={e => setFormData({ ...formData, isAvailable: e.target.checked })}
                className="w-4 h-4 text-accent focus:ring-accent border-gray-300 rounded"
              />
              <label htmlFor="isAvailable" className="text-sm font-medium">
                Room Available for Booking
              </label>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.push('/admin')}
                className="flex-1 py-3 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn btn-primary py-3 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>

            <div className="pt-4 border-t">
              <button
                type="button"
                onClick={handleDelete}
                className="w-full py-3 border border-red-300 text-red-600 rounded hover:bg-red-50"
              >
                Delete Room
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
