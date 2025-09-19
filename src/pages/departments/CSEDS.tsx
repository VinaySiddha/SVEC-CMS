import React from 'react';
import StandardDepartmentProfile from '../../components/StandardDepartmentProfile';

const CSEDSDepartment: React.FC = () => {
  const hodInfo = {
    name: "Dr. G. Loshma",
    designation: "Head of Department, CSE Data Science",
    education: "Ph.D., M.Tech, B.Tech",
    email: "hod_aim@svec.ac.in",
    imageUrl: "/aihod.jpg"
  };

  const departmentContent = {
    Department: (
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-[#B22222] mb-4">Department of Computer Science & Engineering (Data Science)</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Department of Computer Science & Engineering with specialization in Data Science at SVEC bridges the gap between computer science fundamentals and advanced data analytics. Our department focuses on developing professionals who can harness the power of big data, machine learning, and artificial intelligence within the broader context of computer science engineering.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We combine rigorous computer science education with specialized data science training, preparing students to become versatile engineers capable of building scalable data-driven solutions and intelligent systems.
          </p>
        </div>
      </div>
    ),
    Vision: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Vision</h3>
        <p className="text-gray-700 leading-relaxed">
          To be a leading department in Computer Science & Engineering with Data Science specialization, fostering innovation in data-driven technologies, and developing skilled engineers who can contribute to the digital transformation through advanced computing and data analytics solutions.
        </p>
      </div>
    ),
    Mission: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Mission</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>To provide comprehensive education in Computer Science & Engineering with specialized focus on Data Science and Analytics</li>
          <li>To promote research and innovation in data science applications, machine learning, and big data technologies</li>
          <li>To develop professionals with strong programming, analytical, and problem-solving skills</li>
          <li>To foster industry-academia collaboration for real-world data science projects and solutions</li>
          <li>To contribute to society through data-driven innovations and evidence-based technological solutions</li>
        </ul>
      </div>
    ),
    PEOs: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Program Educational Objectives (PEOs)</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800">PEO1:</h4>
            <p className="text-gray-700">Graduates will be successful in their professional careers as software engineers, data scientists, and technology leaders, demonstrating expertise in both computer science and data analytics.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PEO2:</h4>
            <p className="text-gray-700">Graduates will engage in continuous learning to adapt to emerging data science and computing technologies, contributing to research and innovation in the field.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PEO3:</h4>
            <p className="text-gray-700">Graduates will demonstrate ethical responsibility in data handling, effective communication of technical insights, and collaborative leadership in multidisciplinary teams.</p>
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
            <h4 className="font-semibold text-gray-800">PSO1: Computing & Data Integration</h4>
            <p className="text-gray-700">Apply computer science engineering principles combined with data science methodologies to develop comprehensive software and data solutions.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PSO2: Scalable System Development</h4>
            <p className="text-gray-700">Design and implement scalable computing systems and data pipelines using modern software engineering and big data technologies.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PSO3: Intelligent Solutions</h4>
            <p className="text-gray-700">Develop intelligent systems and applications that leverage machine learning, artificial intelligence, and advanced analytics for real-world problem solving.</p>
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
            <h4 className="font-semibold text-gray-800 mb-2">Computer Science Foundation</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Understand core computer science concepts and algorithms</li>
              <li>Develop software applications using multiple programming languages</li>
              <li>Design and implement database systems and web applications</li>
              <li>Apply software engineering methodologies and best practices</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Data Science Specialization</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Apply statistical methods and machine learning algorithms</li>
              <li>Work with big data technologies and cloud platforms</li>
              <li>Develop predictive models and analytics solutions</li>
              <li>Implement data visualization and business intelligence systems</li>
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
            <h4 className="font-semibold text-gray-800 mb-3">Integrated Curriculum</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Comprehensive computer science foundation with data science specialization</li>
              <li>Industry-aligned projects combining software development and data analytics</li>
              <li>Research opportunities in emerging areas like AI, ML, and big data</li>
              <li>Regular workshops on latest tools and technologies in both domains</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Advanced Infrastructure</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>State-of-the-art computer labs with high-performance computing facilities</li>
              <li>Advanced data analytics and machine learning software environments</li>
              <li>Access to cloud computing platforms and big data tools</li>
              <li>Modern development environments and collaboration tools</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Industry Partnerships</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Strong connections with tech companies and data-driven organizations</li>
              <li>Internship opportunities in software development and data science roles</li>
              <li>Guest lectures by industry experts from both computing and analytics domains</li>
              <li>Collaborative projects addressing real business and technical challenges</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Career Preparation</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Dual skill development in software engineering and data science</li>
              <li>Programming competitions, hackathons, and data science challenges</li>
              <li>Industry certifications in popular platforms and technologies</li>
              <li>Professional development programs for comprehensive skill building</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  };

  return <StandardDepartmentProfile hodInfo={hodInfo} departmentContent={departmentContent} />;
};

export default CSEDSDepartment;