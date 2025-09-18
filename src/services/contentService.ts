
import { db } from '@/lib/firebase';
import { collection, getDocs, enableNetwork, disableNetwork } from 'firebase/firestore';

// Retry utility function
async function retryWithExponentialBackoff<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Only retry on network/connection errors
      if (error?.code === 'unavailable' || error?.code === 'deadline-exceeded' || 
          error?.message?.includes('Failed to establish connection') ||
          error?.message?.includes('net::ERR_ABORTED')) {
        const delay = baseDelay * Math.pow(2, attempt);
        console.warn(`Firebase operation failed (attempt ${attempt + 1}/${maxRetries + 1}), retrying in ${delay}ms...`, error);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      // Don't retry on other types of errors (auth, permission, etc.)
      throw error;
    }
  }
  throw new Error('Maximum retries exceeded');
}

// Default fallback content
const DEFAULT_HOME_CONTENT = {
  stats: [
    { "icon": "Users", "label": "Students", "value": "10000+" },
    { "icon": "Building", "label": "Labs", "value": "25+" },
    { "icon": "BookOpen", "label": "Courses", "value": "50+" },
    { "icon": "Users", "label": "Alumni", "value": "5000+" },
    { "icon": "Users", "label": "Clubs", "value": "10+" },
    { "icon": "Users", "label": "Events", "value": "100+" },
    { "icon": "Users", "label": "Research Papers", "value": "200+" },
    { "icon": "TrendingUp", "label": "Placements", "value": "90%" },
    { "icon": "Award", "label": "Accreditation", "value": "NAAC A" },
    { "icon": "Users", "label": "Faculty", "value": "350+" },
    { "icon": "Award", "label": "Years of Excellence", "value": "25+" },
    { "icon": "Building", "label": "Departments", "value": "12" }
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

export async function getHomePageContent() {
  try {
    console.log('Attempting to fetch home page content from Firestore...');
    
    // Try to enable network in case it's disabled
    try {
      await enableNetwork(db);
    } catch (networkError) {
      console.warn('Network enable failed (may already be enabled):', networkError);
    }

    const operation = async () => {
      const contentCollection = collection(db, 'homePageContent');
      return await getDocs(contentCollection);
    };

    const querySnapshot = await retryWithExponentialBackoff(operation, 2, 1000);
    
    if (querySnapshot.empty) {
      console.log('No documents found in homePageContent collection. Using default content.');
      return DEFAULT_HOME_CONTENT;
    }
    
    // Assuming a single document holds all home page content
    const docData = querySnapshot.docs[0].data();
    console.log('Successfully fetched home page content from Firestore');
    
    return {
      stats: docData.stats || DEFAULT_HOME_CONTENT.stats,
      quickLinks: docData.quickLinks || DEFAULT_HOME_CONTENT.quickLinks,
      news: docData.news || DEFAULT_HOME_CONTENT.news
    };

  } catch (error: any) {
    console.error("Error fetching home page content:", error);
    
    // Check if it's a Firebase-specific error
    if (error?.code) {
      console.error(`Firebase error code: ${error.code}, message: ${error.message}`);
    }
    
    // Always return default content to prevent UI breaks
    console.log('Falling back to default content due to Firebase error');
    return DEFAULT_HOME_CONTENT;
  }
}
