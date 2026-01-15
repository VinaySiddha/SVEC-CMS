import React, { useEffect, useRef, useState } from 'react';
import { FileText, CheckCircle, Users, Clock, ChevronRight } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useCountUp } from '../hooks/useCountUp';
import AnimatedSection from '../components/AnimatedSection';
import SmoothLink from '../components/SmoothLink';

const Admissions: React.FC = () => {
  // Animation states
  const [animateHero, setAnimateHero] = useState(false);
  const [animatePrograms, setAnimatePrograms] = useState(false);
  const [animateProcess, setAnimateProcess] = useState(false);
  const [animateDocuments, setAnimateDocuments] = useState(false);
  const [animateContact, setAnimateContact] = useState(false);
  const [animateCta, setAnimateCta] = useState(false);
  const [animateStats, setAnimateStats] = useState(false);
  const [animateEligibility, setAnimateEligibility] = useState(false);

  // Refs for sections
  const heroRef = useRef<HTMLDivElement>(null);
  const programsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const documentsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const eligibilityRef = useRef<HTMLDivElement>(null);

  // Stats for animation
  const stats = [
    { value: 10, label: 'Engineering Programs' },
    { value: 4, label: 'M.Tech Specializations' },
    { value: 4, label: 'Diploma Courses' },
    { value: 3500, label: 'Students Enrolled' }
  ];

  // Set up intersection observers
  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: '0px' };

    const createObserver = (ref: React.RefObject<HTMLDivElement>, setAnimate: React.Dispatch<React.SetStateAction<boolean>>) => {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      }, observerOptions);

      if (ref.current) observer.observe(ref.current);
      return observer;
    };

    const heroObserver = createObserver(heroRef, setAnimateHero);
    const programsObserver = createObserver(programsRef, setAnimatePrograms);
    const processObserver = createObserver(processRef, setAnimateProcess);
    const documentsObserver = createObserver(documentsRef, setAnimateDocuments);
    const contactObserver = createObserver(contactRef, setAnimateContact);
    const ctaObserver = createObserver(ctaRef, setAnimateCta);
    const statsObserver = createObserver(statsRef, setAnimateStats);
    const eligibilityObserver = createObserver(eligibilityRef, setAnimateEligibility);

    return () => {
      heroObserver.disconnect();
      programsObserver.disconnect();
      processObserver.disconnect();
      documentsObserver.disconnect();
      contactObserver.disconnect();
      ctaObserver.disconnect();
      statsObserver.disconnect();
      eligibilityObserver.disconnect();
    };
  }, []);
  const admissionProcess = [
    {
      step: '1',
      title: 'Check Eligibility',
      description: 'Verify that you meet the basic eligibility criteria for your desired program',
      requirements: ['10+2 with PCM', 'Minimum 45% marks', 'Valid entrance exam score']
    },
    {
      step: '2',
      title: 'Fill Application',
      description: 'Complete the online application form with accurate information',
      requirements: ['Personal details', 'Academic records', 'Upload documents', 'Pay application fee']
    },
    {
      step: '3',
      title: 'Document Verification',
      description: 'Submit required documents for verification',
      requirements: ['Original certificates', 'Mark sheets', 'Transfer certificate', 'Caste certificate (if applicable)']
    },
    {
      step: '4',
      title: 'Counseling & Admission',
      description: 'Participate in counseling process and complete admission formalities',
      requirements: ['Attend counseling', 'Seat allotment', 'Fee payment', 'Final admission']
    }
  ];

  // Sort programs alphabetically by name
  const programs = [
    {
      name: 'Civil Engineering',
      duration: '4 Years',
      intake: '60',
      fee: '₹65,000/year',
      eligibility: 'PCM with 45% marks'
    },
    {
      name: 'Computer Science & Engineering',
      duration: '4 Years',
      intake: '120',
      fee: '₹75,000/year',
      eligibility: 'PCM with 45% marks'
    },
    {
      name: 'Electrical & Electronics',
      duration: '4 Years',
      intake: '60',
      fee: '₹70,000/year',
      eligibility: 'PCM with 45% marks'
    },
    {
      name: 'Electronics & Communications',
      duration: '4 Years',
      intake: '60',
      fee: '₹70,000/year',
      eligibility: 'PCM with 45% marks'
    },
    {
      name: 'Mechanical Engineering',
      duration: '4 Years',
      intake: '60',
      fee: '₹70,000/year',
      eligibility: 'PCM with 45% marks'
    }
  ].sort((a, b) => a.name.localeCompare(b.name));

  // Sort documents alphabetically
  const documents = [
    'Aadhar Card copy',
    'Caste Certificate (for reserved category students)',
    'Entrance exam scorecard (JEE Main/AP EAMCET)',
    'Income Certificate (for fee concession)',
    'Intermediate/12th Class Certificate and Marks Memo',
    'Migration Certificate (for students from other states)',
    'Passport size photographs (6 copies)',
    'SSC/10th Class Certificate and Marks Memo',
    'Study Certificate (if applicable)',
    'Transfer Certificate from the last attended institution'
  ].sort();

  // For table rows, create sorted arrays for each program type
  const btechPrograms = [
    { name: 'Artificial Intelligence & Machine Learning', duration: '4 Years', semesters: 8, intake: 180, fee: '₹77,200/year' },
    { name: 'CSE (Artificial Intelligence)', duration: '4 Years', semesters: 8, intake: 180, fee: '₹77,200/year' },
    { name: 'CSE (Data Science)', duration: '4 Years', semesters: 8, intake: 60, fee: '₹77,200/year' },
    { name: 'Civil Engineering', duration: '4 Years', semesters: 8, intake: 60, fee: '₹77,200/year' },
    { name: 'Computer Science & Engineering', duration: '4 Years', semesters: 8, intake: 300, fee: '₹77,200/year' },
    { name: 'Computer Science & Technology', duration: '4 Years', semesters: 8, intake: 60, fee: '₹77,200/year' },
    { name: 'Electrical & Electronics Engineering', duration: '4 Years', semesters: 8, intake: 60, fee: '₹77,200/year' },
    { name: 'Electronics & Communication Engineering', duration: '4 Years', semesters: 8, intake: 240, fee: '₹77,200/year' },
    { name: 'Electronics & Communication Technology', duration: '4 Years', semesters: 8, intake: 60, fee: '₹77,200/year' },
    { name: 'Mechanical Engineering', duration: '4 Years', semesters: 8, intake: 60, fee: '₹77,200/year' }
  ].sort((a, b) => a.name.localeCompare(b.name));

  const mtechPrograms = [
    { name: 'Computer Science (CSE)', duration: '2 Years', semesters: 4, intake: 12, fee: '₹60,500/year' },
    { name: 'Embedded Systems & VLSI (EEE)', duration: '2 Years', semesters: 4, intake: 6, fee: '₹60,500/year' },
    { name: 'Power Electronics & Power Systems (EEE)', duration: '2 Years', semesters: 4, intake: 6, fee: '₹60,500/year' },
    { name: 'Structural Engineering (Civil)', duration: '2 Years', semesters: 4, intake: 6, fee: '₹60,500/year' }
  ].sort((a, b) => a.name.localeCompare(b.name));

  const mbaPrograms = [
    { name: 'Master of Business Administration', duration: '2 Years', semesters: 4, intake: 120, fee: '₹51,800/year' }
  ];

  const diplomaPrograms = [
    { name: 'Computer Engineering', duration: '3 Years', semesters: 6, intake: 120, fee: '₹25,000/year' },
    { name: 'Electrical & Electronics Engineering', duration: '3 Years', semesters: 6, intake: 60, fee: '₹25,000/year' },
    { name: 'Electronics & Communication Engineering', duration: '3 Years', semesters: 6, intake: 120, fee: '₹25,000/year' },
    { name: 'Mechanical Engineering', duration: '3 Years', semesters: 6, intake: 60, fee: '₹25,000/year' }
  ].sort((a, b) => a.name.localeCompare(b.name));

  // Add some CSS for responsive tables
  useEffect(() => {
    // Add responsive table styles when component mounts
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 640px) {
        .admissions-page table {
          font-size: 0.875rem;
        }
        .admissions-page table td, .admissions-page table th {
          padding-left: 0.5rem;
          padding-right: 0.5rem;
        }
      }
    `;
    document.head.appendChild(style);

    // Clean up when component unmounts
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="pt-24 admissions-page">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="bg-primary text-white py-16 md:py-20 w-full rounded-none mb-12 overflow-hidden relative isolate"
      >
        <div className={`container mx-auto px-4 text-center transition-all duration-1000 ${animateHero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} relative z-10`}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 relative inline-block">
            Admissions 
          </h1>
          
        </div>

        {/* Subtle background shapes */}
        <div className={`absolute right-0 top-0 h-32 w-32 md:h-40 md:w-40 bg-secondary/30 rounded-full transition-all duration-1000 ${animateHero ? 'opacity-70 scale-100' : 'opacity-0 scale-0'} shadow-sm z-0`}
          style={{ animationDelay: '300ms' }}></div>
        <div className={`absolute left-0 bottom-0 h-24 w-24 md:h-36 md:w-36 bg-secondary/20 rounded-full transition-all duration-1000 ${animateHero ? 'opacity-70 scale-100' : 'opacity-0 scale-0'} shadow-sm z-0`}
          style={{ animationDelay: '600ms' }}></div>
      </section>

      {/* Quick Stats Section */}
      <section ref={statsRef} className="mb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-card to-card/90 rounded-lg p-4 md:p-6 text-center shadow-md hover:shadow-lg transform transition-all duration-700 ${animateStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} border-b-4 border-primary`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1 md:mb-2">
                  {animateStats ? stat.value : 0}+
                </h3>
                <p className="text-foreground font-medium text-sm sm:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Offered */}
      <section ref={programsRef} className="py-12 bg-background rounded-lg mb-12 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-8 transition-all duration-1000 ${animatePrograms ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">Programs Offered</h2>
            <p className="text-muted-foreground text-lg">Choose from our comprehensive engineering and management programs</p>
          </div>
          <div className="max-w-6xl mx-auto">
            {/* B.Tech Programs */}
            <div className={`mb-10 transition-all duration-1000 ${animatePrograms ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
              <h3 className="text-xl md:text-2xl font-bold text-primary mb-4 flex items-center">
                <span className="inline-block w-8 h-8 bg-primary text-white rounded-full text-sm flex items-center justify-center mr-2">B</span>
                B.Tech Programs
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th className="px-3 sm:px-6 py-3 text-left">Program</th>
                      <th className="px-2 sm:px-6 py-3 text-center">Duration</th>
                      <th className="px-2 sm:px-6 py-3 text-cente">Semesters</th>
                      <th className="px-2 sm:px-6 py-3 text-center">Intake</th>
                      <th className="px-2 sm:px-6 py-3 text-center">Annual Fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {btechPrograms.map((prog, idx) => (
                      <tr key={prog.name} className={idx % 2 === 0 ? 'bg-muted/30' : 'bg-white'}>
                        <td className="px-6 py-4 font-semibold text-primary">{prog.name}</td>
                        <td className="px-6 py-4 text-center">{prog.duration}</td>
                        <td className="px-6 py-4 text-center">{prog.semesters}</td>
                        <td className="px-6 py-4 text-center">{prog.intake}</td>
                        <td className="px-6 py-4 text-center">{prog.fee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* M.Tech Programs */}
            <div className={`mb-10 transition-all duration-1000 ${animatePrograms ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '400ms' }}>
              <h3 className="text-xl md:text-2xl font-bold text-primary mb-4 flex items-center">
                <span className="inline-block w-8 h-8 bg-primary text-white rounded-full text-sm flex items-center justify-center mr-2">M</span>
                M.Tech Programs
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th className="px-6 py-3 text-left">Program</th>
                      <th className="px-6 py-3 text-center">Duration</th>
                      <th className="px-6 py-3 text-center">Semesters</th>
                      <th className="px-6 py-3 text-center">Intake</th>
                      <th className="px-6 py-3 text-center">Annual Fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mtechPrograms.map((prog, idx) => (
                      <tr key={prog.name} className={idx % 2 === 0 ? 'bg-muted/30' : 'bg-white'}>
                        <td className="px-6 py-4 font-semibold text-primary">{prog.name}</td>
                        <td className="px-6 py-4 text-center">{prog.duration}</td>
                        <td className="px-6 py-4 text-center">{prog.semesters}</td>
                        <td className="px-6 py-4 text-center">{prog.intake}</td>
                        <td className="px-6 py-4 text-center">{prog.fee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* MBA Program */}
            <div className={`mb-10 transition-all duration-1000 ${animatePrograms ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '600ms' }}>
              <h3 className="text-xl md:text-2xl font-bold text-primary mb-4 flex items-center">
                <span className="inline-block w-8 h-8 bg-primary text-white rounded-full text-sm flex items-center justify-center mr-2">M</span>
                MBA Program
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th className="px-6 py-3 text-left">Program</th>
                      <th className="px-6 py-3 text-center">Duration</th>
                      <th className="px-6 py-3 text-center">Semesters</th>
                      <th className="px-6 py-3 text-center">Intake</th>
                      <th className="px-6 py-3 text-center">Annual Fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mbaPrograms.map((prog, idx) => (
                      <tr key={prog.name} className={idx % 2 === 0 ? 'bg-muted/30' : 'bg-white'}>
                        <td className="px-6 py-4 font-semibold text-primary">{prog.name}</td>
                        <td className="px-6 py-4 text-center">{prog.duration}</td>
                        <td className="px-6 py-4 text-center">{prog.semesters}</td>
                        <td className="px-6 py-4 text-center">{prog.intake}</td>
                        <td className="px-6 py-4 text-center">{prog.fee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Diploma Programs */}
            <div className={`transition-all duration-1000 ${animatePrograms ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '800ms' }}>
              <h3 className="text-xl md:text-2xl font-bold text-primary mb-4 flex items-center">
                <span className="inline-block w-8 h-8 bg-primary text-white rounded-full text-sm flex items-center justify-center mr-2">D</span>
                Diploma Programs
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th className="px-6 py-3 text-left">Program</th>
                      <th className="px-6 py-3 text-center">Duration</th>
                      <th className="px-6 py-3 text-center">Semesters</th>
                      <th className="px-6 py-3 text-center">Intake</th>
                      <th className="px-6 py-3 text-center">Annual Fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {diplomaPrograms.map((prog, idx) => (
                      <tr key={prog.name} className={idx % 2 === 0 ? 'bg-muted/30' : 'bg-white'}>
                        <td className="px-6 py-4 font-semibold text-primary">{prog.name}</td>
                        <td className="px-6 py-4 text-center">{prog.duration}</td>
                        <td className="px-6 py-4 text-center">{prog.semesters}</td>
                        <td className="px-6 py-4 text-center">{prog.intake}</td>
                        <td className="px-6 py-4 text-center">{prog.fee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section ref={processRef} className="py-12 mb-12 bg-card rounded-lg overflow-hidden">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-8 transition-all duration-1000 ${animateProcess ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">Admission Process</h2>
            <p className="text-muted-foreground text-lg">Simple steps to secure your admission</p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {admissionProcess.map((process, index) => (
                <div
                  key={index}
                  className={`flex items-start transition-all duration-700 transform ${animateProcess ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-secondary to-primary text-white rounded-full flex items-center justify-center text-xl font-bold mr-4 shadow-lg border-4 border-white transform transition-all duration-300 hover:scale-110">
                    {process.step}
                  </div>
                  <div className="flex-1">
                    <div className="bg-background p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:transform hover:scale-[1.02] border-l-4 border-secondary">
                      <h3 className="text-xl font-bold text-primary mb-3">{process.title}</h3>
                      <p className="text-card-foreground mb-4">{process.description}</p>
                      <ul className="space-y-3">
                        {process.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-center text-sm bg-primary/5 p-2 rounded-md transition-all duration-300 hover:bg-primary/10">
                            <CheckCircle className="w-5 h-5 text-secondary mr-3 flex-shrink-0" />
                            <span className="text-muted-foreground">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="py-12 mb-12 bg-gradient-to-br from-card to-card/90 rounded-lg overflow-hidden shadow-lg relative">
        <div className="absolute inset-0 bg-primary/5 rounded-lg"></div>
        <div className="container mx-auto px-4 relative" ref={eligibilityRef}>
          <div className={`text-center mb-8 transition-all duration-1000 ${animateEligibility ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">Eligibility Criteria</h2>
            <p className="text-muted-foreground text-lg">Check if you meet the requirements</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className={`rounded-lg shadow-md overflow-hidden transition-all duration-700 ${animateEligibility ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '300ms' }}>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="py-3 px-3 sm:px-6 text-left font-semibold text-sm sm:text-base">Program</th>
                      <th className="py-3 px-3 sm:px-6 text-left font-semibold text-sm sm:text-base">Eligibility</th>
                      <th className="py-3 px-3 sm:px-6 text-left font-semibold text-sm sm:text-base">Selection Process</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 sm:py-4 px-3 sm:px-6 border-b text-sm sm:text-base font-medium text-primary">B.Tech</td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6 border-b text-sm sm:text-base">10+2 with PCM / Diploma</td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6 border-b text-sm sm:text-base">AP EAPCET / JEE Mains Rank</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 sm:py-4 px-3 sm:px-6 border-b text-sm sm:text-base font-medium text-primary">M.Tech</td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6 border-b text-sm sm:text-base">B.Tech or equivalent</td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6 border-b text-sm sm:text-base">GATE / PGECET Rank</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 sm:py-4 px-3 sm:px-6 border-b text-sm sm:text-base font-medium text-primary">MBA</td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6 border-b text-sm sm:text-base">Any Bachelor's Degree</td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6 border-b text-sm sm:text-base">ICET Rank</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section ref={documentsRef} className="py-12 mb-12 bg-background rounded-lg overflow-hidden">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-8 transition-all duration-1000 ${animateDocuments ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">Required Documents</h2>
            <p className="text-muted-foreground text-lg">Prepare these documents for your application</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className={`bg-card p-6 md:p-8 rounded-lg shadow-md transition-all duration-1000 ${animateDocuments ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documents.map((doc, index) => (
                  <div
                    key={index}
                    className={`flex items-start transition-all duration-700 ${animateDocuments ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'} bg-white/50 rounded-md p-2 hover:bg-white/80 transition-colors`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className={`w-8 h-8 rounded-full ${index % 4 === 0 ? 'bg-gradient-to-br from-secondary to-primary/70' :
                      index % 4 === 1 ? 'bg-gradient-to-br from-primary to-secondary/70' :
                        index % 4 === 2 ? 'bg-gradient-to-br from-primary/90 to-blue-500/70' :
                          'bg-gradient-to-br from-secondary/90 to-blue-400/70'} 
                      flex items-center justify-center mr-3 flex-shrink-0 border border-white shadow-md`}>
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-card-foreground text-sm sm:text-base">{doc}</span>
                  </div>
                ))}
              </div>
              <div className={`mt-6 p-3 sm:p-4 bg-primary/20 border border-primary/50 rounded-lg transition-all duration-700 ${animateDocuments ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} shadow-md`} style={{ transitionDelay: '1000ms' }}>
                <p className="text-primary font-medium flex items-start sm:items-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-xs mr-2 mt-0.5 sm:mt-0 flex-shrink-0">!</span>
                  <span className="text-sm sm:text-base"><strong>Note:</strong> All documents should be original for verification.
                    Self-attested photocopies will be retained by the college.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      
    </div>
  );
};

export default Admissions;
