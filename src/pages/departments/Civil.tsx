import React from 'react';
import StandardDepartmentProfile from '../../components/StandardDepartmentProfile';

const CivilDepartment: React.FC = () => {
  const hodInfo = {
    name: "Dr. G. Radhakrishnan",
    designation: "Professor & Head of the Department",
    education: "M.E., Ph.D. (Civil Engineering)",
    email: "hod_civil@svec.ac.in",
    phone: "08818-284355(O)-(Ext.-423)",
    imageUrl: "/civilhod.png"
  };

  const departmentContent = {
    Department: (
      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed">
          The Department of Civil Engineering was established in 2001 with the vision to provide quality education and produce competent civil engineers. The department offers undergraduate program in Civil Engineering with a strong focus on structural engineering, environmental engineering, transportation engineering, and geotechnical engineering.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Our department is committed to developing skilled professionals who can contribute to the infrastructure development of the nation while maintaining environmental sustainability.
        </p>
      </div>
    ),
    Vision: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Vision</h3>
        <p className="text-gray-700 leading-relaxed">
          To be a premier department of Civil Engineering recognized for excellence in education, research, and innovation, producing competent professionals who contribute to sustainable infrastructure development and societal needs.
        </p>
      </div>
    ),
    Mission: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Mission</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>To provide quality education in Civil Engineering with emphasis on practical applications and emerging technologies</li>
          <li>To promote research and innovation in the field of civil engineering for sustainable development</li>
          <li>To develop professionals with strong technical skills, ethical values, and leadership qualities</li>
          <li>To foster industry-academia collaboration for knowledge transfer and technology development</li>
          <li>To contribute to society through infrastructure development and environmental protection</li>
        </ul>
      </div>
    ),
    PEOs: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Program Educational Objectives (PEOs)</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800">PEO1:</h4>
            <p className="text-gray-700">Graduates will be successful in their professional careers in civil engineering, demonstrating technical competence in design, construction, and management of infrastructure projects.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PEO2:</h4>
            <p className="text-gray-700">Graduates will engage in lifelong learning to adapt to emerging technologies and contribute to research and development in civil engineering.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PEO3:</h4>
            <p className="text-gray-700">Graduates will demonstrate professional ethics, effective communication, and teamwork skills while contributing to sustainable development and societal welfare.</p>
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
            <h4 className="font-semibold text-gray-800">PSO1: Structural Design & Analysis</h4>
            <p className="text-gray-700">Apply principles of structural engineering to design and analyze various civil engineering structures using modern tools and techniques.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PSO2: Infrastructure Development</h4>
            <p className="text-gray-700">Plan, design, and manage infrastructure projects including transportation systems, water resources, and urban development.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PSO3: Sustainable Engineering</h4>
            <p className="text-gray-700">Apply sustainable engineering practices and environmental considerations in civil engineering projects for societal benefit.</p>
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
            <h4 className="font-semibold text-gray-800 mb-2">Core Engineering Skills</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Design and analyze structural systems</li>
              <li>Plan and manage construction projects</li>
              <li>Apply geotechnical engineering principles</li>
              <li>Design transportation infrastructure</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Specialized Applications</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Design water resources and environmental systems</li>
              <li>Apply building information modeling (BIM)</li>
              <li>Implement sustainable construction practices</li>
              <li>Conduct engineering surveys and site investigations</li>
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
              <li>Comprehensive curriculum covering all civil engineering domains</li>
              <li>Industry-oriented practical training and projects</li>
              <li>Research opportunities in structural and environmental engineering</li>
              <li>Regular site visits and industrial exposure</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Infrastructure</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Well-equipped laboratories for concrete, soil, and survey testing</li>
              <li>Advanced software for structural design and analysis</li>
              <li>Modern surveying instruments and equipment</li>
              <li>Project-based learning environments</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Industry Connect</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Strong partnerships with construction companies</li>
              <li>Excellent placement record in core civil engineering companies</li>
              <li>Regular guest lectures by industry experts</li>
              <li>Collaborative projects with construction industry</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Student Development</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Professional certification programs</li>
              <li>Technical competitions and project exhibitions</li>
              <li>Student chapters of professional societies</li>
              <li>Entrepreneurship development programs</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  };

  return <StandardDepartmentProfile hodInfo={hodInfo} departmentContent={departmentContent} />;
};

export default CivilDepartment;