// Safe JSON parsing utility to handle HTML error responses
export const safeJsonParse = async (response: Response) => {
  const text = await response.text();
  if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
    throw new Error('Server returned HTML error page instead of JSON data. This usually indicates an API route issue or authentication failure.');
  }
  
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error('Invalid JSON response from server');
  }
};

// Enhanced fetch with better error handling, caching, and performance optimizations
export const fetchWithErrorHandling = async (url: string, options: RequestInit = {}) => {
  // Add timeout and optimizations
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
  
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
      if (response.status === 401) {
        throw new Error('Authentication expired. Please login again.');
      }
      
      try {
        const errorObj = JSON.parse(errorText);
        const details = errorObj.details || 'Unknown error';
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
      throw error;
    }
    throw new Error('Unknown network error occurred');
  }
};