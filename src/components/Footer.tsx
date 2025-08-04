import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  GraduationCap,
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* College Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#FFD700] rounded-full flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-[#1a1a1a]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Sri Vasavi</h3>
                <p className="text-sm text-[#FFF8F0]">Engineering College</p>
              </div>
            </div>
            <p className="text-[#FFF8F0] text-sm leading-relaxed">
              Empowering students with quality engineering education and fostering innovation 
              for over two decades. Building tomorrow's engineers today.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-[#FFF8F0] hover:text-[#FFD700] cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-[#FFF8F0] hover:text-[#FFD700] cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-[#FFF8F0] hover:text-[#FFD700] cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-[#FFF8F0] hover:text-[#FFD700] cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#FFD700]">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-[#FFF8F0] hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link href="/academics" className="text-[#FFF8F0] hover:text-white transition-colors text-sm">Academics</Link></li>
              <li><Link href="/admissions" className="text-[#FFF8F0] hover:text-white transition-colors text-sm">Admissions</Link></li>
              <li><Link href="/placements" className="text-[#FFF8F0] hover:text-white transition-colors text-sm">Placements</Link></li>
              <li><Link href="/rd-innovation" className="text-[#FFF8F0] hover:text-white transition-colors text-sm">R&D</Link></li>
              <li><Link href="/library" className="text-[#FFF8F0] hover:text-white transition-colors text-sm">Library</Link></li>
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#FFD700]">Departments</h4>
            <ul className="space-y-2">
              <li><Link href="/departments/cse" className="text-[#FFF8F0] hover:text-white transition-colors text-sm">Computer Science</Link></li>
              <li><Link href="/departments/ece" className="text-[#FFF8F0] hover:text-white transition-colors text-sm">Electronics & Comm.</Link></li>
              <li><Link href="/departments/mech" className="text-[#FFF8F0] hover:text-white transition-colors text-sm">Mechanical</Link></li>
              <li><Link href="/departments/civil" className="text-[#FFF8F0] hover:text-white transition-colors text-sm">Civil Engineering</Link></li>
              <li><Link href="/departments/eee" className="text-[#FFF8F0] hover:text-white transition-colors text-sm">Electrical</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#FFD700]">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#FFD700] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-[#FFF8F0]">
                  Pedatadepalli, Tadepalligudem,<br />
                  West Godavari District,<br />
                  Andhra Pradesh - 534101
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#FFD700] flex-shrink-0" />
                <p className="text-sm text-[#FFF8F0]">+91-866-2461555</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#FFD700] flex-shrink-0" />
                <p className="text-sm text-[#FFF8F0]">info@srivasaviengg.ac.in</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#FFF8F0]/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#FFF8F0] text-sm">
            © 2025 Sri Vasavi Engineering College. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-[#FFF8F0] hover:text-white text-sm transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-[#FFF8F0] hover:text-white text-sm transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
