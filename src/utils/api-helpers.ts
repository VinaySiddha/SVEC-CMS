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

// Enhanced fetch with better error handling
export const fetchWithErrorHandling = async (url: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}):`, errorText);
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    return await safeJsonParse(response);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Fetch error:', error.message);
      throw error;
    }
    throw new Error('Unknown network error occurred');
  }
};