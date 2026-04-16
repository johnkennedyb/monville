'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewRoomPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    size: '',
    maxGuests: '2',
    bedType: '',
    amenities: '',
    imageUrl: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/rooms', {
        method: 'POST',
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

  const inputClass = "w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-accent focus:border-accent outline-none"

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container-custom max-w-2xl">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="font-heading text-2xl text-primary mb-6">Add New Room</h1>
          
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
                {loading ? 'Creating...' : 'Create Room'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
