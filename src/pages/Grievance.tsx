import React, { useState } from 'react';
import { CheckCircle, X } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const Grievance: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    rollNumber: '',
    department: '',
    yearOfStudy: '',
    email: '',
    mobile: '',
    grievanceType: '',
    grievance: ''
  });
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
      // Reset form
      setFormData({
        name: '',
        role: '',
        rollNumber: '',
        department: '',
        yearOfStudy: '',
        email: '',
        mobile: '',
        grievanceType: '',
        grievance: ''
      });
    }, 1000);
  };

  const closeModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="pt-24 bg-background text-foreground min-h-screen">
      {/* Hero Section */}
      <AnimatedSection animation="fadeInUp" className="bg-primary text-white py-16 md:py-20 w-full rounded-none mb-12 overflow-hidden relative isolate">
        <div className="container mx-auto px-4 text-center relative z-10">
          <AnimatedSection animation="fadeInUp" delay={200}>
            <div className="flex items-center justify-center mb-6">
              <img
                src="/vasavi_logo.png"
                alt="SVEC Logo"
                className="w-16 h-16 object-contain mr-4"
              />
              <div className="text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-white">SVEC</h1>
                <p className="text-lg md:text-xl opacity-90">Online Grievance Redressal System</p>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Subtle background shapes */}
        <div className="absolute right-0 top-0 h-32 w-32 md:h-40 md:w-40 bg-secondary/30 rounded-full opacity-70 shadow-sm z-0"></div>
        <div className="absolute left-0 bottom-0 h-24 w-24 md:h-36 md:w-36 bg-secondary/20 rounded-full opacity-70 shadow-sm z-0"></div>
      </AnimatedSection>

      {/* Form Section */}
      <div className="container mx-auto px-4 pb-12">
        <AnimatedSection animation="fadeInUp" className="max-w-2xl mx-auto">
          <div className="bg-card rounded-xl shadow-xl border border-primary/10 overflow-hidden">
            
            {/* Form Header */}
            <div className="bg-gradient-to-r from-primary to-primary/90 text-white p-6 text-center">
              <h2 className="text-2xl font-bold">Online Grievance Redressal System</h2>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                  NAME
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors bg-background text-foreground"
                />
              </div>

              {/* Role Field */}
              <div>
                <label htmlFor="role" className="block text-sm font-semibold text-foreground mb-2">
                  ROLE
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors bg-background text-foreground"
                >
                  <option value="">ROLE</option>
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="staff">Staff</option>
                  <option value="parent">Parent</option>
                </select>
              </div>

              {/* Roll Number/Faculty ID/Staff ID */}
              <div>
                <label htmlFor="rollNumber" className="block text-sm font-semibold text-foreground mb-2">
                  ROLL NUMBER/FACULTY ID/STAFF ID
                </label>
                <input
                  type="text"
                  id="rollNumber"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors bg-background text-foreground"
                />
              </div>

              {/* Department Field */}
              <div>
                <label htmlFor="department" className="block text-sm font-semibold text-foreground mb-2">
                  DEPARTMENTS
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors bg-background text-foreground"
                >
                  <option value="">DEPARTMENTS</option>
                  <option value="cse">Computer Science & Engineering</option>
                  <option value="cst">Computer Science & Technology</option>
                  <option value="cse-ai">CSE (AI)</option>
                  <option value="cse-ds">CSE (Data Science)</option>
                  <option value="aiml">AI & Machine Learning</option>
                  <option value="ece">Electronics & Communication</option>
                  <option value="ect">Electronics & Comm. Technology</option>
                  <option value="eee">Electrical & Electronics</option>
                  <option value="mech">Mechanical Engineering</option>
                  <option value="civil">Civil Engineering</option>
                  <option value="bsh">Basic Science & Humanities</option>
                  <option value="mba">MBA</option>
                </select>
              </div>

              {/* Year of Study Field */}
              <div>
                <label htmlFor="yearOfStudy" className="block text-sm font-semibold text-foreground mb-2">
                  YEAR OF STUDY
                </label>
                <select
                  id="yearOfStudy"
                  name="yearOfStudy"
                  value={formData.yearOfStudy}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors bg-background text-foreground"
                >
                  <option value="">YEAR OF STUDY</option>
                  <option value="1">First Year</option>
                  <option value="2">Second Year</option>
                  <option value="3">Third Year</option>
                  <option value="4">Fourth Year</option>
                  <option value="na">Not Applicable</option>
                </select>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                  E-MAIL ADDRESS
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors bg-background text-foreground"
                />
              </div>

              {/* Mobile Number Field */}
              <div>
                <label htmlFor="mobile" className="block text-sm font-semibold text-foreground mb-2">
                  MOBILE NUMBER
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                  pattern="[0-9]{10}"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors bg-background text-foreground"
                />
              </div>

              {/* Grievance Type Field */}
              <div>
                <label htmlFor="grievanceType" className="block text-sm font-semibold text-foreground mb-2">
                  GRIEVANCE TYPE
                </label>
                <select
                  id="grievanceType"
                  name="grievanceType"
                  value={formData.grievanceType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors bg-background text-foreground"
                >
                  <option value="">GRIEVANCE TYPE</option>
                  <option value="academic">Academic Issues</option>
                  <option value="anti-ragging">Anti-Ragging</option>
                  <option value="administrative">Administrative</option>
                  <option value="infrastructure">Infrastructure</option>
                  <option value="harassment">Harassment</option>
                  <option value="fee">Fee Related</option>
                  <option value="hostel">Hostel Issues</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Grievance Description Field */}
              <div>
                <label htmlFor="grievance" className="block text-sm font-semibold text-foreground mb-2">
                  GRIEVANCE
                </label>
                <textarea
                  id="grievance"
                  name="grievance"
                  value={formData.grievance}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  placeholder="Please describe your grievance in detail..."
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors bg-background text-foreground resize-vertical"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? 'SUBMITTING...' : 'SUBMIT GRIEVANCE'}
                </button>
              </div>
            </form>
          </div>
        </AnimatedSection>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <AnimatedSection animation="fadeInScale" className="bg-background rounded-xl shadow-2xl border border-primary/20 max-w-md w-full mx-4">
            <div className="p-8 text-center relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-2">Successfully Submitted!</h3>
              <p className="text-muted-foreground mb-6">
                Your grievance has been submitted successfully. You will receive a confirmation email shortly with your grievance ID.
              </p>
              
              <button
                onClick={closeModal}
                className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105"
              >
                Close
              </button>
            </div>
          </AnimatedSection>
        </div>
      )}
    </div>
  );
};export default Grievance;
