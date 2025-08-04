'use server';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export async function getHomePageContent() {
  try {
    const contentCollection = collection(db, 'homePageContent');
    const querySnapshot = await getDocs(contentCollection);
    
    if (querySnapshot.empty) {
      console.log('No documents found in homePageContent collection. Using default content.');
      // Return default content if nothing is in Firestore
      return {
        stats: [
          { "icon": "Users", "label": "Students", "value": "3000+" },
          { "icon": "Users", "label": "Faculty", "value": "150+" },
          { "icon": "Award", "label": "Years of Excellence", "value": "25+" },
          { "icon": "Building", "label": "Departments", "value": "8" }
        ],
        quickLinks: [
          { "title": "Academics", "desc": "Explore our comprehensive academic programs", "link": "/academics", "icon": "BookOpen" },
          { "title": "Admissions", "desc": "Join our community of future engineers", "link": "/admissions", "icon": "Users" },
          { "title": "Placements", "desc": "Excellent career opportunities await", "link": "/placements", "icon": "TrendingUp" },
          { "title": "Research", "desc": "Cutting-edge research and innovation", "link": "/rd-innovation", "icon": "Award" }
        ],
        news: [
          { "date": "2025-01-15", "title": "New AI Lab Inaugurated with State-of-the-Art Equipment", "category": "Infrastructure" },
          { "date": "2025-01-12", "title": "Students Win National Level Technical Symposium", "category": "Achievement" },
          { "date": "2025-01-10", "title": "Industry Partnership with Leading Tech Companies", "category": "Placements" },
          { "date": "2025-01-08", "title": "Research Paper Published in International Journal", "category": "Research" }
        ]
      };
    }
    
    // Assuming a single document holds all home page content
    const docData = querySnapshot.docs[0].data();
    return {
      stats: docData.stats || [],
      quickLinks: docData.quickLinks || [],
      news: docData.news || []
    };

  } catch (error) {
    console.error("Error fetching home page content: ", error);
    // Return default content in case of an error
    return {
        stats: [],
        quickLinks: [],
        news: []
    };
  }
}
