import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export interface FirebaseHealth {
  isConnected: boolean;
  error?: string;
  latency?: number;
}

/**
 * Test Firebase connection health
 */
export async function testFirebaseConnection(): Promise<FirebaseHealth> {
  const startTime = Date.now();
  
  try {
    // Try to write and read a test document
    const testDocRef = doc(db, 'health-check', 'connection-test');
    
    await setDoc(testDocRef, {
      timestamp: serverTimestamp(),
      test: true
    }, { merge: true });
    
    const docSnap = await getDoc(testDocRef);
    
    if (docSnap.exists()) {
      const latency = Date.now() - startTime;
      console.log(`Firebase connection successful, latency: ${latency}ms`);
      return {
        isConnected: true,
        latency
      };
    } else {
      throw new Error('Document read failed');
    }
  } catch (error: any) {
    console.error('Firebase connection test failed:', error);
    return {
      isConnected: false,
      error: error.message || 'Unknown error'
    };
  }
}

/**
 * Initialize Firebase with connection testing
 */
export async function initializeFirebaseWithHealthCheck(): Promise<boolean> {
  try {
    console.log('Testing Firebase connection...');
    const health = await testFirebaseConnection();
    
    if (health.isConnected) {
      console.log('✅ Firebase is connected and working properly');
      return true;
    } else {
      console.error('❌ Firebase connection failed:', health.error);
      return false;
    }
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error);
    return false;
  }
}

/**
 * Get Firebase connection status
 */
export async function getFirebaseStatus(): Promise<{
  status: 'connected' | 'disconnected' | 'error';
  message: string;
  details?: any;
}> {
  try {
    const health = await testFirebaseConnection();
    
    if (health.isConnected) {
      return {
        status: 'connected',
        message: `Connected successfully (latency: ${health.latency}ms)`,
        details: { latency: health.latency }
      };
    } else {
      return {
        status: 'error',
        message: health.error || 'Connection failed',
        details: { error: health.error }
      };
    }
  } catch (error: any) {
    return {
      status: 'disconnected',
      message: 'Failed to test connection',
      details: { error: error.message }
    };
  }
}