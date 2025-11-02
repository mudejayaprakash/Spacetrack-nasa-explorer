/**
 * API Helper Functions
 * Centralized API calls for Activities (Observations) and Missions (Projects)
 */

const ActivityAPI = {
    // CREATE
    create: async function(data) {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/activities`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('ActivityAPI.create error:', error);
            throw error;
        }
    },

    // READ all
    getAll: async function(filters = {}) {
        try {
            let url = `${CONFIG.API_BASE_URL}/activities`;
            
            const params = new URLSearchParams();
            if (filters.projectId) params.append('projectId', filters.projectId);
            if (filters.observationType) params.append('observationType', filters.observationType);
            if (filters.search) params.append('search', filters.search);
            
            if (params.toString()) {
                url += '?' + params.toString();
            }
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('ActivityAPI.getAll error:', error);
            throw error;
        }
    },

    // READ one
    getById: async function(id) {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/activities/${id}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('ActivityAPI.getById error:', error);
            throw error;
        }
    },

    // UPDATE
    update: async function(id, data) {
        try {
            console.log('Updating observation:', id, data); // Debug log
            
            const response = await fetch(`${CONFIG.API_BASE_URL}/activities/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            console.log('Update response status:', response.status); // Debug log
            
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Update error response:', errorData);
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('ActivityAPI.update error:', error);
            throw error;
        }
    },

    // DELETE
    delete: async function(id) {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/activities/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('ActivityAPI.delete error:', error);
            throw error;
        }
    }
};

const MissionAPI = {
    // CREATE
    create: async function(data) {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/missions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('MissionAPI.create error:', error);
            throw error;
        }
    },

    // READ all
    getAll: async function() {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/missions`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('MissionAPI.getAll error:', error);
            throw error;
        }
    },

    // READ one
    getById: async function(id) {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/missions/${id}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('MissionAPI.getById error:', error);
            throw error;
        }
    },

    // UPDATE
    update: async function(id, data) {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/missions/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('MissionAPI.update error:', error);
            throw error;
        }
    },

    // DELETE
    delete: async function(id) {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/missions/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('MissionAPI.delete error:', error);
            throw error;
        }
    }
};

console.log('✅ API helper loaded');