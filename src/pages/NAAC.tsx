import React, { useState } from 'react';
import { FileText, ExternalLink, ChevronRight, Menu, X, Award, BookOpen, Users, TrendingUp } from 'lucide-react';

const NAAC: React.FC = () => {
  const [activeTab, setActiveTab] = useState('naac');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sidebar navigation items
  const sidebarItems = [
    { id: 'naac', label: 'NAAC' },
    { id: 'institutional-distinctiveness', label: 'Institutional Distinctiveness' },
    { id: 'iqac', label: 'IQAC' },
    { id: 'stakeholder-feedback', label: 'Stakeholder Feedback Forms' },
    { id: 'extended-profile', label: 'Extended Profile' },
    { id: 'criterion-1', label: 'Criterion-I' },
    { id: 'criterion-2', label: 'Criterion-II' },
    { id: 'criterion-3', label: 'Criterion-III' },
    { id: 'criterion-4', label: 'Criterion-IV' },
    { id: 'criterion-5', label: 'Criterion-V' },
    { id: 'criterion-6', label: 'Criterion-VI' },
    { id: 'criterion-7', label: 'Criterion-VII' },
  ];

  // IQAC Members data
  const iqacMembers = [
    { sno: 1, name: 'Dean Student Affairs-Dr. Ch. Rambabu, Professor, EEE', designation: 'Member' },
    { sno: 2, name: 'Dean R&D-Dr. V. S. Naresh, Professor, CSE', designation: 'Member' },
    { sno: 3, name: 'HOD CE-Dr. G. Radhakrishnan, Professor, CE', designation: 'Member' },
    { sno: 4, name: 'HOD EEE-Dr. D. Sudha Rani, Professor, EEE', designation: 'Member' },
    { sno: 5, name: 'HOD ME-Dr. M.V. Ramesh, Professor , ME', designation: 'Member' },
    { sno: 6, name: 'HOD ECE-Dr. E. Kusuma Kumari, Professor, ECE', designation: 'Member' },
    { sno: 7, name: 'HOD CSE-Dr. D. Jaya Kumari, Professor, CSE', designation: 'Member' },
    { sno: 8, name: 'HOD BS&H-Sri. N. Raja Sekhar, Assoc. Professor, BS&H', designation: 'Member' },
    { sno: 9, name: 'HOD MBA-Sri. D. Naveen Kumar, Asst. Professor, MBA', designation: 'Member' },
    { sno: 10, name: 'Head, Placements-Sri. P.N.V. Gopala Krishna, Assoc. Professor, ME', designation: 'Member' },
    { sno: 11, name: 'Section Head, English-Dr. T. Sujani, Assoc. Professor, BS&H', designation: 'Member' },
    { sno: 12, name: 'Section Head, Mathematics, Sri Sk. Dhana Prasad, Asst. Professor, BS&H', designation: 'Member' },
    { sno: 13, name: 'Section Head, Physics, Sri. P.Sita Rama RajuAssoc. Professor, BS&H', designation: 'Member' },
    { sno: 14, name: 'Section Head, Chemistry-Ms. S.S.V Suma Latha, Asst. Professor, BS&H', designation: 'Member' },
    { sno: 15, name: 'Sri. K. N. H Srinivas, Assoc. Professor, ECE', designation: 'Member' },
    { sno: 16, name: 'Controller of Examinations-Sri. Ch.V.S.R. Gopala Krishna, Sr.Asst.Prof, EEE', designation: 'Member' },
    { sno: 17, name: 'Sri. Ch. Apparao, Director Technical-Management Representative', designation: 'Member' },
    { sno: 18, name: 'Mr. Ch. Narayana Rao, Administrative Officer', designation: 'Member' },
    { sno: 19, name: 'Mr. Ganesh Somisetti, Head of HR, coMakeIT Software Pvt. Ltd, Hyderabad', designation: 'Member' },
    { sno: 20, name: 'Mr. Eedala Rambabu, Specialist, MicroFocus Private Limited, Bangalore', designation: 'Member' },
    { sno: 21, name: 'Mr. M. Mahesh-Retd. Principal , Govt. Polytechnic, Tadepalligudem', designation: 'Member' },
    { sno: 22, name: 'Ms. Satti Sri Satya - 21A81A05C3 - Dept. of CSE', designation: 'Member' },
  ];

  // IQAC Meeting minutes data
  const iqacMeetings = [
    {
      year: 'A.Y 2023-24',
      meetings: [
        { date: '17-08-2023', link: 'http://srivasaviengg.ac.in\\IQAC\\Minutes of the meeting 17-08-2023_1.pdf' }
      ]
    },
    {
      year: 'A.Y 2022-23',
      meetings: [
        { date: '10-01-2023', link: 'http://srivasaviengg.ac.in\\IQAC\\Minutes of the meeting 10-01-2023_1.pdf' },
        { date: '04-05-2023', link: 'http://srivasaviengg.ac.in\\IQAC\\Minutes of the meeting 4-05-2023_2.pdf' }
      ]
    },
    {
      year: 'A.Y 2021-22',
      meetings: [
        { date: '23-04-2022', link: 'http://srivasaviengg.ac.in\\IQAC\\Minutes of the meeting 23-04-2022.pdf' },
        { date: '10-05-2022', link: 'http://srivasaviengg.ac.in\\IQAC\\Minutes of the meeting 10-05-2022_2.pdf' }
      ]
    },
    {
      year: 'A.Y 2020-21',
      meetings: [
        { date: '04-01-2021', link: 'http://srivasaviengg.ac.in\\IQAC\\Minutes of the meeting 04-01-2021_1.pdf' },
        { date: '24-04-2021', link: 'http://srivasaviengg.ac.in\\IQAC\\Minutes of the meeting 24-04-2021_2.pdf' }
      ]
    },
    {
      year: 'A.Y 2019-20',
      meetings: [
        { date: '16-10-2019', link: 'http://srivasaviengg.ac.in\\IQAC\\Minutes of the meeting 16-10-2019_1.pdf' },
        { date: '18-04-2020', link: 'http://srivasaviengg.ac.in\\IQAC\\Minutes of the meeting 18-04-2020_2.pdf' }
      ]
    }
  ];

  // Stakeholder feedback data by year and department
  const feedbackData = [
    {
      year: '2022-23',
      departments: [
        { name: 'CE', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/CE_Feedback_2022-23%20(1).pdf' },
        { name: 'EEE', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/EEE_F.B_2022-23.pdf' },
        { name: 'ME', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/MECH%20-%202022-23.pdf' },
        { name: 'ECE', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/ece_feedback_2022-23.pdf' },
        { name: 'CSE', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/22-23_Feedbak_Analysis.pdf' },
        { name: 'BSH', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/' },
        { name: 'MBA', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/22-23.pdf' }
      ]
    },
    {
      year: '2021-22',
      departments: [
        { name: 'CE', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/CE_feedback%202021-22.pdf' },
        { name: 'EEE', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/EEE_F.B_2021-22.pdf' },
        { name: 'ME', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/MECH%20-%202021-22.pdf' },
        { name: 'ECE', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/ece_feedback_2021-22.pdf' },
        { name: 'CSE', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/21-22_Feedback_Analysis.pdf' },
        { name: 'BSH', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/CE_feedback%2019-20.pdf' },
        { name: 'MBA', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/21-22.pdf' }
      ]
    },
    {
      year: '2020-2021',
      departments: [
        { name: 'CE', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/CE%20_feedback%202020-21.pdf' },
        { name: 'EEE', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/EEE_F.B_2020-21.pdf' },
        { name: 'ME', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/MECH%20-%202020-21.pdf' },
        { name: 'ECE', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/ece_feedback_2020-21.pdf' },
        { name: 'CSE', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/20-21_Feedback_Analysis.pdf' },
        { name: 'BSH', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/' },
        { name: 'MBA', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/20-21.pdf' }
      ]
    },
    {
      year: '2019-20',
      departments: [
        { name: 'CE', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/CE_feedback%2019-20.pdf' },
        { name: 'EEE', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/EEE_F.B_2019-20.pdf' },
        { name: 'ME', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/MECH%20-%2019-20.pdf' },
        { name: 'ECE', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/ece_feedback_2019-20.pdf' },
        { name: 'CSE', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/19-20_Feedback_Analysis.pdf' },
        { name: 'BSH', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/' },
        { name: 'MBA', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/19-20.pdf' }
      ]
    }
  ];

  // Extended Profile data
  const extendedProfileItems = [
    { id: '1.1', description: 'Number of Programmes offered year-wise for last five years', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/' },
    { id: '2.1', description: 'Number of Students year-wise for last five years', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/' },
    { id: '2.2', description: 'Number of outgoing / final year students year-wise during last five years', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/' },
    { id: '2.3', description: 'Number of students appeared in the examination conducted by the Institution, year-wise during the last five years' },
    { id: '3.1', description: 'Number of courses in all programs year-wise during last five years' },
    { id: '3.2', description: 'Number of full time teachers year-wise during the last five years' },
    { id: '3.3', description: 'Number of sanctioned posts year-wise during last five years' },
    { id: '4.1', description: 'Number of eligible applications received for admissions to all the programs year-wise during last five years' },
    { id: '4.2', description: 'Number of seats earmarked for reserved category as per GOI/State Govt rule year-wise during last five years' },
  ];

  // Function to render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'naac':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-primary mb-6">NAAC</h1>
              <p className="text-lg text-foreground/80 max-w-4xl mx-auto leading-relaxed">
                The National Assessment and Accreditation Council (NAAC) is an autonomous body established by the University Grants Commission (UGC)
                of India to assess and accredit institutions of higher education in the country. NAAC conducts assessment and accreditation of
                Higher Educational Institutions (HEI) such as colleges, universities or other recognized institutions to derive an understanding
                of the 'Quality Status' of the institution.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-primary mb-2">Accreditation</h3>
                <p className="text-foreground/70">Quality assessment and institutional accreditation</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-primary mb-2">Criteria</h3>
                <p className="text-foreground/70">Seven criteria for comprehensive evaluation</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-primary mb-2">IQAC</h3>
                <p className="text-foreground/70">Internal Quality Assurance Cell</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-primary mb-2">Improvement</h3>
                <p className="text-foreground/70">Continuous quality enhancement</p>
              </div>
            </div>
          </div>
        );

      case 'institutional-distinctiveness':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-primary text-center mb-6">Institutional Distinctiveness</h1>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="prose max-w-none">
                <p className="text-foreground/80 leading-relaxed text-justify mb-6">
                  The institute has a motto of <strong>COGNITION-ASSISTANCE-PROVIDE (C-A-P)</strong> to fulfil the role of Knowledge sharing,
                  assisting students/society to enhance their skill towards new technology & Community Service to inspire the students and
                  follow the same in their lives. Cognition, assistance, and provide are interconnected concepts that highlight the dynamic
                  relationship between human intelligence and technology. Human cognition is the foundation of our intelligence, enabling us
                  to navigate the world and collaborate to advance society. Technology, as a form of assistance, has become an integral part
                  of our daily lives, enhancing our communication, education, and healthcare. The intersection of human intelligence and
                  technology is most evident in the concept of providing solutions to complex challenges.
                </p>

                <div className="space-y-8">
                  <div className="p-6 bg-white rounded-lg border border-gray-200">
                    <h3 className="text-xl font-bold text-primary mb-4">COGNITION in CAP:</h3>
                    <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                      In order to know the value of Holistic development, stand on their own Contribution to the society, the students should
                      acquire sound knowledge on distinctive areas. Towards this, college conducts/Encourages SOC-Skill Oriented Courses/Value
                      added Courses in the college from various platforms by Online/Offline mode. To knowing the value of society and our
                      country Courses like Universal Human Values (UHV-I&II), COI-Constitution of India are included in the syllabus.
                    </p>
                    <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                      To enhance there skills towards new technology students are suggested to complete courses in like NPTEL-Swayam, Edu skills,
                      Course Era. APPSDC Initiated skill-oriented courses, Internship in industries. To improve knowledge practically college wise
                      and department wise Conducting awareness programmes, Edu skills training Programs.
                    </p>
                    <p className="text-foreground/80 leading-relaxed text-justify">
                      Our college students sharing their knowledge in Local school towards Competitive exams through EE-Education Epiphany
                      Organisation by student volunteers of the college. Conducted Computer classes and yoga classes for under privileged areas
                      by our student volunteers.
                    </p>
                  </div>

                  <div className="p-6 bg-white rounded-lg border border-gray-200">
                    <h3 className="text-xl font-bold text-primary mb-4">ASSISTANCE in CAP:</h3>
                    <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                      Our aim is to assist students of our institution for better performance in all the aspects of the education technically
                      and personally. Every department of our college conducting workshops, training sessions, hands on training in different
                      technical areas where students get assisted for their skills. Various activities are organised and continued by our college.
                    </p>
                    <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                      Few of assisting programs organised by our college is Formed E-Waste Management Club to create innovative Products from
                      E-Waste (Electronic Waste) organised by students, assistance from certified vendors for e-waste disposal. Every student of
                      our college was given Placement Assistance through various training programs towards their goal accomplishment from various
                      streams to upgrade their knowledge. And get placed in MNCs.
                    </p>
                    <p className="text-foreground/80 leading-relaxed text-justify">
                      Organised various Workshops from external agencies to assist about new coming technology, areas of research. To learn in a
                      better way college was using ICT Tools in teachings learning process. Conducted various Hands on sessions for new technology
                      College management encouraging academic toppers by assisting through Incentives and Concession.
                    </p>
                  </div>

                  <div className="p-6 bg-white rounded-lg border border-gray-200">
                    <h3 className="text-xl font-bold text-primary mb-4">PROVIDE in CAP:</h3>
                    <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                      The concept of "provide" is a bridge between human cognition and technological assistance. Providing involves the act of
                      delivering goods, services, or support, and it highlights the critical role of both human intelligence and technology in
                      addressing societal needs and challenges. Our college is providing facilities in different areas of society for holistic
                      development.
                    </p>
                    <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                      A few of them are following, the college provide free transport to the people for Health camps organised by NSS/ NGOs/Some
                      govt Organisations. Providing Services to the Covid affected community by volunteers of PSSC (Psycho Social Support Cell)
                      and helped 3000+ people by our PSSC Volunteers.
                    </p>
                    <p className="text-foreground/80 leading-relaxed text-justify">
                      NSS Units of our college distributed clothes, groceries, and stationary and organised various events related to societal
                      elements in nearby villages. Raised fund for the treatment of student suffering with BLOOD CANCER and provided 3.5 Lakhs.
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-primary/10 rounded-lg">
                  <p className="text-foreground/80">
                    <strong>Portray the performance of the Institution in one area distinctive to its priority and thrust - </strong>
                    <a
                      href="http://srivasaviengg.ac.in/uploads/naac/criteria7/CAP-AY-2022-23_merged.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                    >
                      Click Here <ExternalLink className="w-4 h-4" />
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'iqac':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-primary text-center mb-6">IQAC</h1>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="space-y-6">
                <p className="text-foreground/80 leading-relaxed text-justify">
                  As per the guidelines of National Assessment & Accreditation Council (NAAC), every accredited institution
                  should establish an Internal Quality Assurance Cell (IQAC), as a post-accreditation quality sustenance measure.
                </p>

                <p className="text-foreground/80 leading-relaxed text-justify">
                  The prime task of the IQAC is to develop a system for conscious, consistent, and catalytic improvement in the
                  overall performance of the institution. For this, during the post-accreditation period, it will channelize all
                  efforts and measures of the institution towards promoting its holistic academic excellence.
                </p>

                <p className="text-foreground/80 leading-relaxed text-justify">
                  It will be a facilitative and participative unit of the institution which has the potential to become a vehicle
                  for assuring quality enhancement by working out planned interventionist strategies to remove deficiencies and
                  enhance quality like the "quality circles" in industries.
                </p>

                <p className="text-foreground/80 leading-relaxed text-justify">
                  In addition to ensuring the implementation of quality checks and measures, it has to prepare the
                  <strong> Annual Quality Assurance Report (AQAR)</strong> as per the guidelines and parameters of NAAC,
                  to be submitted to NAAC every year.
                </p>
              </div>
            </div>

            {/* IQAC Committee */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">IQAC Committee</h2>
              <p className="text-foreground/80 mb-6">
                Reconstituted Internal Quality Assurance Cell (IQAC) effective from <strong>03-07-2023</strong> is as follows:
              </p>

              {/* Chairperson and Coordinator */}
              <div className="mb-6 space-y-4">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-primary mb-2">Chairperson</h3>
                  <p className="text-foreground/80">Dr. Guduru. VNSR. Ratnakara Rao, Principal</p>
                </div>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-primary mb-2">Co-Ordinator</h3>
                  <p className="text-foreground/80">Dr. G .Loshma, Professor & Head, AIM</p>
                </div>
              </div>

              {/* Members Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="px-6 py-4 text-left font-semibold">S.No</th>
                      <th className="px-6 py-4 text-left font-semibold">Name of the Member</th>
                      <th className="px-6 py-4 text-left font-semibold">Designation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {iqacMembers.map((member, index) => (
                      <tr key={member.sno} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                        <td className="px-6 py-4 border-b border-gray-200">{member.sno}</td>
                        <td className="px-6 py-4 border-b border-gray-200">{member.name}</td>
                        <td className="px-6 py-4 border-b border-gray-200">{member.designation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* IQAC Meeting Minutes */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">IQAC Minutes of Meetings</h2>
              <div className="space-y-6">
                {iqacMeetings.map((yearData, yearIndex) => (
                  <div key={yearIndex}>
                    <h3 className="text-xl font-semibold text-primary mb-4">{yearData.year}</h3>
                    <div className="space-y-2">
                      {yearData.meetings.map((meeting, meetingIndex) => (
                        <div key={meetingIndex} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                          <FileText className="w-4 h-4 text-primary" />
                          <span className="text-foreground/80">
                            {meetingIndex + 1}. Minutes of Meeting held on {meeting.date} -
                          </span>
                          <a
                            href={meeting.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                          >
                            View <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'stakeholder-feedback':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-primary text-center mb-6">Stakeholder Feedback Forms</h1>

            {feedbackData.map((yearData, yearIndex) => (
              <div key={yearIndex} className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-primary text-center mb-6">{yearData.year}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {yearData.departments.map((dept, deptIndex) => (
                    <div key={deptIndex} className="p-4 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors">
                      <span className="text-foreground/80 font-medium">{dept.name} - </span>
                      <a
                        href={dept.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'extended-profile':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-primary text-center mb-6">Extended Profile</h1>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="space-y-4">
                {extendedProfileItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <span className="font-bold text-primary min-w-[3rem]">{item.id}</span>
                    <div className="flex-1">
                      <span className="text-foreground/80">{item.description}</span>
                      {item.link && (
                        <>
                          <span className="text-foreground/80"> - </span>
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                          >
                            View <ExternalLink className="w-4 h-4" />
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'criterion-1':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-primary text-center mb-6">Criterion-I</h1>

            {/* 1.1 Curriculum Design and Development */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">1.1 Curriculum Design and Development</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>1.1.1</strong> Curricula developed and implemented have relevance to the local, national, regional and global developmental needs
                    which is reflected in Programme outcomes (POs), Programme Specific outcomes (PSOs) and Course Outcomes (COs) of the
                    Programmes offered by the Institution
                  </p>
                  <div className="ml-6">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Curriculum - </span>
                      <a
                        href="http://srivasaviengg.ac.in//naac/criteria1/1.1.1 Curriculum.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>1.1.2</strong> The programmes offered by the institution focus on employability/entrepreneurship/skill development and their
                    course syllabi are adequately revised to incorporate contemporary requirements
                  </p>
                  <div className="ml-6">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Programmes Offered By The Institution Focus On Employability,Entrepreneurship,Skill Development - </span>
                      <a
                        href="http://srivasaviengg.ac.in//naac/criteria1/1.1.2.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 1.2 Academic Flexibility */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">1.2 Academic Flexibility</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>1.2.1</strong> Percentage of new courses introduced out of the total number of courses across all programs offered during the
                    last five years
                  </p>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-2">
                    <strong>1.2.1.1</strong> Number of new courses are introduced during the last five years
                  </p>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>1.2.1.2</strong> Consolidated number of courses offered by the institution across all programs (without repeat count) during
                    the last five years
                  </p>

                  <div className="ml-6 mb-6">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Minutes of relevant Academic Council - </span>
                      <a
                        href="http://srivasaviengg.ac.in/acouncil.php"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-primary mb-4">BOS Meetings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { name: 'CE', link: 'http://srivasaviengg.ac.in/civil.php#parentVerticalTab5' },
                      { name: 'EEE', link: 'http://srivasaviengg.ac.in/eee.php#parentVerticalTab3' },
                      { name: 'ME', link: 'http://srivasaviengg.ac.in/mechanical.php#parentVerticalTab3' },
                      { name: 'CSE', link: 'http://srivasaviengg.ac.in/cse.php#parentVerticalTab3' },
                      { name: 'ECE', link: 'http://srivasaviengg.ac.in/ece.php#parentVerticalTab19' },
                      { name: 'CST', link: 'http://srivasaviengg.ac.in/cst.php#parentVerticalTab3' },
                      { name: 'CAI', link: 'http://srivasaviengg.ac.in/cai.php#parentVerticalTab3' },
                      { name: 'AIM', link: 'http://srivasaviengg.ac.in/aiml.php#parentVerticalTab3' },
                      { name: 'BSH', link: 'http://srivasaviengg.ac.in/bsh.php#parentVerticalTab3' },
                      { name: 'MBA', link: 'http://srivasaviengg.ac.in/mba.php#parentVerticalTab3' }
                    ].map((dept, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors">
                        <span className="text-foreground/80 font-medium">{dept.name} - </span>
                        <a
                          href={dept.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Institutional data in prescribed format - </span>
                      <a
                        href="http://srivasaviengg.ac.in//naac/criteria1/Criterion 1.2.1.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 1.3 Curriculum Enrichment */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">1.3 Curriculum Enrichment</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>1.3.1</strong> Institution integrates cross-cutting issues relevant to Professional Ethics, Gender, Human Values,
                    Environment and Sustainability and other value framework enshrined in Sustainable Development Goals and National
                    Education Policy – 2020 into the Curriculum
                  </p>

                  <div className="space-y-3 ml-6">
                    {[
                      { name: 'Gender Sensitivity', link: 'http://srivasaviengg.ac.in//naac/criteria1/1.3.1 Gender Sensitization.pdf' },
                      { name: 'UG/PG', link: 'http://srivasaviengg.ac.in//naac/criteria1/1.3.1 UG-PG syllabus.pdf' },
                      { name: 'UHV Report', link: 'http://srivasaviengg.ac.in//naac/criteria1/1.3.1 UHV I Report.pdf' },
                      { name: 'AEC Report', link: 'http://srivasaviengg.ac.in//naac/criteria1/1.3.1 AEC REPORT.pdf' },
                      { name: 'Environmental Related Programs', link: 'http://srivasaviengg.ac.in//naac/criteria1/1.3.1 PROGRAMMES RELATED TO ENVIRONMENT AND SUSTAINABILITY.pdf' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-foreground/80">{item.name} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>1.3.2</strong> Number of certificate/value added courses/Diploma Programmes offered by the institutions and online courses of
                    MOOCs, SWAYAM/e-PG Pathshala/ NPTEL etc. where the students of the institution have enrolled and successfully completed during
                    the last five years
                  </p>

                  <div className="ml-6 p-4 bg-yellow-50 rounded-lg">
                    <p className="text-foreground/70 text-sm">
                      Documentation for certificate/value added courses and online course completions is being compiled and will be available soon.
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>1.3.3</strong> Percentage of programmes that have components of field projects / research projects / internships during the last
                    five years
                  </p>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-2">
                    <strong>1.3.3.1</strong> Total Number of programmes that have components of field projects / research projects / internships (without
                    repeat count) during the last five years
                  </p>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>1.3.3.2</strong> Total Number of programmes offered (without repeat count) by the institution during the last five years
                  </p>

                  <div className="space-y-3 ml-6">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Programs having components of field projects/research projects/internships - </span>
                      <a
                        href="http://srivasaviengg.ac.in/uploads/naac/criteria1/1.3.3 Data Template.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Courses having field projects/research projects/internships - </span>
                      <a
                        href="http://srivasaviengg.ac.in/uploads/naac/criteria1/1.3.3 Course structure.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-primary mt-6 mb-4">Sample Internship completion letters provided by host institutions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { year: '2022-23', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/1.3.3 Internships proofs 2022-23.pdf' },
                      { year: '2021-22', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/1.3.3 Internships proofs 2021-22.pdf' },
                      { year: '2020-21', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/1.3.3 Internships proofs 2020-21.pdf' },
                      { year: '2019-20', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/1.3.3 Internships proofs 2019-20.pdf' },
                      { year: '2018-19', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/1.3.3 Internships proofs 2018-19.pdf' }
                    ].map((item, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors">
                        <span className="text-foreground/80 font-medium">{item.year} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Sample Community Service Project Report Certificates - </span>
                      <a
                        href="http://srivasaviengg.ac.in/uploads/naac/criteria1/1.3.3 CSP Proofs.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-primary mt-6 mb-4">Sample evaluated project/field work certificates submitted by the students</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { year: '2022-23', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/1.3.3-2022-23 Project proofs.pdf' },
                      { year: '2021-22', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/1.3.3-2021-22 Project Proofs.pdf' },
                      { year: '2020-21', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/1.3.3 2020-21 Project Proofs.pdf' },
                      { year: '2019-20', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/1.3.3 2019-20 Project Proofs.pdf' },
                      { year: '2018-19', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/1.3.3-2018-19 Project Proofs.pdf' }
                    ].map((item, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors">
                        <span className="text-foreground/80 font-medium">{item.year} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 1.4 Feedback System */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">1.4 Feedback System</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-6">
                    <strong>1.4.1</strong> Structured feedback for curriculum and its transaction is regularly obtained from stakeholders like
                    Students, Teachers, Employers, Alumni etc.
                  </p>

                  {/* Feedback by Year */}
                  {feedbackData.map((yearData, yearIndex) => (
                    <div key={yearIndex} className="mb-8">
                      <h3 className="text-xl font-semibold text-primary mb-4">{yearData.year}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {yearData.departments.map((dept, deptIndex) => (
                          <div key={deptIndex} className="p-4 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors">
                            <span className="text-foreground/80 font-medium">{dept.name} - </span>
                            <a
                              href={dept.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                            >
                              View <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Additional Feedback Documents */}
                  <div className="space-y-3 mt-8">
                    <h3 className="text-xl font-semibold text-primary mb-4">Additional Feedback Documents</h3>
                    {[
                      { name: 'Feedback Analysis', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/1.4.1_1699159552_12631.pdf' },
                      { name: 'Sample Feedback Forms', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/Proofs_merged_compressed.pdf' },
                      { name: 'Feedback Action Taken Process', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/1.4.1_1699159706_12631.pdf' },
                      { name: 'Feedback Submission', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-foreground/80">{item.name} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'criterion-2':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-primary text-center mb-6">Criterion-II</h1>

            {/* 2.1 Student Enrollment and Profile */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">2.1 Student Enrollment and Profile</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>2.1.1.1</strong> Number of seats filled year wise during the last five years
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                      <thead>
                        <tr className="bg-primary text-white">
                          <th className="px-6 py-4 text-left font-semibold">Year</th>
                          <th className="px-6 py-4 text-center font-semibold">2022-23</th>
                          <th className="px-6 py-4 text-center font-semibold">2021-22</th>
                          <th className="px-6 py-4 text-center font-semibold">2020-21</th>
                          <th className="px-6 py-4 text-center font-semibold">2019-20</th>
                          <th className="px-6 py-4 text-center font-semibold">2018-19</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-gray-50 hover:bg-blue-50 transition-colors">
                          <td className="px-6 py-4 border-b border-gray-200 font-medium">Number</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">1117</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">1026</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">900</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">752</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">677</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>2.1.1.2</strong> Number of sanctioned seats year wise during the last five years
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                      <thead>
                        <tr className="bg-primary text-white">
                          <th className="px-6 py-4 text-left font-semibold">Year</th>
                          <th className="px-6 py-4 text-center font-semibold">2022-23</th>
                          <th className="px-6 py-4 text-center font-semibold">2021-22</th>
                          <th className="px-6 py-4 text-center font-semibold">2020-21</th>
                          <th className="px-6 py-4 text-center font-semibold">2019-20</th>
                          <th className="px-6 py-4 text-center font-semibold">2018-19</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-gray-50 hover:bg-blue-50 transition-colors">
                          <td className="px-6 py-4 border-b border-gray-200 font-medium">Number</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">1176</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">1170</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">1020</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">1050</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">930</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Average Enrollment - </span>
                      <a
                        href="http://srivasaviengg.ac.in/uploads/naac/criteria2/2.1.2 data.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-primary mb-4">Sanction of intake by competent authority</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {[
                      { year: '2022-23', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria2/EOA Report 2022-23.PDF' },
                      { year: '2021-22', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria2/EOA Report 2021-22.PDF' },
                      { year: '2020-21', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria2/EOA Report 2020-21.PDF' },
                      { year: '2019-20', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria2/EOA Report 2019-20.PDF' },
                      { year: '2018-19', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria2/EOA Report 2018-19.PDF' }
                    ].map((item, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors">
                        <span className="text-foreground/80 font-medium">{item.year} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Admission Process by APSCHE - </span>
                      <a
                        href="http://srivasaviengg.ac.in/uploads/naac/criteria2/ADMISSION PROCESS BY APSCHE.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-primary mb-4">Student Enrollment</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { year: '2022-23', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria2/Admissions 2022-23 HEI.pdf' },
                      { year: '2021-22', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria2/Admissions 2021-22 HEI.pdf' },
                      { year: '2020-21', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria2/Admissions 2020-21 HEI.pdf' },
                      { year: '2019-20', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria2/Admissions 2019-20 HEI.pdf' },
                      { year: '2018-19', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria2/Admissions 2018-19 HEI.pdf' }
                    ].map((item, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors">
                        <span className="text-foreground/80 font-medium">{item.year} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 2.1.2 Reserved Categories */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">2.1.2 Reserved Categories</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>2.1.2</strong> Percentage of seats filled against reserved categories (SC, ST, OBC etc.) as per applicable reservation
                    policy for the first year admission during the last five years
                  </p>

                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>2.1.2.1</strong> Number of actual students admitted from the reserved categories year in the first year of the programme year
                    wise during the last five years
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                      <thead>
                        <tr className="bg-primary text-white">
                          <th className="px-6 py-4 text-left font-semibold">Year</th>
                          <th className="px-6 py-4 text-center font-semibold">2022-23</th>
                          <th className="px-6 py-4 text-center font-semibold">2021-22</th>
                          <th className="px-6 py-4 text-center font-semibold">2020-21</th>
                          <th className="px-6 py-4 text-center font-semibold">2019-20</th>
                          <th className="px-6 py-4 text-center font-semibold">2018-19</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-gray-50 hover:bg-blue-50 transition-colors">
                          <td className="px-6 py-4 border-b border-gray-200 font-medium">Number</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">414</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">360</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">332</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">238</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">234</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>2.1.2.2</strong> Number of seats earmarked for reserved category as per GoI/State Govt. rule year wise during the last five years
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                      <thead>
                        <tr className="bg-primary text-white">
                          <th className="px-6 py-4 text-left font-semibold">Year</th>
                          <th className="px-6 py-4 text-center font-semibold">2022-23</th>
                          <th className="px-6 py-4 text-center font-semibold">2021-22</th>
                          <th className="px-6 py-4 text-center font-semibold">2020-21</th>
                          <th className="px-6 py-4 text-center font-semibold">2019-20</th>
                          <th className="px-6 py-4 text-center font-semibold">2018-19</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-gray-50 hover:bg-blue-50 transition-colors">
                          <td className="px-6 py-4 border-b border-gray-200 font-medium">Number</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">403</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">402</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">350</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">320</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">320</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Average Percentage of seats filled category wise - </span>
                      <a
                        href="http://srivasaviengg.ac.in/uploads/naac/criteria2/2.1.2 data.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Reservation Category - </span>
                      <a
                        href="http://srivasaviengg.ac.in/uploads/naac/criteria2/Researvation Policy by AP Government.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2.2 Catering to Student Diversity */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">2.2 Catering to Student Diversity</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>2.2.1</strong> The institution assesses the learning levels of the students and organizes special Programmes to cater to
                    differential learning needs of the student
                  </p>

                  <div className="prose max-w-none mb-6">
                    <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                      The institution adopts well-planned procedures to address the issues of diversity in students' learning levels. The college
                      has a well-established counseling system/mentorship system in place. Students are assigned to identified faculty who will act
                      as their mentors/counselors. They conduct regular meetings with their student mentees to monitor their academic progress. The
                      actual categorization of students into slow, average, and advanced learners is based on their performance in mid-I
                      internal examination and continuous follow-up taken up thereafter till the course completion by the concerted efforts
                      of teaching faculty, course coordinator, and Head of the department.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-semibold text-primary mb-3">I. Special activities conducted for slow learners:</h4>
                        <ul className="list-disc list-inside space-y-2 text-foreground/80">
                          <li>Remedial classes are arranged for the slow learners identified in mid-I examination during or beyond the regular
                            class schedule on specific days for each course, and individual attention is paid for improving the students'
                            level of learning, problem-solving, and presentation.</li>
                          <li>Slow learners are further assisted through counseling by mentors. Most of the students' problems resolved by these
                            efforts and if felt necessary, the parents are called in for additional help to their ward.</li>
                          <li>Conduction of extra classes for those who failed in previous semester subjects.</li>
                          <li>Bridge Course Remedial Classes</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-primary mb-3">II. Activities to support the advanced learners:</h4>
                        <ul className="list-disc list-inside space-y-2 text-foreground/80">
                          <li>College conducts special training programs on soft skills, CRT, etc.</li>
                          <li>Students are encouraged to register NPTEL - MOOCs, paper presentations, Internships.</li>
                          <li>Participate in inter-collegiate fests.</li>
                          <li>Conduct workshops by APSSDC covering cutting-edge technologies.</li>
                          <li>Fast Learners are encouraged to register for Honors and Minor Degrees.</li>
                          <li>Honors and Minors Registration Certificates/Participations by Advanced Learners</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { name: 'Remedial Classes', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria2/REMEDI~1.PDF' },
                      { name: 'Bridge Courses', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria2/BRIDGE~1.PDF' },
                      { name: 'Honors and Minors', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria2/HONORS~1.PDF' },
                      { name: 'Activities participated by Advanced Learners', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria2/CERTIF~1.pdf' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-foreground/80">{item.name} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 2.2.2 Student-Teacher Ratio */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">2.2.2 Student-Teacher Ratio</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>2.2.2</strong> Student - Full-time teacher ratio (Data for the latest completed academic year)
                  </p>

                  <h3 className="text-lg font-semibold text-primary mb-4">Number of students on rolls year wise during the last five years</h3>
                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                      <thead>
                        <tr className="bg-primary text-white">
                          <th className="px-6 py-4 text-left font-semibold">Year</th>
                          <th className="px-6 py-4 text-center font-semibold">2022-23</th>
                          <th className="px-6 py-4 text-center font-semibold">2021-22</th>
                          <th className="px-6 py-4 text-center font-semibold">2020-21</th>
                          <th className="px-6 py-4 text-center font-semibold">2019-20</th>
                          <th className="px-6 py-4 text-center font-semibold">2018-19</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-gray-50 hover:bg-blue-50 transition-colors">
                          <td className="px-6 py-4 border-b border-gray-200 font-medium">Number</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">4239</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">3811</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">3361</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">3037</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">3055</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-lg font-semibold text-primary mb-4">Number of full-time teachers year wise during the last five years</h3>
                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                      <thead>
                        <tr className="bg-primary text-white">
                          <th className="px-6 py-4 text-left font-semibold">Year</th>
                          <th className="px-6 py-4 text-center font-semibold">2022-23</th>
                          <th className="px-6 py-4 text-center font-semibold">2021-22</th>
                          <th className="px-6 py-4 text-center font-semibold">2020-21</th>
                          <th className="px-6 py-4 text-center font-semibold">2019-20</th>
                          <th className="px-6 py-4 text-center font-semibold">2018-19</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-gray-50 hover:bg-blue-50 transition-colors">
                          <td className="px-6 py-4 border-b border-gray-200 font-medium">Number</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">236</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">230</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">225</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">222</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">222</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-xl font-semibold text-primary mb-4">Student Lists by Year</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { year: '2022-23', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria2/AY(2022-23) - student list1.pdf' },
                      { year: '2021-22', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria2/AY(2021-22) - student list1.pdf' },
                      { year: '2020-21', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria2/AY(2020-21) - student list1.pdf' },
                      { year: '2019-20', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria2/AY(2019-20) - student list1.pdf' },
                      { year: '2018-19', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria2/AY(2018-19) - student list1.pdf' }
                    ].map((item, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors">
                        <span className="text-foreground/80 font-medium">{item.year} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 2.3 Teaching-Learning Process */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">2.3 Teaching-Learning Process</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>2.3.1</strong> Student-centric methods, such as experiential learning, participative learning, and problem-solving
                    methodologies are used for enhancing the learning experience, and teachers use ICT-enabled tools, including
                    online resources, for an effective teaching and learning process
                  </p>

                  <div className="prose max-w-none mb-6">
                    <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                      The institution adopts both traditional as well as advanced methods to enhance learning experiences.
                      Especially, we focus on solving real-time case studies taken from the industry, conducting group discussions,
                      debates, seminars, business games, etc. For final year students, we provide real-time experiences through
                      mini-projects, internships, and short visits. Participative learning is encouraged through conducting
                      various events both at the branch as well as the college level. Problem-solving skills are improved by discussing
                      real-time case studies taken from the industries.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-semibold text-primary mb-3">The following ICT tools are used by the Department:</h4>
                        <ul className="list-disc list-inside space-y-2 text-foreground/80">
                          <li>All Classrooms are equipped with LCD Projectors.</li>
                          <li>Desktops are arranged at the Computer Lab and Faculty cabins.</li>
                          <li>Seminar Rooms- 2 seminar halls are equipped with all digital facilities</li>
                          <li>Online Classes through Zoom, Google Meet, Google Classroom.</li>
                          <li>Using online coding Platforms EBOX, Edyst, HackerRank, Hacker Earth, codeChef.</li>
                          <li>MOOC Platform (NPTEL, Coursera, Udemy, etc).</li>
                          <li>Learning Management System (LMS) is used for conducting Online classes during COVID times</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-primary mb-3">Use of ICT by Faculty:</h4>
                        <ul className="list-disc list-inside space-y-2 text-foreground/80">
                          <li>PowerPoint presentations- Faculties are encouraged to use PowerPoint presentations in their teaching by using
                            LCD's and projectors. They are also equipped by the digital library, online search engines, and websites to
                            prepare effective presentations.</li>
                          <li>Industry Connect- Seminar and Conference room are digitally equipped where guest lectures, expert talks,
                            and various competitions are regularly organized for students.</li>
                          <li>Online quiz- Faculties prepare an online quiz for students after the completion of each unit with the help
                            of GOOGLE FORMS.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { name: 'Student Centric Methods', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria2/2.1.3-FINAL.pdf' },
                      { name: 'ICT Tools', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria2/ICT Tools.pdf' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-foreground/80">{item.name} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 2.4 Teacher Profile and Quality */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">2.4 Teacher Profile and Quality</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>2.4.1</strong> Percentage of full-time teachers against sanctioned posts during the last five years
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                      <thead>
                        <tr className="bg-primary text-white">
                          <th className="px-6 py-4 text-left font-semibold">Year</th>
                          <th className="px-6 py-4 text-center font-semibold">2022-23</th>
                          <th className="px-6 py-4 text-center font-semibold">2021-22</th>
                          <th className="px-6 py-4 text-center font-semibold">2020-21</th>
                          <th className="px-6 py-4 text-center font-semibold">2019-20</th>
                          <th className="px-6 py-4 text-center font-semibold">2018-19</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-gray-50 hover:bg-blue-50 transition-colors">
                          <td className="px-6 py-4 border-b border-gray-200 font-medium">Sanctioned Posts</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">236</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">230</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">225</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">222</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">222</td>
                        </tr>
                        <tr className="bg-white hover:bg-blue-50 transition-colors">
                          <td className="px-6 py-4 border-b border-gray-200 font-medium">Full-time Teachers</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">236</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">230</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">225</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">222</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">222</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Sanction letters indicating number of posts sanctioned by the competent authority - </span>
                      <a
                        href="http://srivasaviengg.ac.in/uploads/naac/criteria2/2.4.1 Sanction letters.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Appointment letters of full-time teachers - </span>
                      <a
                        href="http://srivasaviengg.ac.in/uploads/naac/criteria2/2.4.1 Appointment letters.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>2.4.2</strong> Percentage of full-time teachers with NET/SET/SLET/Ph.D./D.M./M.Ch./D.N.B. Superspeciality/D.Sc./D.Litt.
                    during the last five years (consider only highest degree for count)
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                      <thead>
                        <tr className="bg-primary text-white">
                          <th className="px-6 py-4 text-left font-semibold">Year</th>
                          <th className="px-6 py-4 text-center font-semibold">2022-23</th>
                          <th className="px-6 py-4 text-center font-semibold">2021-22</th>
                          <th className="px-6 py-4 text-center font-semibold">2020-21</th>
                          <th className="px-6 py-4 text-center font-semibold">2019-20</th>
                          <th className="px-6 py-4 text-center font-semibold">2018-19</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-gray-50 hover:bg-blue-50 transition-colors">
                          <td className="px-6 py-4 border-b border-gray-200 font-medium">Number</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">95</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">92</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">89</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">86</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">83</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">List of faculties having Ph.D./D.M./M.Ch./D.N.B. Superspeciality/D.Sc./D.Litt. - </span>
                      <a
                        href="http://srivasaviengg.ac.in/uploads/naac/criteria2/2.4.2 List of faculties.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2.5 Evaluation Process and Reforms */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">2.5 Evaluation Process and Reforms</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>2.5.1</strong> Mechanism of internal/external assessment is transparent and the grievance redressal system is time-bound and efficient
                  </p>

                  <div className="prose max-w-none mb-6">
                    <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                      The institution has a well-defined mechanism for internal and external assessment that ensures transparency and fairness.
                      The evaluation process follows the guidelines set by the university and is conducted in a systematic manner.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-semibold text-primary mb-3">Internal Assessment Mechanism:</h4>
                        <ul className="list-disc list-inside space-y-2 text-foreground/80">
                          <li>Continuous Internal Evaluation (CIE) through regular tests and assignments</li>
                          <li>Mid-term examinations conducted as per university schedule</li>
                          <li>Project evaluations and practical assessments</li>
                          <li>Attendance and participation in class activities</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-primary mb-3">External Assessment:</h4>
                        <ul className="list-disc list-inside space-y-2 text-foreground/80">
                          <li>University semester examinations</li>
                          <li>External evaluation of projects and dissertations</li>
                          <li>Viva-voce examinations</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-primary mb-3">Grievance Redressal System:</h4>
                        <ul className="list-disc list-inside space-y-2 text-foreground/80">
                          <li>Student Grievance Committee for addressing academic concerns</li>
                          <li>Time-bound resolution process</li>
                          <li>Appeal mechanism for re-evaluation</li>
                          <li>Transparent communication of results</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Assessment and Evaluation Process - </span>
                      <a
                        href="http://srivasaviengg.ac.in/uploads/naac/criteria2/2.5.1 Assessment.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2.6 Student Performance and Learning Outcomes */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">2.6 Student Performance and Learning Outcomes</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>2.6.1</strong> Programme Outcomes (POs) and Course Outcomes (COs) for all Programmes offered by the institution are stated and
                    displayed on website and attainment of POs and COs are evaluated
                  </p>

                  <div className="prose max-w-none mb-6">
                    <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                      The institution has clearly defined Programme Outcomes (POs) and Course Outcomes (COs) for all programmes. These outcomes
                      are regularly evaluated and monitored to ensure effective learning.
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Programme Outcomes and Course Outcomes - </span>
                      <a
                        href="http://srivasaviengg.ac.in/uploads/naac/criteria2/2.6.1 PO CO.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>2.6.2</strong> Pass percentage of Students during the last five years (excluding backlog students)
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                      <thead>
                        <tr className="bg-primary text-white">
                          <th className="px-6 py-4 text-left font-semibold">Year</th>
                          <th className="px-6 py-4 text-center font-semibold">2022-23</th>
                          <th className="px-6 py-4 text-center font-semibold">2021-22</th>
                          <th className="px-6 py-4 text-center font-semibold">2020-21</th>
                          <th className="px-6 py-4 text-center font-semibold">2019-20</th>
                          <th className="px-6 py-4 text-center font-semibold">2018-19</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-gray-50 hover:bg-blue-50 transition-colors">
                          <td className="px-6 py-4 border-b border-gray-200 font-medium">Pass Percentage</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">85.2%</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">83.7%</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">82.1%</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">80.5%</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">79.3%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Pass Percentage Data - </span>
                      <a
                        href="http://srivasaviengg.ac.in/uploads/naac/criteria2/2.6.2 Pass percentage.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'criterion-3':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-primary text-center mb-6">Criterion-III</h1>

            {/* 3.1 Promotion of Research and Facilities */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">3.1 Promotion of Research and Facilities</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>3.1.1</strong> The institution's research facilities are frequently updated and there are well defined policy for
                    promotion of research which is uploaded on the institutional website and implemented
                  </p>

                  <div className="space-y-3 mb-6">
                    {[
                      { name: 'Additional Information', link: 'http://srivasaviengg.ac.in/naac/criteria3/3.1.1.pdf' },
                      { name: 'HR Policy', link: 'http://srivasaviengg.ac.in/uploads/r&d_uploads/HR%20Policy.pdf' },
                      { name: 'Equipment and Softwares', link: 'http://srivasaviengg.ac.in/r&d_profile.php#parentVerticalTab6' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-foreground/80">{item.name} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>3.1.2</strong> The institution provides seed money to its teachers for research
                  </p>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>3.1.2.1:</strong> Amount of seed money provided by institution to its teachers for research year wise during last five years (INR in lakhs)
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                      <thead>
                        <tr className="bg-primary text-white">
                          <th className="px-6 py-4 text-left font-semibold">Year</th>
                          <th className="px-6 py-4 text-center font-semibold">2022-23</th>
                          <th className="px-6 py-4 text-center font-semibold">2021-22</th>
                          <th className="px-6 py-4 text-center font-semibold">2020-21</th>
                          <th className="px-6 py-4 text-center font-semibold">2019-20</th>
                          <th className="px-6 py-4 text-center font-semibold">2018-19</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-gray-50 hover:bg-blue-50 transition-colors">
                          <td className="px-6 py-4 border-b border-gray-200 font-medium">INR in lakhs</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">7.5</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">1.3</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">13.1</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">0.0</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">7.5</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="space-y-3 mb-6">
                    {[
                      { name: 'Data Template-Seed Money', link: 'http://srivasaviengg.ac.in/naac/criteria3/3.1.2 data template.pdf' },
                      { name: 'List of Faculty provided with Seed Money', link: 'http://srivasaviengg.ac.in/naac/criteria3/list of faculty provided with seed money.pdf' },
                      { name: 'Sanctioned of Letters Seed Money to Teachers', link: 'http://srivasaviengg.ac.in/naac/criteria3/3.1.2 data proof.pdf' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-foreground/80">{item.name} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>3.1.3</strong> Percentage of teachers receiving national/international fellowship/financial support by various agencies
                    for advanced studies/research during the last five year
                  </p>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>3.1.3.1</strong>: Number of teachers who received national/international fellowship /financial support by
                    various agencies, for advanced studies / research; year-wise during the last five years
                  </p>

                  <div className="space-y-3">
                    {[
                      { name: 'National/International Fellowships', link: 'http://srivasaviengg.ac.in/naac/criteria3/3.1.3 National International Fellowships.pdf' },
                      { name: 'E- Copies of award letters to the teachers', link: 'http://srivasaviengg.ac.in/naac/criteria3/3.1.3 fellowships proofs.pdf' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-foreground/80">{item.name} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 3.2 Resource Mobilization for Research */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">3.2 Resource Mobilization for Research</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>3.2.1</strong> Research funding received by the institution and its faculties through Government and non-government sources such
                    as industry, corporate houses, international bodies for research project, endowment research chairs during the last five years
                  </p>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>3.2.1.1:</strong> Total Grants research funding received by the institution and its faculties through Government and
                    non-government sources such as industry, corporate houses, international bodies for research project, endowment research
                    chairs during the last five years (INR in Lakhs)
                  </p>

                  <div className="space-y-3 mb-6">
                    {[
                      { name: 'Grants Received from Government Agencies', link: 'http://srivasaviengg.ac.in/naac/criteria3/3.2.1 Research Funding Received By Institution & its faculty.pdf' },
                      { name: 'Grants Received from Government Agencies-Proofs', link: 'http://srivasaviengg.ac.in/naac/criteria3/3.2.1 Research Funding Received By Institution & its faculty proof.pdf' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-foreground/80">{item.name} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>3.2.2</strong> Number of research projects per teacher funded by government, nongovernment, industry, corporate houses,
                    international bodies during the last five years
                  </p>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>3.2.2.1</strong> Number of research projects funded by the government and non-government agencies during the last five years
                  </p>

                  <div className="space-y-3 mb-6">
                    {[
                      { name: 'Number of Research Projects per Teacher funded by government', link: 'http://srivasaviengg.ac.in/naac/criteria3/3.2.1 Research Funding Received By Institution & its faculty.pdf' },
                      { name: 'List of Project Titles,Principal Invistigator, amount sanctioned', link: 'http://srivasaviengg.ac.in/naac/criteria3/3.2.2 exel pdf.pdf' },
                      { name: 'Copies of the Grants Award Letters', link: 'http://srivasaviengg.ac.in/naac/criteria3/3.2.2 grant award letters.pdf' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-foreground/80">{item.name} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>3.2.3</strong> Percentage of teachers recognised as research guides as in the latest completed academic year
                  </p>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>3.2.3.1</strong> Number of teachers recognised as research guides as in the latest completed academic year
                  </p>

                  <div className="space-y-3">
                    {[
                      { name: 'Data Template(2.4.2 , 3.2.3 & 3.4.2)', link: 'http://srivasaviengg.ac.in/naac/criteria2/2.4.2 , 3.2.3 & 3.4.2.pdf' },
                      { name: 'Copies of the letter of the university recognizing faculty as research guides', link: 'http://srivasaviengg.ac.in/naac/criteria2/' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-foreground/80">{item.name} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 3.3 Innovation Ecosystem */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">3.3 Innovation Ecosystem</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>3.3.1</strong> Institution has created an ecosystem for innovations, Indian Knowledge System (IKS),including awareness
                    about IPR, establishment of IPR cell, Incubation centre and other initiatives for the creation and transfer of
                    knowledge/technology and the outcomes of the same are evident
                  </p>

                  <div className="space-y-3">
                    {[
                      { name: 'Description', link: 'http://srivasaviengg.ac.in/naac/criteria3/3.3.1.pdf' },
                      { name: 'Proof', link: 'http://srivasaviengg.ac.in/naac/criteria3/3.3.1 (1).pdf' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-foreground/80">{item.name} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 3.4 Research Publications and Awards */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">3.4 Research Publications and Awards</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>3.4.1</strong> The Institution ensures implementation of its stated Code of Ethics for research
                  </p>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>3.4.1.1</strong> The institution has a stated Code of Ethics for research and the implementation of which is ensured through
                    the following:
                  </p>

                  <h3 className="text-xl font-semibold text-primary mb-4">Additional Information</h3>
                  <div className="space-y-3 mb-6">
                    {[
                      { name: 'Syllabus of Research Methodology', link: 'http://srivasaviengg.ac.in/naac/criteria3/syllabus of research methodology.pdf' },
                      { name: 'Ethics Committee and its Proceedings', link: 'http://srivasaviengg.ac.in/naac/criteria3/ethics committee 2_merged.pdf' },
                      { name: 'RAC Committee and its Proceedings', link: 'http://srivasaviengg.ac.in/naac/criteria3/rac committee.pdf' },
                      { name: 'Licensed Plagiarism Bills', link: 'http://srivasaviengg.ac.in/naac/criteria3/licensed plagiarism bills.pdf' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-foreground/80">{item.name} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>3.4.2</strong> Number of candidates registered for Ph.D per teacher during the last five years
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Data Template(2.4.2 , 3.2.3 & 3.4.2) - </span>
                      <a
                        href="http://srivasaviengg.ac.in/naac/criteria2/2.4.2 , 3.2.3 & 3.4.2.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>3.4.3</strong> Number of research papers published per teacher in the Journals as notified on UGC CARE list during the last
                    five years
                  </p>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>3.4.3.1:</strong> Number of research papers in the Journals notified on UGC CARE list during the last five years
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                      <thead>
                        <tr className="bg-primary text-white">
                          <th className="px-6 py-4 text-left font-semibold">Year</th>
                          <th className="px-6 py-4 text-center font-semibold">2022-23</th>
                          <th className="px-6 py-4 text-center font-semibold">2021-22</th>
                          <th className="px-6 py-4 text-center font-semibold">2020-21</th>
                          <th className="px-6 py-4 text-center font-semibold">2019-20</th>
                          <th className="px-6 py-4 text-center font-semibold">2018-19</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-gray-50 hover:bg-blue-50 transition-colors">
                          <td className="px-6 py-4 border-b border-gray-200 font-medium">Number of teachers</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">52</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">-</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">-</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">-</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">-</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="space-y-3 mb-6">
                    {[
                      { name: 'Data Template', link: 'http://srivasaviengg.ac.in/naac/criteria3/3.4.3 PDF FILE.pdf' },
                      { name: 'Data Template Proofs', link: 'http://srivasaviengg.ac.in/naac/criteria3/3.4.3 Proofs.pdf' },
                      { name: 'Link to Journal Source Site', link: 'http://srivasaviengg.ac.in/naac/criteria3/3.4.3 PDF FILE.pdf' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-foreground/80">{item.name} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>3.4.4</strong> Number of books and chapters in edited volumes published per teacher during the last five years
                  </p>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>3.4.4.1</strong> Total number of books and chapters in edited volumes published during the last five year
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Links to relavent documents - </span>
                      <a
                        href="http://srivasaviengg.ac.in/naac/criteria3/3.4.4 first pages.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>3.4.5</strong> Bibliometrics of the publications during the last five years based on average Citation index in Scopus/ Web of
                    Science
                  </p>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>3.4.5.1</strong> Total number of Citations in Scopus in 5 years<br />Total number of Citations in Web of Science in 5 years
                  </p>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>3.4.5.2</strong> Total number of Publications in Scopus in 5 years<br />Total number of Publications in Web of Science in 5 years
                  </p>

                  <div className="space-y-3 mb-6">
                    {[
                      { name: 'Bibilometrics of the publications during the last 5 years-Part-I', link: 'http://srivasaviengg.ac.in/naac/criteria3/3.4.5 & 3.4.6 Bibliometrics part 1.pdf' },
                      { name: 'Bibilometrics of the publications during the last 5 years-Part-II', link: 'http://srivasaviengg.ac.in/naac/criteria3/3.4.5 & 3.4.6 Bibliometrics part 2.pdf' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-foreground/80">{item.name} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>3.4.6</strong> Bibliometrics of the publications during the last five years based on Scopus/ Web of Science – h-index of the
                    Institution
                  </p>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    h-index of the institution based on publications made in Scopus Web of Science during the last five years
                  </p>

                  <div className="space-y-3">
                    {[
                      { name: 'Bibilometrics of the publications during the last 5 years-Part-I', link: 'http://srivasaviengg.ac.in/naac/criteria3/3.4.5 & 3.4.6 Bibliometrics part 1.pdf' },
                      { name: 'Bibilometrics of the publications during the last 5 years-Part-II', link: 'http://srivasaviengg.ac.in/naac/criteria3/3.4.5 & 3.4.6 Bibliometrics part 2.pdf' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-foreground/80">{item.name} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 3.5 Consultancy */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">3.5 Consultancy</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>3.5.1</strong> Revenue generated from consultancy and corporate training during the last five years
                  </p>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>3.5.1.1</strong> Total amount generated from consultancy and corporate training year wise during last five years (INR in lakhs)
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                      <thead>
                        <tr className="bg-primary text-white">
                          <th className="px-6 py-4 text-left font-semibold">Year</th>
                          <th className="px-6 py-4 text-center font-semibold">2022-23</th>
                          <th className="px-6 py-4 text-center font-semibold">2021-22</th>
                          <th className="px-6 py-4 text-center font-semibold">2020-21</th>
                          <th className="px-6 py-4 text-center font-semibold">2019-20</th>
                          <th className="px-6 py-4 text-center font-semibold">2018-19</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-gray-50 hover:bg-blue-50 transition-colors">
                          <td className="px-6 py-4 border-b border-gray-200 font-medium">INR in lakhs</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">5.34</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">3.35</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">1.81</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">0.56</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">0.74</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="space-y-3 mb-6">
                    {[
                      { name: 'Revenue Generated Form Consultancy', link: 'http://srivasaviengg.ac.in/naac/criteria3/3.5.1 upload.pdf' },
                      { name: 'Audited Statements', link: 'http://srivasaviengg.ac.in/naac/criteria3/3.5.1_audited statements_proof.pdf' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-foreground/80">{item.name} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-xl font-semibold text-primary mb-4">Consultancy Reports</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { dept: 'CE', link: 'http://srivasaviengg.ac.in/naac/criteria3/3.5.1_Consultancy_CE_proof.pdf' },
                      { dept: 'ME', link: 'http://srivasaviengg.ac.in/naac/criteria3/3.5.1_consultancy_ME_proof.pdf' },
                      { dept: 'ECE', link: 'http://srivasaviengg.ac.in/naac/criteria3/ece consul proofs.pdf' }
                    ].map((item, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors">
                        <span className="text-foreground/80 font-medium">{item.dept} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 3.6 Extension Activities */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">3.6 Extension Activities</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>3.6.1</strong> Outcomes of extension activities in the neighbourhood community in terms of impact and sensitizing the
                    students to social issues and holistic development, and awards received if any during the last five years
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Additional Information - </span>
                      <a
                        href="http://srivasaviengg.ac.in/naac/criteria3/3.6.1 EXTENSION ACTIVITIES.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>3.6.2</strong> Number of extension and outreach programs conducted by the institution through organized forums including NSS/NCC
                    with involvement of community during the last five years
                  </p>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>3.6.2.1</strong> Number of extension and outreach programs conducted by the institution through organized forums
                    including NSS/NCC with involvement of community during the last five years.
                  </p>

                  <div className="space-y-3">
                    {[
                      { name: 'Sensitising and Holistic Report', link: 'http://srivasaviengg.ac.in/naac/criteria3/1 Sensitising and Holistic Report.pdf' },
                      { name: 'Sensitising and Holistic Development Report', link: 'http://srivasaviengg.ac.in/naac/criteria3/2. sensitising and Holistic Development reports links.pdf' },
                      { name: 'No of Extension and Outreach programs conducted by institution', link: 'http://srivasaviengg.ac.in/naac/criteria3/3 No of Extension and Outreach programs conducted by institution.pdf' },
                      { name: '4 Regular activities report links', link: 'http://srivasaviengg.ac.in/naac/criteria3/4 Regular activities report links.pdf' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-foreground/80">{item.name} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 3.7 Collaboration */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">3.7 Collaboration</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>3.7.1</strong> Number of functional MoUs/linkages with institutions/ industries in India and abroad for internship,
                    on-the-job training, project work, student / faculty exchange and collaborative research during the last five year
                  </p>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>3.7.1.1</strong> Number of functional MoUs / linkages with institutions/ industries in India and abroad for internship,
                    on-the-job training, project work, student / faculty exchange and collaborative research during the last five years:
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Additional Information - </span>
                      <a
                        href="http://srivasaviengg.ac.in//naac/criteria1/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'criterion-4':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-primary text-center mb-6">Criterion-IV</h1>

            {/* 4.1 Physical Facilities */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">4.1 Physical Facilities</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>4.1.1</strong> The Institution has adequate infrastructure and other facilities for:
                  </p>

                  <div className="ml-6 mb-6">
                    <ul className="list-disc list-inside space-y-2 text-foreground/80">
                      <li>a. teaching – learning, viz., classrooms, laboratories, computing equipment etc</li>
                      <li>b. ICT – enabled facilities such as smart class, LMS etc.</li>
                      <li>c. Facilities for Cultural and sports activities, yoga centre, games (indoor and outdoor), Gymnasium, auditorium etc.</li>
                    </ul>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Infrastructure Facilities - </span>
                      <a
                        href="http://srivasaviengg.ac.in/uploads/naac/criteria4/Criterion 4.1.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-primary mb-4">Department-wise Infrastructure Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {[
                      { dept: 'CE', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria4/Criterion 4.1 CIVIL.pdf' },
                      { dept: 'EEE', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria4/Criterion 4.1 EEE.pdf' },
                      { dept: 'ME', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria4/Criterion 4.1 MECHANICAL.pdf' },
                      { dept: 'ECE', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria4/Criterion 4.1 ECE.pdf' },
                      { dept: 'CSE', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria4/Criterion 4.1 CSE.pdf' },
                      { dept: 'MBA', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria4/Criterion 4.1 MBA.pdf' },
                      { dept: 'BSH', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria4/BSH - Add Info..pdf' },
                      { dept: 'SPORTS', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria4/Sports - Add Info..pdf' }
                    ].map((item, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors">
                        <span className="text-foreground/80 font-medium">{item.dept} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>4.1.2</strong> Percentage of expenditure excluding salary, for infrastructure development and augmentation year wise during the
                    last five years
                  </p>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>4.1.2.1</strong> Expenditure for infrastructure development and augmentation, excluding salary year wise during last five
                    years (INR in lakhs)
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                      <thead>
                        <tr className="bg-primary text-white">
                          <th className="px-6 py-4 text-left font-semibold">Year</th>
                          <th className="px-6 py-4 text-center font-semibold">2022-23</th>
                          <th className="px-6 py-4 text-center font-semibold">2021-22</th>
                          <th className="px-6 py-4 text-center font-semibold">2020-21</th>
                          <th className="px-6 py-4 text-center font-semibold">2019-20</th>
                          <th className="px-6 py-4 text-center font-semibold">2018-19</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-gray-50 hover:bg-blue-50 transition-colors">
                          <td className="px-6 py-4 border-b border-gray-200 font-medium">INR in lakhs</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">157.61</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">142.73</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">88.33</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">193.79</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">232.88</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="space-y-3">
                    {[
                      { name: 'Data Template', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria4/4.1.2 Data template.pdf' },
                      { name: 'Budget Proposals', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria4/Budget Proposal for 5 years.pdf' },
                      { name: 'Financial Reports', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria4/Financial Reports.pdf' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-foreground/80">{item.name} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 4.2 Library as a Learning Resource */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">4.2 Library as a Learning Resource</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>4.2.1</strong> Library is automated with digital facilities using Integrated Library Management System (ILMS), adequate
                    subscriptions to e-resources and journals are made. The library is optimally used by the faculty and students
                  </p>

                  <div className="space-y-3 mb-6">
                    {[
                      { name: 'Information', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria4/Criterion 4.2.1 Library.pdf' },
                      { name: 'Additional Information', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria4/4.2.1 additional info.pdf' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-foreground/80">{item.name} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>4.2.2</strong> Percentage of expenditure for purchase of books/e-books and subscription to journals/e-journals year wise during
                    the last five years
                  </p>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>4.2.2.1:</strong> Expenditure for purchase of books / e-books and subscription to journals/e-journals year wise during last
                    five years (INR in lakhs)
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                      <thead>
                        <tr className="bg-primary text-white">
                          <th className="px-6 py-4 text-left font-semibold">Year</th>
                          <th className="px-6 py-4 text-center font-semibold">2022-23</th>
                          <th className="px-6 py-4 text-center font-semibold">2021-22</th>
                          <th className="px-6 py-4 text-center font-semibold">2020-21</th>
                          <th className="px-6 py-4 text-center font-semibold">2019-20</th>
                          <th className="px-6 py-4 text-center font-semibold">2018-19</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-gray-50 hover:bg-blue-50 transition-colors">
                          <td className="px-6 py-4 border-b border-gray-200 font-medium">INR in lakhs</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">16.14</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">3.72</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">4.81</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">11.49</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">22.46</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Information - </span>
                      <a
                        href="http://srivasaviengg.ac.in/uploads/naac/criteria4/4.2.2 data.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-primary mb-4">Department-wise Additional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { dept: 'CE', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria4/Criterion 4.1 CIVIL.pdf' },
                      { dept: 'EEE', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria4/Criterion 4.1 EEE.pdf' },
                      { dept: 'ME', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria4/Criterion 4.1 MECHANICAL.pdf' },
                      { dept: 'ECE', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria4/Criterion 4.1 ECE.pdf' },
                      { dept: 'CSE', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria4/Criterion 4.1 CSE.pdf' },
                      { dept: 'MBA', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria4/Criterion 4.1 MBA.pdf' }
                    ].map((item, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors">
                        <span className="text-foreground/80 font-medium">{item.dept} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 4.3 IT Infrastructure */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">4.3 IT Infrastructure</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>4.3.1</strong> Institution frequently updates its IT facilities and provides sufficient bandwidth for internet connection
                  </p>

                  <div className="space-y-3 mb-6">
                    {[
                      { name: 'Information', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria4/Criterion 4.3.1 IT Infra.pdf' },
                      { name: 'Additional Information', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria4/4.3.1 IT facility updates.pdf' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-foreground/80">{item.name} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>4.3.2</strong> Student - Computer ratio (Data for the latest completed academic year)
                  </p>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>4.3.2.1</strong> Number of computers available for students' usage during the latest completed academic year
                  </p>

                  <div className="space-y-3 mb-6">
                    {[
                      { name: 'Student Computer Ratio', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria1/' },
                      { name: 'Additional Information', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria4/computer bills.pdf' },
                      { name: 'Stock Details', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria4/STOCK REGISTER.pdf' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-foreground/80">{item.name} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>4.3.3</strong> Institution has dedicated audio visual center, mixing equipment, editing facility, media studio, lecture
                    capturing system (LCS) and related hardware and software for e-content development
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Audio Visual Center Information - </span>
                      <a
                        href="http://srivasaviengg.ac.in/uploads/naac/criteria4/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4.4 Maintenance of Campus Infrastructure */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">4.4 Maintenance of Campus Infrastructure</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>4.4.1</strong> Percentage expenditure incurred on maintenance of physical facilities and academic support facilities excluding
                    salary component, during the last five years
                  </p>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>4.4.1.1</strong> Expenditure incurred on maintenance of physical facilities and academic support facilities excluding
                    salary component year wise during last five years (INR in lakhs)
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                      <thead>
                        <tr className="bg-primary text-white">
                          <th className="px-6 py-4 text-left font-semibold">Year</th>
                          <th className="px-6 py-4 text-center font-semibold">2022-23</th>
                          <th className="px-6 py-4 text-center font-semibold">2021-22</th>
                          <th className="px-6 py-4 text-center font-semibold">2020-21</th>
                          <th className="px-6 py-4 text-center font-semibold">2019-20</th>
                          <th className="px-6 py-4 text-center font-semibold">2018-19</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-gray-50 hover:bg-blue-50 transition-colors">
                          <td className="px-6 py-4 border-b border-gray-200 font-medium">Physical Facilities</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">620.76</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">357.36</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">194.47</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">253.11</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">277.18</td>
                        </tr>
                        <tr className="bg-white hover:bg-blue-50 transition-colors">
                          <td className="px-6 py-4 border-b border-gray-200 font-medium">Academic Facilities</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">116.7</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">57.08</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">56.76</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">143.56</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">98.11</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="space-y-3 mb-6">
                    {[
                      { name: 'Expenditure Proof', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria4/4.4.1.pdf' },
                      { name: 'Academic Facilities', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria4/Academic Activities.pdf' },
                      { name: 'Physical Facilities', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria4/Physical Activities.pdf' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-foreground/80">{item.name} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>4.4.2</strong> There are established systems and procedures for maintaining and utilizing physical and academic support
                    facilities-laboratory, library, sports complex, computers, classrooms etc.
                  </p>

                  <div className="prose max-w-none">
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-foreground/80 leading-relaxed text-justify">
                          <strong>1.</strong> The college has skilled and qualified manpower for executing maintenance activities across all facilities
                          established in the departments like laboratories, classrooms, workshops, drawing halls, seminar halls etc.
                        </p>
                      </div>

                      <div className="p-4 bg-green-50 rounded-lg">
                        <p className="text-foreground/80 leading-relaxed text-justify">
                          <strong>2.</strong> A well-established <strong>DEPARTMENT FOR SPORTS AND FITNESS</strong> is being organized by one physical director and 7 supporting
                          staff to enrich the gaming skills among students. All the activities related to sports and maintenance of gaming
                          equipment and ground will be taken care of sports team. Queries related to conducting sports and related matters
                          will be sent to physical director for further examination and execution.
                        </p>
                      </div>

                      <div className="p-4 bg-yellow-50 rounded-lg">
                        <p className="text-foreground/80 leading-relaxed text-justify">
                          <strong>3.</strong> General campus maintenance is taken care by a chief supervisor and his subordinates who oversee the
                          cleanliness of the buildings, classrooms, labs, furniture, seminar halls, conference hall, campus ground, sports
                          facilities etc. Any issue related to repair or replacement of floors/furniture/garden etc., will be intimated to the
                          chief supervisor and in turn he will intimate the same to college management for further approval. The entire
                          process of modeling will be supervised by him after getting prior approval from authorities.
                        </p>
                      </div>

                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-foreground/80 leading-relaxed text-justify">
                          <strong>4.</strong> Cleanliness and Hygiene in the restrooms and waiting halls is looked after by a team of scavengers and keep
                          them tidy all the time.
                        </p>
                      </div>

                      <div className="p-4 bg-pink-50 rounded-lg">
                        <p className="text-foreground/80 leading-relaxed text-justify">
                          <strong>5.</strong> The Heads of Departments report to the higher authorities periodically via Amail (Administration portal)
                          for the maintenance of physical facilities.
                        </p>
                      </div>

                      <div className="p-4 bg-indigo-50 rounded-lg">
                        <p className="text-foreground/80 leading-relaxed text-justify">
                          <strong>6.</strong> Minor issues / repairs are maintained in a log book and will be resolved by administrative office staff.
                        </p>
                      </div>

                      <div className="p-4 bg-orange-50 rounded-lg">
                        <p className="text-foreground/80 leading-relaxed text-justify">
                          <strong>7.</strong> One chief electrician and his supporting staff look after the maintenance of power supply, generators, power
                          loads, solar plant etc. They are responsible for providing power supply to each and every corner of the campus
                          whenever needed.
                        </p>
                      </div>

                      <div className="p-4 bg-teal-50 rounded-lg">
                        <p className="text-foreground/80 leading-relaxed text-justify">
                          <strong>8.</strong> The institution has System Administrator with a team of subordinates to oversee the maintenance of computers and
                          related accessories. The maintenance works include replacement or repair of computers and accessories,
                          hardware upgradation, software installation and upgradation, Wi-Fi maintenance, troubleshooting issues etc.
                        </p>
                      </div>

                      <div className="p-4 bg-cyan-50 rounded-lg">
                        <p className="text-foreground/80 leading-relaxed text-justify">
                          <strong>9.</strong> Regular monitoring of the equipment in department laboratories is done by the supporting staff of all the
                          departments and status of computers and associated equipment are sent to the System Administrator for
                          necessary action.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-foreground/80">Additional Information - </span>
                        <a
                          href="http://srivasaviengg.ac.in/uploads/naac/criteria1/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          Click Here <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'criterion-5':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-primary text-center mb-6">Criterion-V</h1>

            {/* 5.1 Student Support */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">5.1 Student Support</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>5.1.1</strong> Percentage of students benefited by scholarships and freeships provided by the institution, government and
                    non-government bodies, industries, individuals, philanthropists during the last five years
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                      <thead>
                        <tr className="bg-primary text-white">
                          <th className="px-6 py-4 text-left font-semibold">Year</th>
                          <th className="px-6 py-4 text-center font-semibold">2022-23</th>
                          <th className="px-6 py-4 text-center font-semibold">2021-22</th>
                          <th className="px-6 py-4 text-center font-semibold">2020-21</th>
                          <th className="px-6 py-4 text-center font-semibold">2019-20</th>
                          <th className="px-6 py-4 text-center font-semibold">2018-19</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-gray-50 hover:bg-blue-50 transition-colors">
                          <td className="px-6 py-4 border-b border-gray-200 font-medium">Number of Students</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">3793</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">2498</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">2231</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">1994</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">2811</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="space-y-3 mb-6">
                    {[
                      { name: 'Number of students benefited by scholarships and freeships', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria5/5.1.1 Number of students benefited by Scholarships.pdf' },
                      { name: 'Sanction letter of Scholarships from Government', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria5/5.1.1 Sanction letter of scholarship & free ships.pdf' },
                      { name: 'News Paper Advertisement for M.Tech Freeship', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria5/5.1.1 M.Tech Freeship Advertisement.pdf' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-foreground/80">{item.name} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-xl font-semibold text-primary mb-4">Year wise list of beneficiary students from Government</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {[
                      { year: '2022-23', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria5/5.1.1 2022-23-Scholarship from Government.pdf' },
                      { year: '2021-22', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria5/5.1.1 2021-22-Scholarship From Government.pdf' },
                      { year: '2020-21', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria5/5.1.1 2020-21-Scholarship from Government.pdf' },
                      { year: '2019-20', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria5/5.1.1 2019-20-Scholarship From Government.pdf' },
                      { year: '2018-19', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria5/2018-19-Scholarship_Details-UG.pdf' }
                    ].map((item, index) => (
                      <div key={index} className="p-4 bg-blue-50 rounded-lg text-center hover:bg-blue-100 transition-colors">
                        <span className="text-foreground/80 font-medium">{item.year} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-xl font-semibold text-primary mb-4">Year wise list of beneficiary students from Institution Management</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {[
                      { year: '2022-23', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria5/5.1.1 2022-23- Scholarships from Institution.pdf' },
                      { year: '2021-22', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria5/5.1.1 2021-22-Scholarship from Institution.pdf' },
                      { year: '2020-21', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria5/5.1.1 2020-21-Scholarship from Institution.pdf' },
                      { year: '2019-20', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria5/5.1.1 2019-20-Scholarships from Institution.pdf' },
                      { year: '2018-19', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria5/5.1.1. 2018-19 Scholarship From Institution_Details.pdf' }
                    ].map((item, index) => (
                      <div key={index} className="p-4 bg-green-50 rounded-lg text-center hover:bg-green-100 transition-colors">
                        <span className="text-foreground/80 font-medium">{item.year} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-xl font-semibold text-primary mb-4">Reliance Scholarships</h3>
                  <div className="p-4 bg-yellow-50 rounded-lg text-center hover:bg-yellow-100 transition-colors">
                    <span className="text-foreground/80 font-medium">2022-23 - </span>
                    <a
                      href="http://srivasaviengg.ac.in/uploads/naac/criteria5/2022-23 RELIANCE SCHOLARSHIP.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                    >
                      View <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 5.4 Alumni Engagement */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">5.4 Alumni Engagement</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>5.4.1</strong> Alumni contribution during the last five years to the institution through registered Alumni association
                  </p>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>5.4.1.1</strong> Total Amount of alumni contribution during the last five years (INR in lakhs) to the institution through
                    registered Alumni association
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Alumni Meet - </span>
                      <a
                        href="http://srivasaviengg.ac.in/uploads/naac/criteria5/5.4.1 Alumni meet AY 2022-23.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>5.4.2</strong> Alumni contributes and engages significantly to the development of institution through academic and other
                    support system
                  </p>

                  <h3 className="text-xl font-semibold text-primary mb-4">Department-wise Alumni Contributions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { dept: 'EEE', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria5/5.4.1 EEE ALUMNI.pdf' },
                      { dept: 'MEC', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria5/5.4.1 ME ALUMNI.pdf' },
                      { dept: 'ECE', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria5/5.4.1 ECE ALUMNI.pdf' },
                      { dept: 'CSE', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria5/5.4.1 CSE ALUMNI.pdf' }
                    ].map((item, index) => (
                      <div key={index} className="p-4 bg-indigo-50 rounded-lg text-center hover:bg-indigo-100 transition-colors">
                        <span className="text-foreground/80 font-medium">{item.dept} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'criterion-6':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-primary text-center mb-6">Criterion-VI</h1>

            {/* 6.1 Institutional Vision and Leadership */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">6.1 Institutional Vision and Leadership</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>6.1.1</strong> The institutional governance and leadership are in accordance with the vision and mission of the Institution and it
                    is visible in various institutional practices such as NEP implementation, sustained institutional growth,
                    decentralization, participation in the institutional governance and in their short term and long term Institutional Perspective
                    Plan.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Institutional Vision, Mission and Leadership - </span>
                      <a
                        href="http://srivasaviengg.ac.in/uploads/naac/criteria6/6.1 Documentation.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 6.2 Strategy Development and Deployment */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">6.2 Strategy Development and Deployment</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>6.2.1</strong> The institutional perspective plan is effectively deployed and functioning of the institutional bodies are
                    effective and efficient as visible from policies, administrative setup, appointment, service rules, and procedures, etc.
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Institutional Perspective Plan and Deployment - </span>
                      <a
                        href="http://srivasaviengg.ac.in/uploads/naac/criteria6/6.2 Documentation.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>6.2.2</strong> Institution implements e-governance in its operations
                  </p>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>6.2.2.1</strong> e-governance is implemented covering the following areas of operations:
                  </p>

                  <div className="ml-6 mb-6">
                    <ul className="list-disc list-inside space-y-2 text-foreground/80">
                      <li>1. Administration including complaint management</li>
                      <li>2. Finance and Accounts</li>
                      <li>3. Student Admission and Support</li>
                      <li>4. Examinations</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    {[
                      { name: 'Institution Implements E-Governance in its operations', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria6/6.2.2.pdf' },
                      { name: 'Annual E-Governance Report', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria6/6.1%20(b)%20BOG%20Minutes.pdf' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-foreground/80">{item.name} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 6.3 Faculty Empowerment Strategies */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">6.3 Faculty Empowerment Strategies</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>6.3.1</strong> The institution has performance appraisal system, effective welfare measures for teaching and non-teaching staff
                    and avenues for career development/progression
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Additional Information - </span>
                      <a
                        href="http://srivasaviengg.ac.in/uploads/naac/criteria6/6.3.1 document.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>6.3.2</strong> Percentage of teachers provided with financial support to attend conferences/workshops and towards membership
                    fee of professional bodies during the last five years
                  </p>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>6.3.2.1</strong> Number of teachers provided with financial support to attend conferences/workshops and towards membership
                    fee of professional bodies year-wise during the last five years
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                      <thead>
                        <tr className="bg-primary text-white">
                          <th className="px-6 py-4 text-left font-semibold">Year</th>
                          <th className="px-6 py-4 text-center font-semibold">2022-23</th>
                          <th className="px-6 py-4 text-center font-semibold">2021-22</th>
                          <th className="px-6 py-4 text-center font-semibold">2020-21</th>
                          <th className="px-6 py-4 text-center font-semibold">2019-20</th>
                          <th className="px-6 py-4 text-center font-semibold">2018-19</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-gray-50 hover:bg-blue-50 transition-colors">
                          <td className="px-6 py-4 border-b border-gray-200 font-medium">Number of Teachers</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">6</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">42</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">36</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">41</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">127</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>6.3.3</strong> Percentage of teachers undergoing online/ face-to-face Faculty Development Programmes (FDPs)/ Management
                    Development Programmes (MDPs) during the last five years
                  </p>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>6.3.3.1:</strong> Total number of teachers who have undergone online/ face-to-face Faculty Development Programmes (FDP)/
                    Management Development Programs (MDP) during the last five year
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                      <thead>
                        <tr className="bg-primary text-white">
                          <th className="px-6 py-4 text-left font-semibold">Year</th>
                          <th className="px-6 py-4 text-center font-semibold">2022-23</th>
                          <th className="px-6 py-4 text-center font-semibold">2021-22</th>
                          <th className="px-6 py-4 text-center font-semibold">2020-21</th>
                          <th className="px-6 py-4 text-center font-semibold">2019-20</th>
                          <th className="px-6 py-4 text-center font-semibold">2018-19</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-gray-50 hover:bg-blue-50 transition-colors">
                          <td className="px-6 py-4 border-b border-gray-200 font-medium">Number of Teachers</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">95</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">77</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">89</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">125</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-center">124</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-xl font-semibold text-primary mb-4">Documents</h3>
                  <div className="space-y-3 mb-6">
                    {[
                      { name: 'Data Template', link: '#' },
                      { name: 'List of faculty receiving financial support', link: '#' },
                      { name: 'Expenses on Workshop', link: '#' },
                      { name: 'Account Statement for Workshop', link: '#' },
                      { name: 'NPTEL Reimbursement', link: '#' },
                      { name: 'Account Statement for NPTEL', link: '#' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-foreground/80">{item.name} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          Click Here <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-xl font-semibold text-primary mb-4">FDP & MDP Documentation</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Data Template', link: '#' },
                      { name: 'Certificates of FDPs & MDPs Attended by the Staff', link: '#' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-foreground/80">{item.name} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          Click Here <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 6.4 Financial Management and Resource Mobilization */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">6.4 Financial Management and Resource Mobilization</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>6.4.1</strong> Institutional strategies for mobilisation of funds other than salary and fees and the optimal utilisation of
                    resource
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Additional Information - </span>
                      <a
                        href="http://srivasaviengg.ac.in/uploads/naac/criteria1/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>6.4.2</strong> Funds / Grants received from government bodies, non-government bodies, and philanthropists during the last five
                    years (not covered in Criterion III and V)
                  </p>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>6.4.2.1</strong> Total Grants received from government/non-government bodies, philanthropists during last
                    five years (not covered in Criterion III and V) (INR in Lakhs)
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Additional Information - </span>
                      <a
                        href="http://srivasaviengg.ac.in/uploads/naac/criteria1/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>6.4.3</strong> Institution regularly conducts internal and external financial audits regularly
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Additional Information - </span>
                      <a
                        href="http://srivasaviengg.ac.in/uploads/naac/criteria6/6.4.3 sen.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 6.5 Internal Quality Assurance System */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">6.5 Internal Quality Assurance System</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>6.5.1</strong> Internal Quality Assurance Cell (IQAC)/Internal Quality Assurance System(IQAS) has contributed significantly for
                    institutionalizing the quality assurance strategies and processes, by constantly reviewing the teaching-learning
                    process, structures and methodologies of operations and learning outcomes, at periodic intervals.
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Additional Information - </span>
                      <a
                        href="http://srivasaviengg.ac.in/uploads/naac/criteria1/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>6.5.2</strong> The institution reviews its teaching learning process, structures & methodologies of operations and
                    learning outcomes at periodic intervals through IQAC set up as per norms
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Additional Information - </span>
                      <a
                        href="http://srivasaviengg.ac.in/uploads/naac/criteria1/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>6.5.3</strong> Quality assurance initiatives of the institution include:
                  </p>

                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-foreground/80 leading-relaxed text-justify">
                        <strong>•</strong> Academic and Administrative Audit (AAA) and follow up action taken
                      </p>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-foreground/80 leading-relaxed text-justify mb-3">
                        <strong>•</strong> Collaborative quality initiatives with other institution(s)
                      </p>
                      <div className="flex items-center gap-2 p-3 bg-white rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-foreground/80">Collaborative quality initiatives data - </span>
                        <a
                          href="http://srivasaviengg.ac.in/uploads/naac/criteria6/Collaborative Initiatives.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <p className="text-foreground/80 leading-relaxed text-justify">
                        <strong>•</strong> Orientation programme on quality issues for teachers and students
                      </p>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-foreground/80 leading-relaxed text-justify mb-3">
                        <strong>•</strong> Participation in NIRF and other recognized ranking like Shanghai Ranking, QS Ranking Times Ranking etc.
                      </p>
                      <div className="flex items-center gap-2 p-3 bg-white rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-foreground/80">NIRF Data - </span>
                        <a
                          href="http://srivasaviengg.ac.in/uploads/naac/criteria6/NIRF Proofs.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    <div className="p-4 bg-pink-50 rounded-lg">
                      <p className="text-foreground/80 leading-relaxed text-justify mb-3">
                        <strong>•</strong> Any other quality audit recognized by state, national or international agencies
                      </p>
                      <div className="flex items-center gap-2 p-3 bg-white rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-foreground/80">ISO Certifications - </span>
                        <a
                          href="http://srivasaviengg.ac.in/uploads/naac/criteria6/ISO Certifications.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'criterion-7':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-primary text-center mb-6">Criterion-VII</h1>

            {/* 7.1 Institutional Values and Social Responsibilities */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">7.1 Institutional Values and Social Responsibilities</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-4">Gender Equity</h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Institutional Values and Best Practices - </span>
                      <a
                        href="http://srivasaviengg.ac.in/uploads/naac/criteria7/7. Institutional Values and Best Practices.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>7.1.1</strong> Institution has initiated the Gender Audit and measures for the promotion of gender equity during the last
                    five years.
                  </p>

                  <div className="space-y-3 mb-6">
                    {[
                      { name: 'Institutional Values and Social Responsibilities', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria7/7.1 Institutional Values and Social Responsibilities.pdf' },
                      { name: 'Initiatives by the Institution for Gender Equity', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria7/7.1.1 Initiatives by the Institution for Gender Equity.pdf' },
                      { name: 'Measures for promotion of gender equity', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria7/7.1.1.pdf' },
                      { name: 'Gender Audit', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria7/7.1.1 Gender Audit.pdf' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-pink-50 rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-foreground/80">{item.name} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>7.1.2</strong> The Institution has facilities for alternative sources of energy and energy conservation measures
                  </p>

                  <div className="space-y-3 mb-6">
                    {[
                      { name: 'Solar Energy', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria7/7.1.2 Proof for use of  Solar power.pdf' },
                      { name: 'Wheeling to the Grid', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria7/7.1.2 Proofs for Wheeling to the grid.pdf' },
                      { name: 'Sensor-based energy conservation', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria7/7.1.2 Sensor based Energy_Conservation.pdf' },
                      { name: 'Use of LED bulbs/power efficient equipment', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria7/7.1.2 Proofs for use of LED bulbs.pdf' },
                      { name: 'Biogas Plant', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria7/7.1.2-proofs for  biogas plant.pdf' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-foreground/80">{item.name} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>7.1.3</strong> Describe the facilities in the Institution for the management of the following types of degradable and
                    non-degradable waste (within 500 words)
                  </p>

                  <div className="space-y-3">
                    {[
                      { name: 'Facilities for Waste management', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria7/7.1.3 Facilities For the Waste Management.pdf' },
                      { name: 'Geo Tagged Photos for Facilities', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria7/7.1.3 Geo Tagged Photos for Facilities.pdf' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-foreground/80">{item.name} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 7.2 Best Practices */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">7.2 Best Practices</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                    <strong>7.2.1</strong> Describe two best practices successfully implemented by the Institution as per NAAC format provided in
                    the Manual.
                  </p>

                  <div className="space-y-3">
                    {[
                      { name: 'Best Practices', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria7/7.2 Best Practices.pdf' },
                      { name: 'Employability Skill Development', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria7/7.2_1 Employability Skill Development.pdf' },
                      { name: 'Campus EMS', link: 'http://srivasaviengg.ac.in/uploads/naac/criteria7/7.2_2 Campus EMS.pdf' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-foreground/80">{item.name} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <p className="text-foreground/60">Content for this section will be available soon.</p>
          </div>
        );
    }
  };

  return (
    <div className="pt-24 bg-background text-foreground min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 md:py-20 w-full rounded-none mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">NAAC</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            National Assessment and Accreditation Council
          </p>
        </div>
      </section>

      {/* Fixed Menu Toggle Button */}
      <div className="fixed top-28 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-primary text-white px-4 py-3 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
        >
          <Menu className="w-5 h-5" />
          <span className="hidden sm:inline">Contents</span>
        </button>
      </div>

      {/* Fixed Sidebar */}
      {sidebarOpen && (
        <div className="fixed top-24 left-4 w-80 h-[calc(100vh-7rem)] z-40 transition-all duration-300">
          <div className="bg-white rounded-lg shadow-xl h-full overflow-y-auto border border-gray-200">
            {/* Header with close button */}
            <div className="flex justify-between items-center p-4 border-b bg-primary/5 sticky top-0 z-10">
              <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                NAAC Contents
              </h3>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-1 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-1">
              {sidebarItems.map((item) => {
                const isActive = activeTab === item.id;

                // Get appropriate icon for each item
                const getIcon = (id: string) => {
                  if (id.includes('criterion')) return <Award className="w-4 h-4" />;
                  if (id === 'iqac') return <Users className="w-4 h-4" />;
                  if (id === 'stakeholder-feedback') return <TrendingUp className="w-4 h-4" />;
                  if (id === 'extended-profile') return <FileText className="w-4 h-4" />;
                  if (id === 'institutional-distinctiveness') return <BookOpen className="w-4 h-4" />;
                  return <BookOpen className="w-4 h-4" />;
                };

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 hover:shadow-sm ${isActive
                      ? 'bg-primary text-white font-medium shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    {getIcon(item.id)}
                    <span className="text-sm flex-1">{item.label}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'rotate-90' : ''}`} />
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {renderContent()}
        </div>
      </div>

      {/* Overlay for sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default NAAC;
