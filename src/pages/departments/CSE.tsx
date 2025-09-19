import React from 'react';
import StandardDepartmentProfile from '../../components/StandardDepartmentProfile';

const CSEDepartment: React.FC = () => {
  const hodInfo = {
    name: "Dr. D. Jaya Kumari",
    designation: "Head of Department, Computer Science & Engineering",
    education: "Ph.D. (Computer Science & Engineering), M.Tech (Computer Science & Engineering), B.Tech (Computer Science & Engineering)",
    email: "hod_cse@svec.ac.in",
    imageUrl: "/cse_hod1.jpeg"
  };

  const departmentContent = {
    Department: (
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-[#B22222] mb-4">Department of Computer Science & Engineering</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Department of Computer Science & Engineering at SVEC is one of the premier departments, committed to excellence in computer science education and research. Our department focuses on providing comprehensive knowledge in core computer science areas while embracing emerging technologies.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We prepare students to excel in software development, system design, artificial intelligence, data science, and cutting-edge research areas, ensuring they are well-equipped for successful careers in the technology industry.
          </p>
        </div>
      </div>
    ),
    Vision: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Vision</h3>
        <p className="text-gray-700 leading-relaxed">
          To be a leading department in Computer Science & Engineering education and research, fostering innovation, technological advancement, and developing skilled computer science professionals who can contribute to the digital transformation of society and industry.
        </p>
      </div>
    ),
    Mission: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Mission</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>To provide quality education in Computer Science & Engineering with emphasis on emerging technologies</li>
          <li>To promote research and innovation in computer science and information technology</li>
          <li>To develop professionals with strong programming skills, analytical thinking, and ethical values</li>
          <li>To foster industry-academia collaboration for practical learning and technology transfer</li>
          <li>To contribute to society through technological innovations and digital solutions</li>
        </ul>
      </div>
    ),
    PEOs: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Program Educational Objectives (PEOs)</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800">PEO1:</h4>
            <p className="text-gray-700">Graduates will be successful in their professional careers in computer science and engineering, demonstrating technical competence and leadership in software development and technology innovation.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PEO2:</h4>
            <p className="text-gray-700">Graduates will engage in lifelong learning to adapt to emerging technologies and contribute to research and development in computer science.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PEO3:</h4>
            <p className="text-gray-700">Graduates will demonstrate professional ethics, effective communication, and teamwork skills while contributing to societal development through technology.</p>
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
            <p className="text-gray-700">Apply software engineering principles and programming skills to design, develop, and maintain complex software systems.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PSO2: System Analysis & Design</h4>
            <p className="text-gray-700">Analyze computational problems and design efficient algorithms and data structures to solve real-world challenges.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PSO3: Technology Innovation</h4>
            <p className="text-gray-700">Apply emerging technologies and research methodologies to develop innovative solutions in computer science and engineering.</p>
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
            <h4 className="font-semibold text-gray-800 mb-2">Programming & Development</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Master multiple programming languages and paradigms</li>
              <li>Develop efficient algorithms and data structures</li>
              <li>Design and implement software applications</li>
              <li>Apply software engineering methodologies</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Systems & Technologies</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Design and manage database systems</li>
              <li>Implement network and distributed systems</li>
              <li>Apply machine learning and AI techniques</li>
              <li>Develop web and mobile applications</li>
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
              <li>Comprehensive curriculum covering all areas of computer science</li>
              <li>Industry-oriented projects and internship programs</li>
              <li>Research opportunities in AI, ML, IoT, and emerging technologies</li>
              <li>Regular workshops and seminars by industry experts</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Infrastructure</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>State-of-the-art computer laboratories with latest hardware</li>
              <li>Advanced software development environments and tools</li>
              <li>High-speed internet and cloud computing access</li>
              <li>Dedicated research labs for specialized areas</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Industry Connect</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Strong partnerships with leading IT companies</li>
              <li>Excellent placement record with top-tier companies</li>
              <li>Regular industry interaction and guest lectures</li>
              <li>Collaborative research projects with industry partners</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Student Development</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Technical clubs and coding competitions</li>
              <li>Hackathons and innovation challenges</li>
              <li>Student research publications and conferences</li>
              <li>Soft skills and personality development programs</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  };

  return <StandardDepartmentProfile hodInfo={hodInfo} departmentContent={departmentContent} />;
};

export default CSEDepartment;