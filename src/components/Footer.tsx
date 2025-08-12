"use client";
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
} from 'lucide-react';
import MDVLogo from './MDVLogo';
import VisitorCounter from './VisitorCounter';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        {/* Visitor Counter Section */}
        <div className="flex justify-center mb-8">
          <VisitorCounter />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-white rounded-full p-1 flex items-center justify-center">
                <img
                  src="/vasavi_logo.png"
                  alt="Sri Vasavi Engineering College Logo"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Sri Vasavi</h3>
                <p className="text-sm text-gray-400">Engineering College</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Empowering students with quality engineering education and fostering innovation for over two decades.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 hover:text-primary cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="text-base font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-primary transition-colors text-sm">About Us</Link></li>
              <li><Link href="/academics" className="hover:text-primary transition-colors text-sm">Academics</Link></li>
              <li><Link href="/admissions" className="hover:text-primary transition-colors text-sm">Admissions</Link></li>
              <li><Link href="/placements" className="hover:text-primary transition-colors text-sm">Placements</Link></li>
              <li><Link href="/rd-innovation" className="hover:text-primary transition-colors text-sm">R&D</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-semibold mb-4 text-white">Departments</h4>
            <ul className="space-y-2">
              <li><Link href="/departments/cse" className="hover:text-primary transition-colors text-sm">Computer Science</Link></li>
              <li><Link href="/departments/ece" className="hover:text-primary transition-colors text-sm">Electronics & Comm.</Link></li>
              <li><Link href="/departments/mech" className="hover:text-primary transition-colors text-sm">Mechanical</Link></li>
              <li><Link href="/departments/civil" className="hover:text-primary transition-colors text-sm">Civil Engineering</Link></li>
              <li><Link href="/departments/eee" className="hover:text-primary transition-colors text-sm">Electrical</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-semibold mb-4 text-white">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <p className="text-sm">
                  Pedatadepalli, Tadepalligudem, West Godavari District, Andhra Pradesh - 534101
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-sm">+91-866-2461555</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-sm">info@srivasaviengg.ac.in</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} Sri Vasavi Engineering College. All rights reserved.
          </p>

          <div className="mx-4 mb-4 md:mb-0">
            <MDVLogo />
          </div>

          <div className="flex space-x-4">
            <Link href="/privacy" className="text-sm hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sm hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
