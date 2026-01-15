import { NextApiRequest, NextApiResponse } from 'next';

interface FAQ {
  id: string;
  keywords: string[];
  question: string;
  answer: string;
  category: 'general' | 'admissions' | 'departments' | 'faculty' | 'facilities' | 'placements' | 'fees' | 'contact';
}

// Comprehensive FAQ Database
const faqDatabase: FAQ[] = [
  // General College Information
  {
    id: 'gen1',
    keywords: ['college', 'about', 'svec', 'vasavi', 'information', 'history', 'established', 'founded'],
    question: 'Tell me about SVEC',
    answer: 'Sri Vasavi Engineering College (SVEC) was established in 2001 in Tadepalligudem, West Godavari District, Andhra Pradesh. It is an autonomous institution affiliated to JNTUK and approved by AICTE. The college is NAAC accredited with Grade A and offers undergraduate and postgraduate programs in various engineering disciplines.',
    category: 'general'
  },
  {
    id: 'gen2',
    keywords: ['location', 'address', 'where', 'tadepalligudem', 'andhra pradesh'],
    question: 'Where is SVEC located?',
    answer: 'SVEC is located at Tadepalligudem - 534101, West Godavari District, Andhra Pradesh, India. The campus is easily accessible by road and rail, with Tadepalligudem railway station nearby.',
    category: 'general'
  },
  {
    id: 'gen3',
    keywords: ['accreditation', 'naac', 'aicte', 'autonomous', 'affiliation', 'recognition'],
    question: 'What are the accreditations and affiliations?',
    answer: 'SVEC is:\n• NAAC Accredited with Grade A\n• Autonomous Institution\n• Affiliated to JNTUK (Jawaharlal Nehru Technological University Kakinada)\n• Approved by AICTE (All India Council for Technical Education)\n• ISO 9001:2015 Certified',
    category: 'general'
  },

  // Admissions
  {
    id: 'adm1',
    keywords: ['admission', 'eligibility', 'entrance', 'apply', 'application', 'how to join'],
    question: 'What is the admission process?',
    answer: 'Admissions to SVEC are through:\n• AP EAMCET for B.Tech programs\n• GATE/PGECET for M.Tech programs\n• Direct admission for management quota seats\n\nEligibility: 10+2 with PCM (Physics, Chemistry, Mathematics) with minimum 45% marks for general category.',
    category: 'admissions'
  },
  {
    id: 'adm2',
    keywords: ['seats', 'intake', 'capacity', 'branches', 'quota'],
    question: 'What is the seat intake for different branches?',
    answer: 'B.Tech Seat Intake:\n• CSE: 240 seats\n• CSE (AI): 120 seats\n• CSE (DS): 60 seats\n• AIML: 180 seats\n• ECE: 180 seats\n• EEE: 180 seats\n• Civil: 120 seats\n• Mechanical: 120 seats\n\nSeats are allocated through convener quota and management quota.',
    category: 'admissions'
  },
  {
    id: 'adm3',
    keywords: ['cutoff', 'rank', 'eamcet', 'minimum', 'marks'],
    question: 'What are the cutoff ranks for admission?',
    answer: 'EAMCET Cutoff Ranks (approximate):\n• CSE: 5,000-15,000\n• CSE (AI): 8,000-20,000\n• AIML: 10,000-25,000\n• ECE: 15,000-30,000\n• EEE: 20,000-35,000\n• Civil/Mechanical: 25,000-45,000\n\nCutoffs vary yearly based on competition and seat availability.',
    category: 'admissions'
  },

  // Departments
  {
    id: 'dept1',
    keywords: ['departments', 'branches', 'courses', 'programs', 'engineering'],
    question: 'What departments are available?',
    answer: 'SVEC offers the following departments:\n\n🔹 Computer Science & Engineering (CSE)\n🔹 CSE (Artificial Intelligence)\n🔹 CSE (Data Science)\n🔹 Artificial Intelligence & Machine Learning (AIML)\n🔹 Electronics & Communication Engineering (ECE)\n🔹 Electrical & Electronics Engineering (EEE)\n🔹 Civil Engineering\n🔹 Mechanical Engineering\n🔹 Master of Business Administration (MBA)',
    category: 'departments'
  },
  {
    id: 'dept2',
    keywords: ['cse', 'computer science', 'software', 'programming', 'coding'],
    question: 'Tell me about CSE department',
    answer: 'Computer Science & Engineering:\n• Established: 2001\n• Current Intake: 240 seats\n• HOD: Dr. D. Jaya Kumari (CSE & CST)\n• Focus: Software Development, AI/ML, Data Analytics\n• Excellent placement record in top IT companies',
    category: 'departments'
  },
  {
    id: 'dept3',
    keywords: ['aiml', 'artificial intelligence', 'machine learning', 'ai', 'ml', 'cai', 'cseds'],
    question: 'Tell me about AIML department',
    answer: 'Artificial Intelligence & Machine Learning:\n• Established: 2021\n• Current Intake: 180 seats\n• HOD: Dr. G. Loshma (AIML & CAI & CSEDS)\n• Focus: Deep Learning, Neural Networks, Computer Vision\n• GPU labs with industry partnerships',
    category: 'departments'
  },
  {
    id: 'dept4',
    keywords: ['ece', 'electronics', 'communication', 'vlsi', 'embedded', 'ect'],
    question: 'Tell me about ECE department',
    answer: 'Electronics & Communication Engineering:\n• Established: 2001\n• Current Intake: 180 seats\n• HOD: Dr. E. Kusuma Kumari (ECE & ECT)\n• Focus: VLSI, Embedded Systems, IoT\n• Advanced labs & core company placements',
    category: 'departments'
  },
  {
    id: 'dept5',
    keywords: ['eee', 'electrical', 'power', 'energy', 'systems'],
    question: 'Tell me about EEE department',
    answer: 'Electrical & Electronics Engineering:\n• Established: 1981\n• Current Intake: 180 seats\n• HOD: Dr. D. Sudha Rani\n• Focus: Power Systems, Renewable Energy\n• Strong connections in power sector',
    category: 'departments'
  },
  {
    id: 'dept6',
    keywords: ['civil', 'construction', 'structural', 'environmental'],
    question: 'Tell me about Civil Engineering department',
    answer: 'Civil Engineering:\n• Established: 1981\n• Current Intake: 120 seats\n• HOD: Dr. G. Radha Krishna\n• Focus: Structural Design, Environmental Engineering\n• Strong placement in construction & infrastructure',
    category: 'departments'
  },
  {
    id: 'dept7',
    keywords: ['mechanical', 'manufacturing', 'thermal', 'automobile'],
    question: 'Tell me about Mechanical Engineering department',
    answer: 'Mechanical Engineering:\n• Established: 2001\n• Current Intake: 120 seats\n• HOD: Dr. M.V. Ramesh\n• Focus: Design, Manufacturing, Thermal Engineering\n• Strong industry connections & hands-on learning',
    category: 'departments'
  },

  // Faculty
  {
    id: 'fac1',
    keywords: ['faculty', 'professors', 'teachers', 'staff', 'qualification'],
    question: 'Tell me about the faculty',
    answer: 'SVEC has a highly qualified faculty team:\n• 200+ experienced faculty members\n• 80% faculty with M.Tech/Ph.D qualifications\n• Several faculty with industry experience\n• Active in research and publications\n• Regular faculty development programs\n• Student-faculty ratio of 15:1',
    category: 'faculty'
  },
  {
    id: 'fac2',
    keywords: ['hod', 'head', 'department head', 'principal', 'principle', 'who is principal', 'who is the principal'],
    question: 'Who are the department heads?',
    answer: '🎓 **Department Heads & Principal**\n\n🎓 Principal: Dr. G. Ratnakar Rao\n💻 CSE & CST: Dr. D. Jaya Kumari\n🤖 AIML & CAI & CSEDS: Dr. G. Loshma\n📡 ECE & ECT: Dr. E. Kusuma Kumari\n⚡ EEE: Dr. D. Sudha Rani\n🔧 Mechanical: Dr. M.V. Ramesh\n🏗️ Civil: Dr. G. Radha Krishna',
    category: 'faculty'
  },
  {
    id: 'fac2a',
    keywords: ['principal', 'principle', 'who is principal', 'who is the principal', 'college principal', 'head of college'],
    question: 'Who is the Principal?',
    answer: '🎓 **Principal of SVEC**\n\n👨‍🎓 Dr. G. Ratnakar Rao\nPrincipal, Sri Vasavi Engineering College\n\n📞 Contact: 08818-284355\n📧 Email: principal@srivasaviengg.ac.in',
    category: 'faculty'
  },
  {
    id: 'fac3a',
    keywords: ['dr g ratnakar rao', 'ratnakar rao', 'g ratnakar rao', 'ratnakar'],
    question: 'Tell me about Dr. G. Ratnakar Rao',
    answer: '🎓 **Dr. G. Ratnakar Rao**\n\n👨‍🎓 Principal, Sri Vasavi Engineering College\n🎯 Leading the institution with vision and excellence\n📚 Committed to quality education and student development\n\n📞 Contact: 08818-284355\n📧 Email: principal@srivasaviengg.ac.in',
    category: 'faculty'
  },
  {
    id: 'fac3b',
    keywords: ['dr d jaya kumari', 'jaya kumari', 'd jaya kumari', 'cse hod', 'cst hod'],
    question: 'Tell me about Dr. D. Jaya Kumari',
    answer: '💻 **Dr. D. Jaya Kumari**\n\nHOD - Computer Science & Engineering (CSE & CST)\n🎓 Expertise in Software Engineering and Data Analytics\n👩‍🏫 Leading CSE & CST departments with innovation\n🚀 Focus on cutting-edge technology and industry partnerships\n\n📞 Contact: HOD Office, CSE Department\n📧 Email: hod_cse@srivasaviengg.ac.in',
    category: 'faculty'
  },
  {
    id: 'fac3c',
    keywords: ['dr g loshma', 'loshma', 'g loshma', 'aiml hod', 'cai hod', 'cseds hod'],
    question: 'Tell me about Dr. G. Loshma',
    answer: '🤖 **Dr. G. Loshma**\n\nHOD - AIML & CAI & CSEDS\n🧠 Expert in Artificial Intelligence and Machine Learning\n👩‍🏫 Leading AI/ML initiatives and research\n💻 Specializes in Deep Learning and Neural Networks\n🔬 Active in cutting-edge AI research projects\n\n📞 Contact: HOD Office, AIML Department\n📧 Email: hod_aiml@srivasaviengg.ac.in',
    category: 'faculty'
  },
  {
    id: 'fac3d',
    keywords: ['dr e kusuma kumari', 'kusuma kumari', 'e kusuma kumari', 'ece hod', 'ect hod'],
    question: 'Tell me about Dr. E. Kusuma Kumari',
    answer: '📡 **Dr. E. Kusuma Kumari**\n\nHOD - Electronics & Communication Engineering (ECE & ECT)\n⚡ Expert in VLSI Design and Embedded Systems\n👩‍🏫 Leading ECE & ECT departments with excellence\n🔧 Focus on IoT, Communication Systems and Industry 4.0\n🏆 Strong track record in placements and research\n\n📞 Contact: HOD Office, ECE Department\n📧 Email: hod_ece@srivasaviengg.ac.in',
    category: 'faculty'
  },
  {
    id: 'fac3e',
    keywords: ['dr d sudha rani', 'sudha rani', 'd sudha rani', 'eee hod'],
    question: 'Tell me about Dr. D. Sudha Rani',
    answer: '⚡ **Dr. D. Sudha Rani**\n\nHOD - Electrical & Electronics Engineering (EEE)\n🔋 Expert in Power Systems and Renewable Energy\n👩‍🏫 Leading EEE department since many years\n🌱 Focus on sustainable energy solutions\n🏭 Strong industry connections in power sector\n📞 Phone: 08818-284355 (Ext.-376)\n📧 Email: hod_eee@srivasaviengg.ac.in',
    category: 'faculty'
  },
  {
    id: 'fac3f',
    keywords: ['dr m v ramesh', 'mv ramesh', 'm v ramesh', 'ramesh', 'mechanical hod'],
    question: 'Tell me about Dr. M.V. Ramesh',
    answer: '🔧 **Dr. M.V. Ramesh**\n\nHOD - Mechanical Engineering\n⚙️ Expert in Design and Manufacturing Engineering\n👨‍🏫 Leading Mechanical department with innovation\n🏭 Strong focus on industry-academia collaboration\n🔬 Research interests in thermal and manufacturing systems\n\n📞 Contact: HOD Office, Mechanical Department\n📧 Email: hod_mech@srivasaviengg.ac.in',
    category: 'faculty'
  },
  {
    id: 'fac3g',
    keywords: ['dr g radha krishna', 'radha krishna', 'g radha krishna', 'civil hod'],
    question: 'Tell me about Dr. G. Radha Krishna',
    answer: '🏗️ **Dr. G. Radha Krishna**\n\nHOD - Civil Engineering\n🌉 Expert in Structural Design and Environmental Engineering\n👨‍🏫 Leading Civil department with expertise\n🏢 Focus on sustainable construction practices\n🌍 Research in environmental engineering solutions\n\n📞 Contact: HOD Office, Civil Department\n📧 Email: hod_civil@srivasaviengg.ac.in',
    category: 'faculty'
  },

  // Facilities
  {
    id: 'fac3',
    keywords: ['facilities', 'infrastructure', 'labs', 'library', 'hostel', 'campus'],
    question: 'What facilities are available?',
    answer: 'SVEC Campus Facilities:\n🏢 Modern Infrastructure\n• AC classrooms with smart boards\n• Advanced laboratories for all departments\n• Central library with 50,000+ books\n• High-speed internet and Wi-Fi\n• Separate hostels for boys and girls\n• Medical facility with qualified doctor\n• Transportation facility\n• Sports complex and gym\n• Cafeteria and food courts',
    category: 'facilities'
  },
  {
    id: 'fac4',
    keywords: ['hostel', 'accommodation', 'rooms', 'mess', 'food'],
    question: 'Tell me about hostel facilities',
    answer: 'Hostel Facilities:\n• Separate hostels for boys and girls\n• AC and non-AC rooms available\n• 2-4 sharing accommodation\n• Hygienic mess with nutritious food\n• 24/7 security and CCTV surveillance\n• Wi-Fi connectivity\n• Recreation rooms\n• Laundry facility\n• Warden supervision',
    category: 'facilities'
  },
  {
    id: 'fac5',
    keywords: ['library', 'books', 'study', 'reading'],
    question: 'Tell me about the library',
    answer: 'Central Library Facilities:\n• 50,000+ books and journals\n• Digital library with e-books and e-journals\n• AC reading halls with 300+ seats\n• Internet facility for research\n• Separate sections for different subjects\n• Newspaper and magazine section\n• Group study rooms\n• Photocopying facility\n• Extended hours during exams',
    category: 'facilities'
  },

  // Placements
  {
    id: 'plc1',
    keywords: ['placement', 'jobs', 'companies', 'package', 'salary', 'recruitment'],
    question: 'How are the placements?',
    answer: 'SVEC Placement Highlights:\n📈 Placement Statistics (2023-24):\n• Overall Placement: 85%+\n• Highest Package: ₹44 LPA\n• Average Package: ₹4.5 LPA\n• 300+ companies visit annually\n• Top recruiters: TCS, Infosys, Wipro, Cognizant, Amazon, Microsoft, Google',
    category: 'placements'
  },
  {
    id: 'plc2',
    keywords: ['companies', 'recruiters', 'top companies', 'multinational'],
    question: 'Which companies visit for placements?',
    answer: 'Top Recruiting Companies:\n🔹 IT Companies: TCS, Infosys, Wipro, Cognizant, Accenture, Capgemini\n🔹 Product Companies: Microsoft, Amazon, Google, Adobe, Oracle\n🔹 Core Companies: L&T, BHEL, NTPC, ONGC\n🔹 Startups: Zomato, Swiggy, Flipkart, PayTM\n🔹 Consulting: Deloitte, PwC, EY\n🔹 Banking: ICICI, HDFC, Axis Bank',
    category: 'placements'
  },
  {
    id: 'plc3',
    keywords: ['placement training', 'preparation', 'aptitude', 'interview'],
    question: 'Is there placement training?',
    answer: 'Placement Training & Support:\n• Comprehensive placement training program\n• Aptitude and reasoning training\n• Technical interview preparation\n• Soft skills and communication training\n• Mock interviews and group discussions\n• Resume building workshops\n• Industry interaction sessions\n• Dedicated placement cell support',
    category: 'placements'
  },

  // Fees
  {
    id: 'fee1',
    keywords: ['fees', 'cost', 'tuition', 'fee structure', 'payment'],
    question: 'What is the fee structure?',
    answer: 'B.Tech Fee Structure (Annual):\n💰 Tuition Fee:\n• Convener Quota: ₹1,05,000\n• Management Quota: ₹1,50,000\n\n📋 Additional Fees:\n• Admission Fee: ₹25,000 (one-time)\n• Exam Fee: ₹3,000\n• Lab Fee: ₹15,000\n• Library Fee: ₹2,000\n• Bus Fee: ₹35,000 (optional)',
    category: 'fees'
  },
  {
    id: 'fee2',
    keywords: ['scholarship', 'financial aid', 'merit', 'fee waiver'],
    question: 'Are scholarships available?',
    answer: 'Scholarship Opportunities:\n🎓 Merit Scholarships:\n• Top 10 EAMCET rankers: 100% fee waiver\n• Top 100 rankers: 50% fee waiver\n• Academic toppers: Merit scholarships\n\n🏛️ Government Scholarships:\n• SC/ST fee reimbursement\n• BC/EBC scholarships\n• Minority scholarships\n• EWS scholarships',
    category: 'fees'
  },
  {
    id: 'fee3',
    keywords: ['hostel fee', 'accommodation cost', 'mess fee'],
    question: 'What is the hostel fee?',
    answer: 'Hostel Fee Structure (Annual):\n🏠 Accommodation:\n• Non-AC rooms: ₹60,000\n• AC rooms: ₹85,000\n\n🍽️ Mess Fee:\n• Vegetarian: ₹35,000\n• Non-vegetarian: ₹40,000\n\n📋 Additional:\n• Security deposit: ₹10,000 (refundable)\n• Electricity charges: As per usage',
    category: 'fees'
  },

  // Contact Information
  {
    id: 'con1',
    keywords: ['contact', 'phone', 'email', 'address', 'reach'],
    question: 'How can I contact the college?',
    answer: 'Contact Information:\n📍 Address: Tadepalligudem - 534101, West Godavari District, AP\n📞 Phone: 08818-284355, 08818-284366\n📠 Fax: 08818-284322\n📧 Email: principal@srivasaviengg.ac.in\n🌐 Website: www.srivasaviengg.ac.in\n📱 WhatsApp: +91 8142382563',
    category: 'contact'
  },
  {
    id: 'con2',
    keywords: ['timings', 'office hours', 'working hours', 'visit'],
    question: 'What are the college timings?',
    answer: 'College Timings:\n🕘 Academic Hours:\n• Monday to Friday: 9:30 AM - 4:30 PM\n• Saturday: 9:30 AM - 4:30 PM\n\n🏢 Office Hours:\n• Monday to Saturday: 9:30 AM - 4:30 PM\n• Saturday: 9:30 AM - 1:00 PM\n• Sunday: Closed\n\n📞 Admission Helpline: Available 9:30 AM - 4:30 PM',
    category: 'contact'
  },
  {
    id: 'con3',
    keywords: ['admission office', 'admission contact', 'admission helpline'],
    question: 'How to contact admission office?',
    answer: 'Admission Office Contact:\n📞 Admission Helpline: 08818-284355 (Ext. 101)\n📧 Email: admissions@srivasaviengg.ac.in\n⏰ Timings: 9:30 AM - 4:30 PM (Mon-Sat)\n📍 Location: Administrative Block, Ground Floor\n📱 WhatsApp: +91 8142382563\n\nFor urgent queries, you can also visit the office directly.',
    category: 'contact'
  }
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { category, search } = req.query;
    
    try {
      let filteredFAQs = faqDatabase;
      
      // Filter by category if provided
      if (category && typeof category === 'string') {
        filteredFAQs = faqDatabase.filter(faq => faq.category === category);
      }
      
      // Search functionality
      if (search && typeof search === 'string') {
        const searchTerm = search.toLowerCase();
        filteredFAQs = faqDatabase.filter(faq => 
          faq.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm)) ||
          faq.question.toLowerCase().includes(searchTerm) ||
          faq.answer.toLowerCase().includes(searchTerm)
        );
      }
      
      res.status(200).json({
        success: true,
        data: filteredFAQs,
        total: filteredFAQs.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch FAQs'
      });
    }
  } else if (req.method === 'POST') {
    // Handle FAQ matching for chatbot
    const { userInput } = req.body;
    
    if (!userInput || typeof userInput !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'User input is required'
      });
    }
    
    try {
      const input = userInput.toLowerCase().trim();
      
      // Handle numbered menu options first
      const menuOptions: { [key: string]: any } = {
        '1': {
          id: 'menu1',
          question: 'Admissions & Eligibility',
          answer: '📝 **Admissions & Eligibility**\n\n🎯 Eligibility: 10+2 with PCM (45% for general, 40% for SC/ST)\n📋 Entrance: AP EAMCET/JEE Main\n📅 Application: Online at apeamcet.nic.in\n💳 Application fee: ₹650 (₹450 for SC/ST)\n📊 Counseling: Web-based seat allotment\n\n*Type "2" for Departments or ask specific questions!*',
          category: 'admissions' as const,
          keywords: []
        },
        '2': {
          id: 'menu2',
          question: 'Departments & Programs',
          answer: '🎓 **Departments & Programs**\n\n💻 CSE | CSE (AI) | CSE (DS) | AIML\n⚡ ECE | EEE | Civil | Mechanical\n📊 MBA program also available\n\n🎯 Total seats: 1,440 engineering + 120 MBA\n\n*Type "3" for Faculty info or ask about specific departments!*',
          category: 'departments' as const,
          keywords: []
        },
        '3': {
          id: 'menu3',
          question: 'Faculty Information',
          answer: '👨‍🏫 **Faculty Information**\n\n🎓 Principal: Dr. G. Ratnakar Rao\n💻 CSE & CST: Dr. D. Jaya Kumari\n🤖 AIML & CAI & CSEDS: Dr. G. Loshma\n📡 ECE & ECT: Dr. E. Kusuma Kumari\n⚡ EEE: Dr. D. Sudha Rani\n🔧 Mechanical: Dr. M.V. Ramesh\n🏗️ Civil: Dr. G. Radha Krishna\n\n👨‍🏫 200+ experienced faculty | 80% with M.Tech/Ph.D\n\n*Type "4" for Facilities or ask specific questions!*',
          category: 'faculty' as const,
          keywords: []
        },
        '4': {
          id: 'menu4',
          question: 'Facilities & Infrastructure',
          answer: '🏢 **Facilities & Infrastructure**\n\n🏢 Smart classrooms with modern boards\n🔬 Advanced labs for all departments\n📚 Library with 50K+ books & e-resources\n🏠 Separate hostels (boys & girls)\n🚌 Transportation facility\n🏥 Medical center with qualified staff\n📶 Wi-Fi enabled campus\n\n*Type "5" for Placements or ask specific questions!*',
          category: 'facilities' as const,
          keywords: []
        },
        '5': {
          id: 'menu5',
          question: 'Placements & Careers',
          answer: '💼 **Placements & Careers**\n\n📈 85%+ placement rate\n💰 Highest: ₹44 LPA | Average: ₹4.5 LPA\n🏢 300+ companies visit annually\n🌟 Top recruiters: TCS, Infosys, Amazon, Microsoft\n\n🎯 Dedicated Training & Placement Cell\n📊 Strong industry partnerships\n\n*Type "6" for Fees or ask specific questions!*',
          category: 'placements' as const,
          keywords: []
        },
        '6': {
          id: 'menu6',
          question: 'Fees & Scholarships',
          answer: '💰 **Fees & Scholarships**\n\n💳 Annual tuition: ₹85,000-₹1.2L\n🏠 Hostel: ₹60,000/year (including food)\n🚌 Transport: ₹15,000/year\n\n🎓 Scholarships available:\n• Merit-based scholarships\n• Government schemes (fee reimbursement)\n• Financial assistance for needy students\n\n*Type "7" for Contact info or ask specific questions!*',
          category: 'fees' as const,
          keywords: []
        },
        '7': {
          id: 'menu7',
          question: 'Contact Information',
          answer: '📞 **Contact Information**\n\n🏢 Sri Vasavi Engineering College\nPedatadepalli, Tadepalligudem - 534101\nWest Godavari, Andhra Pradesh\n\n📞 Phone: +91-8818-284355/284356\n📠 Fax: +91-8818-284322\n✉️ Email: info@srivasaviengg.ac.in\n🌐 Website: www.srivasaviengg.ac.in\n\n*Type "1" to go back to menu or ask anything!*',
          category: 'contact' as const,
          keywords: []
        }
      };

      // Check if input is a menu number
      if (menuOptions[input]) {
        return res.status(200).json({
          success: true,
          data: menuOptions[input],
          confidence: 'high'
        });
      }

      // Handle menu command
      if (input.includes('menu') || input.includes('main menu') || input.includes('start') || input.includes('options')) {
        return res.status(200).json({
          success: true,
          data: {
            id: 'main_menu',
            question: 'Main Menu',
            answer: '👋 Welcome back to SVEC! Choose from the menu below:\n\n1️⃣ 📝 Admissions & Eligibility\n\n2️⃣ 🎓 Departments & Programs\n\n3️⃣ 👨‍🏫 Faculty Information\n\n4️⃣ 🏢 Facilities & Infrastructure\n\n5️⃣ 💼 Placements & Careers\n\n6️⃣ 💰 Fees & Scholarships\n\n7️⃣ 📞 Contact Information\n\n✨ Type the number or ask me anything directly!',
            category: 'general' as const,
            keywords: []
          },
          confidence: 'high'
        });
      }
      
      let bestMatch = null;
      let maxScore = 0;
      
      // Find the best matching FAQ
      for (const faq of faqDatabase) {
        let score = 0;
        
        // Check keyword matches
        for (const keyword of faq.keywords) {
          if (input.includes(keyword.toLowerCase())) {
            score += keyword.length; // Longer keywords get higher scores
          }
        }
        
        if (score > maxScore) {
          maxScore = score;
          bestMatch = faq;
        }
      }
      
      // If no good match found, return default response
      if (maxScore === 0) {
        bestMatch = {
          id: 'default',
          question: 'General Query',
          answer: 'Thank you for your question! For detailed information, please contact our admission office at 08818-284355 or visit www.srivasaviengg.ac.in',
          category: 'general' as const,
          keywords: []
        };
      }
      
      res.status(200).json({
        success: true,
        data: bestMatch,
        confidence: maxScore > 0 ? 'high' : 'low'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to process user input'
      });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({
      success: false,
      error: `Method ${req.method} not allowed`
    });
  }
}