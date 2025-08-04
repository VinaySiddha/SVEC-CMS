import React from 'react';
import { Calendar, FileText, CheckCircle, Clock, BookOpen, Award } from 'lucide-react';

const Examinations: React.FC = () => {
  const examSchedule = [
    {
      exam: 'Mid Term Examination - I',
      period: 'August 2024',
      subjects: 'All subjects as per academic calendar',
      status: 'Completed'
    },
    {
      exam: 'Mid Term Examination - II',
      period: 'October 2024',
      subjects: 'All subjects as per academic calendar',
      status: 'Completed'
    },
    {
      exam: 'End Semester Examination',
      period: 'December 2024',
      subjects: 'All subjects for Odd Semester',
      status: 'Completed'
    },
    {
      exam: 'Mid Term Examination - I',
      period: 'March 2025',
      subjects: 'All subjects for Even Semester',
      status: 'Upcoming'
    }
  ];

  const examGuidelines = [
    'Students must carry valid ID card and hall ticket',
    'Electronic devices are strictly prohibited in exam halls',
    'Students should reach exam hall 15 minutes before exam time',
    'Late arrival by more than 30 minutes will not be permitted',
    'Answer scripts must be submitted before leaving the hall',
    'Any form of malpractice will result in immediate disqualification'
  ];

  const results = [
    {
      exam: 'B.Tech I Year - I Semester',
      date: 'January 15, 2025',
      status: 'Published'
    },
    {
      exam: 'B.Tech II Year - I Semester',
      date: 'January 15, 2025',
      status: 'Published'
    },
    {
      exam: 'B.Tech III Year - I Semester',
      date: 'January 15, 2025',
      status: 'Published'
    },
    {
      exam: 'B.Tech IV Year - I Semester',
      date: 'January 15, 2025',
      status: 'Published'
    }
  ];

  return (
    <div className="pt-44 bg-[#FFF8F0] text-[#222222]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#B22222] to-[#0097A7] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Examinations</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Comprehensive examination system ensuring fair assessment and academic excellence
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl bg-[#FFF8F0] hover:shadow-lg transition-all cursor-pointer">
              <Calendar className="w-16 h-16 text-[#B22222] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#B22222] mb-2">Exam Schedule</h3>
              <p className="text-gray-600">View upcoming examination dates</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-[#FFF8F0] hover:shadow-lg transition-all cursor-pointer">
              <FileText className="w-16 h-16 text-[#B22222] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#B22222] mb-2">Results</h3>
              <p className="text-gray-600">Check your examination results</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-[#FFF8F0] hover:shadow-lg transition-all cursor-pointer">
              <BookOpen className="w-16 h-16 text-[#B22222] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#B22222] mb-2">Hall Tickets</h3>
              <p className="text-gray-600">Download admission tickets</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-[#FFF8F0] hover:shadow-lg transition-all cursor-pointer">
              <Award className="w-16 h-16 text-[#B22222] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#B22222] mb-2">Certificates</h3>
              <p className="text-gray-600">Apply for official certificates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Exam Schedule */}
      <section className="py-16 bg-[#FFF8F0]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-[#B22222] mb-6">Examination Schedule</h2>
              <div className="space-y-4">
                {examSchedule.map((exam, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-[#B22222]">{exam.exam}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        exam.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-[#FFC107] text-[#B22222]'
                      }`}>
                        {exam.status}
                      </span>
                    </div>
                    <div className="space-y-2 text-gray-600">
                      <p className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-[#B22222]" />
                        <strong>Period:</strong> {exam.period}
                      </p>
                      <p className="flex items-start">
                        <BookOpen className="w-4 h-4 mr-2 mt-0.5 text-[#B22222]" />
                        <span><strong>Subjects:</strong> {exam.subjects}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-[#B22222] mb-6">Exam Guidelines</h2>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="space-y-4">
                  {examGuidelines.map((guideline, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-600">{guideline}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-[#FFC107] bg-opacity-20 rounded-lg">
                  <p className="text-[#B22222] font-medium">
                    <strong>Important:</strong> Students are advised to regularly check the college notice board 
                    and website for any updates regarding examination schedules and procedures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Latest Results</h2>
            <p className="text-xl text-gray-600">Check your examination results below</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((result, index) => (
                <div key={index} className="bg-[#FFF8F0] p-6 rounded-xl hover:bg-white hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-[#B22222]">{result.exam}</h3>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {result.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">Published on: {result.date}</p>
                  <button className="w-full bg-[#0097A7] text-white py-2 rounded-lg hover:bg-[#007A86] transition-colors">
                    View Results
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Assessment Pattern */}
      <section className="py-16 bg-[#FFF8F0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Assessment Pattern</h2>
            <p className="text-xl text-gray-600">Understanding our comprehensive evaluation system</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-[#B22222] mb-6">Internal Assessment (30%)</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600">Mid Term - I</span>
                    <span className="font-semibold text-[#B22222]">10%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600">Mid Term - II</span>
                    <span className="font-semibold text-[#B22222]">10%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600">Assignments</span>
                    <span className="font-semibold text-[#B22222]">5%</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Attendance</span>
                    <span className="font-semibold text-[#B22222]">5%</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-[#B22222] mb-6">External Assessment (70%)</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600">End Semester Exam</span>
                    <span className="font-semibold text-[#B22222]">70%</span>
                  </div>
                  <div className="mt-6 p-4 bg-[#0097A7] bg-opacity-10 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <strong>Duration:</strong> 3 hours<br/>
                      <strong>Pattern:</strong> Theory + Problem solving<br/>
                      <strong>Passing Marks:</strong> 40% in each component
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#B22222] to-[#0097A7] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Help with Examinations?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact our examination department for any queries or assistance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="bg-[#FFC107] text-[#B22222] px-8 py-3 rounded-lg font-semibold hover:bg-[#8B0000] transition-all"
            >
              Contact Exam Cell
            </a>
            <a 
              href="mailto:exams@srivasaviengg.ac.in" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#B22222] transition-all"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Examinations;
