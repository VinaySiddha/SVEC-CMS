
import React, { useState } from 'react';
import { Book, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library, Link as LinkIcon } from 'lucide-react';
import FixedSidebar from '../../components/FixedSidebar';

const BSHDepartment: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');

  const sidebarItems = [
    { id: 'Department Profile', label: 'Department Profile', icon: <Building className="w-4 h-4" /> },
    { id: 'Faculty Profiles', label: 'Faculty Profiles', icon: <Users className="w-4 h-4" /> },
    { id: 'Board of Studies', label: 'Board of Studies', icon: <Award className="w-4 h-4" /> },
    { id: 'FDPs/Guest Lectures Organized', label: 'FDPs/Guest Lectures Organized', icon: <Presentation className="w-4 h-4" /> },
    { id: 'FDPs/Workshops Participated', label: 'FDPs/Workshops Participated', icon: <Activity className="w-4 h-4" /> },
    { id: 'Faculty Paper Presentations', label: 'Faculty Paper Presentations', icon: <FileText className="w-4 h-4" /> },
    { id: 'Laboratories', label: 'Laboratories', icon: <Microscope className="w-4 h-4" /> },
    { id: 'Faculty Achievements', label: 'Faculty Achievements', icon: <Trophy className="w-4 h-4" /> },
    { id: 'Student Achievements', label: 'Student Achievements', icon: <Award className="w-4 h-4" /> },
    { id: 'Department Achievements', label: 'Department Achievements', icon: <Trophy className="w-4 h-4" /> },
    { id: 'Activities', label: 'Activities', icon: <Activity className="w-4 h-4" /> },
    { id: 'Syllabus', label: 'Syllabus', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'Results', label: 'Results', icon: <Award className="w-4 h-4" /> },
    { id: 'Contact', label: 'Contact', icon: <Phone className="w-4 h-4" /> }
  ];

  const facultyData = {
    mathematics: [
      { name: "Mr.N.Rajasekhar", qualification: "M.Sc.M.Phil", designation: "Assoc.Professor&HOD", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/bsh_N.Rajasekhar_webprofile.pdf" },
      { name: "Mr.Sk.Dhana Prasad", qualification: "M.Sc,B.Ed", designation: "Asst. Professor &section Head", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/Sk.Dhana%20PrasadSk.Dhana%20Prasad.pdf" },
      { name: "Mrs. B.Adi Lakshmi", qualification: "M.Sc.,B.Ed", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/B.Adi%20LakshmiAdi%20Lakshmi%20(Maths).pdf" },
      { name: "Mrs. G.S.Prasanthi", qualification: "M.Sc.,(Ph.D)", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/G.PrasanthiG.S.Prasanthi.pdf" },
      { name: "Mr. V.Srinivas", qualification: "M.Sc", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/BSH_Mr.%20V.%20Srinivas.pdf" },
      { name: "Mrs. B.V.D.Santhi lakshmi", qualification: "M.Sc.,B.Ed.,M.Phil,(Ph.D)", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/B.V.D.%20Santhi%20Lakshmisanthi(Maths).pdf" },
      { name: "Ms. S. Sirisha", qualification: "M.Sc.", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/BSH_Ms.%20S.%20Sirisha.pdf" },
      { name: "Ms. T. Satya Surya Praba", qualification: "M.Sc.", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/BSH_Ms.%20T.Satya%20Surya%20Prabha.pdf" },
      { name: "Mr. T.D.Rama Krishna", qualification: "M.Sc.", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/BSH_Mr.%20T.%20D%20Rama%20Krishna.pdf" },
      { name: "Mr. S. Veeresh", qualification: "M.Sc.,B.Ed", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/BSH_Mr.%20S.%20Veeresh.pdf" },
      { name: "Mr. M. Satya Suresh", qualification: "M.Sc.,B.Ed", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/BSH_Mr.%20M.%20Satya%20Suresh.pdf" },
      { name: "Ms. P. Sravani", qualification: "M.Sc.,B.Ed", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/BSH_Ms.%20P.Sravani.pdf" },
      { name: "Mr. J.N.V Somayajulu", qualification: "M.Sc", designation: "Asst. Professor", profileUrl: "" },
      { name: "Ms. P. Sravani", qualification: "M.Sc", designation: "Asst. Professor", profileUrl: "" }
    ],
    chemistry: [
      { name: "Mrs. S.S.V.Suma Latha", qualification: "M.Sc.,B.Ed.,(Ph.D)", designation: "Asst. Professor & Section head", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/S.S.V.Suma%20Lathassvsuma%20Latha.pdf" },
      { name: "Mr. J. Chandara Rao", qualification: "M.Sc.,M.Phil.", designation: "Sr.Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/J.Chandara%20Raochandara%20rao%20resume.pdf" },
      { name: "Mrs. P. Durga Devi", qualification: "M.Sc.", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/P.Durga%20DeviDurga%20devi.pdf" },
      { name: "Ms. A. Anusha", qualification: "M.Sc.", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Ms.A.Anusha.pdf" },
      { name: "Ms. S. Lavanya", qualification: "M.Sc.", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Ms.S.Lavanya.pdf" },
      { name: "Mrs. P. Silpa", qualification: "M.Sc.", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Mrs.%20P.Silpa.pdf" },
      { name: "Ms. Md. Syed Yasmin", qualification: "M.Sc.", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Ms.Md.%20Syed%20Yasmin.pdf" },
      { name: "Dr. B. Rama Krishna", qualification: "M.Sc.,Ph.D", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Dr.%20B.%20Rama%20Krishna.pdf" }
    ],
    english: [
      { name: "Dr.T.Sujani", qualification: "M.A.,M.Phil.,Ph.D", designation: "Assoc. Professor & Section Head", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/BSH_Dr.%20T.SujaniSujani%20Tata.pdf" },
      { name: "Dr.K. Venkata Rao", qualification: "M.A.,B.Ed.,M.Phil.,Ph.D", designation: "Assoc. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/BSH_Dr.K.%20Venkata%20Rao.pdf" },
      { name: "Dr.B.Anada Rao", qualification: "M.A.,M.Phil.,Ph.D", designation: "Sr.Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Dr.%20B.%20Ananda%20Rao.pdf" },
      { name: "Mr. K.V.Rama Rao", qualification: "M.A.,B.Ed.,(Ph.D)", designation: "Sr.Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Mr.K%20V%20Rama%20Rao.pdf" },
      { name: "Mrs. K. Radha Madhavi", qualification: "M.A.,B.Ed.,M.Phil", designation: "Sr.Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Mrs.%20K.Radha%20Madhavi.pdf" },
      { name: "Mrs. Ch. Tanuja", qualification: "M.A., M.Phil.,B.Ed.", designation: "Sr.Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Ms.Ch.%20Tanuja.pdf" },
      { name: "Mrs. U. Aparanjani", qualification: "M.A.,B.Ed.,(Ph.D)", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Mrs.Aparanjani.pdf" },
      { name: "Mr. G. Srinivas Rao", qualification: "M.A.", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Mr.%20G.%20Srinivasa%20Rao.pdf" },
      { name: "Mr. M. Venkata Ramana", qualification: "M.A., B.Ed.,(Ph.D)", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Mr.%20M.%20Venkata%20Ramana.pdf" },
      { name: "Ms. A.Kiranmayee", qualification: "M.A.", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Ms.%20A.Kiranmayee.pdf" },
      { name: "Ms. P.V.Padmavathi", qualification: "M.A.,B.Ed,", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Ms.%20P.V.Padmavathi.pdf" },
      { name: "Mrs. Ch. Manjeera", qualification: "M.A.", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Mrs.%20Ch.%20Manjeera.pdf" },
      { name: "Mr. Ch. Mutyala Rao", qualification: "M.A., B.Ed", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Mr.%20Ch.%20Mutyala%20Rao.pdf" }
    ],
    physics: [
      { name: "Mr. P. Sita Rama Raju", qualification: "M.Sc.,M.Phil.,(Ph.D)", designation: "Assoc. Professor & Section Head", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/P.Sita%20Rama%20RajuPSR%20Raju%20Profile.pdf" },
      { name: "Dr. K. Jagadeesh", qualification: "M.Sc.,Ph.D", designation: "Sr.Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Dr.K.Jagadeesh.pdf" },
      { name: "Mr. B. Sasi Bhushan", qualification: "M.Sc.,M.tech", designation: "Sr.Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/Sasi%20Bhushan%20BhimavarapuSasi%20Bhushan%20Bhimavarapu.pdf" },
      { name: "Mrs. G.Ramadevi", qualification: "M.Sc.", designation: "Sr.Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/GAJULA%20RAMADEVI.pdf" },
      { name: "Mr. P. Naga Ramesh", qualification: "M.Sc.,B.Ed", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Mr.%20P%20Naga%20Ramesh.pdf" },
      { name: "Mrs. B. Sudha", qualification: "M.Sc.", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Mrs.%20B.%20Sudha.pdf" },
      { name: "Mr. P. Vinay", qualification: "M.Sc.,B.Ed", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Mr.%20P%20%20Vinay.pdf" },
      { name: "Mr. K. Nagavamsi Sai Dileep", qualification: "M.Sc.", designation: "Asst. Professor", profileUrl: "" }
    ],
    library: [
      { name: "Dr.G.CH.S Madhusudhan Rao", qualification: "M.Sc.,M.Phil.,Ph.D", designation: "Assoc.Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/S.S.V.Suma%20Lathassvsuma%20Latha.pdf" }
    ],
    physicalEducation: [
      { name: "Mr. S. Satish", qualification: "M.P.Ed", designation: "PET", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/PD_S.SATEESH%20Resume%20-%202023.pdf" },
      { name: "Ms. K. Lavanya", qualification: "M.P.Ed", designation: "PET", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/PD_Mr.K.%20Lavanya.pdf" },
      { name: "Ms. U. Jyothi", qualification: "M.P.Ed", designation: "PET", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/PD_U.%20Jyothi.pdf" }
    ],
  };

  const nonTeachingFaculty = [
    { name: "Mr. T. Sushma", designation: "Physics Lab Technician" },
    { name: "Mr. V. sekhar Babu", designation: "Chemistry Lab Technician" },
    { name: "Mr.P. Peda Venkata Rao", designation: "Chemistry Lab Technician" },
    { name: "Ms. A. V. V Naga Lakshmi", designation: "DEO" },
    { name: "Mrs. L. Gouthami", designation: "DEO" },
    { name: "Mr. G. Srinivas Rao", designation: "Attender" },
    { name: "Ms. A. V. V Lakshmi", designation: "Attender" },
    { name: "Mr. O. Prabhakara Rao", designation: "Attender" },
    { name: "Mr. P. Siva Sundaram", designation: "Attender" }
  ];

  const renderContent = () => {
    switch (activeContent) {
      case 'Results':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Results</h2>
            <div className="nav-content mb-2">
              <details open>
                <summary className="font-semibold text-lg mb-2">Results Since 2001</summary>
                <ul className="list-disc ml-6 mt-4 space-y-2">
                  <li>
                    B.Tech 1st Year Results since 2001 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/bsh/I%20B.Tech%20Results.pdf"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </li>
                </ul>
              </details>
            </div>
          </div>
        );
      case 'Activities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Activities</h2>
            <details open>
              <summary className="font-semibold text-lg mb-2">National Mathematics Day</summary>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>
                  National Mathematics Day 2022 -{' '}
                  <a
                    href="https://srivasaviengg.ac.in/uploads/bsh/National%20Mathematics%20Day%20-%202022.pdf"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </li>
                <li>
                  National Mathematics Day 2015 -{' '}
                  <a
                    href="https://srivasaviengg.ac.in/uploads/bsh/National%20Mathematics%20Day%20-%202015.pdf"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </li>
                <li>
                  National Mathematics Day 2014 -{' '}
                  <a
                    href="https://srivasaviengg.ac.in/uploads/bsh/National%20Mathematics%20Day%20-%202014.pdf"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </li>
                <li>
                  National Mathematics Day 2012 -{' '}
                  <a
                    href="https://srivasaviengg.ac.in/uploads/bsh/National%20Mathematics%20Day%20-%202012.pdf"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </li>
              </ul>
            </details>
            <details>
              <summary className="font-semibold text-lg mb-2">Fly High Program</summary>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>
                  Fly High Details -{' '}
                  <a
                    href="https://srivasaviengg.ac.in/uploads/bsh/Fly High Details.pdf"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </li>
              </ul>
            </details>
            <details>
              <summary className="font-semibold text-lg mb-2">World Environment Day</summary>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>
                  World Environment Day 2015 -{' '}
                  <a
                    href="https://srivasaviengg.ac.in/uploads/bsh/WORLD%20ENVIRONMENT%20DAY-%202015.pdf"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </li>
              </ul>
            </details>
          </div>
        );
      case 'Faculty Achievements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Achievements</h2>
            <details open>
              <summary className="font-semibold text-lg mb-2">Paper Publications</summary>
              <div>
                <ul className="list-disc ml-6 mt-4 space-y-2">
                  <li>
                    Paper Publications in Journals -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/bsh/Paper%20Publications.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                  </li>
                  <li>
                    Paper Publications in Conferences -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/bsh/Paper%20Publications%20in%20National%20and%20International%20Conferences.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                  </li>
                </ul>
              </div>
            </details>
            <details className="mt-4">
              <summary className="font-semibold text-lg mb-2">AP-SET-NET-GATE</summary>
              <div>
                <ul className="list-disc ml-6 mt-4 space-y-2">
                  <li>
                    AP-SET-NET-GATE -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/bsh/AP-SET-NET-GATE.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                  </li>
                </ul>
              </div>
            </details>
            <details className="mt-4">
              <summary className="font-semibold text-lg mb-2">Book Publications</summary>
              <div>
                <ul className="list-disc ml-6 mt-4 space-y-2">
                  <li>
                    Book Publication Details -{' '}
                    <a href="https://www.srivasaviengg.ac.in/uploads/bsh/Book%20Publication.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                  </li>
                </ul>
              </div>
            </details>
            {/* Newly added blocks from user request */}
            <details className="mt-4">
              <summary className="font-semibold text-lg mb-2">Online Certifications</summary>
              <div>
                <ul className="list-disc ml-6 mt-4 space-y-2">
                  <li>
                    Online Certification Details -{' '}
                    <a href="https://www.srivasaviengg.ac.in/uploads/bsh/Online%20Certifications.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                  </li>
                </ul>
              </div>
            </details>
            <details className="mt-4">
              <summary className="font-semibold text-lg mb-2">Book Reviews</summary>
              <div>
                <ul className="list-disc ml-6 mt-4 space-y-2">
                  <li>
                    Book Reviews Details -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/bsh/Book%20Reviews.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                  </li>
                </ul>
              </div>
            </details>
          </div>
        );
      case 'Laboratories':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Laboratories</h2>
            <div className="mt-4 m-2">
              <details open>
                <summary className="font-semibold text-lg mb-2">English Communication Skills Lab</summary>
                <div>
                  <ul className="list-disc ml-6 mt-4 space-y-2">
                    <li>
                      Technology Assisted Language Learning -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/bsh/TALL.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                    </li>
                    <li>
                      Task Based Language Learning -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/bsh/TBLL.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                    </li>
                  </ul>
                </div>
              </details>
            </div>
            <div className="mt-4 m-2">
              <details>
                <summary className="font-semibold text-lg mb-2">Engineering Physics Lab</summary>
                <div>
                  <ul className="list-disc ml-6 mt-4 space-y-2">
                    <li>
                      Sir.C.V. Raman Engineering Physics Lab -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/bsh/Engineering%20Physics%20Lab%20Write%20up.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                    </li>
                  </ul>
                </div>
              </details>
            </div>
            <div className="mt-4 m-2">
              <details>
                <summary className="font-semibold text-lg mb-2">Engineering Chemistry Lab</summary>
                <div>
                  <ul className="list-disc ml-6 mt-4 space-y-2">
                    <li>
                      Acharya P.C.Ray Engineering Chemistry Lab -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/bsh/Chemistry%20LAB%20write%20up.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                    </li>
                  </ul>
                </div>
              </details>
            </div>
          </div>
        );
      case 'Faculty Paper Presentations':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Paper Presentations</h2>
            <details open>
              <summary className="font-semibold text-lg mb-2">Faculty Paper Presentations</summary>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>
                  Faculty Paper Presentations -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/bsh/Faculty%20Paper%20%20Presentations.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
              </ul>
            </details>
          </div>
        );
      case 'FDPs/Workshops Participated':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">FDPs/Workshops Participated</h2>
            <details open>
              <summary className="font-semibold text-lg mb-2">FDPs/Workshops Participated</summary>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>
                  Faculty Development Programs Workshop -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/bsh/Faculty%20Development%20Programs%20-%20Workshop.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
              </ul>
            </details>
          </div>
        );
      case 'Department Profile':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Head of Department's Message</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="relative">
                <img
                  src="/images/departments/bsh/bsh-hod.png"
                  alt="Sri N. Raja Sekhar"
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                  data-ai-hint="male professor"
                />
              </div>
              <div className="lg:col-span-2 space-y-4">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-[#B22222] mb-2">Sri N. Raja Sekhar</h3>
                  <p className="text-lg text-[#8B0000] font-medium mb-2">Head of the Department</p>
                  <p className="text-gray-600">Mobile No: 9885739808</p>
                  <p className="text-gray-600">Phone No: 08818-284355(O)-(Ext.-377)</p>
                  <p className="text-gray-600">Email: <a href="mailto:hod_bsh@srivasaviengg.ac.in" className="text-primary hover:underline">hod_bsh@srivasaviengg.ac.in</a></p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  The Department of Basic Science and Humanities started at the inception of the college. The Department is fundamental to Engineering and devoted to fostering the basic principles and understanding of science to enhance the students’ basic knowledge of Engineering. Its objective is to provide value-based education for budding Scientists and Engineers. The Department offers various courses of study namely Mathematics, Physics ,Chemistry, Environmental Studies, and English.
                </p>
              </div>
            </div>
          </div>
        );

      case 'Faculty Development Programs':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Development Programs</h2>
            <details open>
              <summary className="font-semibold text-lg mb-2">FDPs Organized</summary>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>
                  Applications of Mathematics in Engineering -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/bsh/FDP%20Organized.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  The Role of Physics in Engineering Technology -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/bsh/write%20up%20on%20FDP%20by%20Physics%20Section%20(1).pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
              </ul>
            </details>
            <details className="mt-4">
              <summary className="font-semibold text-lg mb-2">Guest Lectures Organised</summary>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>
                  Guest Lecture on Applications of Mathematics in Real Life -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/bsh/Guest%20Lecture%20on%20Applications%20of%20Mathematics%20in%20Real%20Life.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
              </ul>
            </details>
          </div>
        );

      case 'Board of Studies':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Board of Studies</h2>
            <details open>
              <summary className="font-semibold text-lg mb-2">English BOS Meetings</summary>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>
                  Minutes of 8<sup>th</sup> meeting of the Board of Studies, dated 22.07.2024 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/bsh/Minutes%20of%20the%20%208th%20meeting%20of%20BOS%20of%20Mathematics%20(2).pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Minutes of 6<sup>th</sup> meeting of the Board of Studies, dated 23.11.2021 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/bsh/Minutes%20of%20the%206th%20Meeting%20of%20Board%20of%20Studies.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Minutes of 5<sup>th</sup> meeting of the Board of Studies, dated 20.09.2021 -{' '}
                  <a href="https://www.srivasaviengg.ac.in/uploads/bsh/BOS-5%20English.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Minutes of 4<sup>th</sup> meeting of the Board of Studies, dated 31.12.2020 -{' '}
                  <a href="https://www.srivasaviengg.ac.in/uploads/bsh/BOS-4%20English.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Minutes of 3<sup>rd</sup> meeting of the Board of Studies, dated 01.08.2020 -{' '}
                  <a href="https://www.srivasaviengg.ac.in/uploads/bsh/BOS-3%20English.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Minutes of 2<sup>nd</sup> meeting of the Board of Studies, dated 19.04.2019 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/bsh/BOS-2%20English.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Minutes of 1<sup>st</sup> meeting of the Board of Studies, dated 02.06.2018 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/bsh/BOS-1%20English.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
              </ul>
            </details>
            <details className="mt-4">
              <summary className="font-semibold text-lg mb-2">Joint BOS</summary>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>
                  Joint BOS 1<sup>st</sup> B.Tech V23 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/bsh/Agenda%20Notes%20of%208th%20Academic%20Council%20Sri%20Vasavi%20Engineering%20College.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
              </ul>
            </details>
            <details className="mt-4">
              <summary className="font-semibold text-lg mb-2">Mathematics BOS Meetings</summary>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>
                  Minutes of 8<sup>th</sup> meeting of the Board of Studies, dated 22.07.2024 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/bsh/Minutes%20of%20the%20%208th%20meeting%20of%20BOS%20of%20Mathematics%20(2).pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Minutes of 7<sup>th</sup> meeting of the Board of Studies, dated 05.10.2023 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/bsh/7th BOS of Mathematics.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Minutes of 6<sup>th</sup> meeting of the Board of Studies, dated 23.11.2021 -{' '}
                  <a href="https://https://srivasaviengg.ac.in/uploads/bsh/Minutes%20of%20the%206th%20Meeting%20of%20Board%20of%20Studies.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Minutes of 5<sup>th</sup> meeting of the Board of Studies, dated 27.09.2021 -{' '}
                  <a href="https://www.srivasaviengg.ac.in/uploads/bsh/BOS-%205%20Maths.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Minutes of 4<sup>th</sup> meeting of the Board of Studies, dated 31.12.2020 -{' '}
                  <a href="https://www.srivasaviengg.ac.in/uploads/bsh/BOS-4%20Maths.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Minutes of 3<sup>rd</sup> meeting of the Board of Studies, dated 01.08.2020 -{' '}
                  <a href="https://www.srivasaviengg.ac.in/uploads/bsh/BOS-3%20Maths.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Minutes of 2<sup>nd</sup> meeting of the Board of Studies, dated 13.04.2019 -{' '}
                  <a href="https://www.srivasaviengg.ac.in/uploads/bsh/BOS%202-Maths.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Minutes of 1<sup>st</sup> meeting of the Board of Studies, dated 12.06.2018 -{' '}
                  <a href="https://www.srivasaviengg.ac.in/uploads/bsh/BOS%201%20Maths.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
              </ul>
            </details>
            <details className="mt-4">
              <summary className="font-semibold text-lg mb-2">Chemistry BOS Meetings</summary>
              <ol className="list-decimal ml-6 mt-4 space-y-2">
                <li>
                  Minutes of 2<sup>nd</sup> meeting of the Board of Studies, dated 28.12.2020 -{' '}
                  <a href="https://www.srivasaviengg.ac.in/uploads/bsh/Physics%20BOS-II.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Minutes of 1<sup>st</sup> meeting of the Board of Studies, dated 02.06.2018 -{' '}
                  <a href="https://www.srivasaviengg.ac.in/uploads/bsh/Physics%20BOS-1.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
              </ol>
            </details>
            <details className="mt-4">
              <summary className="font-semibold text-lg mb-2">Physics BOS Meetings</summary>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>
                  Minutes of 2<sup>nd</sup> meeting of the Board of Studies, dated 28.12.2020 -{' '}
                  <a href="https://www.srivasaviengg.ac.in/uploads/bsh/Chemistry%20BOS%20Meeting-2.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Minutes of 1<sup>st</sup> meeting of the Board of Studies, dated 02.06.2018 -{' '}
                  <a href="https://www.srivasaviengg.ac.in/uploads/bsh/Chemistry%20BOS%20Meeting-1.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
              </ul>
            </details>
          </div>
        );

      case 'Faculty Profiles':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Profiles</h2>
            {Object.entries(facultyData).map(([subject, members]) => (
              <div key={subject} className="mb-10">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4 capitalize border-b-2 border-primary pb-2">{subject}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2">S.No.</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Qualification</th>
                        <th className="px-4 py-2">Designation</th>
                        <th className="px-4 py-2">Profile</th>
                      </tr>
                    </thead>
                    <tbody>
                      {members.map((member, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2">{index + 1}</td>
                          <td className="px-4 py-2 font-medium">{member.name}</td>
                          <td className="px-4 py-2">{member.qualification}</td>
                          <td className="px-4 py-2">{member.designation}</td>
                          <td className="px-4 py-2">
                            <a href={member.profileUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View</a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
            <h2 className="text-3xl font-bold text-[#B22222] mt-12 mb-6 text-center">Non-Teaching Staff</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2">S.No.</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Designation</th>
                  </tr>
                </thead>
                <tbody>
                  {nonTeachingFaculty.map((member, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2 font-medium">{member.name}</td>
                      <td className="px-4 py-2">{member.designation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'Student Achievements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Student Achievements</h2>
            <details open className="mb-4">
              <summary className="font-semibold text-lg mb-2">Student Achievements</summary>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>
                  Certifications in British Council -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/bsh/British%20Council%20Certification%20-%20Sheet1%20(1).pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Gets Higher Exam Qualified Student List -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/bsh/Reliance%20Foundation%20Merit%20Scholarship%20(2022-2023).pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
              </ul>
            </details>
            <details>
              <summary className="font-semibold text-lg mb-2">Merit Scholarships</summary>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>
                  Reliance Foundation Merit Scholarships during the A.Y 2022-23 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/bsh/Reliance%20Foundation%20Merit%20Scholarship%20(2022-2023).pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
              </ul>
            </details>
          </div>
        );
      default:
        return <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center"><h3 className="text-xl font-semibold text-gray-600">Content for {activeContent} coming soon...</h3></div>;
    }
  }

  return (
    <div className="pt-24 bg-gray-100">
      <section className="bg-[#8B1919] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold">Basic Science & Humanities</h1>
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
        title="BSH Department"
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


export default BSHDepartment;
