/**
 * Frontend Configuration
 * API endpoint configuration for connecting to backend
 */

const CONFIG = {
    API_BASE_URL: 'http://localhost:3000/api',
    ENDPOINTS: {
        activities: '/activities',
        missions: '/missions',
        nasa: '/nasa'
    }
};

// Helper function to build full API URLs
function getApiUrl(endpoint) {
    return `${CONFIG.API_BASE_URL}${endpoint}`;
}

console.log('🔗 API Configuration loaded');
console.log('📡 Backend URL:', CONFIG.API_BASE_URL);