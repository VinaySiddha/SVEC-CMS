import React from 'react';
import StandardDepartmentProfile from '../../components/StandardDepartmentProfile';

const ECEDepartment: React.FC = () => {
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
          <h3 className="text-xl font-bold text-[#B22222] mb-4">Department of Electronics & Communication Engineering</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Department of Electronics & Communication Engineering at SVEC is dedicated to advancing the frontiers of electronic systems, communication technologies, and signal processing. Our department combines theoretical knowledge with practical applications to prepare students for the rapidly evolving electronics and telecommunications industry.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We focus on developing innovative solutions in areas such as wireless communications, embedded systems, VLSI design, and digital signal processing, ensuring our graduates are well-equipped for successful careers in the electronics sector.
          </p>
        </div>
      </div>
    ),
    Vision: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Vision</h3>
        <p className="text-gray-700 leading-relaxed">
          To be a leading department in Electronics & Communication Engineering education and research, fostering innovation in electronic systems and communication technologies, and developing skilled engineers who can contribute to technological advancement and societal development.
        </p>
      </div>
    ),
    Mission: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Mission</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>To provide quality education in Electronics & Communication Engineering with emphasis on emerging technologies</li>
          <li>To promote research and innovation in electronics, communication systems, and signal processing</li>
          <li>To develop professionals with strong technical skills, analytical abilities, and ethical values</li>
          <li>To foster industry-academia collaboration for practical learning and technology transfer</li>
          <li>To contribute to society through technological innovations and sustainable solutions</li>
        </ul>
      </div>
    ),
    PEOs: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Program Educational Objectives (PEOs)</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800">PEO1:</h4>
            <p className="text-gray-700">Graduates will be successful in their professional careers in electronics and communication engineering, demonstrating technical competence and leadership in the field.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PEO2:</h4>
            <p className="text-gray-700">Graduates will engage in lifelong learning to adapt to emerging technologies and contribute to research, innovation, and development in electronics and communication systems.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PEO3:</h4>
            <p className="text-gray-700">Graduates will demonstrate professional ethics, effective communication skills, and social responsibility in their engineering practice.</p>
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
            <h4 className="font-semibold text-gray-800">PSO1: Electronics Design</h4>
            <p className="text-gray-700">Apply knowledge of electronics and communication engineering to design, analyze, and optimize electronic circuits and communication systems.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PSO2: Communication Systems</h4>
            <p className="text-gray-700">Design and implement modern communication systems using analog and digital signal processing techniques.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PSO3: Technology Integration</h4>
            <p className="text-gray-700">Integrate emerging technologies in electronics and communication engineering to develop innovative solutions for industry and society.</p>
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
            <h4 className="font-semibold text-gray-800 mb-2">Core Electronics Skills</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Understand fundamental principles of electronics and communication</li>
              <li>Design and analyze analog and digital electronic circuits</li>
              <li>Apply signal processing techniques for communication systems</li>
              <li>Implement microcontroller and embedded system applications</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Communication Technologies</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Design wireless and optical communication systems</li>
              <li>Implement digital communication protocols and standards</li>
              <li>Apply VLSI design principles for integrated circuits</li>
              <li>Utilize modern simulation and design tools</li>
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
            <h4 className="font-semibold text-gray-800 mb-3">Academic Excellence</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Comprehensive curriculum covering analog, digital, and communication systems</li>
              <li>Industry-relevant projects and hands-on laboratory experiences</li>
              <li>Research opportunities in emerging areas like IoT, 5G, and AI in electronics</li>
              <li>Regular workshops on latest tools and technologies</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Infrastructure</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>State-of-the-art electronics and communication laboratories</li>
              <li>Advanced simulation software and design tools</li>
              <li>Modern test and measurement equipment</li>
              <li>Dedicated VLSI design and embedded systems labs</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Industry Connect</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Strong partnerships with electronics and telecom companies</li>
              <li>Internship opportunities in leading technology firms</li>
              <li>Guest lectures by industry experts and researchers</li>
              <li>Collaborative research projects with industry partners</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Student Development</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Technical societies and student chapters (IEEE, IETE)</li>
              <li>Innovation challenges and design competitions</li>
              <li>Project exhibitions and technical presentations</li>
              <li>Professional development and certification programs</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  };

  return <StandardDepartmentProfile hodInfo={hodInfo} departmentContent={departmentContent} />;
};

export default ECEDepartment;