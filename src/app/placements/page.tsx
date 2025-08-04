"use client";
import React from 'react';
import { TrendingUp, Building, Users, Award, Target, Briefcase, Star, CheckCircle } from 'lucide-react';
import content from '@/content/placements.json';

const Placements: React.FC = () => {

  const iconMap: { [key: string]: React.ElementType } = {
    TrendingUp, Building, Users, Award, Target, Briefcase, Star, CheckCircle,
  };

  return (
    <div className="bg-background text-foreground pt-20">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Placements</h1>
          <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">
            Bridging the gap between academic excellence and industry success.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Placement Highlights 2024</h2>
            <p className="text-lg text-muted-foreground">Outstanding placement achievements this year.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.placementStats.map((stat, index) => {
              const Icon = iconMap[stat.icon];
              return (
                <div key={index} className="text-center p-8 rounded-lg bg-card border">
                  <Icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-4xl font-bold mb-1">{stat.value}</h3>
                  <p className="text-muted-foreground font-medium">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Our Top Recruiters</h2>
            <p className="text-lg text-muted-foreground">Leading companies that trust our talent.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 items-center">
            {content.topRecruiters.map((company, index) => (
              <div key={index} className="bg-card p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border text-center">
                <div className="text-4xl mb-2">{company.logo}</div>
                <h3 className="text-lg font-semibold">{company.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
           <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Student Success Stories</h2>
            <p className="text-lg text-muted-foreground">Hear from our successfully placed students.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {content.testimonials.map((testimonial, index) => (
              <div key={index} className="bg-card p-6 rounded-lg shadow-sm border">
                <blockquote className="text-muted-foreground italic mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center space-x-4">
                   <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-primary">{testimonial.company}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.package} - {testimonial.branch}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Placements;
