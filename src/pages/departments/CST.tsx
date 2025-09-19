import React from 'react';
import StandardDepartmentProfile from '../../components/StandardDepartmentProfile';

const CSTDepartment: React.FC = () => {
  const hodInfo = {
    name: "Dr. D. Jaya Kumari",
    designation: "Head of Department, Computer Science & Engineering",
    education: "Ph.D. (Computer Science & Engineering), M.Tech (Computer Science & Engineering), B.Tech (Computer Science & Engineering)",
    email: "hod_cse@svec.ac.in",
    imageUrl: "/cse_hod1.jpeg"
  };

  const departmentContent = {
    Department: (
      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed">
          The Department of Computer Science and Technology was established in 2020 with the vision to bridge the gap between computer science fundamentals and emerging technological applications. The department focuses on providing students with comprehensive knowledge in computer science while emphasizing practical applications of modern technologies.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Our curriculum integrates core computer science concepts with contemporary technological trends, preparing students for diverse career opportunities in software development, system administration, cybersecurity, and emerging technology domains.
        </p>
      </div>
    ),
    Vision: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Vision</h3>
        <p className="text-gray-700 leading-relaxed">
          To be a premier department in Computer Science and Technology education, fostering innovation, research excellence, and developing competent professionals who can lead technological advancement and contribute to the digital transformation of society.
        </p>
      </div>
    ),
    Mission: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Mission</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>To provide quality education in computer science and technology with emphasis on practical applications</li>
          <li>To promote research and innovation in emerging technologies for societal benefit</li>
          <li>To develop professionals with strong technical skills, ethical values, and leadership qualities</li>
          <li>To foster industry-academia collaboration for knowledge transfer and technology development</li>
          <li>To contribute to the advancement of technology through research and entrepreneurship</li>
        </ul>
      </div>
    ),
    PEOs: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Program Educational Objectives (PEOs)</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800">PEO1:</h4>
            <p className="text-gray-700">Graduates will be successful in their professional careers in computer science and technology, demonstrating technical competence in designing and developing software systems and technological solutions.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PEO2:</h4>
            <p className="text-gray-700">Graduates will engage in lifelong learning to adapt to emerging technologies and contribute to research and development in computer science and technology fields.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PEO3:</h4>
            <p className="text-gray-700">Graduates will demonstrate professional ethics, effective communication, and teamwork skills while contributing to technological innovation and societal development.</p>
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
            <h4 className="font-semibold text-gray-800">PSO1: Software Development</h4>
            <p className="text-gray-700">Design, develop, and maintain software applications using modern programming languages, frameworks, and development methodologies.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PSO2: Technology Integration</h4>
            <p className="text-gray-700">Integrate emerging technologies and platforms to create innovative solutions for complex computational problems.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PSO3: System Administration</h4>
            <p className="text-gray-700">Configure, manage, and optimize computer systems, networks, and technological infrastructure for organizational needs.</p>
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
            <h4 className="font-semibold text-gray-800 mb-2">Core Technologies</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Develop applications using various programming languages</li>
              <li>Design and implement database systems</li>
              <li>Create web and mobile applications</li>
              <li>Implement cybersecurity measures and protocols</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Advanced Applications</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Deploy cloud computing solutions</li>
              <li>Implement IoT and embedded systems</li>
              <li>Develop distributed and parallel computing systems</li>
              <li>Apply machine learning in technological solutions</li>
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
              <li>Industry-aligned curriculum with latest technological trends</li>
              <li>Hands-on projects using cutting-edge technologies</li>
              <li>Research opportunities in emerging technology areas</li>
              <li>Regular technical competitions and hackathons</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Infrastructure</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>State-of-the-art computer laboratories</li>
              <li>Access to latest software development tools</li>
              <li>High-speed internet and cloud computing access</li>
              <li>Specialized labs for cybersecurity and networking</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Industry Connect</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Strong partnerships with technology companies</li>
              <li>Excellent placement record with IT and tech firms</li>
              <li>Industry mentorship and internship programs</li>
              <li>Guest lectures by industry experts</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Student Development</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Professional certification programs</li>
              <li>Technical workshops and seminars</li>
              <li>Student clubs for technology innovation</li>
              <li>Entrepreneurship development programs</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  };

  return <StandardDepartmentProfile hodInfo={hodInfo} departmentContent={departmentContent} />;
};

export default CSTDepartment;