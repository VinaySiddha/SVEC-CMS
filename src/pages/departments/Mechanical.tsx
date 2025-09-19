import React from 'react';
import StandardDepartmentProfile from '../../components/StandardDepartmentProfile';

const MechanicalDepartment: React.FC = () => {
  const hodInfo = {
    name: "Dr. M.v.Ramesh",
    designation: "Head of Department, Mechanical Engineering",
    education: "Ph.D, M.Tech, B.Tech",
    email: "hod.mechanical@svec.ac.in",
    imageUrl: "/mechhod.jpg"
  };

  const departmentContent = {
    Department: (
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-[#B22222] mb-4">Department of Mechanical Engineering</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Department of Mechanical Engineering at SVEC is dedicated to providing comprehensive education in mechanical engineering fundamentals while embracing modern technologies and innovative practices. Our department focuses on thermal systems, manufacturing, design, robotics, and sustainable engineering solutions.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We prepare students to excel in diverse fields of mechanical engineering, from traditional manufacturing to cutting-edge areas like automation, renewable energy systems, and advanced materials engineering.
          </p>
        </div>
      </div>
    ),
    Vision: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Vision</h3>
        <p className="text-gray-700 leading-relaxed">
          To be a premier department in Mechanical Engineering education and research, fostering innovation in mechanical systems, manufacturing technologies, and sustainable engineering, and developing skilled engineers who can contribute to industrial advancement and societal development.
        </p>
      </div>
    ),
    Mission: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Mission</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>To provide quality education in Mechanical Engineering with emphasis on emerging technologies and innovation</li>
          <li>To promote research and development in mechanical systems, manufacturing, and sustainable technologies</li>
          <li>To develop professionals with strong technical competencies, design thinking, and ethical values</li>
          <li>To foster industry-academia partnerships for practical learning and technology transfer</li>
          <li>To contribute to society through technological innovations and sustainable engineering solutions</li>
        </ul>
      </div>
    ),
    PEOs: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Program Educational Objectives (PEOs)</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800">PEO1:</h4>
            <p className="text-gray-700">Graduates will be successful in their professional careers in mechanical engineering and related fields, demonstrating technical competence and leadership in design, manufacturing, and systems engineering.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PEO2:</h4>
            <p className="text-gray-700">Graduates will engage in lifelong learning to adapt to emerging technologies and contribute to research, innovation, and development in mechanical engineering.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PEO3:</h4>
            <p className="text-gray-700">Graduates will demonstrate professional ethics, environmental consciousness, and effective communication and teamwork skills in their engineering practice.</p>
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
            <h4 className="font-semibold text-gray-800">PSO1: Design & Manufacturing</h4>
            <p className="text-gray-700">Apply knowledge of mechanical engineering to design, analyze, and manufacture mechanical systems and components using modern tools and techniques.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PSO2: Thermal & Energy Systems</h4>
            <p className="text-gray-700">Design and optimize thermal systems, energy conversion devices, and sustainable energy solutions for various applications.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PSO3: Innovation & Technology</h4>
            <p className="text-gray-700">Integrate emerging technologies like automation, robotics, and advanced materials to develop innovative mechanical engineering solutions.</p>
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
            <h4 className="font-semibold text-gray-800 mb-2">Core Mechanical Skills</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Understand fundamental principles of mechanical engineering</li>
              <li>Analyze and design mechanical systems and components</li>
              <li>Apply thermodynamics and heat transfer principles</li>
              <li>Implement manufacturing processes and quality control</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Advanced Applications</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Design automation and control systems</li>
              <li>Apply CAD/CAM and simulation tools</li>
              <li>Develop renewable energy and sustainable systems</li>
              <li>Utilize modern materials and manufacturing technologies</li>
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
              <li>Comprehensive curriculum covering all areas of mechanical engineering</li>
              <li>Industry-relevant projects in design, manufacturing, and thermal systems</li>
              <li>Research opportunities in emerging areas like robotics and automation</li>
              <li>Regular workshops on latest tools and manufacturing technologies</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Infrastructure</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>State-of-the-art manufacturing and thermal engineering laboratories</li>
              <li>Advanced CAD/CAM facilities and simulation software</li>
              <li>Modern testing and measurement equipment</li>
              <li>Robotics and automation laboratory setups</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Industry Connect</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Strong partnerships with manufacturing and automotive companies</li>
              <li>Internship opportunities in leading industrial organizations</li>
              <li>Guest lectures by industry experts and engineers</li>
              <li>Collaborative projects with manufacturing industries</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Student Development</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Professional societies and student chapters (ASME, SAE)</li>
              <li>Design competitions and innovation challenges</li>
              <li>Technical symposiums and project exhibitions</li>
              <li>Professional development and certification programs</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  };

  return <StandardDepartmentProfile hodInfo={hodInfo} departmentContent={departmentContent} />;
};

export default MechanicalDepartment;