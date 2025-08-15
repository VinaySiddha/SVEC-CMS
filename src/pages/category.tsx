import React, { useState } from 'react';
import { FileText, ExternalLink, Phone, Mail, Printer } from 'lucide-react';

const CategoryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('intake-details');

  const mtechData = [
    { course: 'VLSI & ES', department: 'ECE', duration: '2 Years', intake: '18', code: 'VSVT' },
    { course: 'Power System Control & Automation', department: 'EEE', duration: '2 Years', intake: '18', code: 'VSVT' },
    { course: 'Structural Engg', department: 'CE', duration: '2 Years', intake: '18', code: 'VSVT' },
    { course: 'Computer Science', department: 'CSE', duration: '2 Years', intake: '12', code: 'VSVT' },
    { course: 'Machine Design', department: 'ME', duration: '2 Years', intake: '18', code: 'VSVT' }
  ];

  const btechData = [
    { course: 'Electronics & Communication Engineering', duration: '4 Years', intake: '180', code: 'VSVT' },
    { course: 'Electronics & Communication Technology', duration: '4 Years', intake: '60', code: 'VSVT' },
    { course: 'Computer Science & Engineering', duration: '4 Years', intake: '240', code: 'VSVT' },
    { course: 'Computer Science & Technology', duration: '4 Years', intake: '60', code: 'VSVT' },
    { course: 'Computer Science & Engineering(AI)', duration: '4 Years', intake: '120', code: 'VSVT' },
    { course: 'Computer Science & Engineering(AI & ML)', duration: '4 Years', intake: '120', code: 'VSVT' },
    { course: 'Mechanical Engineering', duration: '4 Years', intake: '120', code: 'VSVT' },
    { course: 'Electrical & Electronics Engineering', duration: '4 Years', intake: '120', code: 'VSVT' },
    { course: 'Civil Engineering', duration: '4 Years', intake: '60', code: 'VSVT' }
  ];

  const mbaData = [
    { course: 'Master of Business Administration', duration: '2 Years', intake: '120', code: 'VSVT' }
  ];

  const diplomaData = [
    { course: 'DECE', duration: '3 Years', intake: '60', code: 'VSVT' },
    { course: 'DME', duration: '3 Years', intake: '120', code: 'VSVT' },
    { course: 'DEEE', duration: '3 Years', intake: '120', code: 'VSVT' },
    { course: 'DCIVIL', duration: '3 Years', intake: '120', code: 'VSVT' }
  ];

  const candidateListLinks = [
    { name: 'List of Candidates Applied (All Branches)', href: 'category-B/List of Applied Candidates as on 22-10-2022.xls' },
    { name: 'List of Candidates Applied for CAI', href: 'category-B/Merit List as on 22-10-2022 (CAI).pdf' },
    { name: 'List of Candidates Applied for AIM', href: 'category-B/Merit List as on 22-10-2022 (AIM).pdf' },
    { name: 'List of Candidates Applied for CSE', href: 'category-B/Merit List as on 22-10-2022 (CSE).pdf' },
    { name: 'List of Candidates Applied for CST', href: 'category-B/Merit List as on 22-10-2022 (CST).pdf' },
    { name: 'List of Candidates Applied for ECE', href: 'category-B/Merit List as on 22-10-2022 (ECE).pdf' },
    { name: 'List of Candidates Applied for ECT', href: 'category-B/Merit List as on 22-10-2022 (ECT).pdf' },
    { name: 'List of Candidates Applied for EEE', href: 'category-B/Merit List as on 22-10-2022 (EEE).pdf' },
    { name: 'List of Candidates Applied for CIV', href: 'category-B/Merit List as on 22-10-2022 (CIV).pdf' }
  ];

  const renderTable = (data: any[], headers: string[], title: string) => (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-primary text-center mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-primary text-white">
              {headers.map((header, index) => (
                <th key={index} className="px-6 py-4 text-left font-semibold">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                {Object.values(row).map((value, cellIndex) => (
                  <td key={cellIndex} className="px-6 py-4 border-b border-gray-200">{value as string}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderIntakeDetails = () => (
    <div className="space-y-8">
      {renderTable(mtechData, ['Course', 'Department', 'Duration', 'Intake', 'PGCET Code'], 'M.Tech')}
      {renderTable(btechData, ['Course', 'Duration', 'Intake', 'EAMCET Code'], 'B.Tech')}
      {renderTable(mbaData, ['Course', 'Duration', 'Intake', 'ICET Code'], 'MBA')}
      {renderTable(diplomaData, ['Course', 'Duration', 'Intake', 'POLYCET Code'], 'Diploma')}

      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <h3 className="text-xl font-bold text-primary mb-4">For more information on admissions please contact</h3>
        <div className="space-y-2 text-foreground/80">
          <p className="font-semibold">Ch. Narayana Rao, Incharge Admissions</p>
          <div className="flex items-center justify-center gap-2">
            <Phone className="w-4 h-4 text-primary" />
            <span>Contact No.: 08818-284355 (Extn. 305)</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Phone className="w-4 h-4 text-primary" />
            <span>Mobile: 9440072234</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Printer className="w-4 h-4 text-primary" />
            <span>Fax No: 08818-284322</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Mail className="w-4 h-4 text-primary" />
            <span>Email: </span>
            <a
              href="mailto:hnarencherukuri@gmail.com"
              className="text-primary hover:text-primary/80 font-medium"
            >
              hnarencherukuri@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-primary text-center mb-8">B-Category</h1>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {[
                { id: 'intake-details', label: 'Intake Details' },
                { id: 'admission-procedure', label: 'Admission Procedure' },
                { id: 'fee-structure', label: 'Fee Structure' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'intake-details' && renderIntakeDetails()}
            {activeTab === 'admission-procedure' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-primary text-center mb-6">Admission Process</h2>

                {/* B.Tech Eligibility */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-primary mb-4">B.Tech - Eligibility Requirements</h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold text-primary mb-2">
                        Admissions under Convenor's Quota (70% of intake in each branch):
                      </h4>
                      <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                        A Candidate for admission to the four-year degree course in Engineering must have passed the
                        Intermediate examination of the Board of Intermediate Education, Government of Andhra Pradesh with
                        Mathematics, Physics and Chemistry as optional subjects, or any other examination recognized by the
                        University as equivalent thereto.
                      </p>
                      <p className="text-foreground/80 leading-relaxed text-justify mb-4">
                        All the eligible applicants for admission into First Year shall have to qualify in the EAMCET
                        Examination conducted by the Govt. of AP. The candidates will be admitted strictly in accordance
                        with the merit secured at the Entrance Examination keeping in view the rules in force regarding
                        the reservations of seats of various categories of candidates.
                      </p>
                      <p className="text-foreground/80 leading-relaxed text-justify">
                        The candidates should satisfy local/non-local status requirement as laid down in the AP Educational
                        institutions (Regulation of Admissions) Order 1974 as amended from time to time.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-primary mb-2">
                        Admissions under Management Quota (30% of intake in each branch):
                      </h4>
                      <p className="text-foreground/80 leading-relaxed text-justify">
                        The seats shall be filled either on the basis of rank obtained in EAMCET or of securing not less
                        than 50% in aggregate or in group subjects (Maths, Physics and Chemistry) in the 10+2 qualifying
                        examination.
                      </p>
                    </div>
                  </div>
                </div>

                {/* M.Tech Eligibility */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-primary mb-4">M.Tech - Eligibility Requirements</h3>

                  <div className="space-y-4">
                    <ul className="list-disc list-inside space-y-2 text-foreground/80">
                      <li>A bachelor's degree in Engg/Technology of any recognized university in the concerned discipline.</li>
                      <li>AMIE/AMIETE or similar qualifications recognized by UPSC as equivalent to B.E./B.Tech.</li>
                      <li>Valid GATE Score obtained in the GATE Examination.</li>
                      <li>Valid PGECET Rank obtained in the Entrance Examination.</li>
                    </ul>

                    <p className="text-foreground/80 leading-relaxed text-justify mt-4">
                      Apart from requirements of qualifications as stated in the above, the admissions of sponsored
                      candidates shall be taken.
                    </p>

                    <ul className="list-disc list-inside space-y-2 text-foreground/80 mt-4">
                      <li>The number of Sponsored candidates shall not be more than two in each specialization and not more than five in each department.</li>
                      <li>His/Her application shall be duly recommended by the sponsoring agency for admission to the course and forwarded to the JNTUK. These seats are considered as supernumerary.</li>
                      <li>He/She must be permanent employee with the sponsoring agency for at least 2 years, after obtaining the qualifying degree.</li>
                      <li>The sponsoring agency must be a Government establishment or a public-sector undertaking, or a reputed private undertaking.</li>
                      <li>The sponsoring agency shall certify that the candidates will be granted leave for pursuing the M.Tech. Full-Time course.</li>
                      <li>The candidates should satisfy local/non-local status requirement as laid down in the AP Educational institutions (Regulation of Admissions) Order 1974 as amended from time to time.</li>
                    </ul>

                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-primary mb-2">Admission Procedure (under B-Category)</h4>
                      <p className="text-foreground/80 leading-relaxed text-justify">
                        Every year an advertisement is published in the leading newspaper regarding the issue of applications
                        for admission to B.Tech, M.Tech, MCA and MBA courses.
                      </p>
                    </div>
                  </div>
                </div>

                {/* MBA Eligibility */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-primary mb-4">MBA - Eligibility Requirements</h3>

                  <p className="text-foreground/80 mb-4">
                    A candidate seeking admission Two year MBA programme must satisfy the following criteria:
                  </p>

                  <ul className="list-disc list-inside space-y-2 text-foreground/80 mb-4">
                    <li>A pass in bachelor's degree in any field with 45% marks in aggregate.</li>
                    <li>Must have qualified in Integrated Common Entrance Test (ICET) conducted by AP State Council of Higher Education, Govt of AP.</li>
                    <li>The candidates should satisfy local/non-local status requirement as laid down in the AP Educational institutions (Regulation of Admissions) Order 1974 as amended from time to time.</li>
                  </ul>

                  <ul className="list-disc list-inside space-y-2 text-foreground/80">
                    <li>The candidates will be admitted on the basis of rank secured at the ICET.</li>
                    <li>The Convener admits 70% of the intake to the MBA programme based on the ICET rank.</li>
                    <li>The Management admits the remaining 30% under management and NRI quota.</li>
                  </ul>
                </div>
              </div>
            )}
            {activeTab === 'fee-structure' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-primary text-center mb-6">Category 'B' Seats Admission Details</h2>

                {/* Notification */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                  <p className="text-foreground/80 mb-4">
                    Category 'B' Admissions 2022-23 Notification published in EENADU
                  </p>
                  <a
                    href="category-B/Cat 'B' Admns 2022 Engg. Notification.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
                  >
                    <FileText className="w-4 h-4" />
                    For More Details
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Candidate Lists */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-primary mb-6 text-center">Merit Lists and Application Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {candidateListLinks.map((link, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-start gap-2">
                          <FileText className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <div className="flex-1">
                            <span className="text-foreground/80 text-sm">{link.name}</span>
                            <div className="mt-2">
                              <a
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-medium text-sm"
                              >
                                For details
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
