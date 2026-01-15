import React from 'react';

const CampusLife: React.FC = () => {
  return (
    <div className="pt-24 bg-gradient-to-br from-[#FFF8F0] to-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#B22222]/10 to-[#0097A7]/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="relative">
                <h1
                  className="text-6xl lg:text-8xl font-bold leading-tight mb-6 bg-gradient-to-r from-[#B22222] to-[#0097A7] bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'url(./adventure.jpeg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Connect <br />
                  Collaborate <br />
                  Create
                </h1>
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-[#B22222]/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#0097A7]/20 rounded-full blur-xl"></div>
              </div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 mb-8 text-justify">
                Discover a vibrant campus community where academic excellence meets personal growth and lasting friendships.
              </p>
            </div>
            <div className="flex-1 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
                <img
                  className="w-full h-96 object-cover"
                  loading="lazy"
                  src="club.jpg"
                  alt="Campus Life"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#FFC107] rounded-full opacity-80 blur-sm"></div>
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-[#B22222] rounded-full opacity-60 blur-sm"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Campus Features */}
      <section id="campus" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#B22222] mb-6">Campus Experiences</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the diverse opportunities that make our campus a second home for students
            </p>
          </div>

          {/* Student Clubs */}
          <div className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-[#B22222]/10 rounded-full">
                  <span className="text-[#B22222] font-semibold">Student Organizations</span>
                </div>
                <h3 className="text-4xl font-bold text-gray-900">Student Clubs</h3>
                <p className="text-lg text-gray-600 leading-relaxed text-justify">
                  Student clubs at our college offer diverse opportunities for engagement, from academic and professional development groups to cultural and recreational organizations, allowing students to pursue interests, develop leadership skills, and connect with peers. Joining a club fosters a sense of community and enriches campus life.
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-3 py-1 bg-[#B22222]/10 text-[#B22222] rounded-full text-sm font-medium">Leadership</span>
                  <span className="px-3 py-1 bg-[#0097A7]/10 text-[#0097A7] rounded-full text-sm font-medium">Community</span>
                  <span className="px-3 py-1 bg-[#FFC107]/10 text-[#B8860B] rounded-full text-sm font-medium">Skills</span>
                </div>
                <button className="group inline-flex items-center gap-2 bg-gradient-to-r from-[#B22222] to-[#8B1E1E] text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  <span>Know More</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
                  <img src="./club.jpg" loading="lazy" alt="Student Clubs" className="w-full h-80 object-cover" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-[#B22222]/20 rounded-full blur-lg"></div>
              </div>
            </div>
          </div>

          {/* Physical Fitness & Wellness */}
          <div className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="lg:order-2 space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-[#0097A7]/10 rounded-full">
                  <span className="text-[#0097A7] font-semibold">Health & Wellness</span>
                </div>
                <h3 className="text-4xl font-bold text-gray-900">Physical Fitness & Wellness</h3>
                <p className="text-lg text-gray-600 leading-relaxed text-justify">
                  Our college's fitness and wellness clubs promote holistic well-being through group workouts, wellness workshops, and outdoor adventures. They offer a supportive environment for prioritizing health, cultivating healthy habits, and building lifelong fitness skills. Joining strengthens both bodies and a sense of community, fostering a campus culture of well-being.
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-3 py-1 bg-[#0097A7]/10 text-[#0097A7] rounded-full text-sm font-medium">Fitness</span>
                  <span className="px-3 py-1 bg-[#FFC107]/10 text-[#B8860B] rounded-full text-sm font-medium">Wellness</span>
                  <span className="px-3 py-1 bg-[#B22222]/10 text-[#B22222] rounded-full text-sm font-medium">Community</span>
                </div>
                <button className="group inline-flex items-center gap-2 bg-gradient-to-r from-[#0097A7] to-[#007A86] text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  <span>Know More</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
              <div className="lg:order-1 relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
                  <img src="./court.jpeg" loading="lazy" alt="Physical Fitness" className="w-full h-80 object-cover" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-[#0097A7]/20 rounded-full blur-lg"></div>
              </div>
            </div>
          </div>

          {/* Library */}
          <div className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-[#FFC107]/10 rounded-full">
                  <span className="text-[#B8860B] font-semibold">Academic Resources</span>
                </div>
                <h3 className="text-4xl font-bold text-gray-900">Library</h3>
                <p className="text-lg text-gray-600 leading-relaxed text-justify">
                  The library is the heart of our academic community, offering a quiet sanctuary for study, vast resources, and expert assistance from dedicated librarians. It serves as a hub for research, collaboration, and lifelong learning. The library empowers students to excel in their academic pursuits.
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-3 py-1 bg-[#FFC107]/10 text-[#B8860B] rounded-full text-sm font-medium">Research</span>
                  <span className="px-3 py-1 bg-[#B22222]/10 text-[#B22222] rounded-full text-sm font-medium">Study Space</span>
                  <span className="px-3 py-1 bg-[#0097A7]/10 text-[#0097A7] rounded-full text-sm font-medium">Resources</span>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
                  <img src="./library.jpeg" loading="lazy" alt="Library" className="w-full h-80 object-cover" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-[#FFC107]/20 rounded-full blur-lg"></div>
              </div>
            </div>
          </div>

          {/* Residential */}
          <div className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="lg:order-2 space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-[#B22222]/10 rounded-full">
                  <span className="text-[#B22222] font-semibold">Student Housing</span>
                </div>
                <h3 className="text-4xl font-bold text-gray-900">Residential</h3>
                <p className="text-lg text-gray-600 leading-relaxed text-justify">
                  Our college offers comfortable, inclusive residential facilities that foster friendships, personal growth, and academic support. With modern amenities and a focus on safety and well-being, students thrive in these vibrant communities. This environment helps form lifelong connections and memorable college experiences.
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-3 py-1 bg-[#B22222]/10 text-[#B22222] rounded-full text-sm font-medium">Community</span>
                  <span className="px-3 py-1 bg-[#0097A7]/10 text-[#0097A7] rounded-full text-sm font-medium">Safety</span>
                  <span className="px-3 py-1 bg-[#FFC107]/10 text-[#B8860B] rounded-full text-sm font-medium">Comfort</span>
                </div>
                <button className="group inline-flex items-center gap-2 bg-gradient-to-r from-[#B22222] to-[#8B1E1E] text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  <span>Know More</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
              <div className="lg:order-1 relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
                  <img src="./girlshostel.jpeg" loading="lazy" alt="Residential" className="w-full h-80 object-cover" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-[#B22222]/20 rounded-full blur-lg"></div>
              </div>
            </div>
          </div>

          {/* Cafeteria */}
          <div className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-[#0097A7]/10 rounded-full">
                  <span className="text-[#0097A7] font-semibold">Dining Experience</span>
                </div>
                <h3 className="text-4xl font-bold text-gray-900">Cafeteria</h3>
                <p className="text-lg text-gray-600 leading-relaxed text-justify">
                  Our cafeteria is a bustling hub of culinary diversity, offering a variety of delicious and nutritious meals to fuel students' minds and bodies. From hearty comfort foods to fresh, made-to-order options, there's something for everyone. With quality ingredients and accommodations for dietary needs, it's a place for students to refuel, recharge, and connect.
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-3 py-1 bg-[#0097A7]/10 text-[#0097A7] rounded-full text-sm font-medium">Variety</span>
                  <span className="px-3 py-1 bg-[#FFC107]/10 text-[#B8860B] rounded-full text-sm font-medium">Nutrition</span>
                  <span className="px-3 py-1 bg-[#B22222]/10 text-[#B22222] rounded-full text-sm font-medium">Social Hub</span>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
                  <img src="./canteen.jpeg" loading="lazy" alt="Cafeteria" className="w-full h-80 object-cover" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-[#0097A7]/20 rounded-full blur-lg"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
      </section>
    </div>
  );
};

export default CampusLife;
