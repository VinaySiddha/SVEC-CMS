import React from 'react';
import StandardDepartmentProfile from '../../components/StandardDepartmentProfile';

const EEEDepartment: React.FC = () => {
  const hodInfo = {
    name: "Dr. D. Sudha Rani",
    designation: "Head of Department, Electrical & Electronics Engineering",
    education: "Ph.D, M.Tech, B.Tech ",
    email: "hod.eee@svec.ac.in",
    imageUrl: "/eeehod.jpg"
  };

  const departmentContent = {
    Department: (
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-[#B22222] mb-4">Department of Electrical & Electronics Engineering</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Department of Electrical & Electronics Engineering at SVEC is committed to excellence in electrical engineering education, focusing on power systems, control systems, power electronics, and renewable energy technologies. Our department prepares students to address the growing energy demands and technological challenges of the modern world.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We emphasize both theoretical foundations and practical applications, ensuring our graduates are well-equipped to contribute to the electrical and power industry, with special focus on sustainable and smart grid technologies.
          </p>
        </div>
      </div>
    ),
    Vision: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Vision</h3>
        <p className="text-gray-700 leading-relaxed">
          To be a leading department in Electrical & Electronics Engineering education and research, fostering innovation in power systems, renewable energy, and smart technologies, and developing skilled engineers who can contribute to sustainable energy solutions and technological advancement.
        </p>
      </div>
    ),
    Mission: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Mission</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>To provide quality education in Electrical & Electronics Engineering with emphasis on emerging technologies</li>
          <li>To promote research and innovation in power systems, renewable energy, and smart grid technologies</li>
          <li>To develop professionals with strong technical competencies, analytical skills, and ethical values</li>
          <li>To foster industry-academia collaboration for sustainable energy solutions and technology transfer</li>
          <li>To contribute to society through technological innovations in electrical and energy systems</li>
        </ul>
      </div>
    ),
    PEOs: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Program Educational Objectives (PEOs)</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800">PEO1:</h4>
            <p className="text-gray-700">Graduates will be successful in their professional careers in electrical and electronics engineering, demonstrating technical competence and leadership in power systems and related fields.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PEO2:</h4>
            <p className="text-gray-700">Graduates will engage in lifelong learning to adapt to emerging technologies and contribute to research, innovation, and development in electrical engineering.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PEO3:</h4>
            <p className="text-gray-700">Graduates will demonstrate professional ethics, environmental consciousness, and effective communication skills in their engineering practice.</p>
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
            <h4 className="font-semibold text-gray-800">PSO1: Power Systems</h4>
            <p className="text-gray-700">Apply knowledge of electrical engineering to design, analyze, and optimize power generation, transmission, and distribution systems.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PSO2: Control & Automation</h4>
            <p className="text-gray-700">Design and implement control systems and automation solutions for electrical and industrial applications.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PSO3: Sustainable Technology</h4>
            <p className="text-gray-700">Integrate renewable energy technologies and smart grid solutions to develop sustainable electrical systems.</p>
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
            <h4 className="font-semibold text-gray-800 mb-2">Core Electrical Skills</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Understand fundamental principles of electrical and electronics engineering</li>
              <li>Analyze and design electrical circuits and power systems</li>
              <li>Apply power electronics and control system principles</li>
              <li>Implement electrical machines and drive systems</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Specialized Applications</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Design renewable energy and smart grid systems</li>
              <li>Implement protection and automation systems</li>
              <li>Apply high voltage engineering principles</li>
              <li>Utilize modern simulation and analysis tools</li>
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
              <li>Comprehensive curriculum covering traditional and emerging electrical technologies</li>
              <li>Industry-relevant projects focusing on power systems and renewable energy</li>
              <li>Research opportunities in smart grids, renewable energy, and power electronics</li>
              <li>Regular workshops on latest electrical engineering tools and standards</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Infrastructure</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>State-of-the-art electrical machines and power systems laboratories</li>
              <li>Advanced power electronics and control systems labs</li>
              <li>High voltage engineering and protection testing facilities</li>
              <li>Modern simulation software and design tools</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Industry Connect</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Strong partnerships with power utilities and electrical companies</li>
              <li>Internship opportunities in power plants and electrical industries</li>
              <li>Guest lectures by industry experts and power system professionals</li>
              <li>Collaborative research projects with electrical utilities</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Student Development</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Professional societies and student chapters (IEEE, IEI)</li>
              <li>Innovation challenges and design competitions</li>
              <li>Technical symposiums and paper presentations</li>
              <li>Professional development and certification programs</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  };

  return <StandardDepartmentProfile hodInfo={hodInfo} departmentContent={departmentContent} />;
};

export default EEEDepartment;