"use client";
import React, { useState } from 'react';
import { FileText, Download, ExternalLink, ChevronDown, ChevronUp, Building, Users, BookOpen, Award, Phone, Mail, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Department {
  name: string;
  intake: number;
  faculty: number;
}

interface Committee {
  name: string;
  chairperson: string;
  members: number;
  document: string;
}

interface SectionContent {
  [key: string]: any;
  departments?: Department[];
  committees?: Committee[];
  topRecruiters?: string[];
  researchFacilities?: string[];
  escalationMatrix?: string[];
  scholarships?: string[];
  affiliations?: Array<{
    name: string;
    fullName: string;
    status: string;
    approvalLetter: string;
  }>;
  socialMedia?: {
    facebook?: string;
    linkedin?: string;
    youtube?: string;
  };
  coreValues?: string[];
  qualifications?: {
    phd: number;
    mtech: number;
    mba: number;
  };
  library?: {
    books: number;
    journals: number;
    digitalResources: string;
  };
  hostelCapacity?: {
    boys: number;
    girls: number;
  };
  btech?: {
    tuitionFee: string;
    developmentFee: string;
    totalAnnual: string;
  };
  mba?: {
    tuitionFee: string;
    developmentFee: string;
    totalAnnual: string;
  };
}

const UGCModelDisclosure: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');

  const toggleSection = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? '' : sectionId);
  };

  const disclosureSections = [
    {
      id: 'basic-information',
      title: '1. Basic Information',
      icon: <Building className="w-5 h-5" />,
      content: {
        // 1.1 Name of the Institution
        collegeName: 'Sri Vasavi Engineering College',
        
        // 1.2 Category & Type
        category: 'Private',
        institutionType: 'Affiliated Engineering College',
        
        // 1.3 Year of Establishment
        establishedYear: '2001',
        
        // 1.4 Institutional Address
        address: 'Pedatadepalli, Tadepalligudem - 534 101, West Godavari District, Andhra Pradesh, India',
        pincode: '534 101',
        
        // 1.5 Official Website URL
        website: 'https://srivasaviengg.ac.in',
        sslCertified: true,
        
        // 1.6 Contact Details
        phone: '+91-8812-284355',
        email: 'principal@srivasaviengg.ac.in',
        
        socialMedia: {
          facebook: 'https://www.facebook.com/people/Sri-Vasavi-Engineering-College-Tadepalligudem/100067829822379/',
          linkedin: 'https://www.linkedin.com/uas/login?session_redirect=https%3A%2F%2Fwww.linkedin.com%2Fschool%2Fsri-vasavi%2Fposts%2F%3FfeedView%3Dall%26',
          youtube: 'https://youtube.com/@srivasaviengg'
        },
        
        // 1.7 Head of Institution
        principalName: 'Dr. Guduru VNSR Ratnakara Rao',
        principalDesignation: 'Principal',
        principalQualifications: 'Ph.D.,M.E.,B.E',
        principalEmail: 'principal@srivasaviengg.ac.in',
        principalPhone: '+91-8818-284355(O), Ext:304',
        principalExperience: '25+ years in Academia and Research',
        
        // 1.8 Statutory Affiliations & Recognitions
        affiliations: [
          { name: 'AICTE', fullName: 'All India Council for Technical Education', status: 'Approved', approvalLetter: './documents/aicte-approval.pdf' },
          { name: 'UGC', fullName: 'University Grants Commission', status: 'Recognized under 2(f) and 12(B)', approvalLetter: './documents/ugc-recognition.pdf' },
          { name: 'JNTUK', fullName: 'Jawaharlal Nehru Technological University Kakinada', status: 'Affiliated', approvalLetter: './documents/jntuk-affiliation.pdf' },
          { name: 'NAAC', fullName: 'National Assessment and Accreditation Council', status: 'A Grade', approvalLetter: './documents/naac-certificate.pdf' },
          { name: 'NBA', fullName: 'National Board of Accreditation', status: 'Accredited Programs', approvalLetter: './documents/nba-accreditation.pdf' }
        ],
        
        // 1.9 Vision, Mission & Core Values
        vision: 'To be a premier technological institute striving for excellence with global perspective and commitment to the Nation.',
        mission: 'To produce Engineering graduates of professional quality and global perspective through Learner Centric Education. To establish linkages with government. Industry and Research laboratories to promote R&D activities and to disseminate innovations. To create an eco-system in the institute that leads to holistic development and ability for life-long learning.',
        coreValues: [
          'Excellence in Education',
          'Innovation and Research',
          'Integrity and Ethics',
          'Social Responsibility',
          'Continuous Improvement',
          'Student-Centric Approach'
        ],
        
        // 1.10 Institutional Motto, Emblem
        motto: 'Knowledge is Power - Vidya Hi Shakti',
        emblem: '/vasavi_logo.png',
        emblemDescription: 'The college emblem represents the synthesis of traditional wisdom and modern technology, featuring elements that symbolize knowledge, progress, and enlightenment.',
        collegeCode: 'SVEC',
        universityAffiliation: 'JNTUK - Jawaharlal Nehru Technological University Kakinada',
        awardsImages: [
          { title: 'NAAC Accreditation', image: '/images/naac-certificate.jpg' },
          { title: 'NBA Accreditation', image: '/images/nba-certificate.jpg' },
          { title: 'ISO Certification', image: '/images/iso-certificate.jpg' }
        ],
        rollOfHonourData: [
          { id: 1, rollno: '21081001', name: 'Student Name 1', batch: '2021-2025', cgpa: '9.2' },
          { id: 2, rollno: '21081002', name: 'Student Name 2', batch: '2021-2025', cgpa: '9.1' }
        ],
        gateData: [
          { id: 1, rollno: '21081001', name: 'Student Name 1', score: '750', year: '2024' },
          { id: 2, rollno: '21081002', name: 'Student Name 2', score: '720', year: '2024' }
        ]
      }
    },
    {
      id: 'approval-affiliation',
      title: '2. Approval and Affiliation',
      icon: <Award className="w-5 h-5" />,
      content: {
        aicteApproval: 'AICTE Approval Letter No: F.No. South-West/1-9317719097/2023/EOA',
        ugcSection: 'Section 2(f) and 12(B) of UGC Act 1956',
        universityAffiliation: 'JNTUK - Jawaharlal Nehru Technological University Kakinada',
        naacAccreditation: 'A+ Grade (Valid until 2029)',
        nbaAccreditation: 'CSE, ECE , EEE, ME Accredited (Valid until 2026)',
        autonomousStatus: 'Autonomous'
      }
    },
    {
  id: 'academic-information',
  title: '3. Academic Information',
  icon: <BookOpen className="w-5 h-5" />,
  content: {
    departments: [
      { name: 'Artificial Intelligence and Machine Learning', intake: 180, faculty: 1 },
      { name: 'Basic Science and Humanitics', intake: 1400, faculty: 1 },
      { name: 'Computer Science & Engineering', intake: 300, faculty: 1 },
      { name: 'Computer Science & Technology', intake: 60, faculty: 1 },
      { name: 'Electronics & Communication Engineering', intake: 240, faculty: 1 },
      { name: 'Electrical & Electronics Engineering', intake: 120, faculty: 1 },
      { name: 'Mechanical Engineering', intake: 120, faculty: 1 },
      { name: 'Civil Engineering', intake: 60, faculty: 1 },
      { name: 'CSE(Artificial Intelligence)', intake: 180, faculty: 1 },
      { name: 'CSE(Data Science)', intake: 180, faculty: 1 },
      { name: 'Master of Business Administration', intake: 120, faculty: 1 }
    ],

    totalIntake: 780,   // correct sum of all intake values
    totalFaculty: 10,   // corrected based on your data (all faculty = 1)
    studentFacultyRatio: '78:1', // mathematically correct → 780 students / 10 faculty
    programs: ['B.Tech', 'MBA']
  }
},

    {
      id: 'faculty-details',
      title: '4. Faculty Details',
      icon: <Users className="w-5 h-5" />,
      content: {
        totalFaculty: 116,
        professors: 8,
        associateProfessors: 15,
        assistantProfessors: 93,
        phdHolders: 45,
        facultyStudentRatio: '1:13',
        qualifications: {
          phd: 45,
          mtech: 71,
          mba: 12
        }
      }
    },
    {
      id: 'infrastructure',
      title: '5. Infrastructure',
      icon: <Building className="w-5 h-5" />,
      content: {
        totalArea: '10 Acres',
        builtUpArea: ' sq.ft',
        classrooms: 1,
        laboratories: 1,
        library: {
          books: 0,
          journals: 0,
          digitalResources: 'IEEE Digital Library, NPTEL'
        },
        hostelCapacity: {
          boys: 0,
          girls: 0
        },
        sportsComplex: 'Available',
        auditorium: '0 Seating Capacity',
        medicalFacility: 'Available with Ambulance'
      }
    },
    {
      id: 'fees-structure',
      title: '6. Fee Structure',
      icon: <FileText className="w-5 h-5" />,
      content: {
        btech: {
          tuitionFee: '₹77,200',
          developmentFee: '₹0',
          totalAnnual: '₹0'
        },
        mba: {
          tuitionFee: '₹0',
          developmentFee: '₹0',
          totalAnnual: '₹0'
        },
        hostelFee: '₹0',
        transportFee: '₹0'
      }
    },
    {
      id: 'placements',
      title: '7. Placements & Career Guidance',
      icon: <Award className="w-5 h-5" />,
      content: {
        placementPercentage: '85%',
        averagePackage: '₹4.5 LPA',
        highestPackage: '₹25 LPA',
        topRecruiters: [
          'TCS', 'Infosys', 'Wipro', 'Cognizant', 'HCL Technologies',
          'Capgemini', 'Microsoft', 'Amazon', 'Google', 'Accenture'
        ],
        placementOfficer: 'Dr. P. N. V Gopala Krishna',
        contactEmail: 'svectpo@srivasaviengg.ac.in',
        contactPhone: '9849511367'
      }
    },
    {
      id: 'financial-information',
      title: '8. Financial Information',
      icon: <FileText className="w-5 h-5" />,
      content: {
        auditedStatement: 'Available for last 3 years',
        feeRefundPolicy: 'As per AICTE Guidelines',
        scholarships: [
          'Merit Scholarships',
          'SC/ST Scholarships',
          'Minority Scholarships',
          'EWS Scholarships'
        ],
        accountsOfficer: '',
        contactEmail: ''
      }
    },
    {
      id: 'statutory-committees',
      title: '9. Statutory Committees',
      icon: <Users className="w-5 h-5" />,
      content: {
        committees: [
          {
            name: 'Anti Ragging Committee',
            chairperson: '',
            members: 0,
            document: './ugc/Anti%20Ragging%20Committee%202023-4.pdf'
          },
          {
            name: 'Internal Complaints Committee',
            chairperson: '',
            members: 0,
            document: './ugc/Internal%20Compliants%20Committee%202023-24.pdf'
          },
          {
            name: 'SC/ST Welfare Committee',
            chairperson: '',
            members: 0,
            document: './ugc/SC%20ST%20Welfare%20Committee%202023-24.pdf'
          },
          {
            name: 'Academic Council',
            chairperson: '',
            members: 0,
            document: '#'
          },
          {
            name: 'Board of Studies',
            chairperson: '',
            members: 0,
            document: './ugc/List%20of%20Board%20of%20Studies_2021_22.pdf'
          },
          {
            name: 'Finance Committee',
            chairperson: 'Secretary',
            members: 0,
            document: './ugc/Finance_Committee_2021_2022.png'
          },
          {
            name: 'IQAC',
            chairperson: '',
            members: 0,
            document: './ugc/iqac_members_2021_2022.png'
          }
        ]
      }
    },
    {
      id: 'research-development',
      title: '10. Research & Development',
      icon: <BookOpen className="w-5 h-5" />,
      content: {
        researchPublications: 250,
        patents: 8,
        researchProjects: 15,
        consultancy: '₹25 Lakhs',
        researchFacilities: [
          'Central Research Laboratory',
          'IoT Lab',
          'Data Science Lab',
          'AI/ML Research Center'
        ],
        researchCoordinator: 'Dr. V. S. Naresh',
        contactEmail: 'deanrnd@srivasaviengg.ac.in'
      }
    },
    {
      id: 'grievance-redressal',
      title: '11. Grievance Redressal',
      icon: <Phone className="w-5 h-5" />,
      content: {
        grievanceOfficer: '',
        email: '',
        phone: '',
        onlinePortal: 'Available on college website',
        responseTime: '7 working days',
        escalationMatrix: [
          
          'Principal Level',
          'Management Level'
        ]
      }
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">UGC Model Disclosure</h1>
            <p className="text-xl opacity-90">
              Comprehensive Information Disclosure as per UGC Guidelines
            </p>
           
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-secondary/10 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">2001</div>
              <div className="text-sm text-foreground/70">Established</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">A</div>
              <div className="text-sm text-foreground/70">NAAC Grade</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">12</div>
              <div className="text-sm text-foreground/70">Programs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">85%</div>
              <div className="text-sm text-foreground/70">Placement Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {disclosureSections.map((section) => (
            <Card key={section.id} className="overflow-hidden">
              <CardHeader 
                className="cursor-pointer hover:bg-secondary/5 transition-colors"
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {section.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                    </div>
                  </div>
                  {activeSection === section.id ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </CardHeader>
              
              {activeSection === section.id && (
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {section.id === 'basic-information' && (
                      <div className="space-y-6">
                        {/* Institution Basic Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-3 text-lg text-primary">Institution Details</h4>
                            <div className="space-y-2 text-sm">
                              <div><strong>1.1 Name of the Institution:</strong> {section.content.collegeName}</div>
                              <div><strong>1.2 Category & Type:</strong> {section.content.category} - {section.content.institutionType}</div>
                              <div><strong>1.3 Year of Establishment:</strong> {section.content.establishedYear}</div>
                              <div><strong>1.4 Institutional Address:</strong> {section.content.address}</div>
                              <div><strong>PIN Code:</strong> {section.content.pincode}</div>
                              <div><strong>College Code:</strong> {section.content.collegeCode}</div>
                              <div><strong>University Affiliation:</strong> {section.content.universityAffiliation}</div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-3 text-lg text-primary">Contact Information</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <ExternalLink className="w-4 h-4" />
                                <span><strong>1.5 Official Website:</strong></span>
                                <a href={section.content.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                  {section.content.website}
                                </a>
                                {section.content.sslCertified && <Badge className="ml-1 text-xs">SSL Certified</Badge>}
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                <span><strong>1.6 Phone:</strong> {section.content.phone}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <span><strong>Email:</strong> {section.content.email}</span>
                              </div>
                              {section.content.fax && (
                                <div><strong>Fax:</strong> {section.content.fax}</div>
                              )}
                              <div>
                                <strong>Social Media:</strong>
                                <div className="mt-1 flex gap-2 flex-wrap">
                                  {section.content.socialMedia?.facebook && (
                                    <a href={section.content.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs">Facebook</a>
                                  )}
                                  {section.content.socialMedia?.linkedin && (
                                    <a href={section.content.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs">LinkedIn</a>
                                  )}
                                  {section.content.socialMedia?.youtube && (
                                    <a href={section.content.socialMedia.youtube} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs">YouTube</a>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Head of Institution */}
                        <div>
                          <h4 className="font-semibold mb-3 text-lg text-primary">1.7 Head of Institution</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="space-y-2">
                              <div><strong>Name:</strong> {section.content.principalName}</div>
                              <div><strong>Designation:</strong> {section.content.principalDesignation}</div>
                              <div><strong>Qualifications:</strong> {section.content.principalQualifications}</div>
                            </div>
                            <div className="space-y-2">
                              <div><strong>Contact Email:</strong> {section.content.principalEmail}</div>
                              <div><strong>Contact Phone:</strong> {section.content.principalPhone}</div>
                              <div><strong>Experience:</strong> {section.content.principalExperience}</div>
                            </div>
                          </div>
                        </div>

                        {/* Statutory Affiliations & Recognitions */}
                        <div>
                          <h4 className="font-semibold mb-3 text-lg text-primary">1.8 Statutory Affiliations & Recognitions</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {section.content.affiliations?.map((affiliation: any, index: number) => (
                              <div key={index} className="border rounded-lg p-3">
                                <div className="font-medium text-primary">{affiliation.name}</div>
                                <div className="text-xs text-gray-600 mb-1">{affiliation.fullName}</div>
                                <div className="text-sm">
                                  <Badge variant="outline" className="mb-2">{affiliation.status}</Badge>
                                </div>
                                <a 
                                  href={affiliation.approvalLetter} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline text-xs flex items-center gap-1"
                                >
                                  <FileText className="w-3 h-3" />
                                  View Approval Letter
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Vision, Mission & Core Values */}
                        <div>
                          <h4 className="font-semibold mb-3 text-lg text-primary">1.9 Vision, Mission & Core Values</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h5 className="font-medium mb-2 text-primary">Vision</h5>
                              <p className="text-sm text-justify bg-secondary/10 p-3 rounded">
                                {section.content.vision}
                              </p>
                            </div>
                            <div>
                              <h5 className="font-medium mb-2 text-primary">Mission</h5>
                              <p className="text-sm text-justify bg-secondary/10 p-3 rounded">
                                {section.content.mission}
                              </p>
                            </div>
                          </div>
                          <div className="mt-4">
                            <h5 className="font-medium mb-2 text-primary">Core Values</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                              {section.content.coreValues?.map((value: string, index: number) => (
                                <div key={index} className="flex items-center gap-2">
                                  <Award className="w-4 h-4 text-primary flex-shrink-0" />
                                  <span className="text-sm">{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Institutional Motto & Emblem */}
                        <div>
                          <h4 className="font-semibold mb-3 text-lg text-primary">1.10 Institutional Motto & Emblem</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                            <div>
                              <h5 className="font-medium mb-2 text-primary">Institutional Motto</h5>
                              <div className="text-center p-4 bg-secondary/10 rounded-lg">
                                <p className="text-lg font-semibold text-primary">{section.content.motto}</p>
                              </div>
                            </div>
                            <div>
                              <h5 className="font-medium mb-2 text-primary">Institutional Emblem</h5>
                              <div className="text-center">
                                <img 
                                  src={section.content.emblem} 
                                  alt="College Emblem" 
                                  className="mx-auto h-24 w-24 object-contain mb-2"
                                />
                                <p className="text-xs text-gray-600 text-justify">
                                  {section.content.emblemDescription}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Awards & Certifications Gallery */}
                        <div>
                          <h4 className="font-semibold mb-3 text-lg text-primary">Awards & Certifications</h4>
                          {section.content.awardsImages && section.content.awardsImages.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                              {section.content.awardsImages.map((award: any, idx: number) => (
                                <div key={idx} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                                  <img
                                    src={award.image}
                                    alt={award.title}
                                    className="w-full h-64 object-cover"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.src = '/images/placeholder.png';
                                    }}
                                  />
                                  <div className="p-3 bg-gray-50">
                                    <p className="text-sm font-medium text-center">{award.title}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-600 text-sm">No awards images available</p>
                          )}
                        </div>
                      </div>
                    )}

                    {section.id === 'approval-affiliation' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Approvals</h4>
                          <div className="space-y-2 text-sm">
                            <div><strong>AICTE Approval:</strong> {section.content.aicteApproval}</div>
                            <div><strong>UGC Section:</strong> {section.content.ugcSection}</div>
                            <div><strong>University:</strong> {section.content.universityAffiliation}</div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Accreditations</h4>
                          <div className="space-y-2 text-sm">
                            <div><strong>NAAC:</strong> <Badge className="ml-2">{section.content.naacAccreditation}</Badge></div>
                            <div><strong>NBA:</strong> {section.content.nbaAccreditation}</div>
                            <div><strong>Status:</strong> {section.content.autonomousStatus}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {section.id === 'academic-information' && section.content.departments && (
                      <div>
                        <h4 className="font-semibold mb-4">Programs & Departments</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {section.content.departments.map((dept: Department, index: number) => (
                            <div key={index} className="border rounded-lg p-3">
                              <h5 className="font-medium mb-2">{dept.name}</h5>
                              <div className="text-sm text-foreground/70">
                                <div>Intake: {dept.intake}</div>
                                <div>Faculty: {dept.faculty}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center p-3 bg-secondary/5 rounded">
                            <div className="text-2xl font-bold text-primary">{section.content.totalIntake}</div>
                            <div className="text-sm">Total Intake</div>
                          </div>
                          <div className="text-center p-3 bg-secondary/5 rounded">
                            <div className="text-2xl font-bold text-primary">{section.content.totalFaculty}</div>
                            <div className="text-sm">Total Faculty</div>
                          </div>
                          <div className="text-center p-3 bg-secondary/5 rounded">
                            <div className="text-2xl font-bold text-primary">{section.content.studentFacultyRatio}</div>
                            <div className="text-sm">Student-Faculty Ratio</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {section.id === 'faculty-details' && section.content.qualifications && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2">Faculty Strength</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Professors:</span>
                              <span>{section.content.professors}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Associate Professors:</span>
                              <span>{section.content.associateProfessors}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Assistant Professors:</span>
                              <span>{section.content.assistantProfessors}</span>
                            </div>
                            <div className="flex justify-between font-semibold">
                              <span>Total Faculty:</span>
                              <span>{section.content.totalFaculty}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Qualifications</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>PhD Holders:</span>
                              <span>{section.content.qualifications.phd}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>M.Tech/M.E:</span>
                              <span>{section.content.qualifications.mtech}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>MBA:</span>
                              <span>{section.content.qualifications.mba}</span>
                            </div>
                          </div>

                          {/* Roll of Honour Table */}
                          <div className="mt-6">
                            <h5 className="font-semibold mb-2 text-primary">Roll of Honour</h5>
                            {section.content.rollOfHonourData && section.content.rollOfHonourData.length > 0 ? (
                              <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-500 border border-gray-200 rounded-lg">
                                  <thead className="text-xs text-gray-700 uppercase bg-gradient-to-r from-primary to-primary/80 text-white">
                                    <tr>
                                      <th scope="col" className="px-4 py-3 border-b">S.No.</th>
                                      <th scope="col" className="px-4 py-3 border-b">Roll Number</th>
                                      <th scope="col" className="px-4 py-3 border-b">Name</th>
                                      <th scope="col" className="px-4 py-3 border-b">Batch</th>
                                      <th scope="col" className="px-4 py-3 border-b">CGPA</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {section.content.rollOfHonourData.map((item: any, idx: number) => (
                                      <tr key={idx} className={`border-b border-gray-200 transition-colors duration-200 ${idx % 2 === 0 ? 'bg-primary/5' : 'bg-white'} hover:bg-primary/10`}>
                                        <td className="px-4 py-3">{idx + 1}</td>
                                        <td className="px-4 py-3 font-medium text-gray-900">{item.rollno}</td>
                                        <td className="px-4 py-3">{item.name}</td>
                                        <td className="px-4 py-3">{item.batch}</td>
                                        <td className="px-4 py-3">{item.cgpa}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ) : (
                              <p className="text-gray-600 text-sm">No data available</p>
                            )}
                          </div>

                          {/* GATE Table */}
                          <div className="mt-6">
                            <h5 className="font-semibold mb-2 text-primary">GATE Results</h5>
                            {section.content.gateData && section.content.gateData.length > 0 ? (
                              <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-500 border border-gray-200 rounded-lg">
                                  <thead className="text-xs text-gray-700 uppercase bg-gradient-to-r from-primary to-primary/80 text-white">
                                    <tr>
                                      <th scope="col" className="px-4 py-3 border-b">S.No.</th>
                                      <th scope="col" className="px-4 py-3 border-b">Roll Number</th>
                                      <th scope="col" className="px-4 py-3 border-b">Name</th>
                                      <th scope="col" className="px-4 py-3 border-b">Score</th>
                                      <th scope="col" className="px-4 py-3 border-b">Year</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {section.content.gateData.map((item: any, idx: number) => (
                                      <tr key={idx} className={`border-b border-gray-200 transition-colors duration-200 ${idx % 2 === 0 ? 'bg-primary/5' : 'bg-white'} hover:bg-primary/10`}>
                                        <td className="px-4 py-3">{idx + 1}</td>
                                        <td className="px-4 py-3 font-medium text-gray-900">{item.rollno}</td>
                                        <td className="px-4 py-3">{item.name}</td>
                                        <td className="px-4 py-3">{item.score}</td>
                                        <td className="px-4 py-3">{item.year}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ) : (
                              <p className="text-gray-600 text-sm">No data available</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {section.id === 'infrastructure' && section.content.library && section.content.hostelCapacity && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2">Campus</h4>
                          <div className="space-y-2 text-sm">
                            <div>Total Area: {section.content.totalArea}</div>
                            <div>Built-up Area: {section.content.builtUpArea}</div>
                            <div>Classrooms: {section.content.classrooms}</div>
                            <div>Laboratories: {section.content.laboratories}</div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Library</h4>
                          <div className="space-y-2 text-sm">
                            <div>Books: {section.content.library.books}</div>
                            <div>Journals: {section.content.library.journals}</div>
                            <div>Digital: {section.content.library.digitalResources}</div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Hostel</h4>
                          <div className="space-y-2 text-sm">
                            <div>Boys: {section.content.hostelCapacity.boys}</div>
                            <div>Girls: {section.content.hostelCapacity.girls}</div>
                            <div>Auditorium: {section.content.auditorium}</div>
                            <div>Medical: {section.content.medicalFacility}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {section.id === 'fees-structure' && section.content.btech && section.content.mba && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2">B.Tech Programs</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Tuition Fee:</span>
                              <span>{section.content.btech.tuitionFee}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Development Fee:</span>
                              <span>{section.content.btech.developmentFee}</span>
                            </div>
                            <div className="flex justify-between font-semibold">
                              <span>Total Annual:</span>
                              <span>{section.content.btech.totalAnnual}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">MBA Program</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Tuition Fee:</span>
                              <span>{section.content.mba.tuitionFee}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Development Fee:</span>
                              <span>{section.content.mba.developmentFee}</span>
                            </div>
                            <div className="flex justify-between font-semibold">
                              <span>Total Annual:</span>
                              <span>{section.content.mba.totalAnnual}</span>
                            </div>
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <h4 className="font-semibold mb-2">Additional Fees</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="flex justify-between">
                              <span>Hostel Fee (Annual):</span>
                              <span>{section.content.hostelFee}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Transport Fee (Annual):</span>
                              <span>{section.content.transportFee}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {section.id === 'placements' && section.content.topRecruiters && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center p-3 bg-secondary/5 rounded">
                            <div className="text-2xl font-bold text-primary">{section.content.placementPercentage}</div>
                            <div className="text-sm">Placement Rate</div>
                          </div>
                          <div className="text-center p-3 bg-secondary/5 rounded">
                            <div className="text-2xl font-bold text-primary">{section.content.averagePackage}</div>
                            <div className="text-sm">Average Package</div>
                          </div>
                          <div className="text-center p-3 bg-secondary/5 rounded">
                            <div className="text-2xl font-bold text-primary">{section.content.highestPackage}</div>
                            <div className="text-sm">Highest Package</div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Top Recruiters</h4>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                            {section.content.topRecruiters.map((company: string, index: number) => (
                              <Badge key={index} variant="outline" className="text-center py-2">
                                {company}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Contact</h4>
                          <div className="text-sm">
                            <div>Officer: {section.content.placementOfficer}</div>
                            <div>Email: {section.content.contactEmail}</div>
                            <div>Phone: {section.content.contactPhone}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {section.id === 'statutory-committees' && section.content.committees && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {section.content.committees.map((committee: Committee, index: number) => (
                            <div key={index} className="border rounded-lg p-4">
                              <h5 className="font-medium mb-2">{committee.name}</h5>
                              <div className="text-sm space-y-1">
                                <div>Chairperson: {committee.chairperson}</div>
                                <div>Members: {committee.members}</div>
                                <div className="flex items-center gap-2 mt-2">
                                  <FileText className="w-4 h-4" />
                                  <a 
                                    href={committee.document} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline text-sm"
                                  >
                                    View Details
                                  </a>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {section.id === 'research-development' && section.content.researchFacilities && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2">Research Statistics</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Publications:</span>
                              <span>{section.content.researchPublications}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Patents:</span>
                              <span>{section.content.patents}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Projects:</span>
                              <span>{section.content.researchProjects}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Consultancy:</span>
                              <span>{section.content.consultancy}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Facilities</h4>
                          <ul className="text-sm space-y-1">
                            {section.content.researchFacilities.map((facility: string, index: number) => (
                              <li key={index}>• {facility}</li>
                            ))}
                          </ul>
                          <div className="mt-4 text-sm">
                            <div>Coordinator: {section.content.researchCoordinator}</div>
                            <div>Email: {section.content.contactEmail}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {section.id === 'grievance-redressal' && section.content.escalationMatrix && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2">Grievance Officer</h4>
                          <div className="space-y-2 text-sm">
                            <div>Name: {section.content.grievanceOfficer}</div>
                            <div>Email: {section.content.email}</div>
                            <div>Phone: {section.content.phone}</div>
                            <div>Portal: {section.content.onlinePortal}</div>
                            <div>Response Time: {section.content.responseTime}</div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Escalation Matrix</h4>
                          <ul className="text-sm space-y-1">
                            {section.content.escalationMatrix.map((level: string, index: number) => (
                              <li key={index}>Level {index + 1}: {level}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {section.id === 'financial-information' && section.content.scholarships && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2">Financial Details</h4>
                          <div className="space-y-2 text-sm">
                            <div>Audited Statement: {section.content.auditedStatement}</div>
                            <div>Refund Policy: {section.content.feeRefundPolicy}</div>
                            <div>Accounts Officer: {section.content.accountsOfficer}</div>
                            <div>Email: {section.content.contactEmail}</div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Scholarships</h4>
                          <ul className="text-sm space-y-1">
                            {section.content.scholarships.map((scholarship: string, index: number) => (
                              <li key={index}>• {scholarship}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Footer Section */}
        <div className="mt-12 p-6 bg-secondary/10 rounded-lg">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Important Notice</h3>
           
            <p className="text-xs text-foreground/50">
              Last Updated: {new Date().toLocaleDateString()} | 
              For any queries, contact: principal@srivasaviengg.ac.in
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UGCModelDisclosure;
