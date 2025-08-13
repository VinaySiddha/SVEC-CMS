import React, { useState } from 'react';
import { Brain, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library, Link as LinkIcon } from 'lucide-react';
import FixedSidebar from '../../components/FixedSidebar';

const AIMLDepartment: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');
  const [activeDeptTab, setActiveDeptTab] = useState('Department');

  const sidebarItems = [
    { id: 'Department Profile', label: 'Department Profile', icon: <Building className="w-4 h-4" /> },
    { id: 'Faculty Profiles', label: 'Faculty Profiles', icon: <Users className="w-4 h-4" /> },
    { id: 'Board of Studies', label: 'Board of Studies', icon: <Award className="w-4 h-4" /> },
    { id: 'Syllabus', label: 'Syllabus', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'Physical Facilities', label: 'Physical Facilities', icon: <HardHat className="w-4 h-4" /> },
    { id: 'MoUs', label: 'MoUs', icon: <Handshake className="w-4 h-4" /> },
    { id: 'Faculty Development Programs', label: 'Faculty Development Programs', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'Faculty Achievements', label: 'Faculty Achievements', icon: <Trophy className="w-4 h-4" /> },
    { id: 'Workshops', label: 'Workshops', icon: <Presentation className="w-4 h-4" /> },
    { id: 'Student Achievements', label: 'Student Achievements', icon: <Award className="w-4 h-4" /> },
    { id: 'Placements', label: 'Placements', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'Academic Toppers', label: 'Academic Toppers', icon: <Trophy className="w-4 h-4" /> },
    { id: 'Technical Association', label: 'Technical Association', icon: <Brain className="w-4 h-4" /> },
    { id: 'Extra-Curricular Activities', label: 'Extra-Curricular Activities', icon: <Activity className="w-4 h-4" /> },
    { id: 'Hackathons', label: 'Hackathons', icon: <Brain className="w-4 h-4" /> },
    { id: 'Handbooks', label: 'Handbooks', icon: <FileText className="w-4 h-4" /> },
    { id: 'Contact', label: 'Contact', icon: <Phone className="w-4 h-4" /> }
  ];

  const faculty = [
    { name: "Dr. G. Loshma", qualification: "Ph.D.", designation: "Head & Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Dr.G.Loshma.pdf" },
    { name: "Dr. E. Aswani Kumar", qualification: "Ph.D.", designation: "Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_Dr. E. Aswani Kumar.pdf" },
    { name: "Mrs. A. Leelavathi", qualification: "M.Tech, (Ph.D.)", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_A.%20Leelavathi.pdf" },
    { name: "Mr. R.L. Phani Kumar", qualification: "M.Tech, (Ph.D.)", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_R.L. Phani Kumar.pdf" },
    { name: "Mr. M. Subba Rao", qualification: "M.Tech, (Ph.D.)", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_Mr. M. Subba Rao.pdf" },
    { name: "Mr. P. V. V. Satyanarayana", qualification: "M.Tech, (Ph.D.)", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. P. V. V Satya Narayana.pdf" },
    { name: "Mr. V. Rama Narayana", qualification: "M.Tech, (Ph.D.)", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_Mr. V. Rama Narayana.pdf" },
    { name: "Mrs. V. Radha", qualification: "M.Tech, (Ph.D.)", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Mrs. V. Radha.pdf" },
    { name: "Mr. A. Rajesh", qualification: "M.Tech, (Ph.D.)", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_A.Rajesh.pdf" },
    { name: "Mr. D. Ayyappa", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_Mr. D. Ayyappa.pdf" },
    { name: "Mr. M. Yesu Sekharam", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_M. Y. SEKHARAM.pdf" },
    { name: "Mrs. K. Durga Saranya", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_Mrs. K. Durga Saranya.pdf" },
    { name: "Mr. Shaik Moulali", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. Sk. Moulali.pdf" },
    { name: "Mrs. P. Ujwala Sai", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_P. Ujwala.pdf" },
    { name: "Mrs. M. Kiranmai", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Ms. M. Kiranmai.pdf" },
    { name: "Mr. V. Thinakaran", qualification: "M.E.", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Mr .V. Thinakaran.pdf" },
    { name: "Mr. P. Seshu Kumar", qualification: "M.Tech.", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. P Seshu Kumar.pdf" },
    { name: "Mrs. G. Kalyani", qualification: "M.Tech.", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_Ms. G Kalyani.pdf" },
    { name: "Mrs. Pratyusha Ch.", qualification: "M.Tech.", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_Ms. Prathyusha Ch.pdf" },
    { name: "Mr. A. Reddy Chaitanya", qualification: "M.Tech.", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. Reddy Chaitanya A.pdf" },
    { name: "Dr. Jagadish Kumar K B", qualification: "Ph.D.", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_Dr. Jagadish Kumar KB.pdf" },
    { name: "Mr. Nishanth N S", qualification: "M.E.", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Mr.Nisanth N S.pdf" },
    { name: "Mr. B. V. V. Bhargav", qualification: "M.Tech, (Ph.D.)", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. Bhargav-BVV.pdf" },
    { name: "Mr. V. Jaya Rama Krishna", qualification: "M.Tech, (Ph.D.)", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. V. Jayaramakrishna.pdf" },
    { name: "Dr. M. Vishnuvardhan", qualification: "Ph.D.", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Dr. M Vishnuvardhan.pdf" },
    { name: "Mrs. Jane Rose", qualification: "M.Tech.", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. Reddy Chaitanya A.pdf" },
    { name: "Dr. J. Kondala Rao", qualification: "Ph.D.", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_Mr. K. Jyothi.pdf" },
    { name: "Mrs. Balaji Rohitha", qualification: "M.Tech.", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_DS_Mrs. B. Rohitha.pdf" },
    { name: "Mr. Jewaliddin Shaik", qualification: "M.Tech, (Ph.D.)", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. Reddy Chaitanya A.pdf" },
    { name: "Ms. Sneha Pradhan", qualification: "M.Tech.", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_Mrs. P. Sneha.pdf" }
  ];

  const nonTeachingFaculty = [
    { name: "Mr. K. N. Suresh", designation: "System Admin" },
    { name: "Mr. Md. Arriff", designation: "Lab Assistant" },
    { name: "Mrs. D. Bhagya Lakshmi", designation: "Lab Technician" },
    { name: "Mrs. B. Yamini", designation: "Lab Technician" },
    { name: "Mr. K. V Srinivasa Rao", designation: "Hardware Technician" },
    { name: "Mr. G. Bhanu Prakash", designation: "Hardware Technician" },
    { name: "Mr. N. RajaseKhar", designation: "Junior Assistant" },
    { name: "Mr. Prasad", designation: "Attender" }
  ];

  const renderDeptTabContent = () => {
    switch (activeDeptTab) {
      case 'Department':
        return (
          <div className="mt-6 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Department of Computer Science and Artificial Intelligence came into inception from 2021 onwards with an intake of 60 seats in B.Tech. From 2022 onwards the intake was increased to 120 seats. From 2025 onwards the intake was increased to 180 seats.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The department focuses on cutting-edge technologies like Artificial Intelligence, Machine Learning, Deep Learning, and Data Science. Our curriculum is designed to provide students with a strong foundation in computer science principles while specializing in AI and ML techniques.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The department has well-equipped laboratories, qualified faculty, and strong industry connections to ensure that students receive practical training alongside theoretical knowledge.
            </p>
          </div>
        );
      case 'Vision':
        return (
          <div className="mt-6">
            <p className="text-gray-700 leading-relaxed">
              To evolve as a center of academic excellence and advanced research in the field of Artificial Intelligence and Machine Learning by developing competent professionals with ethical values to meet the technological challenges.
            </p>
          </div>
        );
      case 'Mission':
        return (
          <div className="mt-6">
            <ul className="list-disc pl-5 space-y-3">
              <li className="text-gray-700 leading-relaxed">
                To impart quality education through innovative teaching-learning methods in Artificial Intelligence and Machine Learning.
              </li>
              <li className="text-gray-700 leading-relaxed">
                To establish Center of Excellence through collaboration with industries to bridge the gap between academia and industry.
              </li>
              <li className="text-gray-700 leading-relaxed">
                To provide opportunities for students to acquire problem solving skills through projects and internships.
              </li>
              <li className="text-gray-700 leading-relaxed">
                To inculcate entrepreneurial skills, ethical values, and leadership qualities among students to make them responsible citizens.
              </li>
            </ul>
          </div>
        );
      case 'PEOs':
        return (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Program Educational Objectives (PEOs)</h3>
            <p className="text-gray-700 mb-4 italic">Graduates of Artificial Intelligence and Machine Learning Program will be able to:</p>
            <ul className="list-disc pl-5 space-y-3">
              <li className="text-gray-700 leading-relaxed">
                <strong>PEO1:</strong> Excel in professional career and/or higher education by acquiring knowledge in Artificial Intelligence, Machine Learning and related areas.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PEO2:</strong> Analyze real-world problems and design innovative solutions using Artificial Intelligence, Machine Learning and allied technologies.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PEO3:</strong> Function effectively as individuals and as team members with professional ethics and social responsibility.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PEO4:</strong> Engage in continuous learning through research, training and professional development.
              </li>
            </ul>
          </div>
        );
      case 'POs':
        return (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Program Outcomes (POs)</h3>
            <p className="text-gray-700 mb-4 italic">Engineering Graduates will be able to:</p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li className="text-gray-700 leading-relaxed">
                <strong>PO1: Engineering knowledge:</strong> Apply the knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to the solution of complex engineering problems.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PO2: Problem analysis:</strong> Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions using first principles of mathematics, natural sciences, and engineering sciences.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PO3: Design/development of solutions:</strong> Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for the public health and safety, and the cultural, societal, and environmental considerations.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PO4: Conduct investigations of complex problems:</strong> Use research-based knowledge and research methods including design of experiments, analysis and interpretation of data, and synthesis of the information to provide valid conclusions.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PO5: Modern tool usage:</strong> Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools including prediction and modeling to complex engineering activities with an understanding of the limitations.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PO6: The engineer and society:</strong> Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to the professional engineering practice.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PO7: Environment and sustainability:</strong> Understand the impact of the professional engineering solutions in societal and environmental contexts, and demonstrate the knowledge of, and need for sustainable development.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PO8: Ethics:</strong> Apply ethical principles and commit to professional ethics and responsibilities and norms of the engineering practice.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PO9: Individual and team work:</strong> Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PO10: Communication:</strong> Communicate effectively on complex engineering activities with the engineering community and with society at large, such as, being able to comprehend and write effective reports and design documentation, make effective presentations, and give and receive clear instructions.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PO11: Project management and finance:</strong> Demonstrate knowledge and understanding of the engineering and management principles and apply these to one's own work, as a member and leader in a team, to manage projects and in multidisciplinary environments.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PO12: Life-long learning:</strong> Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change.
              </li>
            </ul>
          </div>
        );
      case 'PSOs':
        return (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Program Specific Outcomes (PSOs)</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li className="text-gray-700 leading-relaxed">
                <strong>PSO1:</strong> Apply the concepts of Artificial Intelligence, Machine Learning, Deep Learning and Data Science to solve real-world problems.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PSO2:</strong> Design and develop intelligent systems and applications using modern tools and technologies in the field of Artificial Intelligence and Machine Learning.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PSO3:</strong> Apply the principles of Artificial Intelligence and Machine Learning to address industrial and societal challenges.
              </li>
            </ul>
          </div>
        );
      case 'SalientFeatures':
        return (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Salient Features</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li className="text-gray-700 leading-relaxed">
                Well-qualified faculty with expertise in AI, ML, and Data Science
              </li>
              <li className="text-gray-700 leading-relaxed">
                State-of-the-art laboratories with advanced computing facilities
              </li>
              <li className="text-gray-700 leading-relaxed">
                Industry collaborations through MoUs with leading tech companies
              </li>
              <li className="text-gray-700 leading-relaxed">
                Regular workshops, hackathons, and technical symposiums
              </li>
              <li className="text-gray-700 leading-relaxed">
                Access to specialized software and tools for AI/ML development
              </li>
              <li className="text-gray-700 leading-relaxed">
                Extensive industry internship opportunities
              </li>
              <li className="text-gray-700 leading-relaxed">
                Research projects in cutting-edge areas of AI and ML
              </li>
              <li className="text-gray-700 leading-relaxed">
                Strong placement record with tech giants and startups
              </li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  const boardOfStudies = [
    { name: "Dr. G. Loshma", designation: "Professor & HOD", organization: "SVEC", position: "Chairperson" },
    { name: "Dr. D Haritha", designation: "Professor, CSE", organization: "UCEK,JNTUK", position: "University Nominee" },
    { name: "Dr. Nagesh Bhattu Sristy", designation: "Assistant Professor,Dept. of CSE", organization: "NIT-AP", position: "Academic Expert" },
    { name: "Dr. K. Venkata Rao", designation: "Professor,Dept. of CS&SE", organization: "AU College of Engineering,Visakhapatnam", position: "Academic Expert" },
    { name: "Mr. T. Seshagiri", designation: "Enterprise Architect", organization: "TCS, Hyderabad", position: "Industry Expert" },
    { name: "Mr. Vinay Kumar", designation: "Director", organization: "XpertBridge, Hyderabad", position: "Industry Expert" },
    { name: "Mr. M Jnana Surya Prakasha Rao", designation: "Manager", organization: "BMW TechWorks India", position: "Alumni" },
    { name: "All the Faculty Members in the AIML Dept.", designation: "members in BOS", organization: "", position: "" }
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

  const renderContent = () => {
    switch (activeContent) {
      case 'Academic Toppers':
        return (
          <div id="academic-toppers" className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Academic Toppers</h2>
              <div className="mb-8">
                <details open className="border border-gray-300 rounded-lg mb-4">
                  <summary className="bg-gray-100 p-4 cursor-pointer text-lg font-semibold hover:bg-gray-200 transition-colors duration-200">
                    Academic Toppers for the Batch 2022-26
                  </summary>
                  <ul className="list-disc ml-6 mt-4">
                    <li>
                      Academic Toppers for the Batch 2022-26 -
                      <a href="https://srivasaviengg.ac.in/uploads/aiml/Academic%20Toppers%20%202022-26%20Batch-2%20(AIM).pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-2">View</a>
                    </li>
                  </ul>
                </details>
                <details className="border border-gray-300 rounded-lg mb-4">
                  <summary className="bg-gray-100 p-4 cursor-pointer text-lg font-semibold hover:bg-gray-200 transition-colors duration-200">
                    Academic Toppers for the Batch 2021-25
                  </summary>
                  <ul className="list-disc ml-6 mt-4">
                    <li>
                      Academic Toppers for the Batch 2021-25 -
                      <a href="https://srivasaviengg.ac.in/uploads/aiml/Academic%20Toppers%20%202021-25%20Batch-1%20(AIM).pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-2">View</a>
                    </li>
                  </ul>
                </details>
                <div className="overflow-x-auto mt-8">
                  <table className="min-w-full bg-white border-collapse">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700 bg-gray-50">S.NO.</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700 bg-gray-50">ACADEMIC YEAR</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700 bg-gray-50">PARTICULARS</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700 bg-gray-50">NO. OF STUDENTS BENEFITED</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700 bg-gray-50">SCHOLARSHIP AMOUNT</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-600">1</td>
                        <td className="py-3 px-4 text-gray-600">2024-25</td>
                        <td className="py-3 px-4 font-medium text-gray-800">Academic Toppers</td>
                        <td className="py-3 px-4 text-gray-600">18</td>
                        <td className="py-3 px-4 text-gray-600">19500</td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-600">2</td>
                        <td className="py-3 px-4 text-gray-600">2023-24</td>
                        <td className="py-3 px-4 font-medium text-gray-800">Academic Toppers</td>
                        <td className="py-3 px-4 text-gray-600">37</td>
                        <td className="py-3 px-4 text-gray-600">40500</td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-600">3</td>
                        <td className="py-3 px-4 text-gray-600">2022-23</td>
                        <td className="py-3 px-4 font-medium text-gray-800">Academic Toppers</td>
                        <td className="py-3 px-4 text-gray-600">6</td>
                        <td className="py-3 px-4 text-gray-600">6500</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
      case 'Technical Association':
        return (
          <div id="technical-association" className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Technical Association</h2>
              <div className="mb-8">
                <ul className="list-disc ml-6 mt-4">
                  <li>
                    MoUs with NIT ANP, Eduskills, Hexaware, APSSDC, Alykas Innovations Pvt.Ltd, thingTronics Pvt Ltd, Bangalore and TCS-iON.
                  </li>
                  <li>
                    College has MOU with TCS for conducting Online Competitive Exams for which our Department Resources are being utilized.
                  </li>
                  <li>
                    Professional Society memberships in ISTE and IAENG
                  </li>
                  <li>Good faculty retention</li>
                  <li>Well Equipped Laboratories</li>
                  <li>Maitri, Social Service Unit, managed by the Students.</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 'Extra-Curricular Activities':
        return (
          <div id="extra-curricular-activities" className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Extra-Curricular Activities</h2>
              <div className="mb-8">
                <ul className="list-disc ml-6 mt-4">
                  <li>
                    Extracurricular activities during the Year 2022-23 -
                    <a href="https://srivasaviengg.ac.in/uploads/cai/Extracurricular%20activities%20-%202022-23.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-2">View More</a>
                  </li>
                </ul>
                <h3 className="text-2xl font-semibold text-gray-700 mb-6 pb-2 border-b-2 border-primary mt-8">Maitri</h3>
                <div className="prose max-w-none">
                  <h3 className="text-lg font-bold mb-2">Social Services</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Maitri Association is a compassionate community where members, united by the spirit of 'Maitri' come together to contribute funds for those in need. Through collective efforts, the club aims to make a positive impact on the lives of individuals facing challenges, fostering a sense of solidarity and kindness within the group.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'Handbooks':
        return (
          <div id="handbooks" className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Academic HandBooks</h2>
              <div className="space-y-6">
                <details open>
                  <summary className="text-lg font-semibold text-[#850209] cursor-pointer">Academic year 2023-24: II-Sem Handbooks</summary>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      VI-Sem V20 Regulation Handbook -
                      <a href="https://srivasaviengg.ac.in/uploads/aiml/VI%20SEM%20(Autonomous)%20Handbook%20-%20AIM_2023-24.pdf" target="_blank" className="text-primary hover:underline ml-2">View</a>
                    </li>
                  </ul>
                </details>
                <details>
                  <summary className="text-lg font-semibold text-[#850209] cursor-pointer">Academic year 2023-24: I-Sem Handbooks</summary>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      V-Sem V20 Regulation Handbook -
                      <a href="https://srivasaviengg.ac.in/uploads/aiml/V%20SEM%20(Autonomous)%20Handbook%20-%20AIM_2023-24.pdf" target="_blank" className="text-primary hover:underline ml-2">View</a>
                    </li>
                    <li>
                      III-Sem V20 Regulation Handbook -
                      <a href="https://srivasaviengg.ac.in/uploads/aiml/III%20SEM%20(Autonomous)%20Handbook%20-%20AIM_2023-24.pdf" target="_blank" className="text-primary hover:underline ml-2">View</a>
                    </li>
                  </ul>
                </details>
                <details>
                  <summary className="text-lg font-semibold text-[#850209] cursor-pointer">Academic year 2022-23: II-Sem Handbooks</summary>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      IV-Sem V20 Regulation Handbook -
                      <a href="https://srivasaviengg.ac.in/uploads/aiml/IV%20SEM%20(Autonomous)%20Handbook%20-%20AIM_2022-23.pdf" target="_blank" className="text-primary hover:underline ml-2">View</a>
                    </li>
                  </ul>
                </details>
                <details>
                  <summary className="text-lg font-semibold text-[#850209] cursor-pointer">Academic year 2022-23: I-Sem Handbooks</summary>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      III-Sem V20 Regulation Handbook -
                      <a href="https://srivasaviengg.ac.in/uploads/aiml/III%20SEM%20(Autonomous)%20Handbook%20-%20AIM_2022-23.pdf" target="_blank" className="text-primary hover:underline ml-2">View</a>
                    </li>
                  </ul>
                </details>
              </div>
            </div>
          </div>
        );

      case 'Department Profile':
        return (
          <div id="department-profile" className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Department Profile</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="relative">
                  <img
                    src="/images/departments/cai/aihod.jpg"
                    alt="Dr. G. Loshma"
                    className="w-full h-80 object-cover rounded-lg shadow-md"
                  />
                </div>
                <div className="lg:col-span-2 space-y-4">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-[#B22222] mb-2">Dr. G. Loshma</h3>
                    <p className="text-lg text-[#8B0000] font-medium mb-2">Professor & Head of the Department</p>
                    <p className="text-gray-600">Mobile No: 7672082130</p>
                    <p className="text-gray-600">Phone No: 08818-284355(O)-(Ext.-442)</p>
                    <p className="text-gray-600">Email: <a href="mailto:hod_aim@srivasaviengg.ac.in" className="text-primary hover:underline">hod_aim@srivasaviengg.ac.in</a></p>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Department of Computer Science and Artificial Intelligence came into inception from 2021 onwards with an intake of 60 seats in B.Tech. From 2022 onwards the intake was increased to 120 seats. From 2025 onwards the intake was increased to 180 seats.
                  </p>
                </div>
              </div>

              {/* Department Profile Tab Navigation */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-[#B22222] mb-6">Department Profile</h3>
                <div className="overflow-x-auto">
                  <div className="border-b border-gray-200 mb-4">
                    <div className="flex flex-wrap -mb-px text-sm font-medium text-center">
                      {['Department', 'Vision', 'Mission', 'PEOs', 'POs', 'PSOs', 'SalientFeatures'].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveDeptTab(tab)}
                          className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg ${activeDeptTab === tab
                            ? 'text-[#B22222] border-[#B22222]'
                            : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                            }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>
                  {renderDeptTabContent()}
                </div>
              </div>
            </div>
          </div>
        );
      case 'Faculty Profiles':
        return (
          <div id="faculty-profiles" className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Profiles</h2>
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
                    {faculty.map((member, index) => (
                      <tr key={index} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4 font-medium text-gray-900">{member.name}</td>
                        <td className="px-6 py-4">{member.qualification}</td>
                        <td className="px-6 py-4">{member.designation}</td>
                        <td className="px-6 py-4">
                          <a href={member.profileUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">View Profile</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Non-Teaching Profiles</h2>
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
          </div>
        );
      case 'Board of Studies':
        return (
          <div id="board-of-studies" className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Board of Studies</h2>
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
                <li>Minutes of 4<sup>th</sup> meeting of the Board of Studies, dated 02.08.2024 <a href="#" className="text-primary hover:underline ml-2">View</a></li>
                <li>Minutes of 2<sup>nd</sup> meeting of the Board of Studies, dated 25.07.2022 <a href="#" className="text-primary hover:underline ml-2">View</a></li>
                <li>Minutes of 1<sup>st</sup> meeting of the Board of Studies, dated 31.12.2021 <a href="#" className="text-primary hover:underline ml-2">View</a></li>
              </ul>
            </div>
          </div>
        );
      case 'Physical Facilities':
        return (
          <div id="physical-facilities" className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Physical Facilities</h2>

              <div className="space-y-4">
                <details open className="border border-gray-300 rounded-lg mb-4">
                  <summary className="bg-gray-100 p-4 cursor-pointer text-lg font-semibold hover:bg-gray-200 transition-colors duration-200">
                    Class Rooms
                  </summary>
                  <div className="p-4">
                    <h5 className="font-medium text-lg mb-2">Class Rooms</h5>
                    <div className="mb-2">
                      <span>Class Rooms with ICT Enabled Facilities</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/CSE_Classrooms.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View
                      </a>
                    </div>

                    <h5 className="font-medium text-lg mt-4 mb-2">Class Time Tables</h5>
                    <div className="mb-2">
                      <span>Master Timetable_A.Y for Sem-II 2022-23</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/aiml/AI%20_ML_Master%20Time%20Table_2022-23_%20II%20SEM%20_AIML.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View
                      </a>
                    </div>
                    <div className="mb-2">
                      <span>Master Timetable_A.Y for Sem-I 2022-23</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/aiml/AIM_Master%20Time%20Table_A.Y%202022-23_%20I%20SEM.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View
                      </a>
                    </div>
                  </div>
                </details>

                <details className="border border-gray-300 rounded-lg mb-4">
                  <summary className="bg-gray-100 p-4 cursor-pointer text-lg font-semibold hover:bg-gray-200 transition-colors duration-200">
                    Seminar Halls
                  </summary>
                  <div className="p-4">
                    <div className="mb-2">
                      <span>Seminar halls with ICT Enabled Facilities</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/CSE_Seminar%20Halls.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View
                      </a>
                    </div>
                  </div>
                </details>

                <details className="border border-gray-300 rounded-lg mb-4">
                  <summary className="bg-gray-100 p-4 cursor-pointer text-lg font-semibold hover:bg-gray-200 transition-colors duration-200">
                    Laboratories
                  </summary>
                  <div className="p-4">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      The Department has well equipped labs with the latest
                      Configuration. Total 9 Computer Labs for UG, PG and one
                      research lab consisting a total of 674 systems. The various
                      servers in the server room include Oracle 11g Database Server,
                      Intranet Server (TOMCAT), NPTEL Video/Web Server, MAT Lab
                      Server 2012 R2, Red Hat Linux 5.0 Server, Library Automation
                      Server, A-Mail Server, ECAP Server.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      The college has high-speed internet connectivity throughout
                      the campus through a leased line from BSNL with 200Mbps,
                      400Mbps from Jio, and 40 Mbps (Broadband).
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      The following Laboratories are available in the department:
                    </p>

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

                    <div className="mt-8">
                      <h3 className="text-xl font-semibold mb-4">Other Laboratories</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {labs.map((lab, index) => (
                          lab.name !== "Linus Torvalds Lab" && lab.name !== "Orange Lab" && (
                            <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow text-center">
                              <img src={lab.image} alt={lab.name} className="w-full h-48 object-cover rounded-md mb-4" />
                              <h4 className="font-bold text-lg text-gray-800">{lab.name}</h4>
                            </div>
                          )
                        ))}
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
          <div id="syllabus" className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Syllabus</h2>
              <div className="container mx-auto">
                <div className="section">
                  <details open>
                    <summary className="font-semibold text-lg">B.Tech (CAI & AIML)</summary>
                    <div className="nav-content p-3">
                      <ul className="list-disc list-inside my-0">
                        <li className="m-0 p-0">
                          B.Tech - V20 Syllabus -
                          <a href="https://srivasaviengg.ac.in/uploads/syllabus/V20%20AI%20and%20AI&ML%20CS%20&%20Syllabus_%20I%20&%20II%20SEM.pdf" className="text-primary hover:underline ml-2">View</a>
                        </li>
                      </ul>
                    </div>
                  </details>
                </div>
                <details>
                  <summary className="font-semibold text-lg">SOC Syllabus</summary>
                  <div className="nav-content p-3">
                    <ul className="list-disc list-inside my-0">
                      <li className="m-0 p-0">
                        SOC Syllabus during the Academic Year 2022-23 -
                        <a href="https://srivasaviengg.ac.in/uploads/aiml/SOC_AIM_2022-23.pdf" className="text-primary hover:underline ml-2">View</a>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>
            </div>
          </div>
        );
      case 'Hackathons':
        return (
          <div id="hackathons" className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Hackathons</h2>
              <div className="mb-6">
                <ul className="list-disc list-inside mb-2">
                  <li>
                    Hackathon Brochure-
                    <a href="https://srivasaviengg.ac.in/uploads/aiml/Hackathon HackWave 1.0 Brochure.jpeg" target="_blank" className="text-primary hover:underline ml-2">For more details</a>
                  </li>
                  <li>
                    Hackathon Winners List during A.Y 2024-25 -
                    <a href="https://srivasaviengg.ac.in/uploads/aiml/Hackathon HackWave 1.0 Brochure.jpeg" target="_blank" className="text-primary hover:underline ml-2">For more details</a>
                  </li>
                </ul>
                <ul className="list-disc list-inside">
                  <li>
                    Hackathon Brochure- -
                    <a href="https://srivasaviengg.ac.in/uploads/cai/hackathon%20brouchure.pdf" target="_blank" className="text-primary hover:underline ml-2">For more details</a>
                  </li>
                  <li>
                    Hackathon Winners List during A.Y 2023-24 -
                    <a href="https://srivasaviengg.ac.in/uploads/cai/Hackathon%20Winners%202023.pdf" target="_blank" className="text-primary hover:underline ml-2">For more details</a>
                  </li>
                </ul>
              </div>
              <h2 className="text-2xl font-bold text-center mb-4 mt-8">Gallery</h2>
              <div className="container mx-auto mb-8">
                <div className="text-center text-xl font-semibold mb-2">Hackathon 2K24</div>
                <div className="flex flex-wrap justify-center items-center gap-4">
                  <div className="w-full md:w-1/3 flex justify-center">
                    <img src="https://srivasaviengg.ac.in/images/departments/cai/20241104_33020PMByGPSMapCamera.jpg" className="img-fluid m-3 rounded shadow" alt="Image 1" />
                  </div>
                  <div className="w-full md:w-1/3 flex justify-center">
                    <img src="https://srivasaviengg.ac.in/images/departments/cai/20241104_104621AMByGPSMapCamera.jpg" className="img-fluid m-3 rounded shadow" alt="Image 3" />
                  </div>
                </div>
              </div>
              <div className="container mx-auto">
                <div className="text-center text-xl font-semibold mb-2">Hackathon 2K23</div>
                <div className="flex flex-wrap justify-center items-center gap-4">
                  <div className="w-full md:w-1/3 flex flex-col items-center">
                    <img src="https://srivasaviengg.ac.in/uploads/cai/VEC_0125.JPG" className="img-fluid m-3 rounded shadow" alt="Image 1" />
                    <img src="https://srivasaviengg.ac.in/uploads/cai/VEC_0089.JPG" className="img-fluid m-3 rounded shadow" alt="Image 2" />
                  </div>
                  <div className="w-full md:w-1/3 flex flex-col items-center">
                    <img src="https://srivasaviengg.ac.in/uploads/cai/VEC_0091.JPG" className="img-fluid m-3 rounded shadow" alt="Image 3" />
                    <img src="https://srivasaviengg.ac.in/uploads/cai/VEC_0285.JPG" className="img-fluid m-3 rounded shadow" alt="Image 4" />
                  </div>
                  <div className="w-full md:w-1/3 flex flex-col items-center">
                    <img src="https://srivasaviengg.ac.in/uploads/cai/VEC_0271.JPG" className="img-fluid m-3 rounded shadow" alt="Image 5" />
                    <img src="https://srivasaviengg.ac.in/uploads/cai/VEC_0176.JPG" className="img-fluid m-3 rounded shadow" alt="Image 6" />
                  </div>
                  <div className="w-full md:w-1/3 flex flex-col items-center">
                    <img src="https://srivasaviengg.ac.in/uploads/cai/VEC_0218.JPG" className="img-fluid m-3 rounded shadow" alt="Image 7" />
                    <img src="https://srivasaviengg.ac.in/uploads/cai/IMG-20231111-WA0001.jpg" className="img-fluid m-3 rounded shadow" alt="Image 8" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'Workshops':
        return (
          <div id="workshops" className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Workshops/SOC/Seminars/Guest Lectures</h2>

              <div className="section">
                <details open>
                  <summary className="text-xl font-bold text-gray-800 mb-2 cursor-pointer">Workshops</summary>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Workshops/SOC organized during the Academic Year 2023-24 -
                      <a href="https://srivasaviengg.ac.in/uploads/aiml/Workshops_2023-2024(AIM).pdf" target="_blank" className="text-primary hover:underline ml-2">View More</a>
                    </li>
                  </ul>
                </details>
              </div>

              <div className="section mt-6">
                <details>
                  <summary className="text-xl font-bold text-gray-800 mb-2 cursor-pointer">SOC</summary>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      SOC organized during the Academic Year 2023-24 -
                      <a href="https://srivasaviengg.ac.in/uploads/aiml/SOC_2023-2024(AIM).pdf" target="_blank" className="text-primary hover:underline ml-2">View More</a>
                    </li>
                    <li>
                      SOC organized during the Academic Year 2022-23 -
                      <a href="https://srivasaviengg.ac.in/uploads/aiml/SOC_2022-2023(AIM).pdf" target="_blank" className="text-primary hover:underline ml-2">View More</a>
                    </li>
                  </ul>
                </details>
              </div>

              <div className="section mt-6">
                <details>
                  <summary className="text-xl font-bold text-gray-800 mb-2 cursor-pointer">Guest Lecturers/Seminars</summary>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Guest Lectures Organized during the Academic Year 2024-25 -
                      <a href="https://srivasaviengg.ac.in/uploads/aiml/Guest Lectures 2024-25.pdf" target="_blank" className="text-primary hover:underline ml-2">View More</a>
                    </li>
                    <li>
                      Guest Lectures Organized during the Academic Year 2023-24 -
                      <a href="https://srivasaviengg.ac.in/uploads/aiml/Guest%20Lectures&Alumni%20Connect_2023-2024(AIM).pdf" target="_blank" className="text-primary hover:underline ml-2">View More</a>
                    </li>
                    <li>
                      Guest Lectures Organized during the Academic Year 2022-23 -
                      <a href="https://srivasaviengg.ac.in/uploads/aiml/Guest%20Lectures&Alumni%20Connect_2022-2023(AIM).pdf" target="_blank" className="text-primary hover:underline ml-2">View More</a>
                    </li>
                  </ul>
                </details>
              </div>
            </div>
          </div>
        );
      case 'Contact':
        return (
          <div id="contact" className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Contact Information</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold text-[#B22222] mb-2">Dr. G. Loshma</h3>
                  <p className="text-lg text-[#8B0000] font-medium mb-2">Professor & Head of the Department</p>
                  <p className="text-gray-600">Phone No: 08818-284355(O)-(Ext.-377)</p>
                  <p className="text-gray-600">Fax No: 08818-284322</p>
                  <p className="text-gray-600">Email: <a href="mailto:hod_aim@srivasaviengg.ac.in" className="text-primary hover:underline">hod_aim@srivasaviengg.ac.in</a></p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'Faculty Development Programs':
        return (
          <div id="faculty-development-programs" className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Development Programs</h2>

              <div className="section">
                <details open>
                  <summary className="text-xl font-bold text-gray-800 mb-2 cursor-pointer">FDP Attended</summary>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      FDPs attended by the Faculty 2024-25 -
                      <a href="https://srivasaviengg.ac.in/uploads/aiml/AIM FDPs Workshops Seminars attended by Faculty 2024-25.pdf" target="_blank" className="text-primary hover:underline ml-2">View</a>
                    </li>
                    <li>
                      FDPs attended by the Faculty 2023-24 -
                      <a href="https://srivasaviengg.ac.in/uploads/aiml/FDPS%20Attended_2023-2024(AIM).pdf" target="_blank" className="text-primary hover:underline ml-2">View</a>
                    </li>
                  </ul>
                </details>
              </div>
            </div>
          </div>
        );
      case 'MoUs':
        return (
          <div id="mous" className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">MoUs</h2>
              <h3 className="text-xl font-semibold text-center mb-4">A. MOUs with Industries</h3>
              <div className="overflow-x-auto flex justify-center">
                <table className="min-w-max bg-white border border-gray-200 table-auto text-sm text-left text-gray-500">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 border-b">S.No</th>
                      <th className="py-3 px-4 border-b">Organization Name</th>
                      <th className="py-3 px-4 border-b">From</th>
                      <th className="py-3 px-4 border-b">To</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-3 px-4 border-b">1</td>
                      <td className="py-3 px-4 border-b">NIT ANP</td>
                      <td className="py-3 px-4 border-b">31-12-2022</td>
                      <td className="py-3 px-4 border-b">Till Date</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border-b">2</td>
                      <td className="py-3 px-4 border-b">Alteryx SparkED Partner</td>
                      <td className="py-3 px-4 border-b">30-12-2022</td>
                      <td className="py-3 px-4 border-b">Till Date</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border-b">3</td>
                      <td className="py-3 px-4 border-b">Juniper Networks</td>
                      <td className="py-3 px-4 border-b">30-11-2022</td>
                      <td className="py-3 px-4 border-b">Till Date</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border-b">4</td>
                      <td className="py-3 px-4 border-b">Celonis Academic Alliance</td>
                      <td className="py-3 px-4 border-b">11-11-2022</td>
                      <td className="py-3 px-4 border-b">Till Date</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border-b">5</td>
                      <td className="py-3 px-4 border-b">Palo Alto Networks Cyber Security Academy</td>
                      <td className="py-3 px-4 border-b">08-11-2022</td>
                      <td className="py-3 px-4 border-b">Till Date</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border-b">6</td>
                      <td className="py-3 px-4 border-b">Blue Prism Academia Program</td>
                      <td className="py-3 px-4 border-b">01-11-2022</td>
                      <td className="py-3 px-4 border-b">Till Date</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border-b">7</td>
                      <td className="py-3 px-4 border-b">Eduskills</td>
                      <td className="py-3 px-4 border-b">31-10-2022</td>
                      <td className="py-3 px-4 border-b">31-10-2025</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border-b">8</td>
                      <td className="py-3 px-4 border-b">Hexaware</td>
                      <td className="py-3 px-4 border-b">25-04-2020</td>
                      <td className="py-3 px-4 border-b">Till Date</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border-b">9</td>
                      <td className="py-3 px-4 border-b">APSSDC</td>
                      <td className="py-3 px-4 border-b">29-03-2019</td>
                      <td className="py-3 px-4 border-b">Till Date</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border-b">10</td>
                      <td className="py-3 px-4 border-b">TCSiON</td>
                      <td className="py-3 px-4 border-b">25-04-2012</td>
                      <td className="py-3 px-4 border-b">Till Date</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'Faculty Achievements':
        return (
          <div id="faculty-achievements" className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Achievements</h2>
              <div className="tab4 mt-4">
                <details open>
                  <summary className="text-lg font-semibold">Faculty Out-Reach</summary>
                  <div className="nav-content">
                    <ul className="list-disc ml-6 mt-4">
                      <li>
                        Faculty Out Reach -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/aiml/Faculty%20Outreach%20AIM.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >View</a>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>
              <div className="mt-4">
                <details>
                  <summary className="text-lg font-semibold">Journal Publications</summary>
                  <div>
                    <ul className="list-disc ml-6 mt-4">
                      <li>
                        Journal Publication Details 2024-2025 -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/aiml/AIM_Faculty Journal Publications_2024-25.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >View</a>
                      </li>
                      <li>
                        Journal Publication Details 2023-2024 -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/aiml/AIM_Faculty Journal Publications_2023-24.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >View</a>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>
              <div className="mt-4">
                <details>
                  <summary className="text-lg font-semibold">Conferences</summary>
                  <div>
                    <ul className="list-disc ml-6 mt-4">
                      <li>
                        Conferences Details 2024-2025 -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/aiml/AIM_Faculty Conference Publications_2024-25.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >For more Details</a>
                      </li>
                      <li>
                        Conferences Details 2023-2024 -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/aiml/Faculty%20Publications%20in%20Conferences_2023_24.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >For more Details</a>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>
              <div className="tab4 mt-4">
                <details>
                  <summary className="text-lg font-semibold">Certifications</summary>
                  <div className="nav-content">
                    <ul className="list-disc ml-6 mt-4">
                      <li>
                        Certifications done by the faculty during the A.Y. 2024-25 -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/aiml/2024-25 AIM Faculty MOOCs Certifications.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >For more Details</a>
                      </li>
                      <li>
                        Certifications done by the faculty during the A.Y. 2023-24 -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/aiml/2023-24 AIM Faculty MOOCs Certifications.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >For more Details</a>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>
              <div className="tab4 mt-4">
                <details>
                  <summary className="text-lg font-semibold">Patents</summary>
                  <div className="nav-content">
                    <ul className="list-disc ml-6 mt-4">
                      <li>
                        Patents Published by Faculty during the A.Y 2023-2024 -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/aiml/Patents by AIM Faculty 2023-24.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >For more Details</a>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>
            </div>
          </div>
        );
      case 'Student Achievements':
        return (
          <div id="student-achievements" className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h3 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Student Achievements</h3>
              <div className="tab4 mt-4">
                <details open>
                  <summary className="text-lg font-semibold">Conference Publications</summary>
                  <div className="m-3">
                    <p>
                      Conferences during the Academic Year 2023-24 -
                      <a
                        href="https://srivasaviengg.ac.in/uploads/aiml/Students%20Journal%202021-25_BATCH(AIM).pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline ml-2 font-semibold"
                      >View More</a>
                    </p>
                  </div>
                </details>
              </div>
              <div className="tab4 mt-4">
                <details>
                  <summary className="text-lg font-semibold">NPTEL/Other Certifications</summary>
                  <div className="nav-content">
                    <ul className="list-disc ml-6 mt-4">
                      <li>
                        Certifications during the A.Y 2023-24 -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/aiml/AIM_23-24_CERTIFICATIONS_TABLE.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >View More</a>
                      </li>
                      <li>
                        Certifications during the A.Y 2022-23 -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/aiml/NPTEL%20&%20Others%20Certifications%202022-23(AIM).pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >View More</a>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>
              <div className="tab4 mt-4">
                <details>
                  <summary className="text-lg font-semibold">Global Certifications</summary>
                  <div className="nav-content">
                    <ul className="list-disc ml-6 mt-4 text-center">
                      <li>
                        Global Certifications during A. Y 2023-24 -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/aiml/Global%20Certifications%202023-24%20(AIM).pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >View More</a>
                      </li>
                      <li>
                        Global Certifications during A. Y 2022-23 -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/aiml/Global%20certifications%202022-23(AIM).pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >View More</a>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>
              <div className="tab4 mt-4">
                <details>
                  <summary className="text-lg font-semibold">Virtual Internships</summary>
                  <div className="nav-content">
                    <ul className="list-disc ml-6 mt-4">
                      <li>
                        List of Virtual Internships done by 2022-26 Batch Students during A.Y 2023-24 -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/aiml/AIM-A%20Virtual%20Intenships.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >View More</a>
                      </li>
                      <li>
                        List of Virtual Internships done by 2021-25 Batch Students during A.Y 2023-24 -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/aiml/AIM_VIRTUAL_INTERNSHIPS_2021-25_BATCH.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >View More</a>
                      </li>
                      <li>
                        List of Virtual Internships done by 2021-25 Batch Students during A.Y 2022-23 -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/aiml/AIM_22-23_VIRTUAL_INTERNSHIPS_2021-25_BATCH.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >View More</a>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>
              <div className="tab4 mt-4">
                <details>
                  <summary className="text-lg font-semibold">Community Service Project</summary>
                  <div className="nav-content">
                    <ul className="list-disc ml-6 mt-4">
                      <li>
                        List of CSP Projects done by 2021-25 Batch Students -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/aiml/List%20of%20CSP%20Projects%20done%20by%202021-25%20Batch%20Students.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >View More</a>
                      </li>
                      <li>
                        List of CSP Projects done by 2022-26 Batch Students -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/aiml/AIM_CSP_2022-26_Batch.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >View More</a>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>
              <div className="tab4 mt-4">
                <details>
                  <summary className="text-lg font-semibold">Student Research Projects</summary>
                  <div className="nav-content">
                    <ul className="list-disc ml-6 mt-4">
                      <li>
                        Mini Projects done by 2021-25 Batch Students -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/aiml/2021-25%20Batch%20AI&ML%20Miniproject%20Data.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >View More</a>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>
            </div>
          </div>
        );
      case 'Placements':
        return (
          <div id="placements" className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Placements</h2>
              <div className="nav-content">
                <details open>
                  <summary className="text-lg font-semibold">Placements for Batch 2021-25</summary>
                  <ul className="list-disc ml-6 mt-4">
                    <li>
                      Placements for Batch 2021-25 -
                      <a
                        href="https://srivasaviengg.ac.in/uploads/aiml/2021-25 AIM Placement Summary.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline ml-2"
                      >View More</a>
                    </li>
                  </ul>
                </details>
              </div>
            </div>
          </div>
        );
      default:
        return <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center animate-fade-in"><h3 className="text-xl font-semibold text-gray-600">Content for {activeContent} will be updated soon.</h3></div>;
    }
  };

  return (
    <div className="pt-24 bg-gray-100">
      <section className="bg-[#8B1919] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold">Artificial Intelligence & Machine Learning</h1>
          </div>
        </div>
      </section>

      {/* Fixed Sidebar Component */}
      <FixedSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onClose={() => setSidebarOpen(false)}
        items={sidebarItems}
        activeItem={activeContent}
        onItemClick={setActiveContent}
        title="AI & ML Department"
        buttonLabel="Department Menu"
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AIMLDepartment;