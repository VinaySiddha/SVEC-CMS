import React, { useState } from 'react';
import { Award, BookOpen, Users, TrendingUp, Lightbulb, FileText, Microscope, Rocket, ExternalLink, Menu, X, ChevronRight } from 'lucide-react';

const RDInnovation: React.FC = () => {
  const [activeTab, setActiveTab] = useState('department');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sidebar navigation items
  const sidebarItems = [
    { id: 'department', label: 'Department Profile', icon: ChevronRight },
    { id: 'coordinators', label: 'R&D Co-Ordinators', icon: ChevronRight },
    { id: 'proceedings', label: 'Conference Proceedings', icon: ChevronRight },
    { id: 'projects', label: 'Projects', icon: ChevronRight },
    { id: 'publications', label: 'Faculty Publications', icon: ChevronRight },
    { id: 'facilities', label: 'Research Facilities', icon: ChevronRight },
    { id: 'patents', label: 'Patents', icon: ChevronRight },
    { id: 'consultancy', label: 'Consultancy', icon: ChevronRight },
    { id: 'mous', label: "MoUs", icon: ChevronRight },
    { id: 'policy', label: 'Research Policy', icon: ChevronRight },
    { id: 'links', label: 'Important Links', icon: ChevronRight },
    { id: 'econtent', label: 'E-Content', icon: ChevronRight },
    { id: 'contact', label: 'Contact-Info', icon: ChevronRight },
  ];

  // Main navigation tabs
  const mainTabs = [
    { id: 'department', label: 'Department' },
    { id: 'vision', label: 'Vision' },
    { id: 'mission', label: 'Mission' },
    { id: 'objectives', label: 'Objectives & Goals' },
  ];

  // R&D Coordinators data
  const coordinators = [
    { sno: 1, name: 'K. Gowtham Kumar', designation: 'Asst. Professor', department: 'CE' },
    { sno: 2, name: 'D. Anjani Suputri Devi', designation: 'Sr. Asst. Professor', department: 'CSE' },
    { sno: 3, name: 'Dr. M. Thamaria', designation: 'Professor', department: 'ECE' },
    { sno: 4, name: 'Dr. Ch. Anil Kumar', designation: 'Assoc. Professor', department: 'EEE' },
    { sno: 5, name: 'B. N. V. Srinivas', designation: 'Asst. Professor', department: 'MECH' },
    { sno: 6, name: 'Dr. K. Pulla Rao', designation: 'Astt. Professor', department: 'MBA' },
    { sno: 7, name: 'G. S. Prasanthi', designation: 'Asst. Professor', department: 'BSH(M)' },
    { sno: 8, name: 'Dr. K. Jagadeesh', designation: 'Asst. Professor', department: 'BSH(P)' },
    { sno: 9, name: 'S. V. V. Sumalatha', designation: 'Asst. Professor', department: 'BSH(C)' },
    { sno: 10, name: 'K. V. Rama Rao', designation: 'Asst. Professor', department: 'BSH(E)' },
  ];

  // Conference proceedings data
  const proceedings = [
    {
      title: 'NCDECT-2203',
      link: 'https://srivasaviengg.ac.in/uploads/r&d_uploads/Proceedings_of_AICTE-2023_Book.pdf'
    },
    {
      title: 'ICETEM-2020',
      link: 'https://srivasaviengg.ac.in/uploads/r&d_uploads/UPDATED%20ICETEM-2020%20on%2006.04-.2021%20(1).pdf'
    }
  ];

  // Projects data
  const ongoingProjects = [
    {
      title: 'Localization of Smart Drainaze System and wrist band for Mosquito control',
      agency: 'DST,SEED Division, Government of India(ECE)',
      amount: 'Rs. 32,24,496',
      status: 'Completed'
    },
    {
      title: 'Design & development of an Integrated Solar PV Based water Purification and IOT based water qualityMonitoring System in Appa rao Pet, tadepalligudem Mandal, west Godavari District.',
      agency: 'DST,SEED Division, Government of India(EEE & ECE)',
      amount: 'Rs. 76,33,618',
      status: 'Completed'
    }
  ];

  // Sanctioned schemes data
  const sanctionedSchemes = [
    { sno: 1, name: 'AICTE-MODROBS : Artificial Intelligence and Deep Learning Laboratory', amount: '6 Lakhs approx.' },
    { sno: 2, name: 'The AICTE Sponsored International E-Conference On Emerging Trends In Engineering And Management (ICETEM-2020) During 19 and 20th of February 2021', amount: '0.5 Lakhs approx.' },
    { sno: 3, name: 'AICTE-ATAL Sponsored One week FDP:RF Energy Harvesting Antennas For WBAN: Design, Development &Challenges During 23rd to 27thAugust 2021', amount: '4.55 Lakhs approx.' },
    { sno: 4, name: 'AICTE Sponsored One week national Level Online FDP on " Research Areas in Bio- Medical Signal Processing "', amount: '0.93 Lakhs approx.' },
    { sno: 5, name: 'AICTE-ATAL Sponsored Five-day online FDP on "Electric Vehicles & Energy Storage Systems integrated with Renewable Energy Sources During 23rd to 27th August 2021', amount: '0.93 Lakhs approx.' },
    { sno: 6, name: 'CM Skill Excellence Center (APSSDC)', amount: '15 Lakhs approx.' },
    { sno: 7, name: 'Dassault Systems 3D Experience Center', amount: '50 Lakhs approx.' },
    { sno: 8, name: 'AICTE QIS - SC/ST SPDP 2017-18 sanctioned for 3 years w.e.f. April 2019 (1-3564157576)', amount: '23.78 Lakhs' },
    { sno: 9, name: 'DST – NIMAT - Entrepreneurship Awareness Camps – 2', amount: '40,000 (20,000 each)' },
    { sno: 10, name: 'The Institution of Engineers India – One day workshops – ECE, CSE & ME – 3 No.s', amount: '20,000(10,000+5,000+5,000)' },
    { sno: 11, name: 'APSSDC – Bennet University AI/ ML Research Cluster', amount: 'Approved' },
    { sno: 12, name: 'MHRD Institution\'s Innovation Council', amount: 'Approved' },
    { sno: 13, name: 'APSSDC – IUCEE Institutional Member', amount: 'Approved' },
  ];

  // Faculty publications by department
  const facultyPublications = [
    { department: 'CSE', link: 'http://srivasaviengg.ac.in/cse.php#parentVerticalTab8/' },
    { department: 'ECE', link: 'http://srivasaviengg.ac.in/ece.php#parentVerticalTab9/' },
    { department: 'EEE', link: 'http://srivasaviengg.ac.in/eee.php#parentVerticalTab7/' },
    { department: 'ME', link: 'http://srivasaviengg.ac.in/mechanical.php#parentVerticalTab8/' },
    { department: 'CE', link: 'http://srivasaviengg.ac.in/civil.php#parentVerticalTab10/' },
  ];

  // Research facilities
  const researchFacilities = [
    {
      title: 'Research Facilities',
      link: 'https://srivasaviengg.ac.in/uploads/r&d_uploads/Research%20Facilities.pdf'
    }
  ];

  // Important links
  const importantLinks = [
    { name: 'UGC', link: 'https://www.ugc.ac.in/' },
    { name: 'AICTE', link: 'https://www.aicte-india.org/' },
    { name: 'DST', link: 'http://www.dst.gov.in/' },
    { name: 'DST SERB', link: 'http://www.serbonline.in/SERB/HomePage.do' },
  ];

  // Major funding agencies
  const fundingAgencies = [
    { sno: 1, name: 'IEEE', website: 'http://www.ieee.org/organizations/foundation/educationalfunds.html#Student' },
    { sno: 2, name: 'National Manufacturing Competitiveness Programme (NMCP)', website: 'www.dcmsme.gov.in/schemes/nmcp_scm.htm' },
    { sno: 3, name: 'IE India', website: 'www.ieindia.org/' },
    { sno: 4, name: 'Promoting Innovations in Individuals, Start-ups and MSMEs (PRISM)', website: 'http://www.dsir.gov.in/12plan/prism/prism.htm' },
    { sno: 5, name: 'AP Innovations Society', website: 'http://www.apinnovationsociety.com/' },
  ];

  // MOUs data
  const mous = [
    'NIT-AP', 'Zscaler Academic Alliance Program', 'Star Health And Allied Insurance Company Ltd',
    'Horticulture', 'Tessolve Semiconductor Test Engineering', 'Instaks', 'Alykas',
    'Sphere Soft Solutions India Pvt. Ltd', 'IIT Madras MOU', 'Margadarshan-SRKR',
    'Edu Skills', 'Juniper Networks', 'Alteryx SparkED Partner',
    'Palo Alto Networks Cyber Security Academy', 'Blue Prism Academia Program',
    'Electro –Pro E-waste Management', '3F Industries Pvt. Ltd.',
    'APSSDC Dassault 3D experiance center', 'APSSDC', 'Conduria', 'NHAI(India)',
    'Celonis Academic Alliance', 'TCS-iON', 'EFY-Certified Electronics Skill development center',
    'Margdarshan-JNTUK', 'thing Tronics', 'Hexaware', 'British Council'
  ];

  // Research policy documents
  const researchPolicyDocs = [
    {
      title: 'Research Policy',
      link: 'https://srivasaviengg.ac.in/uploads/r&d_uploads/HR%20Policy.pdf'
    },
    {
      title: 'Grants Received from Government Agencies',
      link: 'https://srivasaviengg.ac.in/uploads/naac/criteria3/3.2.1%20Research%20Funding%20Received%20By%20Institution%20&%20its%20faculty.pdf'
    }
  ];

  // E-Content data
  const eContentItems = [
    {
      title: 'E-Content on Blockchain an overview and Research Perspective',
      link: 'https://srivasaviengg.ac.in/uploads/r&d_uploads/e-content-RESEARCH%20PERSPECTIVES%20FDP_KU.pdf'
    },
    {
      title: 'E-Content on STTP-Blockchain Healthcare',
      link: 'https://srivasaviengg.ac.in/uploads/r&d_uploads/E-content-STTP%20-blockchain%20healthcare.pdf'
    },
    {
      title: 'E-Content on Smart and Secure Healthcare System for Elderly and Disabled',
      link: 'https://srivasaviengg.ac.in/uploads/r&d_uploads/e-content-Final%20SmartHealthCare-TIDE-Final%2021-12-19.pdf'
    },
    {
      title: 'E-Content on Buildng Blockchain based Cryptosystems',
      link: 'https://srivasaviengg.ac.in/uploads/r&d_uploads/2.E-content%20Design%20of%20Blockchain%20based%20Cryptosystems.pdf'
    },
    {
      title: 'E-Content on Cybersecurity',
      link: 'https://srivasaviengg.ac.in/uploads/r&d_uploads/Cyber%20Security.pdf'
    },
    {
      title: 'E-Content on Mathematical Foundations for Cryptography',
      link: 'https://srivasaviengg.ac.in/uploads/r&d_uploads/MFC%20ECONTENT_Final.pdf'
    },
    {
      title: 'E-Content on Provably Secure ECDH',
      link: 'https://srivasaviengg.ac.in/uploads/r&d_uploads/PROVABLY%20SECURE%20ECDH.pdf'
    },
    {
      title: 'E-Content on Demistifying Blockchain',
      link: 'https://srivasaviengg.ac.in/uploads/r&d_uploads/Demistifying_Blockchain.pdf'
    },
    {
      title: 'How can Blockchain Technology Help Improve User Security and Privacy',
      link: 'https://srivasaviengg.ac.in/uploads/r&d_uploads/Final%20Video%20lecture.mp4'
    },
    {
      title: 'An Art of Publishing Survey Paper',
      link: 'https://srivasaviengg.ac.in/uploads/r&d_uploads/An%20ART%20OF%20PUBLISHING%20%20SURVEY%20PAPER.ppt'
    }
  ];

  // Function to render sidebar content based on active tab
  const renderSidebarContent = () => {
    switch (activeTab) {
      case 'coordinators':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary mb-6">R&D Co-Ordinators</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left font-semibold">S.No.</th>
                    <th className="px-6 py-4 text-left font-semibold">Name of the Faculty</th>
                    <th className="px-6 py-4 text-left font-semibold">Designation</th>
                    <th className="px-6 py-4 text-left font-semibold">Department</th>
                  </tr>
                </thead>
                <tbody>
                  {coordinators.map((coordinator, index) => (
                    <tr key={coordinator.sno} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                      <td className="px-6 py-4 border-b border-gray-200">{coordinator.sno}</td>
                      <td className="px-6 py-4 border-b border-gray-200 font-medium">{coordinator.name}</td>
                      <td className="px-6 py-4 border-b border-gray-200">{coordinator.designation}</td>
                      <td className="px-6 py-4 border-b border-gray-200">{coordinator.department}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'proceedings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary mb-6">Conference Proceedings</h2>
            <ul className="space-y-3">
              {proceedings.map((proceeding, index) => (
                <li key={index} className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <span>{proceeding.title}</span>
                  <a
                    href={proceeding.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                  >
                    - View <ExternalLink className="w-4 h-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-primary text-center mb-6">Projects</h2>

            {/* Ongoing/Completed Projects */}
            <div>
              <h3 className="text-xl font-semibold text-center mb-4">Projects Sanctioned/On-going/completed</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="px-6 py-4 text-left font-semibold">Title of the Project</th>
                      <th className="px-6 py-4 text-left font-semibold">Funding Agency</th>
                      <th className="px-6 py-4 text-left font-semibold">Amount(Rs.)</th>
                      <th className="px-6 py-4 text-left font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ongoingProjects.map((project, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                        <td className="px-6 py-4 border-b border-gray-200">{project.title}</td>
                        <td className="px-6 py-4 border-b border-gray-200">{project.agency}</td>
                        <td className="px-6 py-4 border-b border-gray-200 font-medium">{project.amount}</td>
                        <td className="px-6 py-4 border-b border-gray-200">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${project.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                            {project.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sanctioned Schemes */}
            <div>
              <h3 className="text-xl font-semibold text-center mb-4">Sanctioned Schemes/Labs by various Organizations</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="px-6 py-4 text-left font-semibold">S.NO</th>
                      <th className="px-6 py-4 text-left font-semibold">Name of the Scheme</th>
                      <th className="px-6 py-4 text-left font-semibold">Amount Sanctioned in (Rs.)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sanctionedSchemes.map((scheme, index) => (
                      <tr key={scheme.sno} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                        <td className="px-6 py-4 border-b border-gray-200">{scheme.sno}</td>
                        <td className="px-6 py-4 border-b border-gray-200">{scheme.name}</td>
                        <td className="px-6 py-4 border-b border-gray-200 font-medium">{scheme.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'publications':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary text-center mb-6">Faculty Publications</h2>
            <ul className="space-y-3">
              {facultyPublications.map((publication, index) => (
                <li key={index} className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <span>{publication.department}</span>
                  <a
                    href={publication.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                  >
                    - View <ExternalLink className="w-4 h-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'facilities':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary text-center mb-6">Research Facilities</h2>
            <ul className="space-y-3">
              {researchFacilities.map((facility, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Microscope className="w-4 h-4 text-primary" />
                  <span>{facility.title}</span>
                  <a
                    href={facility.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                  >
                    - View <ExternalLink className="w-4 h-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'patents':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary text-center mb-6">Patents</h2>
            <ul className="space-y-3">
              {facultyPublications.map((publication, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" />
                  <span>{publication.department}</span>
                  <a
                    href={publication.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                  >
                    - View <ExternalLink className="w-4 h-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'consultancy':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary text-center mb-6">Consultancy</h2>
            <div className="flex justify-center">
              <img
                src="https://srivasaviengg.ac.in/uploads/r&d_uploads/WhatsApp%20Image%202024-02-10%20at%202.35.20%20PM.jpeg"
                alt="Consultancy"
                className="w-full max-w-4xl rounded-lg shadow-lg"
              />
            </div>
          </div>
        );

      case 'mous':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-primary text-center mb-6">MOU's</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mous.map((mou, index) => (
                <div key={index} className="p-3 bg-secondary/10 rounded-lg">
                  <span className="text-sm">{mou}</span>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <span>TCS ion Activity</span>
                <a
                  href="https://srivasaviengg.ac.in/uploads/r&d_uploads/TCS%20Pics%20and%20Exam%20Data.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                >
                  - View <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <span>British Council</span>
                <a
                  href="https://srivasaviengg.ac.in/uploads/r&d_uploads/British%20Council%20Certification%20Course%202022-2023.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                >
                  - View <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        );

      case 'policy':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary text-center mb-6">Research Policy</h2>
            <ul className="space-y-3">
              {researchPolicyDocs.map((doc, index) => (
                <li key={index} className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <span>{doc.title}</span>
                  <a
                    href={doc.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                  >
                    - View <ExternalLink className="w-4 h-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'links':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary text-center mb-6">Important Links</h2>
            <ul className="space-y-3">
              {importantLinks.map((link, index) => (
                <li key={index} className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-primary" />
                  <span>{link.name}</span>
                  <a
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                  >
                    - View <ExternalLink className="w-4 h-4" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-primary mb-4">List of Major Funding Agencies in India</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="px-6 py-4 text-left font-semibold">S.NO</th>
                      <th className="px-6 py-4 text-left font-semibold">List of Major Funding Agencies in India</th>
                      <th className="px-6 py-4 text-left font-semibold">Web Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fundingAgencies.map((agency, index) => (
                      <tr key={agency.sno} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                        <td className="px-6 py-4 border-b border-gray-200">{agency.sno}</td>
                        <td className="px-6 py-4 border-b border-gray-200 font-medium">{agency.name}</td>
                        <td className="px-6 py-4 border-b border-gray-200">
                          <a
                            href={agency.website.startsWith('http') ? agency.website : `http://${agency.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 underline"
                          >
                            {agency.website}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'econtent':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary text-center mb-6">E-Content</h2>
            <ul className="space-y-3">
              {eContentItems.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <BookOpen className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                  <div>
                    <span>{item.title}</span>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1 ml-2"
                    >
                      - View <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-primary text-center mb-6">Contact-Info</h1>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="flex justify-center">
                  <img
                    src="/naresh.jpeg"
                    alt="Dr.V.Srinivas Naresh"
                    className="w-64 h-64 object-cover rounded-lg shadow-md"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold text-primary mb-2">Dr.V.Srinivas Naresh</h2>
                  <p className="text-lg mb-2">Professor & Dean(R & D)</p>
                  <p className="mb-2">Phone No: 9491556014</p>
                  <p className="mb-4">
                    Email:{' '}
                    <a
                      href="mailto:deanrnd@srivasaviengg.ac.in"
                      className="text-primary hover:text-primary/80"
                    >
                      deanrnd@srivasaviengg.ac.in
                    </a>
                  </p>
                  <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                    See Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Function to render main tab content
  const renderMainTabContent = () => {
    switch (activeTab) {
      case 'department':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <img
                  src="/naresh.jpeg"
                  alt="Dr.V.Srinivas Naresh"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-primary">Dr.V.Srinivas Naresh</h2>
                <p className="text-lg">Professor & Dean (R & D)</p>
                <p>Phone No: 9491556014</p>
                <p>
                  Email:{' '}
                  <a
                    href="mailto:deanrnd@srivasaviengg.ac.in"
                    className="text-primary hover:text-primary/80"
                  >
                    deanrnd@srivasaviengg.ac.in
                  </a>
                </p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-4">Department Profile</h3>
              <p className="text-foreground/80 leading-relaxed">
                Researchers pursue new discoveries in information and communication technology, human health,
                transportation, energy management, security, sustainability and a wide range of other engineering fields.
                Our Research and Development Cell offers opportunities to establish close networking with the universities
                & industries and nurtures the faculty and students pursuing new inventions and developments.
                <br /><br />
                With a view to enhance research activities, adjunct professor from Industries are visiting the campus
                and motivating the faculty and students to do R & D projects in all disciplines.
              </p>
            </div>
          </div>
        );

      case 'vision':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary mb-4">Vision</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <p className="text-center text-lg font-medium text-foreground/80">
                To be a premier technological institute striving for excellence with global perspective and commitment to the Nation.
              </p>
            </div>
          </div>
        );

      case 'mission':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary mb-4">Mission</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <p className="text-center text-lg font-medium text-foreground/80">
                To provide quality technical education and research opportunities that prepare students to be innovative
                engineers and leaders in their chosen fields, contributing to the technological advancement of society.
              </p>
            </div>
          </div>
        );

      case 'objectives':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary mb-4">Objectives & Goals</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <ul className="space-y-3 text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span>To promote research and development activities in emerging technologies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span>To establish industry-academia partnerships for collaborative research</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span>To encourage faculty and students to pursue innovative projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span>To secure funding from government and private agencies for research projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span>To publish research findings in reputed journals and conferences</span>
                </li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="pt-24 bg-background text-foreground min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 md:py-20 w-full rounded-none mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Research and Development</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Advancing innovation through cutting-edge research and development initiatives
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden mb-6 bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Menu className="w-5 h-5" />
          <span>Details</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className={`lg:w-80 ${sidebarOpen ? 'fixed inset-0 z-50 bg-background lg:relative lg:inset-auto lg:z-auto' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-lg h-full overflow-y-auto">
              {/* Mobile close button */}
              <div className="lg:hidden flex justify-between items-center p-6 border-b">
                <h3 className="text-xl font-bold text-primary">Department Menu</h3>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Header */}
              <div className="hidden lg:block p-6 border-b">
                <h3 className="text-xl font-bold text-primary">Department Menu</h3>
              </div>

              {/* Navigation */}
              <nav className="p-4 space-y-1">
                {sidebarItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${isActive
                        ? 'bg-primary text-white font-medium shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                      <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'rotate-90' : ''}`} />
                      <span className="text-sm">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Check if we're showing sidebar content or main tabs */}
            {sidebarItems.find(item => item.id === activeTab) && activeTab !== 'department' ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
                {renderSidebarContent()}
              </div>
            ) : (
              <>
                {/* Main Tab Navigation */}
                <div className="mb-8">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {mainTabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === tab.id
                          ? 'bg-primary text-white'
                          : 'bg-secondary/20 text-foreground hover:bg-secondary/40'
                          }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Main Tab Content */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
                  {renderMainTabContent()}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default RDInnovation;
