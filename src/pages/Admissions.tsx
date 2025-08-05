import React from 'react';
import { Calendar, FileText, CheckCircle, Users, Award, BookOpen, CreditCard, Clock } from 'lucide-react';

const Admissions: React.FC = () => {
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

  const programs = [
    {
      name: 'Computer Science & Engineering',
      duration: '4 Years',
      intake: '120',
      fee: '₹75,000/year',
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
    },
    {
      name: 'Civil Engineering',
      duration: '4 Years',
      intake: '60',
      fee: '₹65,000/year',
      eligibility: 'PCM with 45% marks'
    },
    {
      name: 'Electrical & Electronics',
      duration: '4 Years',
      intake: '60',
      fee: '₹70,000/year',
      eligibility: 'PCM with 45% marks'
    }
  ];

  const importantDates = [
    { event: 'Application Start Date', date: 'March 15, 2025', status: 'upcoming' },
    { event: 'Application Last Date', date: 'June 30, 2025', status: 'upcoming' },
    { event: 'Entrance Exam', date: 'May 15-30, 2025', status: 'upcoming' },
    { event: 'Results Declaration', date: 'June 15, 2025', status: 'upcoming' },
    { event: 'Counseling Starts', date: 'July 1, 2025', status: 'upcoming' },
    { event: 'Classes Begin', date: 'August 1, 2025', status: 'upcoming' }
  ];

  const documents = [
    'SSC/10th Class Certificate and Marks Memo',
    'Intermediate/12th Class Certificate and Marks Memo',
    'Transfer Certificate from the last attended institution',
    'Study Certificate (if applicable)',
    'Caste Certificate (for reserved category students)',
    'Income Certificate (for fee concession)',
    'Aadhar Card copy',
    'Passport size photographs (6 copies)',
    'Migration Certificate (for students from other states)',
    'Entrance exam scorecard (JEE Main/AP EAMCET)'
  ];

  const scholarships = [
    {
      name: 'Merit Scholarship',
      criteria: 'Top 10% students in entrance exam',
      benefit: 'Up to 50% fee waiver',
      icon: Award
    },
    {
      name: 'Need-based Scholarship',
      criteria: 'Family income below ₹2 lakhs',
      benefit: 'Up to 30% fee concession',
      icon: Users
    },
    {
      name: 'Sports Scholarship',
      criteria: 'State/National level sports achievements',
      benefit: 'Up to 25% fee waiver',
      icon: Award
    },
    {
      name: 'Girl Child Scholarship',
      criteria: 'Female students with good academic record',
      benefit: 'Up to 20% fee concession',
      icon: BookOpen
    }
  ];

  return (
    <div className="pt-44 bg-[#FFF8F0] text-[#222222]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#B22222] to-[#0097A7] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Admissions 2025</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Join our community of future engineers and innovators
          </p>
          <button className="bg-white text-[#B22222] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#f9e8e8] transition-all transform hover:scale-105">
            Apply Now
          </button>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Important Dates</h2>
            <p className="text-xl text-gray-600">Mark your calendar for admission milestones</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {importantDates.map((item, index) => (
                <div key={index} className="bg-[#FFF8F0] p-6 rounded-xl hover:shadow-lg transition-all">
                  <div className="flex items-center mb-3">
                    <Calendar className="w-6 h-6 text-[#B22222] mr-3" />
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === 'upcoming' ? 'bg-[#B22222] text-white' : 'bg-green-100 text-green-800'
                    }`}>
                      {item.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#B22222] mb-2">{item.event}</h3>
                  <p className="text-[#B22222] font-semibold">{item.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs Offered */}
      <section className="py-16 bg-[#FFF8F0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Programs Offered</h2>
            <p className="text-xl text-gray-600">Choose from our comprehensive engineering programs</p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
                <thead className="bg-[#003366] text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Program</th>
                    <th className="px-6 py-4 text-center">Duration</th>
                    <th className="px-6 py-4 text-center">Intake</th>
                    <th className="px-6 py-4 text-center">Annual Fee</th>
                    <th className="px-6 py-4 text-center">Eligibility</th>
                  </tr>
                </thead>
                <tbody>
                  {programs.map((program, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 font-semibold text-[#B22222]">{program.name}</td>
                      <td className="px-6 py-4 text-center">{program.duration}</td>
                      <td className="px-6 py-4 text-center font-semibold text-[#B22222]">{program.intake}</td>
                      <td className="px-6 py-4 text-center font-semibold text-[#B22222]">{program.fee}</td>
                      <td className="px-6 py-4 text-center text-sm">{program.eligibility}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Admission Process</h2>
            <p className="text-xl text-gray-600">Simple steps to secure your admission</p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {admissionProcess.map((process, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-16 h-16 bg-[#0097A7] text-white rounded-full flex items-center justify-center text-xl font-bold mr-6">
                    {process.step}
                  </div>
                  <div className="flex-1">
                    <div className="bg-[#FFF8F0] p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-[#B22222] mb-3">{process.title}</h3>
                      <p className="text-gray-600 mb-4">{process.description}</p>
                      <ul className="space-y-2">
                        {process.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-center text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                            <span className="text-gray-700">{req}</span>
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

      {/* Required Documents */}
      <section className="py-16 bg-[#FFF8F0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Required Documents</h2>
            <p className="text-xl text-gray-600">Prepare these documents for your application</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-start">
                    <FileText className="w-5 h-5 text-[#B22222] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{doc}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 bg-[#B22222] bg-opacity-20 rounded-lg">
                <p className="text-[#B22222] font-medium">
                  <strong>Note:</strong> All documents should be original for verification. 
                  Self-attested photocopies will be retained by the college.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scholarships */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Scholarships Available</h2>
            <p className="text-xl text-gray-600">Financial assistance for deserving students</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {scholarships.map((scholarship, index) => (
              <div key={index} className="bg-[#FFF8F0] p-6 rounded-xl hover:shadow-lg transition-all text-center">
                <scholarship.icon className="w-16 h-16 text-[#B22222] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#B22222] mb-3">{scholarship.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{scholarship.criteria}</p>
                <div className="bg-[#B22222] text-white px-4 py-2 rounded-full font-semibold text-sm">
                  {scholarship.benefit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="py-16 bg-[#FFF8F0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Fee Structure</h2>
            <p className="text-xl text-gray-600">Transparent and affordable fee structure</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-[#B22222] mb-6">Annual Fees (Per Year)</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="font-medium">Tuition Fee</span>
                      <span className="font-bold text-[#B22222]">₹50,000</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="font-medium">Development Fee</span>
                      <span className="font-bold text-[#B22222]">₹15,000</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="font-medium">Lab Fee</span>
                      <span className="font-bold text-[#B22222]">₹8,000</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="font-medium">Library Fee</span>
                      <span className="font-bold text-[#B22222]">₹2,000</span>
                    </div>
                    <div className="flex justify-between items-center py-3 font-bold text-lg">
                      <span className="text-[#B22222]">Total Annual Fee</span>
                      <span className="text-[#B22222]">₹75,000</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#B22222] mb-6">Additional Fees</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="font-medium">Admission Fee (One-time)</span>
                      <span className="font-bold text-[#B22222]">₹10,000</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="font-medium">Caution Deposit (Refundable)</span>
                      <span className="font-bold text-[#B22222]">₹5,000</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="font-medium">Hostel Fee (Optional)</span>
                      <span className="font-bold text-[#B22222]">₹40,000</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="font-medium">Transport Fee (Optional)</span>
                      <span className="font-bold text-[#B22222]">₹15,000</span>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-[#0097A7] bg-opacity-10 rounded-lg">
                    <p className="text-sm text-[#B22222]">
                      <CreditCard className="w-4 h-4 inline mr-2" />
                      <strong>Payment Options:</strong> Online payment, DD, or cash at college office
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Admissions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Need Help with Admissions?</h2>
            <p className="text-xl text-gray-600">Our admissions team is here to assist you</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-[#FFF8F0] rounded-xl">
                <Clock className="w-12 h-12 text-[#B22222] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[#B22222] mb-2">Office Hours</h3>
                <p className="text-gray-600 text-sm">Mon-Fri: 9:00 AM - 5:00 PM<br/>Sat: 9:00 AM - 1:00 PM</p>
              </div>
              <div className="text-center p-6 bg-[#FFF8F0] rounded-xl">
                <FileText className="w-12 h-12 text-[#B22222] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[#B22222] mb-2">Admissions Office</h3>
                <p className="text-gray-600 text-sm">📞 +91-866-2461556<br/>📧 admissions@srivasaviengg.ac.in</p>
              </div>
              <div className="text-center p-6 bg-[#FFF8F0] rounded-xl">
                <Users className="w-12 h-12 text-[#B22222] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[#B22222] mb-2">Campus Visit</h3>
                <p className="text-gray-600 text-sm">Schedule a campus tour<br/>Meet our faculty and staff</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#B22222] to-[#0097A7] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Begin Your Engineering Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Take the first step towards a successful engineering career
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#B22222] px-8 py-3 rounded-lg font-semibold hover:bg-[#f9e8e8] transition-all transform hover:scale-105">
              Apply Online Now
            </button>
            <a 
              href="/contact" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#B22222] transition-all"
            >
              Contact Admissions
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admissions;
