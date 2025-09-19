import React from 'react';
import StandardDepartmentProfile from '../../components/StandardDepartmentProfile';

const CSEAIDepartment: React.FC = () => {
  const hodInfo = {
    name: "Dr. G. Loshma",
    designation: "Professor & Head of the Department",
    education: "Ph.D.",
    email: "hod_aim@srivasaviengg.ac.in",
    imageUrl: "/images/hod_aim.jpg" // Update with actual image path if available
  };

  const departmentContent = {
    Department: (
      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed">
          The Department of Computer Science and Engineering (Artificial Intelligence) was established in 2021 with the vision to provide cutting-edge education in artificial intelligence and machine learning. The department focuses on developing skilled professionals who can lead the AI revolution across industries.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Our curriculum is designed to provide comprehensive knowledge in AI, ML, deep learning, data science, and emerging technologies, preparing students for successful careers in the rapidly evolving tech industry.
        </p>
      </div>
    ),
    Vision: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Vision</h3>
        <p className="text-gray-700 leading-relaxed">
          To be a leading department in Computer Science and Engineering (Artificial Intelligence) education, fostering innovation, research excellence, and developing world-class professionals who can drive technological advancement and contribute to solving global challenges through AI solutions.
        </p>
      </div>
    ),
    Mission: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Mission</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>To provide quality education in artificial intelligence and machine learning with emphasis on practical applications</li>
          <li>To promote research and innovation in AI/ML technologies for societal benefit</li>
          <li>To develop professionals with strong technical skills, ethical values, and leadership qualities in AI domain</li>
          <li>To foster industry-academia collaboration for knowledge transfer and technology development</li>
          <li>To contribute to the advancement of AI technology through research and entrepreneurship</li>
        </ul>
      </div>
    ),
    PEOs: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Program Educational Objectives (PEOs)</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800">PEO1:</h4>
            <p className="text-gray-700">Graduates will be successful in their professional careers in AI/ML engineering, demonstrating technical competence in designing and developing intelligent systems and AI-driven solutions.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PEO2:</h4>
            <p className="text-gray-700">Graduates will engage in lifelong learning to adapt to emerging AI technologies and contribute to research and development in artificial intelligence and machine learning.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PEO3:</h4>
            <p className="text-gray-700">Graduates will demonstrate professional ethics, effective communication, and teamwork skills while contributing to technological innovation and societal development through AI applications.</p>
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
            <h4 className="font-semibold text-gray-800">PSO1: AI System Development</h4>
            <p className="text-gray-700">Apply artificial intelligence and machine learning algorithms to design, develop, and deploy intelligent systems for real-world applications.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PSO2: Data Science & Analytics</h4>
            <p className="text-gray-700">Analyze large datasets using advanced data science techniques and extract meaningful insights for decision-making processes.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PSO3: Innovation in AI</h4>
            <p className="text-gray-700">Apply emerging AI technologies and research methodologies to develop innovative solutions for complex technological and societal challenges.</p>
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
            <h4 className="font-semibold text-gray-800 mb-2">AI & ML Fundamentals</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Implement machine learning algorithms and models</li>
              <li>Design and develop neural networks and deep learning systems</li>
              <li>Apply natural language processing techniques</li>
              <li>Develop computer vision applications</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Advanced Technologies</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Build intelligent agents and robotics systems</li>
              <li>Implement big data analytics and cloud computing solutions</li>
              <li>Develop AI-powered web and mobile applications</li>
              <li>Apply AI ethics and explainable AI principles</li>
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
              <li>Comprehensive AI/ML curriculum with latest industry trends</li>
              <li>Hands-on projects using real-world datasets</li>
              <li>Research opportunities in cutting-edge AI technologies</li>
              <li>Regular hackathons and coding competitions</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Infrastructure</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>State-of-the-art AI/ML laboratories with GPU computing</li>
              <li>Access to premium AI software and cloud platforms</li>
              <li>High-performance computing clusters for research</li>
              <li>Specialized labs for robotics and computer vision</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Industry Connect</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Strong partnerships with AI/ML companies and startups</li>
              <li>Excellent placement record with top tech companies</li>
              <li>Industry mentorship and internship programs</li>
              <li>Collaborative research projects with industry leaders</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Student Development</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>AI/ML certification programs and workshops</li>
              <li>Student research publications and conferences</li>
              <li>Technical clubs and AI innovation challenges</li>
              <li>Entrepreneurship development in AI domain</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  };

  return <StandardDepartmentProfile hodInfo={hodInfo} departmentContent={departmentContent} />;
};

export default CSEAIDepartment;