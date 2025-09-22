const mysql = require('mysql2/promise');

async function migrateEEEData() {
  const connection = await mysql.createConnection({
    host: '62.72.31.209',
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'svec_cms'
  });

  try {
    console.log('Starting EEE Department data migration...');

    // Faculty Innovations data
    const facultyInnovations = [
      {
        title: 'Smart Grid Technology Implementation',
        description: 'Developed innovative teaching methods for Smart Grid concepts using simulation software',
        faculty_name: 'Dr. K. Venkata Rao',
        innovation_type: 'Teaching',
        implementation_date: '2024-01-15',
        impact_description: 'Improved student understanding by 40% in power systems',
        dept: 'EEE'
      },
      {
        title: 'Virtual Laboratory for Power Electronics',
        description: 'Created virtual lab experiments for power electronics circuits',
        faculty_name: 'Dr. M. Srinivasa Rao',
        innovation_type: 'Learning',
        implementation_date: '2023-08-20',
        impact_description: 'Enhanced practical knowledge without physical constraints',
        dept: 'EEE'
      },
      {
        title: 'AI-based Load Forecasting System',
        description: 'Developed machine learning algorithms for electrical load prediction',
        faculty_name: 'Dr. P. Rajesh Kumar',
        innovation_type: 'Research',
        implementation_date: '2024-03-10',
        impact_description: 'Achieved 95% accuracy in load forecasting',
        dept: 'EEE'
      }
    ];

    for (const innovation of facultyInnovations) {
      await connection.execute(
        'INSERT INTO faculty_innovations (title, description, faculty_name, innovation_type, implementation_date, impact_description, dept) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [innovation.title, innovation.description, innovation.faculty_name, innovation.innovation_type, innovation.implementation_date, innovation.impact_description, innovation.dept]
      );
    }
    console.log('Faculty Innovations data inserted successfully');

    // Research Centers data
    const researchCenters = [
      {
        center_name: 'Power Systems Research Center',
        description: 'Advanced research in power systems, smart grid, and renewable energy',
        established_year: 2018,
        recognition_body: 'JNTUK, Kakinada',
        head_of_center: 'Dr. K. Venkata Rao',
        research_areas: 'Smart Grid, Renewable Energy, Power Quality, FACTS devices',
        facilities: 'MATLAB/Simulink, PSCAD, Real-time digital simulator, Power quality analyzer',
        achievements: 'Published 50+ research papers, Filed 5 patents, Completed 10 funded projects',
        contact_email: 'pscenter@srivasaviengg.ac.in',
        contact_phone: '+91-9876543210',
        dept: 'EEE'
      },
      {
        center_name: 'Renewable Energy Research Lab',
        description: 'Research and development in solar, wind and hybrid renewable energy systems',
        established_year: 2020,
        recognition_body: 'AICTE',
        head_of_center: 'Dr. M. Srinivasa Rao',
        research_areas: 'Solar PV systems, Wind energy, Energy storage, Grid integration',
        facilities: 'Solar simulator, Wind tunnel, Battery testing setup, Grid tie inverters',
        achievements: 'Developed 5 prototypes, 20+ publications, Industry collaborations',
        contact_email: 'renewable@srivasaviengg.ac.in',
        contact_phone: '+91-9876543211',
        dept: 'EEE'
      }
    ];

    for (const center of researchCenters) {
      await connection.execute(
        'INSERT INTO research_centers (center_name, description, established_year, recognition_body, head_of_center, research_areas, facilities, achievements, contact_email, contact_phone, dept) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [center.center_name, center.description, center.established_year, center.recognition_body, center.head_of_center, center.research_areas, center.facilities, center.achievements, center.contact_email, center.contact_phone, center.dept]
      );
    }
    console.log('Research Centers data inserted successfully');

    // Product Development data
    const productDevelopments = [
      {
        product_name: 'Smart Energy Meter',
        description: 'IoT-enabled smart energy meter with remote monitoring capabilities',
        development_team: 'Dr. K. Venkata Rao, Mr. P. Seshu, Students: A. Ravi, B. Priya',
        development_period: 'Jan 2024 - Jun 2024',
        technology_used: 'Arduino, ESP32, IoT sensors, Mobile app development',
        application_area: 'Smart Grid, Energy Management',
        current_status: 'Prototype',
        funding_source: 'College Internal Funds',
        funding_amount: 50000.00,
        patent_status: 'Filed',
        dept: 'EEE'
      },
      {
        product_name: 'Solar Power Optimizer',
        description: 'MPPT charge controller with advanced tracking algorithms',
        development_team: 'Dr. M. Srinivasa Rao, Faculty team, Final year students',
        development_period: 'Aug 2023 - Dec 2023',
        technology_used: 'Microcontroller, Power electronics, MPPT algorithms',
        application_area: 'Solar Power Systems',
        current_status: 'Testing',
        funding_source: 'AICTE',
        funding_amount: 75000.00,
        patent_status: 'Pending',
        dept: 'EEE'
      },
      {
        product_name: 'Electric Vehicle Charging Station',
        description: 'Fast charging station with load balancing and smart scheduling',
        development_team: 'Dr. P. Rajesh Kumar, Industry partners, PG students',
        development_period: 'Mar 2024 - Aug 2024',
        technology_used: 'Power electronics, IoT, Mobile app, Cloud computing',
        application_area: 'Electric Vehicle Infrastructure',
        current_status: 'Production',
        funding_source: 'Industry Collaboration',
        funding_amount: 200000.00,
        patent_status: 'Granted',
        dept: 'EEE'
      }
    ];

    for (const product of productDevelopments) {
      await connection.execute(
        'INSERT INTO product_development (product_name, description, development_team, development_period, technology_used, application_area, current_status, funding_source, funding_amount, patent_status, dept) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [product.product_name, product.description, product.development_team, product.development_period, product.technology_used, product.application_area, product.current_status, product.funding_source, product.funding_amount, product.patent_status, product.dept]
      );
    }
    console.log('Product Development data inserted successfully');

    // Departmental Activities data
    const departmentalActivities = [
      {
        activity_name: 'National Conference on Smart Grid Technologies',
        description: 'Two-day national conference on emerging smart grid technologies',
        activity_type: 'Conference',
        date_from: '2024-02-15',
        date_to: '2024-02-16',
        venue: 'SVEC Main Auditorium',
        organizer: 'EEE Department',
        coordinator: 'Dr. K. Venkata Rao',
        participants_count: 250,
        target_audience: 'Faculty, Students, Industry professionals',
        outcomes: 'Knowledge sharing, Research collaborations, Industry connections',
        budget: 150000.00,
        sponsors: 'JNTUK, Local Industries',
        dept: 'EEE'
      },
      {
        activity_name: 'Power Electronics Workshop',
        description: 'Hands-on workshop on modern power electronic devices and applications',
        activity_type: 'Workshop',
        date_from: '2024-01-20',
        date_to: '2024-01-21',
        venue: 'EEE Laboratory',
        organizer: 'EEE Faculty',
        coordinator: 'Dr. M. Srinivasa Rao',
        participants_count: 80,
        target_audience: 'Final year students, Faculty',
        outcomes: 'Practical skills development, Industry exposure',
        budget: 75000.00,
        sponsors: 'College Internal Funds',
        dept: 'EEE'
      },
      {
        activity_name: 'Renewable Energy Exhibition',
        description: 'Student projects exhibition on renewable energy technologies',
        activity_type: 'Exhibition',
        date_from: '2024-03-10',
        date_to: '2024-03-10',
        venue: 'College Campus',
        organizer: 'Student Technical Committee',
        coordinator: 'Dr. P. Rajesh Kumar',
        participants_count: 150,
        target_audience: 'Students, Faculty, Visitors',
        outcomes: 'Innovation showcase, Public awareness',
        budget: 25000.00,
        sponsors: 'Student funds',
        dept: 'EEE'
      }
    ];

    for (const activity of departmentalActivities) {
      await connection.execute(
        'INSERT INTO departmental_activities (activity_name, description, activity_type, date_from, date_to, venue, organizer, coordinator, participants_count, target_audience, outcomes, budget, sponsors, dept) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [activity.activity_name, activity.description, activity.activity_type, activity.date_from, activity.date_to, activity.venue, activity.organizer, activity.coordinator, activity.participants_count, activity.target_audience, activity.outcomes, activity.budget, activity.sponsors, activity.dept]
      );
    }
    console.log('Departmental Activities data inserted successfully');

    // Green Initiatives data
    const greenInitiatives = [
      {
        initiative_name: 'Solar Power Installation',
        description: 'Installation of rooftop solar panels for department energy needs',
        initiative_type: 'Energy Conservation',
        start_date: '2023-06-01',
        end_date: '2023-08-31',
        coordinator: 'Dr. M. Srinivasa Rao',
        participants: 'Faculty, Students, Maintenance team',
        impact_metrics: '50kW capacity, 200 units/day generation, 30% energy savings',
        environmental_benefit: 'Reduced carbon footprint by 2 tons CO2/year',
        cost_savings: 180000.00,
        recognition_received: 'Green Campus Award 2024',
        future_plans: 'Expand to 100kW capacity by 2025',
        dept: 'EEE'
      },
      {
        initiative_name: 'E-Waste Management Program',
        description: 'Systematic collection and recycling of electronic waste',
        initiative_type: 'Waste Management',
        start_date: '2024-01-01',
        end_date: null,
        coordinator: 'Dr. P. Rajesh Kumar',
        participants: 'All department members, Students',
        impact_metrics: '500kg e-waste collected, 95% recycling rate',
        environmental_benefit: 'Prevented hazardous materials from landfills',
        cost_savings: 25000.00,
        recognition_received: 'Eco-friendly Department Certificate',
        future_plans: 'Extend program college-wide',
        dept: 'EEE'
      },
      {
        initiative_name: 'Energy Audit and Conservation',
        description: 'Comprehensive energy audit and implementation of conservation measures',
        initiative_type: 'Energy Conservation',
        start_date: '2023-11-01',
        end_date: '2024-01-31',
        coordinator: 'Dr. K. Venkata Rao',
        participants: 'Faculty, Students, Technical staff',
        impact_metrics: '25% reduction in energy consumption, LED replacement',
        environmental_benefit: 'Reduced energy consumption by 15000 units/year',
        cost_savings: 120000.00,
        recognition_received: 'Energy Efficient Department Award',
        future_plans: 'Implement smart energy monitoring system',
        dept: 'EEE'
      }
    ];

    for (const initiative of greenInitiatives) {
      await connection.execute(
        'INSERT INTO green_initiatives (initiative_name, description, initiative_type, start_date, end_date, coordinator, participants, impact_metrics, environmental_benefit, cost_savings, recognition_received, future_plans, dept) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [initiative.initiative_name, initiative.description, initiative.initiative_type, initiative.start_date, initiative.end_date, initiative.coordinator, initiative.participants, initiative.impact_metrics, initiative.environmental_benefit, initiative.cost_savings, initiative.recognition_received, initiative.future_plans, initiative.dept]
      );
    }
    console.log('Green Initiatives data inserted successfully');

    // Technical Magazines data
    const technicalMagazines = [
      {
        magazine_name: 'EEE Innovations Quarterly',
        description: 'Department magazine featuring latest research and innovations',
        magazine_type: 'Magazine',
        volume_number: 'Vol 5',
        issue_number: 'Issue 2',
        publication_date: '2024-06-15',
        editor_in_chief: 'Dr. K. Venkata Rao',
        editorial_team: 'Dr. M. Srinivasa Rao, Dr. P. Rajesh Kumar, Student editors',
        contributors: 'Faculty members, PG students, Industry experts',
        topics_covered: 'Smart Grid, Renewable Energy, Power Electronics, Research articles',
        target_audience: 'Students, Faculty, Industry professionals',
        pages_count: 50,
        print_copies: 200,
        digital_copies: 1000,
        dept: 'EEE'
      },
      {
        magazine_name: 'Power Systems Handbook',
        description: 'Comprehensive handbook covering power systems fundamentals',
        magazine_type: 'Handbook',
        volume_number: 'Vol 1',
        issue_number: 'First Edition',
        publication_date: '2024-01-10',
        editor_in_chief: 'Dr. M. Srinivasa Rao',
        editorial_team: 'Faculty committee, Technical writers',
        contributors: 'Senior faculty, Industry experts',
        topics_covered: 'Power generation, transmission, distribution, protection',
        target_audience: 'Students, Faculty',
        pages_count: 150,
        print_copies: 300,
        digital_copies: 500,
        dept: 'EEE'
      },
      {
        magazine_name: 'Renewable Energy Course Materials',
        description: 'Detailed course materials for renewable energy subjects',
        magazine_type: 'Course Material',
        volume_number: 'Vol 3',
        issue_number: 'Updated Edition',
        publication_date: '2024-07-01',
        editor_in_chief: 'Dr. P. Rajesh Kumar',
        editorial_team: 'Subject faculty, Course coordinators',
        contributors: 'Faculty members, Guest lecturers',
        topics_covered: 'Solar energy, Wind energy, Hybrid systems, Energy storage',
        target_audience: 'Students',
        pages_count: 120,
        print_copies: 180,
        digital_copies: 300,
        dept: 'EEE'
      }
    ];

    for (const magazine of technicalMagazines) {
      await connection.execute(
        'INSERT INTO technical_magazines (magazine_name, description, magazine_type, volume_number, issue_number, publication_date, editor_in_chief, editorial_team, contributors, topics_covered, target_audience, pages_count, print_copies, digital_copies, dept) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [magazine.magazine_name, magazine.description, magazine.magazine_type, magazine.volume_number, magazine.issue_number, magazine.publication_date, magazine.editor_in_chief, magazine.editorial_team, magazine.contributors, magazine.topics_covered, magazine.target_audience, magazine.pages_count, magazine.print_copies, magazine.digital_copies, magazine.dept]
      );
    }
    console.log('Technical Magazines data inserted successfully');

    console.log('EEE Department data migration completed successfully!');
    
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    await connection.end();
  }
}

migrateEEEData();