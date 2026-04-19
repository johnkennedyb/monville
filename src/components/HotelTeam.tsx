'use client'

import Image from 'next/image'

const managementTeam = [
  {
    name: 'Carlos Kelvin Williams',
    role: 'General Manager',
    image: '/images/staff/general-manager.jpg',
    bio: 'With over 25 years of luxury hospitality experience, Carlos leads Monville with vision and excellence.',
  },
  {
    name: 'Jessica Kocer',
    role: 'Executive Secretary',
    image: '/images/staff/secretary.jpg',
    bio: 'Jessica ensures seamless operations and exceptional guest experiences with her meticulous attention to detail.',
  },
]

const departmentHeads = [
  {
    name: 'Marc Tremblay',
    role: 'Executive Chef',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80',
    bio: 'Award-winning chef with Michelin star experience',
  },
  {
    name: 'Sophie Dubois',
    role: 'Front Office Manager',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    bio: '15 years in luxury hotel guest services',
  },
  {
    name: 'Jean-Pierre Martin',
    role: 'Food & Beverage Director',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    bio: 'Expert in wine curation and fine dining',
  },
  {
    name: 'Isabella Rossi',
    role: 'Spa Director',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    bio: 'Certified wellness specialist from Italy',
  },
]

const staffMembers = [
  { name: 'Ahmed Hassan', role: 'Head Concierge', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { name: 'Maria Garcia', role: 'Housekeeping Manager', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80' },
  { name: 'David Chen', role: 'IT Manager', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80' },
  { name: 'Amara Okafor', role: 'Event Coordinator', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80' },
  { name: 'Thomas Anderson', role: 'Chief Engineer', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80' },
  { name: 'Linda Kim', role: 'Marketing Director', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80' },
  { name: 'Robert Brown', role: 'Security Chief', image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&q=80' },
  { name: 'Fatima Al-Rashid', role: 'Guest Relations', image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&q=80' },
  { name: 'James Wilson', role: 'Pastry Chef', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80' },
  { name: 'Nina Petrov', role: 'Sommelier', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80' },
  { name: 'Kevin O\'Brien', role: 'Bar Manager', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' },
  { name: 'Yuki Tanaka', role: 'Sushi Chef', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80' },
  { name: 'Sandra Mueller', role: 'Fitness Trainer', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&q=80' },
  { name: 'Carlos Rivera', role: 'Maintenance Lead', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&q=80' },
]

function TeamCard({ member, featured = false }: { member: typeof managementTeam[0]; featured?: boolean }) {
  return (
    <div className={`group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${featured ? '' : ''}`}>
      <div className={`relative overflow-hidden ${featured ? 'h-80' : 'h-64'}`}>
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <h3 className={`font-heading text-primary ${featured ? 'text-2xl' : 'text-lg'}`}>{member.name}</h3>
        <p className="text-accent font-semibold text-sm mb-2">{member.role}</p>
        {member.bio && <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>}
      </div>
    </div>
  )
}

export function HotelTeam() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <p className="text-accent uppercase tracking-wider text-sm font-semibold mb-4">Leadership</p>
          <h2 className="font-heading text-4xl md:text-5xl text-primary mb-6">Hotel Management</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet the dedicated professionals who ensure your stay at Monville is nothing short of extraordinary.
          </p>
        </div>

        {/* Management Team */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
          {managementTeam.map((member) => (
            <TeamCard key={member.name} member={member} featured />
          ))}
        </div>

        {/* Department Heads */}
        <div className="mb-12">
          <h3 className="font-heading text-2xl text-primary text-center mb-8">Department Heads</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {departmentHeads.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        </div>

        {/* Staff Members */}
        <div>
          <h3 className="font-heading text-2xl text-primary text-center mb-8">Our Dedicated Team</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {staffMembers.map((member) => (
              <div key={member.name} className="text-center group">
                <div className="relative w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden ring-4 ring-accent/20 group-hover:ring-accent transition-all">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="font-semibold text-primary text-sm">{member.name}</h4>
                <p className="text-xs text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
