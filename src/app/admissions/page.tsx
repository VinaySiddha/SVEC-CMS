"use client";
import React from 'react';
import { Calendar, FileText, CheckCircle, Users, Award, BookOpen, CreditCard, Clock } from 'lucide-react';

const Admissions: React.FC = () => {
  const admissionProcess = [
    {
      step: '1',
      title: 'Check Eligibility',
      description: 'Verify that you meet the basic eligibility criteria for your desired program.',
    },
    {
      step: '2',
      title: 'Fill Application',
      description: 'Complete the online application form with accurate information.',
    },
    {
      step: '3',
      title: 'Document Verification',
      description: 'Submit required documents for verification.',
    },
    {
      step: '4',
      title: 'Counseling & Admission',
      description: 'Participate in counseling and complete admission formalities.',
    }
  ];

  const programs = [
    { name: 'Computer Science & Engineering', duration: '4 Years', intake: '120' },
    { name: 'Electronics & Communications', duration: '4 Years', intake: '60' },
    { name: 'Mechanical Engineering', duration: '4 Years', intake: '60' },
    { name: 'Civil Engineering', duration: '4 Years', intake: '60' },
    { name: 'Electrical & Electronics', duration: '4 Years', intake: '60' },
  ];
  
  const importantDates = [
    { event: 'Application Start Date', date: 'March 15, 2025' },
    { event: 'Application Last Date', date: 'June 30, 2025' },
    { event: 'Entrance Exam', date: 'May 15-30, 2025' },
    { event: 'Results Declaration', date: 'June 15, 2025' },
    { event: 'Counseling Starts', date: 'July 1, 2025' },
    { event: 'Classes Begin', date: 'August 1, 2025' },
  ];

  return (
    <div className="bg-background text-foreground pt-20">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Admissions 2025</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-primary-foreground/90">
            Join our community of future engineers and innovators.
          </p>
          <button className="bg-primary-foreground text-primary px-8 py-3 rounded-md font-semibold hover:bg-primary-foreground/90 transition-transform transform hover:scale-105">
            Apply Now
          </button>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Important Dates</h2>
            <p className="text-lg text-muted-foreground">Mark your calendar for admission milestones.</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {importantDates.map((item, index) => (
                <div key={index} className="bg-card p-4 rounded-lg border flex items-center space-x-4">
                  <Calendar className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">{item.event}</h3>
                    <p className="text-muted-foreground text-sm">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Admission Process</h2>
            <p className="text-lg text-muted-foreground">Simple steps to secure your admission.</p>
          </div>
           <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {admissionProcess.map((process, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">
                    {process.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{process.title}</h3>
                    <p className="text-muted-foreground">{process.description}</p>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Programs Offered</h2>
            <p className="text-lg text-muted-foreground">Choose from our comprehensive engineering programs.</p>
          </div>
          <div className="max-w-4xl mx-auto">
             <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Program</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Duration</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Intake</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {programs.map((program, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{program.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{program.duration}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{program.intake}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admissions;
