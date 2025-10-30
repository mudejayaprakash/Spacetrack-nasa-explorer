/**
 * API Service
 * Handles all HTTP requests to the backend
 */

const API = {
    // GET request
    async get(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('GET request failed:', error);
            throw error;
        }
    },

    // POST request
    async post(url, data) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('POST request failed:', error);
            throw error;
        }
    },

    // PUT request
    async put(url, data) {
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('PUT request failed:', error);
            throw error;
        }
    },

    // DELETE request
    async delete(url) {
        try {
            const response = await fetch(url, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('DELETE request failed:', error);
            throw error;
        }
    }
};

// Specific API calls for Activities
const ActivityAPI = {
    // Get all activities
    getAll: (query = '') => API.get(`${getApiUrl('/activities')}${query}`),
    
    // Get activity by ID
    getById: (id) => API.get(`${getApiUrl('/activities')}/${id}`),
    
    // Create new activity
    create: (data) => API.post(getApiUrl('/activities'), data),
    
    // Update activity
    update: (id, data) => API.put(`${getApiUrl('/activities')}/${id}`, data),
    
    // Delete activity
    delete: (id) => API.delete(`${getApiUrl('/activities')}/${id}`),
    
    // Search activities
    search: (query) => API.get(`${getApiUrl('/activities')}?search=${encodeURIComponent(query)}`)
};

// Specific API calls for Missions
const MissionAPI = {
    // Get all missions
    getAll: () => API.get(getApiUrl('/missions')),
    
    // Get mission by ID
    getById: (id) => API.get(`${getApiUrl('/missions')}/${id}`),
    
    // Get missions by status
    getByStatus: (status) => API.get(`${getApiUrl('/missions')}/status/${status}`)
};

console.log('✅ API Service loaded');