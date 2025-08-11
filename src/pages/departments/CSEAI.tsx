
import React, { useState } from 'react';
import { Brain, BookOpen, Award, ExternalLink, Menu, ChevronRight, Cpu, Users, Briefcase, FileText, Building, Library, Link as LinkIcon, Activity, Trophy, Newspaper, Handshake, Calendar, GraduationCap, Phone } from 'lucide-react';

const CSEAIDepartment: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');

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

  const renderContent = () => {
    switch (activeContent) {
      case 'Faculty Profiles':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] text-center mt-8 mb-8" id="main-heading">
              Profile Page
            </h2>
            <div className="nav-content mb-2">
              <details open>
                <summary className="text-lg font-semibold">Faculty Profile</summary>
                <div className="tab4-table flex justify-center items-center my-4">
                  <div className="w-full overflow-x-auto">
                    <table className="min-w-max w-full border border-gray-200 rounded-xl shadow-lg bg-white text-sm text-left text-gray-700">
                      <thead className="bg-gradient-to-r from-blue-200 to-blue-100 sticky top-0 z-10">
                        <tr>
                          <th className="px-6 py-3 font-bold text-gray-800 text-center border-b">S.No.</th>
                          <th className="px-6 py-3 font-bold text-gray-800 border-b">Name of the Faculty</th>
                          <th className="px-6 py-3 font-bold text-gray-800 border-b">Qualification</th>
                          <th className="px-6 py-3 font-bold text-gray-800 border-b">Designation</th>
                          <th className="px-6 py-3 font-bold text-gray-800 border-b">Profile</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          [1, 'Dr. G. Loshma', 'Ph.D.', 'Head & Professor', 'https://srivasaviengg.ac.in/faculty_profile/CAI_Dr.G.Loshma.pdf'],
                          [2, 'Dr. E. Aswani Kumar', 'Ph.D.', 'Professor', 'https://srivasaviengg.ac.in/faculty_profile/AIM_Dr. E. Aswani Kumar.pdf'],
                          [3, 'Mrs. A. Leelavathi', 'M.Tech, (Ph.D.)', 'Sr. Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/AIM_A.%20Leelavathi.pdf'],
                          [4, 'Mr. R.L. Phani Kumar', 'M.Tech, (Ph.D.)', 'Sr. Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/CAI_R.L. Phani Kumar.pdf'],
                          [5, 'Mr. M. Subba Rao', 'M.Tech, (Ph.D.)', 'Sr. Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/AIM_Mr. M. Subba Rao.pdf'],
                          [6, 'Mr. P. V. V. Satyanarayana', 'M.Tech, (Ph.D.)', 'Sr. Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. P. V. V Satya Narayana.pdf'],
                          [7, 'Mr. V. Rama Narayana', 'M.Tech, (Ph.D.)', 'Sr. Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/AIM_Mr. V. Rama Narayana.pdf'],
                          [8, 'Mrs. V. Radha', 'M.Tech, (Ph.D.)', 'Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/CAI_Mrs. V. Radha.pdf'],
                          [9, 'Mr. A. Rajesh', 'M.Tech, (Ph.D.)', 'Sr. Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/AIM_A.Rajesh.pdf'],
                          [10, 'Mr. D. Ayyappa', 'M.Tech', 'Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/AIM_Mr. D. Ayyappa.pdf'],
                          [11, 'Mr. M. Yesu Sekharam', 'M.Tech', 'Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/AIM_M. Y. SEKHARAM.pdf'],
                          [12, 'Mrs. K. Durga Saranya', 'M.Tech', 'Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/AIM_Mrs. K. Durga Saranya.pdf'],
                          [13, 'Mr. Shaik Moulali', 'M.Tech', 'Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. Sk. Moulali.pdf'],
                          [14, 'Mrs. P. Ujwala Sai', 'M.Tech', 'Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/CAI_P. Ujwala.pdf'],
                          [15, 'Mrs. M. Kiranmai', 'M.Tech', 'Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/CAI_Ms. M. Kiranmai.pdf'],
                          [16, 'Mr. V. Thinakaran', 'M.E.', 'Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/CAI_Mr .V. Thinakaran.pdf'],
                          [17, 'Mr. P. Seshu Kumar', 'M.Tech.', 'Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. P Seshu Kumar.pdf'],
                          [18, 'Mrs. G. Kalyani', 'M.Tech.', 'Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/AIM_Ms. G Kalyani.pdf'],
                          [19, 'Mrs. Pratyusha Ch.', 'M.Tech.', 'Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/AIM_Ms. Prathyusha Ch.pdf'],
                          [20, 'Mr. A. Reddy Chaitanya', 'M.Tech.', 'Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. Reddy Chaitanya A.pdf'],
                          [21, 'Dr. Jagadish Kumar K B', 'Ph.D.', 'Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/AIM_Dr. Jagadish Kumar KB.pdf'],
                          [22, 'Mr. Nishanth N S', 'M.E.', 'Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/CAI_Mr.Nisanth N S.pdf'],
                          [23, 'Mr. B. V. V. Bhargav', 'M.Tech, (Ph.D.)', 'Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. Bhargav-BVV.pdf'],
                          [24, 'Mr. V. Jaya Rama Krishna', 'M.Tech, (Ph.D.)', 'Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. V. Jayaramakrishna.pdf'],
                          [25, 'Dr. M. Vishnuvardhan', 'Ph.D.', 'Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/CAI_Dr. M Vishnuvardhan.pdf'],
                          [26, 'Mrs. Jane Rose', 'M.Tech.', 'Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. Reddy Chaitanya A.pdf'],
                          [27, 'Dr. J. Kondala Rao', 'Ph.D.', 'Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/AIM_Mr. K. Jyothi.pdf'],
                          [28, 'Mrs. Balaji Rohitha', 'M.Tech.', 'Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/CAI_DS_Mrs. B. Rohitha.pdf'],
                          [29, 'Mr. Jewaliddin Shaik', 'M.Tech, (Ph.D.)', 'Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. Reddy Chaitanya A.pdf'],
                          [30, 'Ms. Sneha Pradhan', 'M.Tech.', 'Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/AIM_Mrs. P. Sneha.pdf'],
                        ].map(([sno, name, qual, desig, url], idx) => (
                          <tr key={sno} className={
                            `transition-colors duration-200 ${idx % 2 === 0 ? 'bg-blue-50' : 'bg-white'} hover:bg-blue-100 border-b last:border-b-0`}
                          >
                            <td className="px-6 py-3 text-center font-semibold">{sno}</td>
                            <td className="px-6 py-3 font-medium text-gray-900">{name}</td>
                            <td className="px-6 py-3">{qual}</td>
                            <td className="px-6 py-3">{desig}</td>
                            <td className="px-6 py-3">
                              <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-700 font-semibold hover:underline">View Profile</a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </details>
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

            return (
            <div className="pt-24 bg-gray-100">
              <section className="bg-[#8B1919] text-white py-12">
                <div className="container mx-auto px-4">
                  <div className="text-center">
                    <h1 className="text-3xl md:text-4xl font-bold">CSE - Artificial Intelligence</h1>
                  </div>
                </div>
              </section>
              {/* Mobile Header */}
              <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-md z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Cpu className="w-6 h-6 text-primary" />
                    <span className="font-bold text-lg">CSE (AI)</span>
                  </div>
                  <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600">
                    <Menu className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Sidebar Overlay for Mobile */}
              {sidebarOpen && (
                <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setSidebarOpen(false)}></div>
              )}

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
                                  setSidebarOpen(false);
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