// Script to clear old JWT tokens and force re-authentication
// Run this in your browser console if you're still getting 401 errors

console.log('🔧 Clearing old authentication tokens...');

// Remove all old authentication-related items
localStorage.removeItem('authToken');
localStorage.removeItem('token');
localStorage.removeItem('jwt');
localStorage.removeItem('accessToken');
                
// Clear any existing session data as well to force fresh login
localStorage.removeItem('sessionId');
localStorage.removeItem('userData');

// Clear session storage too
sessionStorage.clear();

// Clear cookies that might contain tokens
document.cookie.split(";").forEach(function(c) { 
    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
});

console.log('✅ All tokens cleared!');
console.log('🔄 Redirecting to login page...');

// Force redirect to login
window.location.href = '/auth/login';