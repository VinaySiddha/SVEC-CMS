// API utility for authenticated requests

export async function authenticatedFetch(url: string, options: RequestInit = {}) {
  // Get token from localStorage
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add Authorization header if token exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // If we get 401, the token might be expired
  if (response.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      // Redirect to login
      window.location.href = '/auth/login';
    }
  }

  return response;
}

export async function apiGet(url: string) {
  return authenticatedFetch(url);
}

export async function apiPost(url: string, data: any) {
  return authenticatedFetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function apiPut(url: string, data: any) {
  return authenticatedFetch(url, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function apiDelete(url: string) {
  return authenticatedFetch(url, {
    method: 'DELETE',
  });
}