"use client";
import React from 'react';
import { BookOpen, Users, Award, Clock, Cpu, Cog, Building2, Zap } from 'lucide-react';
import content from '../../content/academics.json';

const Academics: React.FC = () => {
  const iconMap: { [key: string]: React.ElementType } = {
    Cpu, Zap, Cog, Building2, BookOpen, Users, Award, Clock,
  };

  return (
    <div className="bg-background text-foreground pt-20">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Academics</h1>
          <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">
            Comprehensive programs designed to meet industry demands and foster innovation.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.features.map((feature, index) => {
              const Icon = iconMap[feature.icon];
              return (
              <div key={index} className="text-center p-6 rounded-lg bg-card border">
                <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </div>
            )})}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Undergraduate Programs</h2>
            <p className="text-lg text-muted-foreground">Choose from our comprehensive engineering disciplines.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.programs.map((program, index) => {
              const Icon = iconMap[program.icon];
              return (
              <div key={index} className="bg-card p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow border">
                <Icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                <div className="flex justify-between items-center my-4 text-xs">
                  <span className="bg-primary/10 text-primary font-medium px-2 py-1 rounded-full">{program.duration}</span>
                  <span className="text-muted-foreground">Intake: {program.intake}</span>
                </div>
                <p className="text-muted-foreground text-sm mb-6">{program.description}</p>
                <button className="w-full bg-primary text-primary-foreground py-2 rounded-md font-semibold text-sm hover:bg-primary/90 transition-colors">
                  Learn More
                </button>
              </div>
            )})}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Academic Calendar</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4 py-2">
                  <h3 className="font-semibold mb-1">Odd Semester</h3>
                  <p className="text-muted-foreground text-sm">July - December</p>
                </div>
                <div className="border-l-4 border-accent pl-4 py-2">
                  <h3 className="font-semibold mb-1">Even Semester</h3>
                  <p className="text-muted-foreground text-sm">January - June</p>
                </div>
                 <div className="border-l-4 border-muted pl-4 py-2">
                  <h3 className="font-semibold mb-1">Summer Vacation</h3>
                  <p className="text-muted-foreground text-sm">May - June</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Assessment Pattern</h2>
              <div className="bg-card p-6 rounded-lg border">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Internal Assessment</span>
                    <span className="font-bold text-primary">30%</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">End Semester Exam</span>
                    <span className="font-bold text-primary">70%</span>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Academics;
