// Safe JSON parsing utility to handle HTML error responses
export const safeJsonParse = async (response: Response) => {
  const text = await response.text();
  
  // Check if response is HTML (error page)
  if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
    console.error('Received HTML instead of JSON:', text.substring(0, 200) + '...');
    throw new Error('Server returned HTML error page instead of JSON data. This usually indicates an API route issue or authentication failure.');
  }
  
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error('JSON parsing failed:', error);
    console.error('Response text:', text.substring(0, 200) + '...');
    throw new Error('Invalid JSON response from server');
  }
};

// Enhanced fetch with better error handling, caching, and performance optimizations
export const fetchWithErrorHandling = async (url: string, options: RequestInit = {}) => {
  // Add timeout and optimizations
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
  
  const optimizedOptions: RequestInit = {
    ...options,
    cache: 'no-store', // Disable fetch caching to prevent stale data
    signal: controller.signal,
    // Add connection reuse headers
    headers: {
      'Connection': 'keep-alive',
      'Keep-Alive': 'timeout=5, max=1000',
      ...options.headers,
    },
  };
  
  try {
    const response = await fetch(url, optimizedOptions);
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      const errorText = await response.text();
      // Include the requested URL and options for easier debugging
      try {
        console.error(`API Error (${response.status}) while requesting ${url}:`, errorText, {
          url,
          options
        });
      } catch (logError) {
        // Fallback logging if serialization fails
        console.error(`API Error (${response.status}):`, errorText);
      }
      
      // Special handling for 401 Unauthorized - likely expired token
      if (response.status === 401) {
        console.warn('🔐 Authentication failed - token may be expired');
        console.error('401 ERROR DETAILS:', { url, headers: options.headers });
        
        // Clear expired token from localStorage
        if (typeof window !== 'undefined') {
          const authToken = localStorage.getItem('authToken');
          if (authToken) {
            console.warn('Auth token exists but API returned 401. Token:', authToken.substring(0, 50) + '...');
            // DO NOT clear the token immediately - let AuthContext handle it
            // DO NOT redirect - let the component handle it
          } else {
            console.error('No auth token found in localStorage when API returned 401');
          }
        }
        
        throw new Error('Authentication expired. Please login again.');
      }
      
      // Try to parse error details from response
      try {
        const errorObj = JSON.parse(errorText);
        const details = errorObj.details || 'Unknown error';
        console.error('Error details from server:', {
          status: response.status,
          message: errorObj.error,
          details,
          stack: errorObj.stack
        });
        throw new Error(`API Error ${response.status}: ${errorObj.error} - ${details}`);
      } catch (parseError) {
        // If not JSON, throw generic error with status text
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }
    }
    
    return await safeJsonParse(response);
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - the server is taking too long to respond');
      }
      console.error('Fetch error:', error.message);
      throw error;
    }
    throw new Error('Unknown network error occurred');
  }
};