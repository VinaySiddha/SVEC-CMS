import React, { useState, useEffect } from 'react';
import { Database, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library, Link as LinkIcon, Settings } from 'lucide-react';

const DSDepartment: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeContent, setActiveContent] = useState('Department Profile');
    const [activeDeptTab, setActiveDeptTab] = useState('Department');

    useEffect(() => {
        // Set page title
        document.title = "DS Department - SVEC";

        // Scroll to top on component mount
        window.scrollTo(0, 0);
    }, []);

    const sidebarItems = [
        'Department Profile',
        'Faculty Profiles',
        'Board of Studies',
        'Syllabus',
        'Physical Facilities',
        'Department Library',
        'MoUs',
        'Faculty Development Programs',
        'Faculty Achievements',
        'Workshops',
        'Student Achievements',
        'Placements',
        'Merit Scholarship/Academic Toppers',
        'Technical Association',
        'Training Activities',
        'Newsletters',
        'Extra-Curricular Activities',
        'Hackathons',
        'e-Resources',
        'Handbooks',
        'Contact'
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

    const boardOfStudies = [
        { name: "Dr. G. Loshma", designation: "Professor & HOD", organization: "SVEC", position: "Chairperson" },
        { name: "Dr. L. Sumalatha", designation: "Professor, CSE", organization: "UCEK,JNTUK", position: "University Nominee" },
        { name: "Dr. R. B. V Subrahmanyam", designation: "Professor, CSE", organization: "NITW, TG", position: "Academic Expert" },
        { name: "Dr. K. Himabindu", designation: "Dean, Student Welfare", organization: "NIT-AP, AP", position: "Academic Expert" },
        { name: "Mr. Ch. Pavan Kumar", designation: "Delivery Partner/Solution Architect", organization: "TCS, Hyderabad", position: "Industry Expert" },
        { name: "Mr. N. Sattibabu", designation: "Lead Consultant", organization: "Infosys Limited, Hyderabad", position: "Alumni" }
    ];

    const renderDeptTabContent = () => {
        switch (activeDeptTab) {
            case 'Department':
                return (
                    <div className="py-6">
                        <h3 className="text-2xl font-bold text-[#B22222] mb-4">Department Overview</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            The Department of Computer Science and Engineering(Data Science) came into inception from 2024 onwards with an intake of 60 seats in B.Tech.
                        </p>
                    </div>
                );
            case 'Vision':
                return (
                    <div className="py-6">
                        <h3 className="text-2xl font-bold text-[#B22222] mb-4">Vision</h3>
                        <p className="text-gray-700 leading-relaxed">
                            To evolve as a centre for academic and research excellence in the area of Data Science.
                        </p>
                    </div>
                );
            case 'Mission':
                return (
                    <div className="py-6">
                        <h3 className="text-2xl font-bold text-[#B22222] mb-4">Mission</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>To utilize innovative learning methods for academic improvement.</li>
                            <li>To encourage higher studies and research to meet the futuristic requirements of DS.</li>
                            <li>To inculcate Ethics and Human values for developing students with good character.</li>
                        </ul>
                    </div>
                );
            case 'PEOs':
                return (
                    <div className="py-6">
                        <h3 className="text-2xl font-bold text-[#B22222] mb-4">Program Educational Objectives (PEOs)</h3>
                        <p className="text-gray-700 mb-4">The graduates will:</p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>Adapt to evolving technology.</li>
                            <li>Provide optimal solutions to real time problems.</li>
                            <li>Demonstrate his/her abilities to support service activities with due consideration for Professional and Ethical Values.</li>
                        </ul>
                    </div>
                );
            case 'POs':
                return (
                    <div className="py-6">
                        <h3 className="text-2xl font-bold text-[#B22222] mb-4">Program Outcomes (POs)</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li><strong>Engineering knowledge:</strong> Apply the knowledge of Mathematics, Science, Engineering Fundamentals, and Concepts of Computer Science Engineering(DS) to the solution of complex Engineering problems.</li>
                            <li><strong>Problem Analysis:</strong> Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions using first principles of Mathematics, Natural Sciences, and Computer Science.</li>
                            <li><strong>Design/development of solutions:</strong> Design solutions for complex engineering problems and design system components or processes that meet the specific needs with appropriate consideration for public health and safety, and the cultural, societal, and environmental considerations.</li>
                            <li><strong>Conduct investigations of complex problems:</strong> Use research-based knowledge and research methods, including the design of experiments, analysis and interpretation of data, and synthesis of information to provide valid conclusions.</li>
                            <li><strong>Modern tool usage:</strong> Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools, including prediction and modeling, to complex Engineering activities with an understanding of the limitations.</li>
                            <li><strong>The engineer and society:</strong> Apply reasoning informed by contextual knowledge to assess societal, health, safety, legal, and cultural issues and the consequent responsibilities relevant to professional Engineering practice.</li>
                            <li><strong>Environment and sustainability:</strong> Understand the impact of professional engineering solutions in societal and environmental contexts and demonstrate knowledge of, and the need for sustainable development.</li>
                            <li><strong>Ethics:</strong> Apply ethical principles and commit to professional ethics and responsibilities and norms of Engineering practice.</li>
                            <li><strong>Individual and team work:</strong> Function effectively as an individual and as a member or leader in diverse teams and in multidisciplinary settings.</li>
                            <li><strong>Communication:</strong> Communicate effectively on complex Engineering activities with the Engineering community and with society at large, such as being able to comprehend and write effective reports and design documentation, make effective presentations, and give and receive clear instructions.</li>
                            <li><strong>Project management and finance:</strong> Demonstrate knowledge and understanding of Engineering and Management principles and apply these to one's own work, as a member and leader in a team, to manage projects and in multidisciplinary environments.</li>
                            <li><strong>Life-long learning:</strong> Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change.</li>
                        </ul>
                    </div>
                );
            case 'PSOs':
                return (
                    <div className="py-6">
                        <h3 className="text-2xl font-bold text-[#B22222] mb-4">Program Specific Outcomes (PSOs)</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li><strong>PSO1:</strong> Use Mathematical Abstractions and Algorithmic Design along with Open Source Programming tools to solve complexities involved in Programming. <strong>[K3]</strong></li>
                            <li><strong>PSO2:</strong> Use Professional Engineering practices and strategies for development and maintenance of software. <strong>[K3]</strong></li>
                        </ul>
                    </div>
                );
            case 'COs':
                return (
                    <div className="py-6">
                        <h3 className="text-2xl font-bold text-[#B22222] mb-4">Course Outcomes (COs)</h3>
                        <p className="text-gray-700 leading-relaxed">
                            The course outcomes are defined for each course and are aligned with the Program Outcomes and Program Specific Outcomes. The course outcomes are assessed through direct and indirect assessment tools.
                        </p>
                        <p className="mt-4 text-gray-700">
                            <a href="https://srivasaviengg.ac.in/uploads/cai/Course%20Outcomes%20-V20%20Regulation.pdf" target="_blank" rel="noopener noreferrer" className="text-[#B22222] hover:underline">Download Course Outcomes Document</a>
                        </p>
                    </div>
                );
            case 'SalientFeatures':
                return (
                    <div className="py-6">
                        <h3 className="text-2xl font-bold text-[#B22222] mb-4">Salient Features</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>ICT enabled class rooms</li>
                            <li>MoUs with NIT ANP, Eduskills, Hexaware, APSSDC, Alykas Innovations Pvt.Ltd, thingTronics Pvt Ltd, Bangalore and TCS-iON</li>
                            <li>College has MOU with TCS for conducting Online Competitive Exams for which our Department Resources are being utilized</li>
                            <li>Professional Society memberships in ISTE and IAENG</li>
                            <li>Good faculty retention</li>
                            <li>Well Equipped Laboratories</li>
                            <li>Maitri, Social Service Unit, managed by the Students</li>
                        </ul>
                    </div>
                );
            default:
                return (
                    <div className="py-6">
                        <h3 className="text-2xl font-bold text-[#B22222] mb-4">Department Overview</h3>
                        <p className="text-gray-700 leading-relaxed">
                            The Department of Data Science was established to meet the growing demands of the data-driven industry. The department offers an undergraduate program in Data Science with state-of-the-art infrastructure.
                        </p>
                    </div>
                );
        }
    };

    const renderContent = () => {
        switch (activeContent) {
            case 'Department Profile':
                return (
                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
                        <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Head of Department's Message</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                            <div className="relative">
                                <img
                                    src="/images/departments/ds/dshod.jpg"
                                    alt="Dr. G. Loshma"
                                    className="w-full h-80 object-cover rounded-lg shadow-md"
                                />
                            </div>
                            <div className="lg:col-span-2 space-y-4">
                                <div className="mb-4">
                                    <h3 className="text-2xl font-bold text-[#B22222] mb-2">Dr. G. Loshma</h3>
                                    <p className="text-lg text-[#8B0000] font-medium mb-2">Professor & Head of Department, CSE(Data Science)</p>
                                    <p className="text-gray-600">Mobile No: 7672082130</p>
                                    <p className="text-gray-600">Phone No: 08818-284355(O)-(Ext.-442)</p>
                                    <p className="text-gray-600">Email: <a href="mailto:hod_ds@srivasaviengg.ac.in" className="text-primary hover:underline">hod_ds@srivasaviengg.ac.in</a></p>
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                    The Department of Computer Science and Engineering(Data Science) came into inception from 2024 onwards with an intake of 60 seats in B.Tech. We aim to prepare students for the emerging field of data science and analytics, equipping them with the necessary skills to succeed in this rapidly growing domain.
                                </p>
                            </div>
                        </div>
                    </div>
                );

            case 'Faculty Profiles':
                return (
                    <div className="space-y-8">
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
                            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Non-Teaching Staff</h2>
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
                    <div className="space-y-8">
                        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
                            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Board of Studies</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">S.No.</th>
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
                                <li>Minutes of 1st meeting of the Board of Studies, dated 21.12.2024 <a href="https://srivasaviengg.ac.in/uploads/ds/Minutes of First BOS Meeting CSE(DS) 21-12-2024.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-2">View</a></li>
                            </ul>
                        </div>
                    </div>
                );

            case 'Physical Facilities':
                return (
                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
                        <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Physical Facilities</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Class Rooms</h3>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>Class Rooms with ICT Enabled Facilities - <a href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/CSE_Classrooms.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                                </ul>
                                <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Class Time Tables</h4>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>Master Timetable_A.Y for Sem-II 2022-23 - <a href="https://srivasaviengg.ac.in/uploads/aiml/AI%20_ML_Master%20Time%20Table_2022-23_%20II%20SEM%20_AIML.pdf" className="text-blue-600 hover:underline">View</a></li>
                                    <li>Master Timetable_A.Y for Sem-I 2022-23 - <a href="#" className="text-blue-600 hover:underline">View</a></li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Seminar Halls</h3>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>Seminar halls with ICT Enabled Facilities - <a href="#" className="text-blue-600 hover:underline">View</a></li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Laboratories</h3>
                                <p className="text-gray-700 mb-4">
                                    The Department has well equipped labs with the latest Configuration. Total 9 Computer Labs for UG, PG and one research lab consisting a total of 674 systems. The various servers in the server room include Oracle 11g Database Server, Intranet Server (TOMCAT), NPTEL Video/Web Server, MAT Lab Server 2012 R2, Red Hat Linux 5.0 Server, Library Automation Server, A-Mail Server, ECAP Server.
                                </p>
                                <p className="text-gray-700 mb-4">
                                    The college has high-speed internet connectivity throughout the campus through a leased line from BSNL with 200Mbps, 400Mbps from Jio, and 40 Mbps (Broadband).
                                </p>
                                <p className="text-gray-700 mb-4">
                                    The following Laboratories are available in the department:
                                </p>
                                <div className="mt-4">
                                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Linus Torvalds Lab</h4>
                                    <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-3">Orange Lab</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center"><h3 className="text-xl font-semibold text-gray-600">Content for {activeContent} coming soon...</h3></div>;
        }
    };

    return (
        <div className="pt-24 bg-gray-100">
            <section className="bg-[#8B1919] text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h1 className="text-3xl md:text-4xl font-bold">CSE(Data Science)</h1>
                    </div>
                </div>
            </section>

            <div className="bg-white border-b shadow">
                <div className="container mx-auto px-4">
                    <div className="overflow-x-auto">
                        <nav className="flex flex-nowrap whitespace-nowrap py-2">
                            <button
                                onClick={() => setActiveDeptTab('Department')}
                                className={`px-4 py-2 font-medium text-sm transition-colors duration-200 mr-2 
                  ${activeDeptTab === 'Department' ? 'text-[#B22222] border-b-2 border-[#B22222] font-bold' : 'text-gray-700 hover:text-[#B22222]'}`}
                            >
                                Department
                            </button>
                            <button
                                onClick={() => setActiveDeptTab('Vision')}
                                className={`px-4 py-2 font-medium text-sm transition-colors duration-200 mr-2 
                  ${activeDeptTab === 'Vision' ? 'text-[#B22222] border-b-2 border-[#B22222] font-bold' : 'text-gray-700 hover:text-[#B22222]'}`}
                            >
                                Vision
                            </button>
                            <button
                                onClick={() => setActiveDeptTab('Mission')}
                                className={`px-4 py-2 font-medium text-sm transition-colors duration-200 mr-2 
                  ${activeDeptTab === 'Mission' ? 'text-[#B22222] border-b-2 border-[#B22222] font-bold' : 'text-gray-700 hover:text-[#B22222]'}`}
                            >
                                Mission
                            </button>
                            <button
                                onClick={() => setActiveDeptTab('PEOs')}
                                className={`px-4 py-2 font-medium text-sm transition-colors duration-200 mr-2 
                  ${activeDeptTab === 'PEOs' ? 'text-[#B22222] border-b-2 border-[#B22222] font-bold' : 'text-gray-700 hover:text-[#B22222]'}`}
                            >
                                PEOs
                            </button>
                            <button
                                onClick={() => setActiveDeptTab('POs')}
                                className={`px-4 py-2 font-medium text-sm transition-colors duration-200 mr-2 
                  ${activeDeptTab === 'POs' ? 'text-[#B22222] border-b-2 border-[#B22222] font-bold' : 'text-gray-700 hover:text-[#B22222]'}`}
                            >
                                POs
                            </button>
                            <button
                                onClick={() => setActiveDeptTab('PSOs')}
                                className={`px-4 py-2 font-medium text-sm transition-colors duration-200 mr-2 
                  ${activeDeptTab === 'PSOs' ? 'text-[#B22222] border-b-2 border-[#B22222] font-bold' : 'text-gray-700 hover:text-[#B22222]'}`}
                            >
                                PSOs
                            </button>
                            <button
                                onClick={() => setActiveDeptTab('COs')}
                                className={`px-4 py-2 font-medium text-sm transition-colors duration-200 mr-2 
                  ${activeDeptTab === 'COs' ? 'text-[#B22222] border-b-2 border-[#B22222] font-bold' : 'text-gray-700 hover:text-[#B22222]'}`}
                            >
                                COs
                            </button>
                            <button
                                onClick={() => setActiveDeptTab('SalientFeatures')}
                                className={`px-4 py-2 font-medium text-sm transition-colors duration-200
                  ${activeDeptTab === 'SalientFeatures' ? 'text-[#B22222] border-b-2 border-[#B22222] font-bold' : 'text-gray-700 hover:text-[#B22222]'}`}
                            >
                                Salient Features
                            </button>
                        </nav>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow mb-8">
                    {renderDeptTabContent()}
                </div>
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

export default DSDepartment;
