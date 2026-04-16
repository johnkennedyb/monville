import Image from 'next/image'
import { Award, Clock, MapPin, Users, Star, Heart } from 'lucide-react'

export default function AboutPage() {
  const stats = [
    { number: '50+', label: 'Luxury Rooms' },
    { number: '15K+', label: 'Happy Guests' },
    { number: '4.9', label: 'Average Rating' },
    { number: '10', label: 'Years of Excellence' },
  ]

  const values = [
    { icon: Heart, title: 'Passion for Hospitality', desc: 'Every guest is treated like family from the moment they arrive.' },
    { icon: Star, title: 'Excellence in Service', desc: 'We continuously strive to exceed expectations in every interaction.' },
    { icon: Users, title: 'Local Community', desc: 'We partner with local businesses to offer authentic Montreal experiences.' },
  ]

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-primary text-white">
        <div className="container-custom text-center">
          <h1 className="font-heading text-5xl md:text-6xl mb-4">About Monville</h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Where timeless elegance meets modern luxury in the heart of Montreal
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 -right-4 -bottom-4 border-2 border-accent rounded-lg" />
              <Image
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3"
                alt="Monville Hotel"
                width={600}
                height={500}
                className="rounded-lg shadow-xl relative z-10"
              />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-accent mb-4 block">Our Story</span>
              <h2 className="font-heading text-4xl text-primary mb-6">
                A Legacy of Luxury Since 2014
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Founded with a vision to create an intimate sanctuary in the bustling heart of Montreal, 
                Monville Hotel has become synonymous with refined elegance and impeccable service. 
                Our boutique hotel combines the charm of historic Montreal with contemporary sophistication.
              </p>
              <p className="text-gray-600 leading-relaxed">
                From our carefully curated interiors to our world-class amenities, every detail at 
                Monville reflects our commitment to creating memorable experiences for our guests. 
                Whether you are visiting for business or leisure, our dedicated team ensures your 
                stay exceeds expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-primary text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-heading text-5xl font-bold text-accent mb-2">{stat.number}</div>
                <div className="text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent mb-4 block">Our Values</span>
            <h2 className="font-heading text-4xl text-primary mb-4">What We Stand For</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <div key={i} className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-heading text-xl text-primary mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Award, title: 'Award Winning', desc: 'Recognized as one of Montreal\'s finest boutique hotels by leading travel publications.' },
              { icon: Clock, title: '24/7 Service', desc: 'Our dedicated team is available around the clock to ensure your every need is met.' },
              { icon: MapPin, title: 'Prime Location', desc: 'Steps from Old Montreal, the Convention Centre, and the city\'s best dining and shopping.' },
            ].map((feature, i) => (
              <div key={i} className="text-center">
                <feature.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-heading text-xl text-primary mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
