"use client";
import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  const contactInfo = [
    { icon: Phone, title: 'Phone', detail: '+91-866-2461555' },
    { icon: Mail, title: 'Email', detail: 'info@srivasaviengg.ac.in' },
    { icon: Clock, title: 'Office Hours', detail: 'Mon-Fri: 9am - 5pm' },
  ];

  return (
    <div className="bg-background text-foreground pt-20">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">
            Get in touch with us for admissions, information, or any other queries.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-card p-6 rounded-lg border text-center">
                <info.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold">{info.title}</h3>
                <p className="text-muted-foreground">{info.detail}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-card p-8 rounded-lg border">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="w-full p-3 bg-secondary rounded-md border focus:ring-2 focus:ring-primary"/>
                  <input type="text" placeholder="Last Name" className="w-full p-3 bg-secondary rounded-md border focus:ring-2 focus:ring-primary"/>
                </div>
                <input type="email" placeholder="Email Address" className="w-full p-3 bg-secondary rounded-md border focus:ring-2 focus:ring-primary"/>
                <select className="w-full p-3 bg-secondary rounded-md border focus:ring-2 focus:ring-primary text-muted-foreground">
                  <option>Select a subject</option>
                  <option>Admission Inquiry</option>
                  <option>General Information</option>
                </select>
                <textarea rows={5} placeholder="Your Message" className="w-full p-3 bg-secondary rounded-md border focus:ring-2 focus:ring-primary"></textarea>
                <button type="submit" className="w-full bg-primary text-primary-foreground p-3 rounded-md font-semibold hover:bg-primary/90">
                  Send Message
                </button>
              </form>
            </div>
            
            <div className="space-y-8">
               <div className="bg-card p-8 rounded-lg border">
                 <h2 className="text-2xl font-bold mb-4">Our Location</h2>
                 <div className="aspect-w-16 aspect-h-9 rounded-md overflow-hidden mb-4">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3822.464632598379!2d81.5235582148662!3d16.65355658852336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a363ed5aaaaaaab%3A0x8764f4345a471e78!2sSri%20Vasavi%20Engineering%20College!5e0!3m2!1sen!2sin!4v1620300985878!5m2!1sen!2sin" 
                      width="100%" 
                      height="300" 
                      style={{border:0}} 
                      allowFullScreen={true}
                      loading="lazy">
                    </iframe>
                 </div>
                 <div className="flex items-start space-x-3">
                    <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <p className="text-muted-foreground">
                      Sri Vasavi Engineering College, Pedatadepalli, Tadepalligudem, West Godavari District, Andhra Pradesh - 534101
                    </p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
