import React from 'react';
import StandardDepartmentProfile from '../../components/StandardDepartmentProfile';

const MBADepartment: React.FC = () => {
  const hodInfo = {
    name: "Mr. D.Naveen Kumar",
    designation: "Professor & Head of the Department",
    education: "Ph.D, MBA , B.Com",
    email: "hod.mba@svec.ac.in",
    phone: "08818-284355(O)-(Ext.-448)",
    imageUrl: "/mbaHosd1.jpeg"
  };

  const departmentContent = {
    Department: (
      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed">
          The Department of Master of Business Administration was established in 2010 with the vision to develop competent management professionals who can lead organizations in the dynamic business environment. The department focuses on providing comprehensive management education that combines theoretical knowledge with practical business applications.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Our curriculum is designed to develop leadership skills, strategic thinking, and ethical business practices, preparing students for successful careers in various management domains including finance, marketing, human resources, and operations.
        </p>
      </div>
    ),
    Vision: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Vision</h3>
        <p className="text-gray-700 leading-relaxed">
          To be a leading business school that develops innovative and ethical leaders who can drive organizational excellence and contribute to sustainable business growth in the global economy.
        </p>
      </div>
    ),
    Mission: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Mission</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>To provide quality management education with emphasis on practical business applications</li>
          <li>To develop management professionals with strong leadership skills and ethical values</li>
          <li>To foster entrepreneurship and innovation in business practices</li>
          <li>To promote research in management and contribute to business knowledge</li>
          <li>To build strong industry-academia partnerships for holistic learning</li>
        </ul>
      </div>
    ),
    PEOs: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Program Educational Objectives (PEOs)</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800">PEO1:</h4>
            <p className="text-gray-700">Graduates will be successful in their management careers, demonstrating leadership skills and strategic thinking in various business functions and organizational contexts.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PEO2:</h4>
            <p className="text-gray-700">Graduates will engage in lifelong learning to adapt to changing business environments and contribute to organizational growth and innovation.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PEO3:</h4>
            <p className="text-gray-700">Graduates will demonstrate ethical business practices, effective communication, and social responsibility while contributing to sustainable business development.</p>
          </div>
        </div>
      </div>
    ),
    POs: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Program Outcomes (POs)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p><strong>PO1:</strong> Business Knowledge</p>
            <p><strong>PO2:</strong> Problem Solving & Decision Making</p>
            <p><strong>PO3:</strong> Strategic Planning & Implementation</p>
            <p><strong>PO4:</strong> Research & Analysis</p>
            <p><strong>PO5:</strong> Technology Integration</p>
            <p><strong>PO6:</strong> Global Business Perspective</p>
          </div>
          <div className="space-y-2">
            <p><strong>PO7:</strong> Ethical Leadership</p>
            <p><strong>PO8:</strong> Communication Skills</p>
            <p><strong>PO9:</strong> Team Management</p>
            <p><strong>PO10:</strong> Entrepreneurship</p>
            <p><strong>PO11:</strong> Project Management</p>
            <p><strong>PO12:</strong> Continuous Learning</p>
          </div>
        </div>
      </div>
    ),
    PSOs: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Program Specific Outcomes (PSOs)</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800">PSO1: Business Leadership</h4>
            <p className="text-gray-700">Demonstrate effective leadership and management skills to lead teams and organizations in achieving business objectives and sustainable growth.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PSO2: Strategic Management</h4>
            <p className="text-gray-700">Apply strategic thinking and analytical skills to formulate and implement business strategies in dynamic market conditions.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PSO3: Business Innovation</h4>
            <p className="text-gray-700">Foster innovation and entrepreneurship to develop new business models and solutions for contemporary business challenges.</p>
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
            <h4 className="font-semibold text-gray-800 mb-2">Core Management Skills</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Apply principles of management and organizational behavior</li>
              <li>Develop and implement marketing strategies and campaigns</li>
              <li>Manage financial resources and investment decisions</li>
              <li>Design and optimize operational processes</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Advanced Applications</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Conduct market research and business analytics</li>
              <li>Develop business plans and entrepreneurial ventures</li>
              <li>Lead cross-functional teams and projects</li>
              <li>Apply digital marketing and e-business strategies</li>
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
              <li>Industry-relevant curriculum with case study methodology</li>
              <li>Real-world business projects and consulting assignments</li>
              <li>Research opportunities in contemporary business issues</li>
              <li>Regular business plan competitions and case competitions</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Infrastructure</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Modern classrooms with audio-visual facilities</li>
              <li>Business simulation software and databases</li>
              <li>Well-equipped library with business journals</li>
              <li>Computer lab with latest business software</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Industry Connect</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Strong partnerships with leading corporations</li>
              <li>Excellent placement record with diverse industries</li>
              <li>Industry mentorship and internship programs</li>
              <li>Guest lectures by industry leaders and entrepreneurs</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Student Development</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Professional development and soft skills training</li>
              <li>Management workshops and leadership development</li>
              <li>Student clubs for finance, marketing, and entrepreneurship</li>
              <li>Industry visits and corporate interactions</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  };

  return <StandardDepartmentProfile hodInfo={hodInfo} departmentContent={departmentContent} />;
};

export default MBADepartment;