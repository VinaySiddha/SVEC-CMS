
import React, { useState } from 'react';
import { Brain, BookOpen, Award, ExternalLink, Menu, ChevronRight, Cpu, Users, Briefcase, FileText, Building, Library, Link as LinkIcon, Activity, Trophy, Newspaper, Handshake, Calendar, GraduationCap, Phone } from 'lucide-react';

const CSEAIDepartment: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');
  const [activeDeptTab, setActiveDeptTab] = useState('Department');

  const sidebarItems = [
    'Department Profile', 'Faculty Profiles', 'Board of Studies', 'Syllabus', 'Physical Facilities', 'Department Library', 'MoUs', 'Faculty Development Programs', 'Faculty Achievements', 'Workshops', 'Student Achievements', 'Placements', 'Academic Toppers', 'Technical Association', 'Newsletters', 'Extra-Curricular Activities', 'Hackathons', 'Handbooks', 'Contact'
  ];

  const faculty = [
    { name: "Dr. G .Loshma", qualification: "B.E,M.Tech,ph.D", designation: "Professor & HOD", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CAI_Dr.G.Loshma.pdf" },
    { name: "Mr. R.L.Phani Kumar", qualification: "M.Tech", designation: "Sr. Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CAI_R.L.%20Phani%20Kumar.pdf" },
    { name: "Mrs. P. Ujwala Sai", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CAI_P.%20Ujwala.pdf" },
    { name: "Ms. M. Kiranmai", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CAI_Ms.%20M.%20Kiranmai.pdf" },
    { name: "Mr .V. Thinakaran", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CAI_Mr%20.V.%20Thinakaran.pdf" },
    { name: "Mr. P Seshu Kumar", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CAI_Mr.%20P%20Seshu%20Kumar.pdf" },
    { name: "Mr. Reddy Chaitanya A", qualification: "M.Tech.,Ph.D", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CAI_Mr.%20Reddy%20Chaitanya%20A.pdf" },
    { name: "Mr.E. Elumalai M", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CAI_Mr.E.%20Elumalai%20M.pdf" },
    { name: "Mr. Kasilingam N", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CAI_Mr.%20Kasilingam%20N.pdf" },
    { name: "Mr.Nisanth N S", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CAI_Mr.Nisanth%20N%20S.pdf" },
    { name: "Mr. M.Sreenivasulu", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CAI_Mr.%20M.Sreenivasulu.pdf" },
    { name: "Mr. S.Sridhar", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CAI_Mr.%20S.Sridhar.pdf" },
    { name: "Mr. V. Jayaramakrishna", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CAI_Mr.%20V.%20Jayaramakrishna.pdf" }
  ];

  const nonTeachingFaculty = [
    { name: "Mr. K.N. Suresh", designation: "System Admin" },
    { name: "Mr. K.V Srinivasa Rao", designation: "Hardware Technician" },
    { name: "Mr. G.Bhanu Prakash", designation: "Hardware Technician" },
    { name: "Mr. N.RajaseKhar", designation: "Junior Assistant" },
    { name: "Mr. P.Manikanta Gupta", designation: "Lab Assistant" },
    { name: "Mrs. P.Harika", designation: "Computer Lab Assistant" },
    { name: "Mr.Md.Arriff", designation: "Computer Lab Assistant" },
    { name: "Mr. P.Lokesh Reddy", designation: "Lab Technician" },
    { name: "Ms. M.Naga Harika", designation: "Lab Technician" },
    { name: "Mr.S.Nagaraju", designation: "Programmer" },
    { name: "Ms. BNG Lakshmi Durga", designation: "Programmer" }
  ];

  const boardOfStudies = [
    { name: "Dr.G.Loshma", designation: "Professor & HOD", organization: "SVEC", position: "Chairperson" },
    { name: "Dr. D Haritha", designation: "Professor & HOD of CSE", organization: "UCEK,JNTUK", position: "University Nominee" },
    { name: "Dr. Nagesh Bhattu Sristy", designation: "Assistant Professor,Department of CSE", organization: "NIT-AP", position: "Academic Expert" },
    { name: "Dr. K.Venkata Rao", designation: "Professor,Department of CS&SE", organization: "AU College of Engineering,Visakhapatnam", position: "Academic Expert" },
    { name: "Mbm Raju", designation: "Head,Strategic Initiatives and Isu/Branch Operations", organization: "Tata Consultancy Services", position: "Industry Expert" },
    { name: "Mr.Vinay Kumar", designation: "Director", organization: "XpertBridge,Hyderabad", position: "Industry Expert" },
    { name: "Mr.M jana Surya Prakasha Rao", designation: "BI Technical Consultant", organization: "Pragmasyns consulting LLP Gurgaon", position: "Alumni" },
    { name: "All the Faculty Members in the CSE(AI) Dept.", designation: "Members in BOS", organization: "", position: "" }
  ];

  const labs = [
    { name: "James Gosling Lab", image: "/images/departments/cai/James Gosling Lab.jpg" },
    { name: "EF Codd Lab", image: "/images/departments/cai/E F Codd LAb.jpg" },
    { name: "Linus Torvalds Lab", image: "/images/departments/cai/Linus Torvalds Lab.jpg" },
    { name: "Yellow Lab", image: "/images/departments/cai/Yellow Lab.jpg" },
    { name: "Pink Lab", image: "/images/departments/cai/Pink Lab.jpg" },
    { name: "Orange Lab", image: "/images/departments/cai/Orange Lab.jpg" },
    { name: "Green Lab", image: "/images/departments/cai/Green Lab.jpg" },
    { name: "Brown Lab", image: "/images/departments/cai/Brown Lab.jpg" },
    { name: "PG CP Lab", image: "/images/departments/cai/pgcplab.jpg" },
    { name: "R&D Lab", image: "/images/departments/cai/Sartaj Sahni Lab.jpg" },
  ];

  const renderDeptTabContent = () => {
    switch (activeDeptTab) {
      case 'Department':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="relative">
                <img
                  src="/aihod.jpg"
                  alt="Dr. G. Loshma"
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                />
              </div>
              <div className="lg:col-span-2 space-y-4">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-[#B22222] mb-2">Dr. G. Loshma</h3>
                  <p className="text-lg text-[#8B0000] font-medium mb-2">Professor & Head of Department, CSE(AI)</p>
                  <p className="text-gray-600">Ph.D in Computer Science</p>
                  <p className="text-gray-600">Email: <a href="mailto:hod_cai@srivasaviengg.ac.in" className="text-primary hover:underline">hod_cai@srivasaviengg.ac.in</a></p>
                </div>
                <blockquote className="text-gray-700 italic border-l-4 border-[#B22222] pl-4">
                  "Artificial Intelligence is not just the future - it's the present reality transforming every aspect of human life. Our mission at the Department of Computer Science & Engineering (Artificial Intelligence) is to prepare students not just to participate in this transformation, but to lead it with innovation, ethics, and excellence."
                </blockquote>
                <p className="text-gray-700 leading-relaxed">
                  Welcome to the Department of Computer Science & Engineering with specialization in Artificial Intelligence at Sri Vasavi Engineering College. Our department is dedicated to nurturing the next generation of AI professionals who will drive innovation and solve complex real-world problems.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Our program focuses on providing students with a strong foundation in core computer science principles along with specialized knowledge in artificial intelligence, machine learning, deep learning, natural language processing, and related technologies. We have state-of-the-art infrastructure and computing facilities to support practical learning and research activities.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The department maintains strong industry connections to ensure our curriculum remains current with technological advancements and market demands. Our faculty members are highly qualified, experienced, and actively engaged in research, contributing to the growing field of artificial intelligence through publications, projects, and innovations.
                </p>
              </div>
            </div>
          </div>
        );
      case 'Vision':
        return (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4 text-center">Vision</h3>
            <p className="text-gray-700 leading-relaxed text-center text-lg">
              To evolve as a center of excellence in Computer Science & Engineering with specialization in Artificial Intelligence, producing professionally competent and socially responsible engineers ready for the challenges of the AI-driven world.
            </p>
          </div>
        );
      case 'Mission':
        return (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4 text-center">Mission</h3>
            <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg">
              <li>To provide quality education in Computer Science & Engineering with focus on Artificial Intelligence</li>
              <li>To promote research and innovation in AI technologies</li>
              <li>To develop industry-ready professionals with strong technical and ethical foundations</li>
              <li>To foster entrepreneurship and innovation in AI applications</li>
              <li>To inculcate ethical and social responsibility in students towards society</li>
            </ul>
          </div>
        );
      case 'PEOs':
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#B22222] mb-6 text-center">Program Educational Objectives (PEOs)</h3>
            <div className="grid gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-800 mb-2">PEO1:</h4>
                <p className="text-gray-700">Graduates will have successful careers in AI and related fields, demonstrating technical competence and leadership skills.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-green-800 mb-2">PEO2:</h4>
                <p className="text-gray-700">Graduates will engage in lifelong learning and adapt to emerging technologies in artificial intelligence.</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                <h4 className="font-semibold text-purple-800 mb-2">PEO3:</h4>
                <p className="text-gray-700">Graduates will demonstrate professional ethics and social responsibility in their careers.</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                <h4 className="font-semibold text-orange-800 mb-2">PEO4:</h4>
                <p className="text-gray-700">Graduates will contribute to society through innovative AI solutions that address real-world challenges.</p>
              </div>
            </div>
          </div>
        );
      case 'POs':
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#B22222] mb-6 text-center">Program Outcomes (POs)</h3>
            <p className="text-gray-700 mb-4 text-center">Upon completion of the program, graduates will demonstrate:</p>
            <div className="grid gap-3">
              {[
                "Strong foundation in mathematics, science, and AI fundamentals",
                "Ability to design and implement AI solutions for real-world problems",
                "Proficiency in machine learning, deep learning, and data analytics",
                "Understanding of ethical implications in AI development",
                "Effective communication and teamwork skills",
                "Commitment to lifelong learning and professional development",
                "Leadership skills in AI project management",
                "Research and innovation capabilities in AI technologies"
              ].map((po, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg flex items-start">
                  <span className="bg-[#B22222] text-white px-3 py-1 rounded-full text-sm font-semibold mr-3 mt-1">
                    PO{index + 1}
                  </span>
                  <p className="text-gray-700 flex-1">{po}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'PSOs':
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#B22222] mb-6 text-center">Program Specific Outcomes (PSOs)</h3>
            <div className="grid gap-4">
              <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500">
                <h4 className="font-semibold text-indigo-800 mb-2">PSO1: AI Problem Solving</h4>
                <p className="text-gray-700">Ability to analyze, design, and implement AI solutions using appropriate algorithms and techniques for complex real-world problems.</p>
              </div>
              <div className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-500">
                <h4 className="font-semibold text-teal-800 mb-2">PSO2: Technology Integration</h4>
                <p className="text-gray-700">Capability to integrate AI technologies with existing systems and platforms across various domains and industries.</p>
              </div>
              <div className="bg-rose-50 p-4 rounded-lg border-l-4 border-rose-500">
                <h4 className="font-semibold text-rose-800 mb-2">PSO3: Research and Innovation</h4>
                <p className="text-gray-700">Competency to conduct research, analyze data, and develop innovative AI solutions with ethical considerations and social responsibility.</p>
              </div>
            </div>
          </div>
        );
      case 'SalientFeatures':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-6 text-center">Salient Features</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                  <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm mr-3">1</span>
                  Academic Excellence
                </h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                  <li>Industry-aligned curriculum with latest AI technologies</li>
                  <li>Experienced faculty with Ph.D. qualifications</li>
                  <li>Strong theoretical and practical foundation</li>
                  <li>Regular curriculum updates based on industry trends</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                  <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm mr-3">2</span>
                  Infrastructure
                </h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                  <li>State-of-the-art AI/ML laboratories</li>
                  <li>High-performance computing systems</li>
                  <li>Cloud computing access and GPU clusters</li>
                  <li>Modern software and development tools</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-3 flex items-center">
                  <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm mr-3">3</span>
                  Industry Connect
                </h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                  <li>Industry mentorship programs</li>
                  <li>Internship opportunities with leading tech companies</li>
                  <li>Guest lectures by industry experts</li>
                  <li>Live project collaborations</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-3 flex items-center">
                  <span className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm mr-3">4</span>
                  Research & Development
                </h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                  <li>Research projects and publications</li>
                  <li>Conference presentations and workshops</li>
                  <li>Innovation and entrepreneurship support</li>
                  <li>Patent filing assistance</li>
                </ul>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center py-8">
            <h3 className="text-xl font-semibold text-gray-600">Content will be updated soon.</h3>
          </div>
        );
    }
  };

  /*
  // Old broken renderContent function - commented out
  const renderContent = () => {
    switch (activeContent) {
      case 'Department Profile':
        return (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-primary mb-6">Department Overview</h2>
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg mb-8">
              <p className="text-gray-700 leading-relaxed mb-4">
                The Department of Computer Science & Engineering (Artificial Intelligence) was established to provide specialized education in the rapidly evolving field of Artificial Intelligence. Our program is designed to equip students with a strong foundation in computer science principles while focusing on cutting-edge AI technologies.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                The department has state-of-the-art infrastructure and computing equipment supported by high-speed internet facility. Our faculty members are highly qualified and experienced in various domains of artificial intelligence and machine learning.
              </p>

              <h4 className="text-xl font-bold text-[#B22222] mb-4">Courses Offered</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-700 mb-4">
                  <thead className="text-xs bg-gray-50 uppercase">
                    <tr>
                      <th scope="col" className="px-6 py-3">S.No</th>
                      <th scope="col" className="px-6 py-3">Name of the Course</th>
                      <th scope="col" className="px-6 py-3">Eligibility Criteria</th>
                      <th scope="col" className="px-6 py-3">Duration</th>
                      <th scope="col" className="px-6 py-3">Intake</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b">
                      <td className="px-6 py-4">1</td>
                      <td className="px-6 py-4">B.Tech-Computer Science and Engineering (Artificial Intelligence)</td>
                      <td className="px-6 py-4">AP EAPCET</td>
                      <td className="px-6 py-4">4 Years</td>
                      <td className="px-6 py-4">60</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'Vision':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              To evolve as a center of excellence in Computer Science & Engineering with specialization in Artificial Intelligence, producing professionally competent and socially responsible engineers ready for the challenges of the AI-driven world.
            </p>
          </div>
        );
      case 'Mission':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Mission</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>To impart quality education through effective teaching-learning processes with a focus on artificial intelligence and machine learning technologies.</li>
              <li>To provide excellent infrastructure and environment conducive for AI research and innovation.</li>
              <li>To enhance industry-institute interaction to make students industry-ready in the rapidly evolving AI ecosystem.</li>
              <li>To develop entrepreneurship skills and ethical values among students with special emphasis on responsible AI development.</li>
            </ul>
          </div>
        );
      case 'PEOs':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Program Educational Objectives (PEOs)</h3>
            <p className="text-gray-700 mb-4">The graduates will:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Excel in professional career and/or higher education by acquiring knowledge in mathematics, science, computer science & engineering principles with specialization in artificial intelligence.</li>
              <li>Analyze real-life problems and design socially responsible and environmentally sustainable AI-based solutions.</li>
              <li>Adapt to evolving AI technologies through continuous learning and research.</li>
              <li>Lead a successful career as a team member or as a team leader with strong professional ethics, communication skills, and awareness of the societal impact of AI technologies.</li>
            </ul>
          </div>
        );
      case 'POs':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Program Outcomes (POs)</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Engineering Knowledge:</strong> Apply knowledge of mathematics, science, engineering fundamentals, and computer science & engineering principles to solve complex AI engineering problems.</li>
              <li><strong>Problem Analysis:</strong> Identify, formulate, research literature, and analyze complex engineering problems in the AI domain to arrive at substantiated conclusions using principles of mathematics, natural sciences, and engineering sciences.</li>
              <li><strong>Design/Development of Solutions:</strong> Design solutions for complex AI engineering problems and design system components or processes that meet the specified needs with appropriate consideration for public health and safety, and cultural, societal, and environmental considerations.</li>
              <li><strong>Modern Tool Usage:</strong> Create, select, and apply appropriate techniques, resources, and modern AI engineering and IT tools for complex engineering activities with an understanding of the limitations.</li>
            </ul>
          </div>
        );
      case 'PSOs':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Program Specific Outcomes (PSOs)</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Apply standard practices and strategies in software development with a focus on AI algorithms, machine learning models, and neural networks to deliver quality AI solutions.</li>
              <li>Apply the fundamentals of computer science & engineering with artificial intelligence techniques to solve engineering problems in interdisciplinary domains.</li>
              <li>Develop applications using emerging AI technologies to provide innovative solutions for real-world problems while considering ethical implications and societal impact.</li>
            </ul>
          </div>
        );
      case 'SalientFeatures':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Salient Features</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Specialized curriculum focusing on artificial intelligence, machine learning, deep learning, and related technologies</li>
              <li>Experienced faculty members with expertise in various domains of AI and machine learning</li>
              <li>State-of-the-art AI labs with high-performance computing systems and GPU resources</li>
              <li>Strong industry-institute interaction through AI-focused internships, projects, and expert lectures</li>
              <li>Research opportunities in cutting-edge AI technologies</li>
              <li>Regular workshops, seminars, and training programs on emerging AI tools and techniques</li>
              <li>Industry-relevant projects with real-world applications</li>
              <li>Focus on responsible AI development and ethical considerations</li>
            </ul>
          </div>
        );
      default:
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Department Overview</h3>
            <p className="text-gray-700 leading-relaxed">
              The Department of Computer Science & Engineering (Artificial Intelligence) offers a specialized program focused on artificial intelligence and related technologies to prepare students for the rapidly evolving AI industry.
            </p>
          </div>
        );
    }
  };
  */

  const renderContent = () => {
    switch (activeContent) {
      case 'Department Profile':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Department Profile</h2>
            
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {['Department', 'Vision', 'Mission', 'PEOs', 'POs', 'PSOs', 'SalientFeatures'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveDeptTab(tab)}
                  className={`px-4 py-2 rounded-md text-sm transition-all ${
                    activeDeptTab === tab
                      ? 'bg-[#B22222] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            {/* Tab Content */}
            <div className="mt-6">
              {renderDeptTabContent()}
            </div>
          </div>
        );
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="relative">
                <img
                  src="/aihod.jpg"
                  alt="Dr. G. Loshma"
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                />
              </div>
              <div className="lg:col-span-2 space-y-4">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-[#B22222] mb-2">Dr. G. Loshma</h3>
                  <p className="text-lg text-[#8B0000] font-medium mb-2">Professor & Head of Department, CSE(AI)</p>
                  <p className="text-gray-600">Ph.D in Computer Science</p>
                  <p className="text-gray-600">Email: <a href="mailto:hod_cai@srivasaviengg.ac.in" className="text-primary hover:underline">hod_cai@srivasaviengg.ac.in</a></p>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The Department of Computer Science and Engineering (Artificial Intelligence) was established with a vision to evolve as a center of academic excellence and research in the emerging field of Artificial Intelligence. Our department aims to produce globally competent and socially responsible computer professionals with technical excellence in the field of Artificial Intelligence.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our program focuses on providing students with a strong foundation in core computer science principles along with specialized knowledge in artificial intelligence, machine learning, deep learning, natural language processing, and related technologies. We have state-of-the-art infrastructure and computing facilities to support practical learning and research activities.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The department maintains strong industry connections to ensure our curriculum remains current with technological advancements and market demands. Our faculty members are highly qualified, experienced, and actively engaged in research, contributing to the growing field of artificial intelligence through publications, projects, and innovations.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center">
            <h3 className="text-xl font-semibold text-gray-600">Content for {activeContent} will be updated soon.</h3>
          </div>
        );
    }
  };

  return (
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Teaching Faculty</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">S.No.</th>
                    <th scope="col" className="px-6 py-3">Name</th>
                    <th scope="col" className="px-6 py-3">Qualification</th>
                    <th scope="col" className="px-6 py-3">Designation</th>
                    <th scope="col" className="px-6 py-3">Profile</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Dr. G. Loshma', qualification: 'Ph.D.', designation: 'Head & Professor', profileUrl: 'https://srivasaviengg.ac.in/faculty_profile/CAI_Dr.G.Loshma.pdf' },
                    { name: 'Dr. E. Aswani Kumar', qualification: 'Ph.D.', designation: 'Professor', profileUrl: 'https://srivasaviengg.ac.in/faculty_profile/AIM_Dr. E. Aswani Kumar.pdf' },
                    { name: 'Mrs. A. Leelavathi', qualification: 'M.Tech, (Ph.D.)', designation: 'Sr. Asst. Professor', profileUrl: 'https://srivasaviengg.ac.in/faculty_profile/AIM_A.%20Leelavathi.pdf' },
                    { name: 'Mr. R.L. Phani Kumar', qualification: 'M.Tech, (Ph.D.)', designation: 'Sr. Asst. Professor', profileUrl: 'https://srivasaviengg.ac.in/faculty_profile/CAI_R.L. Phani Kumar.pdf' },
                    { name: 'Mr. M. Subba Rao', qualification: 'M.Tech, (Ph.D.)', designation: 'Sr. Asst. Professor', profileUrl: 'https://srivasaviengg.ac.in/faculty_profile/AIM_Mr. M. Subba Rao.pdf' },
                    { name: 'Mr. P. V. V. Satyanarayana', qualification: 'M.Tech, (Ph.D.)', designation: 'Sr. Asst. Professor', profileUrl: 'https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. P. V. V Satya Narayana.pdf' },
                    { name: 'Mr. V. Rama Narayana', qualification: 'M.Tech, (Ph.D.)', designation: 'Sr. Asst. Professor', profileUrl: 'https://srivasaviengg.ac.in/faculty_profile/AIM_Mr. V. Rama Narayana.pdf' },
                    { name: 'Mrs. V. Radha', qualification: 'M.Tech, (Ph.D.)', designation: 'Asst. Professor', profileUrl: 'https://srivasaviengg.ac.in/faculty_profile/CAI_Mrs. V. Radha.pdf' },
                    { name: 'Mr. A. Rajesh', qualification: 'M.Tech, (Ph.D.)', designation: 'Sr. Asst. Professor', profileUrl: 'https://srivasaviengg.ac.in/faculty_profile/AIM_A.Rajesh.pdf' },
                    { name: 'Mr. D. Ayyappa', qualification: 'M.Tech', designation: 'Asst. Professor', profileUrl: 'https://srivasaviengg.ac.in/faculty_profile/AIM_Mr. D. Ayyappa.pdf' },
                    { name: 'Mr. M. Yesu Sekharam', qualification: 'M.Tech', designation: 'Asst. Professor', profileUrl: 'https://srivasaviengg.ac.in/faculty_profile/AIM_M. Y. SEKHARAM.pdf' },
                    { name: 'Mrs. K. Durga Saranya', qualification: 'M.Tech', designation: 'Asst. Professor', profileUrl: 'https://srivasaviengg.ac.in/faculty_profile/AIM_Mrs. K. Durga Saranya.pdf' },
                    { name: 'Mr. Shaik Moulali', qualification: 'M.Tech', designation: 'Asst. Professor', profileUrl: 'https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. Sk. Moulali.pdf' },
                    { name: 'Mrs. P. Ujwala Sai', qualification: 'M.Tech', designation: 'Asst. Professor', profileUrl: 'https://srivasaviengg.ac.in/faculty_profile/CAI_P. Ujwala.pdf' },
                    { name: 'Mrs. M. Kiranmai', qualification: 'M.Tech', designation: 'Asst. Professor', profileUrl: 'https://srivasaviengg.ac.in/faculty_profile/CAI_Ms. M. Kiranmai.pdf' },
                    { name: 'Mr. V. Thinakaran', qualification: 'M.E.', designation: 'Asst. Professor', profileUrl: 'https://srivasaviengg.ac.in/faculty_profile/CAI_Mr .V. Thinakaran.pdf' },
                    { name: 'Mr. P. Seshu Kumar', qualification: 'M.Tech.', designation: 'Asst. Professor', profileUrl: 'https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. P Seshu Kumar.pdf' },
                    { name: 'Mrs. G. Kalyani', qualification: 'M.Tech.', designation: 'Asst. Professor', profileUrl: 'https://srivasaviengg.ac.in/faculty_profile/AIM_Ms. G Kalyani.pdf' },
                    { name: 'Mrs. Pratyusha Ch.', qualification: 'M.Tech.', designation: 'Asst. Professor', profileUrl: 'https://srivasaviengg.ac.in/faculty_profile/AIM_Ms. Prathyusha Ch.pdf' },
                    { name: 'Mr. A. Reddy Chaitanya', qualification: 'M.Tech.', designation: 'Asst. Professor', profileUrl: 'https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. Reddy Chaitanya A.pdf' },
                    { name: 'Dr. Jagadish Kumar K B', qualification: 'Ph.D.', designation: 'Asst. Professor', profileUrl: 'https://srivasaviengg.ac.in/faculty_profile/AIM_Dr. Jagadish Kumar KB.pdf' },
                    { name: 'Mr. Nishanth N S', qualification: 'M.E.', designation: 'Asst. Professor', profileUrl: 'https://srivasaviengg.ac.in/faculty_profile/CAI_Mr.Nisanth N S.pdf' },
                    { name: 'Mr. B. V. V. Bhargav', qualification: 'M.Tech, (Ph.D.)', designation: 'Asst. Professor', profileUrl: 'https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. Bhargav-BVV.pdf' },
                    { name: 'Mr. V. Jaya Rama Krishna', qualification: 'M.Tech, (Ph.D.)', designation: 'Asst. Professor', profileUrl: 'https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. V. Jayaramakrishna.pdf' },
                    { name: 'Dr. M. Vishnuvardhan', qualification: 'Ph.D.', designation: 'Asst. Professor', profileUrl: 'https://srivasaviengg.ac.in/faculty_profile/CAI_Dr. M Vishnuvardhan.pdf' },
                    { name: 'Mrs. Jane Rose', qualification: 'M.Tech.', designation: 'Asst. Professor', profileUrl: 'https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. Reddy Chaitanya A.pdf' },
                    { name: 'Dr. J. Kondala Rao', qualification: 'Ph.D.', designation: 'Asst. Professor', profileUrl: 'https://srivasaviengg.ac.in/faculty_profile/AIM_Mr. K. Jyothi.pdf' },
                    { name: 'Mrs. Balaji Rohitha', qualification: 'M.Tech.', designation: 'Asst. Professor', profileUrl: 'https://srivasaviengg.ac.in/faculty_profile/CAI_DS_Mrs. B. Rohitha.pdf' },
                    { name: 'Mr. Jewaliddin Shaik', qualification: 'M.Tech, (Ph.D.)', designation: 'Asst. Professor', profileUrl: 'https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. Reddy Chaitanya A.pdf' },
                    { name: 'Ms. Sneha Pradhan', qualification: 'M.Tech.', designation: 'Asst. Professor', profileUrl: 'https://srivasaviengg.ac.in/faculty_profile/AIM_Mrs. P. Sneha.pdf' }
                  ].map((member, index) => (
                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">{member.name}</td>
                      <td className="px-6 py-4">{member.qualification}</td>
                      <td className="px-6 py-4">{member.designation}</td>
                      <td className="px-6 py-4">
                        <a href={member.profileUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">View</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-bold text-[#B22222] mb-6 mt-12 text-center">Non-Teaching Staff</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">S.No.</th>
                    <th scope="col" className="px-6 py-3">Name</th>
                    <th scope="col" className="px-6 py-3">Designation</th>
                  </tr>
                </thead>
                <tbody>
                  {nonTeachingFaculty.map((member, index) => (
                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">{member.name}</td>
                      <td className="px-6 py-4">{member.designation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
            case 'Hackathons':
            return (
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg" style={{ borderWidth: 2, marginTop: 80 }} id="main-heading">
              <div className="section">
                <h2 className="text-3xl font-bold text-[#850209] text-center pt-1 mb-6" style={{ marginTop: 20 }}>
                  Hackathons
                </h2>
                <ul className="list-disc pl-5 mt-4">
                  <li>
                    Hackathon Brochure-
                    <a
                      href="https://srivasaviengg.ac.in/uploads/aiml/Hackathon HackWave 1.0 Brochure.jpeg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline ml-2"
                    >
                      For more details
                    </a>
                  </li>
                  <li>
                    Hackathon Winners List during A.Y 2024-25 -
                    <a
                      href="https://srivasaviengg.ac.in/uploads/aiml/AIML HackWave 1.0 Winners PDF.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline ml-2"
                    >
                      For more details
                    </a>
                  </li>
                  <li>
                    Hackathon Brochure -
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cai/hackathon%20brouchure.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline ml-2"
                    >
                      For more details
                    </a>
                  </li>
                  <li>
                    Hackathon Winners List during A.Y 2023-24 -
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cai/Hackathon%20Winners%202023.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline ml-2"
                    >
                      For more details
                    </a>
                  </li>
                </ul>
                <h2 className="text-2xl font-bold text-center mb-4 mt-8" style={{ marginTop: 5 }}>
                  Gallery
                </h2>
                <div className="container mb-8">
                  <div className="col-12 text-center text-xl font-semibold mb-2">Hackathon 2K24</div>
                  <div className="row flex justify-center items-center">
                    <div className="col col-md-5">
                      <img
                        src="https://srivasaviengg.ac.in/images/departments/cai/20241104_104345AMByGPSMapCamera.jpg"
                        className="img-fluid m-3 rounded shadow"
                        alt="Hackathon 2K24 Image 1"
                      />
                    </div>
                    <div className="col col-md-5">
                      <img
                        src="https://srivasaviengg.ac.in/images/departments/cai/20241104_33144PMByGPSMapCamera.jpg"
                        className="img-fluid m-3 rounded shadow"
                        alt="Hackathon 2K24 Image 2"
                      />
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div className="col-12 text-center text-xl font-semibold mb-2">Hackathon 2K23</div>
                  <div className="row flex justify-center items-center">
                    <div className="col col-md-5">
                      <img
                        src="https://srivasaviengg.ac.in/uploads/cai/VEC_0125.JPG"
                        className="img-fluid m-3 rounded shadow"
                        alt="Hackathon 2K23 Image 1"
                      />
                      <img
                        src="https://srivasaviengg.ac.in/uploads/cai/VEC_0089.JPG"
                        className="img-fluid m-3 rounded shadow"
                        alt="Hackathon 2K23 Image 2"
                      />
                    </div>
                    <div className="col col-md-5">
                      <img
                        src="https://srivasaviengg.ac.in/uploads/cai/VEC_0091.JPG"
                        className="img-fluid m-3 rounded shadow"
                        alt="Hackathon 2K23 Image 3"
                      />
                      <img
                        src="https://srivasaviengg.ac.in/uploads/cai/VEC_0285.JPG"
                        className="img-fluid m-3 rounded shadow"
                        alt="Hackathon 2K23 Image 4"
                      />
                    </div>
                    <div className="col col-md-5">
                      <img
                        src="https://srivasaviengg.ac.in/uploads/cai/VEC_0271.JPG"
                        className="img-fluid m-3 rounded shadow"
                        alt="Hackathon 2K23 Image 5"
                      />
                      <img
                        src="https://srivasaviengg.ac.in/uploads/cai/VEC_0176.JPG"
                        className="img-fluid m-3 rounded shadow"
                        alt="Hackathon 2K23 Image 6"
                      />
                    </div>
                    <div className="col col-md-5">
                      <img
                        src="https://srivasaviengg.ac.in/uploads/cai/VEC_0218.JPG"
                        className="img-fluid m-3 rounded shadow"
                        alt="Hackathon 2K23 Image 7"
                      />
                      <img
                        src="https://srivasaviengg.ac.in/uploads/cai/IMG-20231111-WA0001.jpg"
                        className="img-fluid m-3 rounded shadow"
                        alt="Hackathon 2K23 Image 8"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            );
            case 'Extra-Curricular Activities':
            return (
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg" style={{ borderWidth: 2, marginTop: 100 }} id="main-heading">
              <div className="section">
                <h2 className="text-3xl font-bold text-[#850209] text-center pt-1 mb-6" style={{ marginTop: 20 }}>
                  Extra-Curricular Activities
                </h2>
                <div className="nav-content">
                  <ul className="activity-list px-3 text-center">
                    <li className="activity-item">
                      Extracurricular activities during the Year 2022-23 -
                      <a
                        href="https://srivasaviengg.ac.in/uploads/cai/Extracurricular%20activities%20-%202022-23.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline ml-2"
                      >
                        View More
                      </a>
                    </li>
                  </ul>
                </div>
                <h2 className="mt-8 text-2xl font-semibold">Maitri</h2>
                <div className="nav-content">
                  <div className="container mt-4" style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
                    <h3 className="text-xl font-semibold mt-2">Social Services</h3>
                    <p>
                      Maitri Association is a compassionate community where members, united by the spirit of 'Maitri' come together to contribute funds for those in need. Through collective efforts, the club aims to make a positive impact on the lives of individuals facing challenges, fostering a sense of solidarity and kindness within the group.
                    </p>
                    <h3 className="mt-4" style={{ color: '#850209' }}>Faculty Coordinator:</h3>
                    <p className="font-bold">
                      Mr. M Yesu Sekharam<br />
                      Assistant Professor
                    </p>
                    <hr className="my-4" />
                    <h3 className="font-semibold">MAITRI CO-ORDINATORS'S</h3>
                    <ul className="list-disc ml-6 mt-2">
                      <li>
                        Maitri Student Coordinators List -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/aiml/Maitri%20Coordinators(AIM).pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >
                          For more details
                        </a>
                      </li>
                    </ul>
                    <hr className="my-4" />
                    <h3 className="font-semibold">LIST OF MAITRI EVENTS CONDUCTED YEAR WISE</h3>
                    <ul className="list-disc ml-6 mt-2">
                      <li>
                        2023-2024 -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/aiml/Maitri_2023-2024(AIM).pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >
                          For more details
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="nav-content border-dotted border-green-600" style={{ borderColor: 'green', borderStyle: 'dotted' }}>
                    <div className="container">
                      <div className="row flex justify-center items-center">
                        <div className="col-12 text-center">
                          <h2 className="text-2xl font-semibold">Gallery</h2>
                        </div>
                        {[
                          "3.jpg",
                          "4.jpg",
                          "IMG-20240106-WA0038.jpg",
                          "IMG_3429.jpg",
                          "IMG_3415.jpg",
                          "IMG_3436.jpg"
                        ].map((img, idx) => (
                          <div key={img} className="col-12 col-lg-5 m-3">
                            <img
                              src={`https://srivasaviengg.ac.in/uploads/cai/${img}`}
                              alt={`Gallery Image ${idx + 1}`}
                              className="img-fluid rounded shadow"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            );
            case 'Technical Association':
            return (
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#850209] text-center mt-5 pt-3 mb-8" id="main-heading">
                Technical Association
              </h2>
              <div className="nav-content">
                <details open>
                  <summary className="text-lg font-semibold">Engineer's Day:Nexus 2K23</summary>
                  <ul className="list-disc pl-5 mt-4">
                    <li className="m-0 p-0">
                      Nexus Event wise Winners List -
                      <a
                        href="https://srivasaviengg.ac.in/uploads/aiml/Nexus_2K23(AIM).pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline ml-2"
                      >
                        View More
                      </a>
                    </li>
                  </ul>
                </details>
                <details>
                  <summary className="text-lg font-semibold">EAPCET 2K23</summary>
                  <ul className="list-disc pl-5 mt-4">
                    <li className="m-0 p-0">
                      APEAPCET Rankers List -
                      <a
                        href="https://srivasaviengg.ac.in/uploads/aiml/EAPCET%20Toppers%20(AIM).pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline ml-2"
                      >
                        View More
                      </a>
                    </li>
                  </ul>
                </details>
              </div>
              <div className="tab-content border-1 mt-8">
                <div className="nav-content">
                  <div className="container">
                    <div className="row flex justify-center items-center">
                      <div className="col-12 text-center">
                        <h2 className="mt-2 text-2xl font-semibold">Teacher's Day 2K23</h2>
                      </div>
                      {[
                        "IMG_4385.jpg",
                        "20230905_131701.jpg",
                        "IMG-20230905-WA0044.jpg",
                        "IMG-20230905-WA0060.jpg",
                        "IMG_4333.JPG",
                        "IMG-20230905-WA0024.jpg"
                      ].map((img, idx) => (
                        <div key={img} className="col-12 col-lg-5 m-3">
                          <img
                            src={`https://srivasaviengg.ac.in/uploads/cai/${img}`}
                            alt={`Teacher's Day 2K23 Image ${idx + 1}`}
                            className="img-fluid rounded shadow"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            );
            case 'Placements':
            return (
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#850209] text-center mt-5 pt-3 mb-8">Placements</h2>
              <div className="nav-content">
                <details open>
                  <summary className="text-lg font-semibold">Placements for Batch 2021-25</summary>
                  <ul className="list-disc pl-5 mt-4">
                    <li className="p-3 ml-2 list-none">
                      Placements for Batch 2021-25 -
                      <a
                        href="https://srivasaviengg.ac.in/uploads/cai/2021-25 CAI Placement Summary.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline ml-2"
                      >
                        View More
                      </a>
                    </li>
                  </ul>
                </details>
              </div>
            </div>
            );
            case 'Student Achievements':
            return (
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h3 className="text-3xl font-bold text-[#850209] text-center mt-5 pt-3 mb-8">Student Achievements</h3>
              <div className="tab4 mt-4">
                <details open>
                  <summary className="text-lg font-semibold">Virtual Internships</summary>
                  <div className="nav-content">
                    <ul className="list-disc text-center mt-5 pl-5">
                      <li>
                        Internships during the Academic Year 2022-26 CAI-A -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cai/CAI-A%20Virtual%20Internships.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >
                          View More
                        </a>
                      </li>
                      <li>
                        Internships during the Academic Year 2022-26 CAI-B -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cai/CAI-B%20Virtual%20Internships.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >
                          View More
                        </a>
                      </li>
                      <li>
                        Internships during the Academic Year 2021-25 -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cai/CAI_VIRTUAL_INTERNSHIPS_2021-25_BATCH.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >
                          View More
                        </a>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>
              <div className="tab4 mt-4">
                <details>
                  <summary className="text-lg font-semibold">Conference Publications</summary>
                  <div className="m-3">
                    <p>
                      Conferences during the Academic Year 2023-24 -
                      <a
                        href="https://srivasaviengg.ac.in/uploads/cai/Students%20Journal%202023-24(CAI).pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline ml-2 font-semibold"
                      >
                        View More
                      </a>
                    </p>
                  </div>
                </details>
              </div>
              <div className="tab4 mt-4">
                <details>
                  <summary className="text-lg font-semibold">NPTEL/Other Certifications</summary>
                  <div className="nav-content">
                    <ul className="list-disc pl-5 mt-5">
                      <li>
                        Nptel &amp; Other Certifications during the A. Y 2023-24 -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cai/%20CAI_23-24_CERTIFICATIONS_TABLE.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >
                          View More
                        </a>
                      </li>
                      <li>
                        Nptel &amp; Other Certifications during the A. Y 2022-23 -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cai/NPTEL%20&%20Others%20Certifications%202022-23(CAI).pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >
                          View More
                        </a>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>
              <div className="tab4 mt-4">
                <details>
                  <summary className="text-lg font-semibold">Global Certifications</summary>
                  <div className="nav-content">
                    <ul className="list-disc pl-5 mt-5">
                      <li>
                        Global Certifications during the A. Y 2023-24 -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cai/Global%20Certifications%202023-24%20(CAI).pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >
                          View More
                        </a>
                      </li>
                      <li>
                        Global Certifications during the A. Y 2022-23 -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cai/Global%20certifications%202022-23(CAI).pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >
                          View More
                        </a>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>
              <div className="tab4 mt-4">
                <details>
                  <summary className="text-lg font-semibold">Community Service Project</summary>
                  <div className="nav-content">
                    <ul className="list-disc pl-5 mt-5">
                      <li>
                        List of CSP Projects done by 2022-26 Batch Students -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cai/CAI_CSP_2022-26_Batch.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >
                          View More
                        </a>
                      </li>
                      <li>
                        List of CSP Projects done by 2021-25 Batch Students -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cai/CAI_CSP_2021-25_Batch.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >
                          View More
                        </a>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>
              <div className="tab4 mt-4">
                <details>
                  <summary className="text-lg font-semibold">Student Research Projects</summary>
                  <div className="nav-content">
                    <ul className="list-disc pl-5 mt-5">
                      <li>
                        Projects during the A.Y - 2021-25 -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cai/Student%20Research%20Projects(CAI)%202021-2025.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >
                          View More
                        </a>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>
            </div>
            );
            case 'Workshops':
            return (
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h3 className="text-3xl font-bold text-[#850209] text-center mt-5 pt-3 mb-8">Workshops/SOC/Seminars/<span className="block sm:inline">Guest Lectures</span></h3>
              <div className="tab4 pt-3">
                <details open>
                  <summary className="bg-gray-100 p-4 cursor-pointer text-lg font-semibold hover:bg-gray-200 transition-colors duration-200">Workshops</summary>
                  <div className="nav-content px-3">
                    <ul className="list-disc text-center mt-5 pl-5">
                      <li>
                        Workshops/SOC organized during the Academic Year 2023-24 -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cai/Workshops_2023-2024(CAI).pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >
                          View More
                        </a>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>
              <div className="tab4 pt-3">
                <details>
                  <summary className="bg-gray-100 p-4 cursor-pointer text-lg font-semibold hover:bg-gray-200 transition-colors duration-200">SOC</summary>
                  <div className="nav-content px-3">
                    <ul className="list-disc text-center mt-5 pl-5">
                      <li>
                        SOC Organized during the Academic Year 2023-24 -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cai/SOC_2023-2024(CAI).pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >
                          View More
                        </a>
                      </li>
                      <li>
                        SOC Organized during the Academic Year 2022-23 -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cai/SOC_2022-2023(CAI).pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >
                          View More
                        </a>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>
              <div className="tab4 mt-4">
                <details>
                  <summary className="bg-gray-100 p-4 cursor-pointer text-lg font-semibold hover:bg-gray-200 transition-colors duration-200">Guest Lecturers/Seminars</summary>
                  <div className="nav-content px-3">
                    <ul className="list-disc text-center mt-5 pl-5">
                      <li>
                        Guest Lectures Organized during the Academic Year 2023-24 -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cai/Guest%20Lectures&Alumni%20Connect_2023-2024(CAI).pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >
                          View More
                        </a>
                      </li>
                      <li>
                        Guest Lectures Organized during the Academic Year 2022-23 -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cai/Guest%20Lectures&Alumni%20Connect_2022-2023(CAI).pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >
                          View More
                        </a>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>
            </div>
            );
            case 'Faculty Achievements':
            return (
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Faculty Achievements</h2>
              <div className="mt-4">
                <details open>
                  <summary className="bg-gray-100 p-4 cursor-pointer text-lg font-semibold hover:bg-gray-200 transition-colors duration-200">Journal Publications</summary>

                  <div>
                    <ul className="list-disc ml-6 px-3 mt-5">
                      <li>
                        Journal Publication Details 2024-2025 -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cai/CAI-Faculty Journal Publications_2024-25.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >
                          For more Details
                        </a>
                      </li>
                      <li>
                        Journal Publication Details 2023-2024 -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cai/CAI_Faculty%20Journal%20Publications_2023-24.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >
                          For more Details
                        </a>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>
              <div className="mt-4">
                <details>
                  <summary className="bg-gray-100 p-4 cursor-pointer text-lg font-semibold hover:bg-gray-200 transition-colors duration-200">Conferences</summary>
                  <div>
                    <ul className="list-disc ml-6 px-3 mt-5">
                      <li>
                        Conferences Details 2024-2025 -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cai/CAI_Faculty%20Conference%20Publications_2023-24.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >
                          For more Details
                        </a>
                      </li>
                      <li>
                        Conferences Details 2023-2024 -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cai/CAI_Faculty Conference Publications_2024-25.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >
                          For more Details
                        </a>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>
              <div className="mt-4">
                <details>
                  <summary className="bg-gray-100 p-4 cursor-pointer text-lg font-semibold hover:bg-gray-200 transition-colors duration-200">Certifications</summary>
                  <div className="nav-content">
                    <ul className="list-disc ml-6 mt-5">
                      <li>
                        Certifications done by the faculty during the A.Y. 2024-25 -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cai/2024-25 CAI Faculty MOOCs Certifications.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >
                          For more Details
                        </a>
                      </li>
                      <li>
                        Certifications done by the faculty during the A.Y. 2023-24 -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cai/2023-24 CAI Faculty MOOCs Certifications.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >
                          For more Details
                        </a>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>
              <div className="mt-4">
                <details>
                  <summary className="bg-gray-100 p-4 cursor-pointer text-lg font-semibold hover:bg-gray-200 transition-colors duration-200">Patents</summary>
                  <div className="nav-content">
                    <ul className="list-disc ml-6 mt-5">
                      <li>
                        Patents Published by Faculty during the A.Y 2024-2025 -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cai/Patents by CAI Faculty 2024-25.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >
                          For more Details
                        </a>
                      </li>
                      <li>
                        Patents Published by Faculty during the A.Y 2023-2024 -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cai/Patents_2023-2024(CAI).pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >
                          For more Details
                        </a>
                      </li>
                      <li>
                        Patents Published by Faculty during the A.Y 2020-2021 -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cai/Patents_2021-22(CAI).pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >
                          For more Details
                        </a>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>
              <div className="mt-4">
                <details>
                  <summary className="bg-gray-100 p-4 cursor-pointer text-lg font-semibold hover:bg-gray-200 transition-colors duration-200">Research Supervisor</summary>
                  <div className="nav-content">
                    <ul className="list-disc ml-6 mt-5">
                      <li>
                        Research Supervisors -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cai/Research%20Supervisor_2023-2024(CAI).pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >
                          For more Details
                        </a>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>
            </div>
            );

            case 'MoUs':
            return (
            <div className="space-y-8">

              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">MoUs</h2>
                <h3 className="text-xl font-semibold text-center mb-4">A. MOUs with Industries</h3>
                <div className="overflow-x-auto flex justify-center">
                  <table className="min-w-max bg-white border border-gray-200 table-auto text-sm text-left text-gray-500">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-3 px-4 border-b">S.No</th>
                        <th className="py-3 px-4 border-b">Organization Name</th>
                        <th className="py-3 px-4 border-b">Duration</th>
                        <th className="py-3 px-4 border-b">From</th>
                        <th className="py-3 px-4 border-b">To</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-3 px-4 border-b">1</td>
                        <td className="py-3 px-4 border-b">NIT ANP</td>
                        <td className="py-3 px-4 border-b">Till Date</td>
                        <td className="py-3 px-4 border-b">31-12-2022</td>
                        <td className="py-3 px-4 border-b">Till Date</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 border-b">2</td>
                        <td className="py-3 px-4 border-b">Alteryx SparkED Partner</td>
                        <td className="py-3 px-4 border-b">Till Date</td>
                        <td className="py-3 px-4 border-b">30-12-2022</td>
                        <td className="py-3 px-4 border-b">Till Date</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 border-b">3</td>
                        <td className="py-3 px-4 border-b">Juniper Networks</td>
                        <td className="py-3 px-4 border-b">Till Date</td>
                        <td className="py-3 px-4 border-b">30-11-2022</td>
                        <td className="py-3 px-4 border-b">Till Date</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 border-b">4</td>
                        <td className="py-3 px-4 border-b">Celonis Academic Alliance</td>
                        <td className="py-3 px-4 border-b">Till Date</td>
                        <td className="py-3 px-4 border-b">11-11-2022</td>
                        <td className="py-3 px-4 border-b">Till Date</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 border-b">5</td>
                        <td className="py-3 px-4 border-b">Palo Alto Networks Cyber Security Academy</td>
                        <td className="py-3 px-4 border-b">Till Date</td>
                        <td className="py-3 px-4 border-b">08-11-2022</td>
                        <td className="py-3 px-4 border-b">Till Date</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 border-b">6</td>
                        <td className="py-3 px-4 border-b">Blue Prism Academia Program</td>
                        <td className="py-3 px-4 border-b">Till Date</td>
                        <td className="py-3 px-4 border-b">01-11-2022</td>
                        <td className="py-3 px-4 border-b">Till Date</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 border-b">7</td>
                        <td className="py-3 px-4 border-b">Eduskills</td>
                        <td className="py-3 px-4 border-b">31-10-2022</td>
                        <td className="py-3 px-4 border-b">31-10-2025</td>
                        <td className="py-3 px-4 border-b">Till Date</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 border-b">8</td>
                        <td className="py-3 px-4 border-b">Hexaware</td>
                        <td className="py-3 px-4 border-b">25-04-2020</td>
                        <td className="py-3 px-4 border-b">Till Date</td>
                        <td className="py-3 px-4 border-b">Till Date</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 border-b">9</td>
                        <td className="py-3 px-4 border-b">APSSDC</td>
                        <td className="py-3 px-4 border-b">29-03-2019</td>
                        <td className="py-3 px-4 border-b">Till Date</td>
                        <td className="py-3 px-4 border-b">Till Date</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 border-b">10</td>
                        <td className="py-3 px-4 border-b">TCSiON</td>
                        <td className="py-3 px-4 border-b">25-04-2012</td>
                        <td className="py-3 px-4 border-b">Till Date</td>
                        <td className="py-3 px-4 border-b">Till Date</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            );

            case 'Faculty Development Programs':
            return (
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Faculty Development Programs</h2>
              <div className="section">
                <details open>
                  <summary className="bg-gray-100 p-4 cursor-pointer text-lg font-semibold hover:bg-gray-200 transition-colors duration-200">FDP Attended</summary>
                  <ul className="fdp-list list-disc p-3 m-0">
                    <li className="fdp-item m-0 p-0">
                      FDPs attended by the Faculty 2024-25 -
                      <a
                        href="https://srivasaviengg.ac.in/uploads/cai/CAI FDPs Workshops Seminars attended by Faculty 2024-25.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                    <li className="fdp-item m-0 p-0">
                      FDPs attended by the Faculty 2023-24 -
                      <a
                        href="https://srivasaviengg.ac.in/uploads/cai/FDPS%20Attended_2023-2024(CAI).pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                  </ul>
                </details>
              </div>
            </div>
            );

            case 'Board of Studies':
            return (
            <div className="space-y-8">
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Board of Studies Members</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3">S.No</th>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Designation</th>
                        <th scope="col" className="px-6 py-3">Organization</th>
                        <th scope="col" className="px-6 py-3">Position</th>
                      </tr>
                    </thead>
                    <tbody>
                      {boardOfStudies.map((member, index) => (
                        <tr key={index} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4">{index + 1}</td>
                          <td className="px-6 py-4 font-medium text-gray-900">{member.name}</td>
                          <td className="px-6 py-4">{member.designation}</td>
                          <td className="px-6 py-4">{member.organization}</td>
                          <td className="px-6 py-4">{member.position}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
                <h4 className="text-2xl font-bold text-[#B22222] mb-4 text-center">Board of Studies Meeting Minutes</h4>
                <ul className="list-disc list-inside space-y-2 text-center">
                  <li>Minutes of 3rd meeting of the Board of Studies, dated 26.07.2023 <a href="http://srivasaviengg.ac.in/uploads/cai/Minutes%20of%203rd%20BOS_B.Tech%20in%20CAI%20and%20AI&ML.pdf" className="text-primary hover:underline ml-2">View</a></li>
                  <li>Minutes of 2nd meeting of the Board of Studies, dated 25.07.2022 <a href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/Minutes%20of%20Second%20meeting%20of%20the%20Board%20of%20Studies,%20dated%2025.07.2022%20AI%20&%20ML.pdf" className="text-primary hover:underline ml-2">View</a></li>
                  <li>Minutes of 1st meeting of the Board of Studies, dated 31.12.2021 <a href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/Minutes%20of%20First%20BOS%20-%20CSE(AI)%20and%20AI%20&%20ML.pdf" className="text-primary hover:underline ml-2">View</a></li>
                </ul>
              </div>
            </div>
            );

            case 'Physical Facilities':
            return (
            <div id="physical-facilities" className="space-y-8">
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Physical Facilities</h2>
                <div className="space-y-6">
                  {/* Classrooms Timetables */}
                  <details open className="border border-gray-300 rounded-lg mb-4">
                    <summary className="bg-gray-100 p-4 cursor-pointer text-lg font-semibold hover:bg-gray-200 transition-colors duration-200">Class Rooms</summary>
                    <div className="p-4">
                      <ul className="list-disc ml-6 mt-2">
                        <li>
                          Master Timetable A.Y for Sem-II 2022-23 -
                          <a href="https://srivasaviengg.ac.in/uploads/cai/CAI_Master%20Time%20Table_2022-23_%20II%20SEM%20_CAI.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-2">View</a>
                        </li>
                        <li>
                          Master Timetable A.Y for Sem-I 2022-23 -
                          <a href="https://srivasaviengg.ac.in/uploads/cai/CAI%20_Master%20Time%20Table_A.Y%202022-23_I%20SEM.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-2">View</a>
                        </li>
                      </ul>
                    </div>
                  </details>
                  {/* Seminar Halls */}
                  <details className="border border-gray-300 rounded-lg mb-4">
                    <summary className="bg-gray-100 p-4 cursor-pointer text-lg font-semibold hover:bg-gray-200 transition-colors duration-200">Seminar Halls</summary>
                    <div className="p-4">
                      <ul className="list-disc ml-6 mt-2">
                        <li>
                          Seminar halls with ICT Enabled Facilities -
                          <a href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/CSE_Seminar%20Halls.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-2">View</a>
                        </li>
                      </ul>
                    </div>
                  </details>
                  {/* Laboratories */}
                  <details className="border border-gray-300 rounded-lg mb-4">
                    <summary className="bg-gray-100 p-4 cursor-pointer text-lg font-semibold hover:bg-gray-200 transition-colors duration-200">Laboratories</summary>
                    <div className="p-4">
                      <p className="text-gray-700 leading-relaxed mb-4">
                        The Department has well equipped labs with the latest Configuration. Total 9 Computer Labs for UG, PG and one research lab consisting a total of 674 systems. The various servers in the server room include Oracle 11g Database Server, Intranet Server (TOMCAT), NPTEL Video/Web Server, MAT Lab Server 2012 R2, Red Hat Linux 5.0 Server, Library Automation Server, A-Mail Server, ECAP Server.
                      </p>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        The college has high-speed internet connectivity throughout the campus through a leased line from BSNL with 200Mbps, 400Mbps from Jio, and 40 Mbps (Broadband).
                      </p>
                      <p className="text-gray-700 leading-relaxed mb-6">
                        The following Laboratories are available in the department:
                      </p>
                      {/* Linus Torvalds Lab Table */}
                      <div className="my-6">
                        <h3 className="text-xl font-semibold text-center mb-4">Linus Torvalds Lab</h3>
                        <div className="overflow-x-auto mb-6">
                          <table className="min-w-full bg-white border border-gray-200">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="py-3 px-4 border-b text-left">S.No</th>
                                <th className="py-3 px-4 border-b text-left">Name of the Lab</th>
                                <th className="py-3 px-4 border-b text-left">Configuration</th>
                                <th className="py-3 px-4 border-b text-left">No. of Systems</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="py-3 px-4 border-b">1</td>
                                <td className="py-3 px-4 border-b" rowSpan={2}>Linus Torvalds Lab</td>
                                <td className="py-3 px-4 border-b">
                                  Model : HP 280PRO G9 Micro Tower<br />
                                  Processor : Intel core TM i3-10100 CPU@3.64 GHZ<br />
                                  8.00 GB RAM, 256.00 GB SSD<br />
                                  System type : x64 – based Processor<br />
                                  Monitor: 19.5" LED Monitor<br />
                                  Keyboard: Multimedia Keyboard<br />
                                  Mouse: Optical Mouse<br />
                                </td>
                                <td className="py-3 px-4 border-b">70</td>
                              </tr>
                              <tr>
                                <td className="py-3 px-4 border-b">2</td>
                                <td className="py-3 px-4 border-b">
                                  Model : ACER Vertion Desktop<br />
                                  Processor : Intel® Core™ i5-7400 CPU @ 3.00 GHz<br />
                                  4.00 GB RAM, 1.00 TB HDD<br />
                                  System type : x64 – based Processor<br />
                                  Monitor : 19.5" LED Monitor<br />
                                  Keyboard : Multimedia Keyboard<br />
                                  Mouse : Optical Mouse<br />
                                </td>
                                <td className="py-3 px-4 border-b">02</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <h3 className="text-xl font-semibold text-center mb-4">Orange Lab</h3>
                        <div className="overflow-x-auto mb-6">
                          <table className="min-w-full bg-white border border-gray-200">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="py-3 px-4 border-b text-left">S.No</th>
                                <th className="py-3 px-4 border-b text-left">Name of the Lab</th>
                                <th className="py-3 px-4 border-b text-left">Configuration</th>
                                <th className="py-3 px-4 border-b text-left">Usage</th>
                                <th className="py-3 px-4 border-b text-left">No. of Systems</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="py-3 px-4 border-b">1</td>
                                <td className="py-3 px-4 border-b">Orange Lab</td>
                                <td className="py-3 px-4 border-b">
                                  Model: DELL OPTI PLEX 3070<br />
                                  Processor: Intel Core i3, 9th Gen<br />
                                  8.00 GB RAM, 1 TB Hard Disk<br />
                                  System type: x64 – based Processor<br />
                                  Monitor: 20.5" TFT Monitor<br />
                                  Keyboard: Multimedia Keyboard<br />
                                  Mouse: Optical Scroll Mouse
                                </td>
                                <td className="py-3 px-4 border-b">Placements and Training</td>
                                <td className="py-3 px-4 border-b">72</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                          <div className="text-center">
                            <img
                              src="/images/departments/cai/Linus Torvalds Lab.jpg"
                              alt="Linus Torvalds Lab"
                              className="w-full h-auto object-cover rounded-lg shadow-md"
                              style={{ aspectRatio: '16/9' }}
                            />
                            <h4 className="text-lg font-semibold text-green-600 mt-3">
                              Linus Torvalds Lab
                            </h4>
                          </div>
                          <div className="text-center">
                            <img
                              src="/images/departments/cai/Orange Lab.jpg"
                              alt="Orange Lab"
                              className="w-full h-auto object-cover rounded-lg shadow-md"
                              style={{ aspectRatio: '16/9' }}
                            />
                            <h4 className="text-lg font-semibold text-green-600 mt-3">
                              Orange Lab
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </details>
                </div>
              </div>
            </div>
            );

            case 'Syllabus':
            return (
            <div id="syllabus" className="space-y-8">
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Syllabus</h2>
                <ul className="list-disc list-inside space-y-2 text-center">
                  <li>B.Tech - V20 Syllabus - <a href="http://srivasaviengg.ac.in/uploads/syllabus/V20%20AI%20and%20AI&ML%20CS%20&%20Syllabus_%20I%20&%20II%20SEM.pdf" className="text-primary hover:underline ml-2">View</a></li>
                  <li>SOC Syllabus during the Academic Year 2022-23 - <a href="http://srivasaviengg.ac.in/uploads/cai/SOC_CAI_2022-23.pdf" className="text-primary hover:underline ml-2">View</a></li>
                </ul>
              </div>
            </div>
            );

            case 'Handbooks':
            return (
            <div id="handbooks" className="space-y-8">
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Academic HandBooks</h2>
                <div className="space-y-4">
                  <details open className="border rounded-lg">
                    <summary className="cursor-pointer font-semibold text-lg py-2 px-4 bg-gray-100 rounded-t-lg">Academic year 2023-24: II-Sem Handbooks</summary>
                    <ul className="list-disc pl-8 py-2">
                      <li>
                        VI Sem V20 Regulation Handbook -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cai/Final%20VI%20SEM%20V20%20Regulation%20Handbook_%20CAI.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline ml-2"
                        >
                          View
                        </a>
                      </li>
                    </ul>
                  </details>
                  <details className="border rounded-lg">
                    <summary className="cursor-pointer font-semibold text-lg py-2 px-4 bg-gray-100 rounded-t-lg">Academic year 2023-24: I-Sem Handbooks</summary>
                    <ul className="list-disc pl-8 py-2">
                      <li>
                        V Sem V20 Regulation Handbook -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cai/V%20SEM%20V20%20Regulation%20Handbook_CAI.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline ml-2"
                        >
                          View
                        </a>
                      </li>
                      <li>
                        III Sem V20 Regulation Handbook -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cai/III%20%20SEM%20(Autonomous)%20Handbook%20-%20CAI%202023-24.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline ml-2"
                        >
                          View
                        </a>
                      </li>
                    </ul>
                  </details>
                  <details className="border rounded-lg">
                    <summary className="cursor-pointer font-semibold text-lg py-2 px-4 bg-gray-100 rounded-t-lg">Academic year 2022-23: II-Sem Handbooks</summary>
                    <ul className="list-disc pl-8 py-2">
                      <li>
                        IV Sem V20 Regulation Handbook -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cai/IV%20SEM%20(Autonomous)%20Handbook%20-%20CAI_2022-23.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline ml-2"
                        >
                          View
                        </a>
                      </li>
                    </ul>
                  </details>
                  <details className="border rounded-lg">
                    <summary className="cursor-pointer font-semibold text-lg py-2 px-4 bg-gray-100 rounded-t-lg">Academic year 2022-23: I-Sem Handbooks</summary>
                    <ul className="list-disc pl-8 py-2">
                      <li>
                        III Sem V20 Regulation Handbook -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cai/III%20SEM%20(Autonomous)%20Handbook%20-%20CAI_2022-23.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline ml-2"
                        >
                          View
                        </a>
                      </li>
                    </ul>
                  </details>
                </div>
              </div>
            </div>
            );

            case 'Academic Toppers':
            return (
            <div id="academic-toppers" className="space-y-8">
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold text-[#850209] text-center mt-0 mb-6">Academic Toppers</h2>
                <h3 className="text-2xl font-semibold text-center mt-8 mb-4">Academic Toppers</h3>
                <div className="nav-content space-y-4">
                  <details open className="border rounded-lg">
                    <summary className="cursor-pointer font-semibold text-lg py-2 px-4 bg-gray-100 rounded-t-lg">Academic Toppers for the Batch 2022-26</summary>
                    <ul className="list-disc pl-8 py-2">
                      <li className="my-2">
                        Academic Toppers for the Batch 2022-26 -
                        <a
                          href="http://srivasaviengg.ac.in/uploads/cai/Academic Toppers  2022-26 Batch-2 (CAI).pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline ml-2"
                        >
                          View
                        </a>
                      </li>
                    </ul>
                  </details>
                  <details className="border rounded-lg">
                    <summary className="cursor-pointer font-semibold text-lg py-2 px-4 bg-gray-100 rounded-t-lg">Academic Toppers for the Batch 2021-25</summary>
                    <ul className="list-disc pl-8 py-2">
                      <li className="my-2">
                        Academic Toppers for the Batch 2021-25 -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cai/Academic Toppers  2021-25 Batch-1 (CAI).pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline ml-2"
                        >
                          View
                        </a>
                      </li>
                    </ul>
                  </details>
                  <div className="tab-content border-2 mt-8">
                    <h3 className="text-2xl font-semibold text-center mb-4">Academic Toppers</h3>
                    <div className="nav-content row flex justify-center items-center">
                      <table className="min-w-full bg-white border border-gray-200 mb-6">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="py-3 px-4 border-b text-left">S.No</th>
                            <th className="py-3 px-4 border-b text-left">Academic Year</th>
                            <th className="py-3 px-4 border-b text-left">Particulars</th>
                            <th className="py-3 px-4 border-b text-left">No. of Students Benefited</th>
                            <th className="py-3 px-4 border-b text-left">Scholarship Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-3 px-4 border-b">1</td>
                            <td className="py-3 px-4 border-b">2024-25</td>
                            <td className="py-3 px-4 border-b">Academic Toppers</td>
                            <td className="py-3 px-4 border-b">17</td>
                            <td className="py-3 px-4 border-b">19500</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4 border-b">2</td>
                            <td className="py-3 px-4 border-b">2023-24</td>
                            <td className="py-3 px-4 border-b">Academic Toppers</td>
                            <td className="py-3 px-4 border-b">37</td>
                            <td className="py-3 px-4 border-b">40500</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4 border-b">3</td>
                            <td className="py-3 px-4 border-b">2022-23</td>
                            <td className="py-3 px-4 border-b">Academic Toppers</td>
                            <td className="py-3 px-4 border-b">37</td>
                            <td className="py-3 px-4 border-b">40500</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <h3 className="text-2xl font-semibold text-center mb-4">Image Gallery</h3>
                    <div className="nav-content mb-5">
                      <div className="container mx-auto">
                        <div className="flex flex-wrap justify-center items-center">
                          <div className="w-full text-center mb-4">
                            <h1 className="text-xl font-bold">2021-25 Batch</h1>
                          </div>
                          <div className="w-full md:w-5/12 m-3">
                            <img
                              src="https://srivasaviengg.ac.in/uploads/cai/umar.jpeg"
                              alt="Image 1"
                              className="w-full h-auto rounded-lg shadow-md"
                            />
                          </div>
                          <div className="w-full md:w-5/12 m-3">
                            <img
                              src="https://srivasaviengg.ac.in/uploads/cai/srija.jpeg"
                              alt="Image 2"
                              className="w-full h-auto rounded-lg shadow-md"
                            />
                          </div>
                          <div className="w-full text-center mb-4">
                            <h1 className="text-xl font-bold">2022-26 Batch</h1>
                          </div>
                          <div className="w-full md:w-5/12 m-3">
                            <img
                              src="https://srivasaviengg.ac.in/uploads/cai/19.jpeg"
                              alt="Image 1"
                              className="w-full h-auto rounded-lg shadow-md"
                            />
                          </div>
                          <div className="w-full md:w-5/12 m-3">
                            <img
                              src="https://srivasaviengg.ac.in/uploads/cai/valli.jpeg"
                              alt="Image 2"
                              className="w-full h-auto rounded-lg shadow-md"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            );

            default:
            return <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center"><h3 className="text-xl font-semibold text-gray-600">Content for {activeContent} will be updated soon.</h3></div>;
    }
  };
  */

  return (
    <div className="pt-24 bg-gray-100">
      <section className="bg-[#8B1919] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold">CSE - Artificial Intelligence</h1>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-80 lg:flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-28">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden w-full flex justify-between items-center p-3 bg-gray-100 rounded-lg mb-4">
                <span className="font-bold">Department Menu</span>
                <Menu className="w-6 h-6" />
              </button>
              <nav className={`${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
                <h3 className="text-xl font-bold text-primary mb-4 hidden lg:block">Department Menu</h3>
                <ul className="space-y-2">
                  {sidebarItems.map((item) => (
                    <li key={item}>
                      <button
                        className={`w-full text-left flex items-center p-3 rounded-lg transition-all duration-300 text-sm ${activeContent === item ? 'bg-primary text-white font-semibold shadow-md' : 'hover:bg-gray-100'}`}
                        onClick={() => {
                          setActiveContent(item);
                          if (window.innerWidth < 1024) setSidebarOpen(false);
                        }}
                      >
                        <ChevronRight className={`w-4 h-4 mr-2 transition-transform ${activeContent === item ? 'rotate-90' : ''}`} />
                        <span>{item}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

            export default CSEAIDepartment;