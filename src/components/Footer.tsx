"use client";
import React, { useState, useEffect } from 'react';
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
// import MDVLogo from './MDVLogo';
import VisitorCounter from './VisitorCounter';

const Footer: React.FC = () => {
  const [currentYear, setCurrentYear] = useState(2024);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        {/* Visitor Counter Section */}
        
        
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
            <p className="text-sm leading-relaxed text-justify">
            Sri Vasavi Engineering College (SVEC) in West and East Godavari districts has maintained its values for over 20 years, nurturing more than 30,000 students and evolving from a small school into a distinguished engineering college.

            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/people/Sri-Vasavi-Engineering-College-Tadepalligudem/100067829822379/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary cursor-pointer transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/srivasavieng" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary cursor-pointer transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/gdsc.svec/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary cursor-pointer transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/uas/login?session_redirect=https%3A%2F%2Fwww.linkedin.com%2Fschool%2Fsri-vasavi%2Fposts%2F%3FfeedView%3Dall%26" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary cursor-pointer transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-base font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="http://62.72.31.209:3001" className="hover:text-primary transition-colors text-sm">Course End Survey</Link></li>
              <li><Link href="http://62.72.31.209:3005" className="hover:text-primary transition-colors text-sm">Grievance Cell</Link></li>
              <li><Link href="http://62.72.31.209:3002" className="hover:text-primary transition-colors text-sm">Exit Facilities Portal</Link></li>
              <li><Link href="http://62.72.31.209:3003" className="hover:text-primary transition-colors text-sm">Graduate Survey</Link></li>
               <li><Link href="https://sves.org.in/ecap/olpaymentlogin.aspx" className="hover:text-primary transition-colors text-sm">Online Fee Payment</Link></li>
               <li><Link href="https://sves.org.in/ecap/consultancyfee.aspx" className="hover:text-primary transition-colors text-sm">Consultancy Fee</Link></li>
              
            </ul>
          </div>

          <div>
            <h4 className="text-base font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="https://sves.org.in/ecap" className="hover:text-primary transition-colors text-sm">E_CAP</Link></li>
              <li><Link href="https://alumni.srivasaviengg.ac.in/" className="hover:text-primary transition-colors text-sm">Alumni</Link></li>
              
              
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
                <p className="text-sm">08818-284355</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-sm">principal@srivasaviengg.ac.in</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            © {currentYear} Sri Vasavi Engineering College. All rights reserved.
          </p>

          <div className="mx-4 mb-4 md:mb-0">
            {/* <MDVLogo /> */}
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
