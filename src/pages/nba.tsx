import React, { useState } from 'react';
import { FileText, ExternalLink, ChevronRight, Award, BookOpen, Users, TrendingUp, Building2, CheckCircle2 } from 'lucide-react';
import { DepartmentSidebar } from '@/components/DepartmentSidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NBA: React.FC = () => {
  const [activeTab, setActiveTab] = useState('nba');

  // Sidebar navigation items with proper format for DepartmentSidebar
  const sidebarItems = [
    { id: 'nba', label: 'NBA Overview', icon: <Award className="w-4 h-4" /> },
    { id: 'about-nba', label: 'About NBA', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'accreditation-status', label: 'Accreditation Status', icon: <CheckCircle2 className="w-4 h-4" /> },
    { id: 'programmes', label: 'Accredited Programmes', icon: <Building2 className="w-4 h-4" /> },
    { id: 'documentation', label: 'Documentation', icon: <FileText className="w-4 h-4" /> },
  ];

  // NBA Information data
  const nbaInfo = {
    title: 'National Board of Accreditation',
    description: 'The National Board of Accreditation (NBA) is an autonomous body under the All India Council for Technical Education (AICTE) that accredits engineering and management programmes offered by technical institutions in India.',
    vision: 'To promote and assure quality in technical education.',
    mission: 'To recognize and enhance the standard of engineering and management education in India through accreditation.'
  };

  // Accreditation status data
  const accreditationStatus = [
    { programme: 'Civil Engineering (B.Tech)', status: 'Accredited', validFrom: '2021', validTill: '2024' },
    { programme: 'Electrical & Electronics Engineering (B.Tech)', status: 'Accredited', validFrom: '2021', validTill: '2024' },
    { programme: 'Mechanical Engineering (B.Tech)', status: 'Accredited', validFrom: '2021', validTill: '2024' },
    { programme: 'Electronics & Communication Engineering (B.Tech)', status: 'Accredited', validFrom: '2021', validTill: '2024' },
    { programme: 'Computer Science & Engineering (B.Tech)', status: 'Accredited', validFrom: '2021', validTill: '2024' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'nba':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-14">
              <h2 className="text-3xl font-bold text-primary mb-6 text-center">Welcome to NBA</h2>
              
              <div className="space-y-6">
                <div className="prose max-w-none">
                  <p className="text-foreground/80 leading-relaxed text-justify">
                    The National Board of Accreditation (NBA) is an autonomous body under the All India Council for Technical 
                    Education (AICTE) that accredits engineering and management programmes offered by technical institutions in India. 
                    NBA accreditation is a process of quality assurance which assesses the ability of an institution to achieve its 
                    stated objectives and to serve the public interest.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-primary mb-4">Vision</h3>
                    <p className="text-foreground/80 leading-relaxed text-justify">
                      To promote and assure quality in technical education through outcome-based accreditation.
                    </p>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-primary mb-4">Mission</h3>
                    <p className="text-foreground/80 leading-relaxed text-justify">
                      To recognize and enhance the standard of engineering and management education in India through comprehensive 
                      accreditation process.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
                  <h3 className="text-2xl font-bold text-primary mb-6">NBA Accreditation Benefits</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold mt-1">•</span>
                      <span className="text-foreground/80">Recognition of quality of engineering education</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold mt-1">•</span>
                      <span className="text-foreground/80">International recognition and mobility</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold mt-1">•</span>
                      <span className="text-foreground/80">Continuous improvement in academic standards</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold mt-1">•</span>
                      <span className="text-foreground/80">Enhanced credibility with employers and stakeholders</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold mt-1">•</span>
                      <span className="text-foreground/80">Assurance of outcome-based education</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'about-nba':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-primary text-center mb-6">About NBA</h1>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">Overview</h2>
              <div className="prose max-w-none">
                <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                  The National Board of Accreditation (NBA), an autonomous body under AICTE, was established to implement 
                  accreditation of technical programmes in engineering institutions in India. NBA has been instrumental in 
                  promoting quality assurance in technical education through outcome-based accreditation.
                </p>

                <h3 className="text-xl font-semibold text-primary mb-4">Key Functions of NBA:</h3>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 mb-4">
                  <li>Conduct outcome-based accreditation of engineering and management programmes</li>
                  <li>Assess the ability of institutions to achieve their stated objectives</li>
                  <li>Promote continuous quality improvement in technical education</li>
                  <li>Ensure that programmes meet international standards</li>
                  <li>Facilitate international recognition and mobility of graduates</li>
                </ul>

                <h3 className="text-xl font-semibold text-primary mb-4">Accreditation Process:</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-foreground/80"><strong>1. Self-Assessment:</strong> The institution completes a comprehensive self-assessment report</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-foreground/80"><strong>2. Desk Review:</strong> NBA experts review the self-assessment report and documentary evidence</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <p className="text-foreground/80"><strong>3. Peer Team Visit:</strong> Accreditation team visits the institution for on-site assessment</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-foreground/80"><strong>4. Report and Decision:</strong> NBA reviews the peer team report and makes accreditation decision</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'accreditation-status':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-primary text-center mb-6">Accreditation Status</h1>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">Currently Accredited Programmes</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="px-6 py-4 text-left font-semibold">Programme</th>
                      <th className="px-6 py-4 text-center font-semibold">Accreditation Status</th>
                      <th className="px-6 py-4 text-center font-semibold">Valid From</th>
                      <th className="px-6 py-4 text-center font-semibold">Valid Till</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accreditationStatus.map((item, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                        <td className="px-6 py-4 border-b border-gray-200">{item.programme}</td>
                        <td className="px-6 py-4 border-b border-gray-200 text-center">
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-center">{item.validFrom}</td>
                        <td className="px-6 py-4 border-b border-gray-200 text-center">{item.validTill}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <p className="text-foreground/80 leading-relaxed">
                  <strong>Note:</strong> All programmes listed above are accredited by the National Board of Accreditation (NBA). 
                  The institution is committed to maintaining these accreditations through continuous quality improvement and regular updates.
                </p>
              </div>
            </div>
          </div>
        );

      case 'programmes':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-primary text-center mb-6">Accredited Programmes</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {accreditationStatus.map((programme, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <h3 className="text-lg font-bold text-primary mb-4">{programme.programme}</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-foreground/60">Status</p>
                      <p className="text-foreground/80 font-medium">{programme.status}</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/60">Valid Period</p>
                      <p className="text-foreground/80 font-medium">{programme.validFrom} - {programme.validTill}</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <a
                        href="#"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View Certificate <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'documentation':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-primary text-center mb-6">Documentation</h1>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">NBA Accreditation Documents</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-4">Accreditation Certificates</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Civil Engineering Certificate - </span>
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Electrical Engineering Certificate - </span>
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Mechanical Engineering Certificate - </span>
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Electronics Engineering Certificate - </span>
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Computer Science Engineering Certificate - </span>
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-xl font-semibold text-primary mb-4">Supporting Documents</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">NBA Handbook and Guidelines - </span>
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Self-Assessment Reports - </span>
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Peer Review Team Reports - </span>
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-foreground/80">Accreditation Decision Letters - </span>
                      <a
                        href="#"
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

      default:
        return (
          <div className="text-center py-12">
            <p className="text-foreground/60">Content for this section will be available soon.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      
      {/* HEADER – always on top */}
      <div className="sticky top-0 z-50">
        <Header />
      </div>

      {/* MAIN CONTENT – must stay BELOW header */}
      <main className="relative z-0 flex-1 overflow-visible">
        <DepartmentSidebar
          items={sidebarItems}
          activeItem={activeTab}
          onItemClick={setActiveTab}
          title="NBA Accreditation"
        >
          <div className="container mx-auto px-4 pb-12">
            {renderContent()}
          </div>
        </DepartmentSidebar>
      </main>

      <Footer />
    </div>
  );
};

export default NBA;
