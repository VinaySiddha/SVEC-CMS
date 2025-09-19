import React from 'react';
import StandardDepartmentProfile from '../../components/StandardDepartmentProfile';

const ECTDepartment: React.FC = () => {
  const hodInfo = {
    name: "Dr. E.Kusuma Kumari",
    designation: "Head of Department, Electronics & Communication Engineering",
    education: "Ph.D, M.Tech, B.Tech",
    email: "hod.ece@svec.ac.in",
    imageUrl: "/ecehod.jpg"
  };

  const departmentContent = {
    Department: (
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-[#B22222] mb-4">Department of Electronics & Communication Technology</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Department of Electronics & Communication Technology at SVEC focuses on the practical application of electronics and communication principles in modern technological solutions. Our department emphasizes hands-on learning and industry-oriented training to prepare students for careers in the fast-evolving technology sector.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We specialize in developing technical professionals who can bridge the gap between theoretical knowledge and practical implementation in electronics, telecommunications, and emerging technology domains.
          </p>
        </div>
      </div>
    ),
    Vision: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Vision</h3>
        <p className="text-gray-700 leading-relaxed">
          To be a premier department in Electronics & Communication Technology education, fostering innovation in technology applications, and developing skilled technical professionals who can contribute to technological advancement and industrial growth.
        </p>
      </div>
    ),
    Mission: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Mission</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>To provide practical and application-oriented education in Electronics & Communication Technology</li>
          <li>To promote hands-on learning and skill development in emerging technologies</li>
          <li>To develop technical professionals with strong practical skills and industry readiness</li>
          <li>To foster partnerships with industry for real-world project experiences and placements</li>
          <li>To contribute to technological development through innovation and practical solutions</li>
        </ul>
      </div>
    ),
    PEOs: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Program Educational Objectives (PEOs)</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800">PEO1:</h4>
            <p className="text-gray-700">Graduates will be successful technical professionals in electronics and communication technology fields, demonstrating practical competence and technical leadership.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PEO2:</h4>
            <p className="text-gray-700">Graduates will engage in continuous skill development to adapt to emerging technologies and contribute to innovation in technology applications.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PEO3:</h4>
            <p className="text-gray-700">Graduates will demonstrate professional ethics, effective teamwork, and communication skills in their technical careers.</p>
          </div>
        </div>
      </div>
    ),
    POs: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Program Outcomes (POs)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p><strong>PO1:</strong> Engineering Knowledge</p>
            <p><strong>PO2:</strong> Problem Analysis</p>
            <p><strong>PO3:</strong> Design/Development of Solutions</p>
            <p><strong>PO4:</strong> Conduct Investigation</p>
            <p><strong>PO5:</strong> Modern Tool Usage</p>
            <p><strong>PO6:</strong> Engineer and Society</p>
          </div>
          <div className="space-y-2">
            <p><strong>PO7:</strong> Environment and Sustainability</p>
            <p><strong>PO8:</strong> Ethics</p>
            <p><strong>PO9:</strong> Individual and Team Work</p>
            <p><strong>PO10:</strong> Communication</p>
            <p><strong>PO11:</strong> Project Management</p>
            <p><strong>PO12:</strong> Life-long Learning</p>
          </div>
        </div>
      </div>
    ),
    PSOs: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Program Specific Outcomes (PSOs)</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800">PSO1: Technology Application</h4>
            <p className="text-gray-700">Apply electronics and communication technology principles to implement practical solutions for real-world problems.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PSO2: System Implementation</h4>
            <p className="text-gray-700">Design, implement, and maintain electronic and communication systems using modern tools and technologies.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PSO3: Professional Competence</h4>
            <p className="text-gray-700">Demonstrate technical competence and professional skills required for successful careers in technology industries.</p>
          </div>
        </div>
      </div>
    ),
    COs: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Course Outcomes (COs)</h3>
        <p className="text-gray-700 mb-4">Upon completion of the program, students will be able to:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Technical Skills</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Understand and apply electronics and communication technology principles</li>
              <li>Implement electronic circuits and communication systems</li>
              <li>Use modern testing and measurement equipment</li>
              <li>Apply troubleshooting and maintenance techniques</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Practical Implementation</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Install and configure communication systems</li>
              <li>Develop embedded system applications</li>
              <li>Implement network and wireless communication solutions</li>
              <li>Apply quality control and testing procedures</li>
            </ul>
          </div>
        </div>
      </div>
    ),
    "Salient Features": (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Salient Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Practical Learning</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Hands-on training in modern electronics and communication technologies</li>
              <li>Industry-oriented curriculum with practical applications</li>
              <li>Project-based learning with real-world scenarios</li>
              <li>Regular industry visits and exposure programs</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Infrastructure</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Well-equipped laboratories with modern equipment</li>
              <li>Latest testing and measurement instruments</li>
              <li>Communication systems training setups</li>
              <li>Industry-standard software and simulation tools</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Industry Connect</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Strong partnerships with technology companies</li>
              <li>Internship programs with industry exposure</li>
              <li>Guest lectures by industry professionals</li>
              <li>Placement assistance and career guidance</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Skill Development</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Technical certification programs</li>
              <li>Soft skills and communication development</li>
              <li>Innovation and entrepreneurship programs</li>
              <li>Professional development workshops</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  };

  return <StandardDepartmentProfile hodInfo={hodInfo} departmentContent={departmentContent} />;
};

export default ECTDepartment;