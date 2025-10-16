// API utility for authenticated requests

export async function authenticatedFetch(url: string, options: RequestInit = {}) {
  // Get session ID from localStorage
  const sessionId = typeof window !== 'undefined' ? localStorage.getItem('sessionId') : null;

  const headers = new Headers({
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  });

  // Add session ID header if session ID exists
  if (sessionId) {
    headers.set('x-session-id', sessionId);
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // If we get 401, the session might be expired
  if (response.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('sessionId');
      localStorage.removeItem('userData');
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