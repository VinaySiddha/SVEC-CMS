import React from 'react';

const MDVLogo: React.FC = () => {
    return (
        <div className="flex flex-col items-center">
            <div className="flex items-center transition-transform hover:scale-105 duration-300">
                <svg
                    width="60"
                    height="30"
                    viewBox="0 0 80 40"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.5))' }}
                    role="img"
                    aria-label="MDV Logo"
                >
                    <rect width="80" height="40" fill="#222222" rx="5" />

                    {/* M */}
                    <path
                        d="M15 10 L20 10 L25 20 L30 10 L35 10 L35 30 L30 30 L30 18 L25 28 L20 18 L20 30 L15 30 Z"
                        fill="none"
                        stroke="#FFF8F0"
                        strokeWidth="1.5"
                    />

                    {/* D */}
                    <path
                        d="M40 10 H48 C53 10 55 15 55 20 C55 25 53 30 48 30 H40 Z"
                        fill="#FFD700"
                        opacity="0.8"
                    />
                    <path
                        d="M40 10 H48 C53 10 55 15 55 20 C55 25 53 30 48 30 H40 Z"
                        fill="none"
                        stroke="#FFF8F0"
                        strokeWidth="1.5"
                    />

                    {/* Abstract infinity curve connecting D and V */}
                    <path
                        d="M50 15 Q60 10 65 20 Q60 30 50 25"
                        fill="none"
                        stroke="#FFD700"
                        strokeWidth="1.5"
                        opacity="0.9"
                    />

                    {/* V */}
                    <path
                        d="M60 10 L65 30 L70 10"
                        fill="none"
                        stroke="#FFF8F0"
                        strokeWidth="1.5"
                    />
                </svg>

                <div className="ml-2 flex flex-col">
                    <span className="font-bold text-[#FFF8F0]">MDV</span>
                    <span className="text-xs text-[#FFD700] opacity-80">Studios</span>
                </div>
            </div>
            <p className="text-xs text-[#FFF8F0] mt-1 text-center whitespace-nowrap">
                 <span className="text-red-500"></span>Atri Datta, Asst Professor & Web Developer
            </p>
            <p className="text-xs text-[#FFF8F0] mt-1 text-center whitespace-nowrap">
                 <span className="text-red-500"></span>  Mallesh, Diwakar & Vinay • 2025
            </p>
            
        </div>
    );
};

export default MDVLogo;
