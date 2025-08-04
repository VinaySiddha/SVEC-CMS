"use client";
import React, { useEffect } from 'react';

const WhatsAppChatButton: React.FC = () => {
  useEffect(() => {
    console.log('WhatsAppChatButton component rendered');
  }, []);

  const handleWhatsAppClick = () => {
    console.log('WhatsApp button clicked');
    const whatsappUrl = 'https://wa.me/918142382563?text=Hello, I\'m interested in learning more about admissions at SVEC.';
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999]">
      <div className="group relative">
        {/* Tooltip - Hidden on mobile */}
        <div className="hidden sm:block absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Start Chat on WhatsApp
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>

        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsAppClick}
          role="button"
          aria-label="Chat on WhatsApp"
          className="w-12 h-12 sm:w-12 sm:h-12 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center animate-bounce-in active:scale-95"
          style={{ 
            boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)',
            border: '2px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          {/* WhatsApp Icon - Simple and reliable */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7"
          >
            <path
              d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 001.333 4.993L2 22l5.232-1.236a9.981 9.981 0 004.774 1.218h.004c5.505 0 9.988-4.478 9.99-9.984a9.938 9.938 0 00-2.922-7.069A9.935 9.935 0 0012.012 2zm5.634 14.208c-.245.692-1.44 1.311-1.997 1.4-.514.082-1.188.095-1.926-.121-.459-.134-1.05-.312-1.803-.602-3.192-1.226-5.279-4.383-5.437-4.583-.149-.199-1.24-1.615-1.240-3.08 0-1.464.784-2.182 1.061-2.481.278-.298.607-.373.809-.373l.585.011c.186.005.436-.071.683.52l.67 1.602c.084.199.14.431.029.695-.111.265-.167.429-.334.653-.167.223-.351.498-.501.669-.167.199-.34.413-.146.809.193.395.861 1.411 1.849 2.286 1.268 1.124 2.342 1.474 2.674 1.63.332.167.525.139.718-.084.193-.223.829-.967 1.051-1.299s.445-.372.751-.223c.307.149 1.956.916 2.291 1.082.336.167.559.25.64.39.082.14.082.809-.163 1.5z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WhatsAppChatButton;
