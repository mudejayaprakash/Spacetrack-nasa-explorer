// backend/src/controllers/nasaController.js
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';

// 1. Astronomy Picture of the Day
const getAPOD = async (req, res) => {
    try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`);
        const data = await response.json();
        
        res.json({
            success: true,
            data: data
        });
    } catch (error) {
        console.error('Error fetching APOD:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch Astronomy Picture of the Day',
            error: error.message
        });
    }
};

// 2. Near Earth Objects
const getNearEarthObjects = async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        const response = await fetch(
            `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${NASA_API_KEY}`
        );
        const data = await response.json();
        
        res.json({
            success: true,
            data: data
        });
    } catch (error) {
        console.error('Error fetching NEO:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch Near Earth Objects',
            error: error.message
        });
    }
};

// 3. ISS Current Location
const getISSLocation = async (req, res) => {
    try {
        const response = await fetch('http://api.open-notify.org/iss-now.json');
        const data = await response.json();
        
        res.json({
            success: true,
            data: data
        });
    } catch (error) {
        console.error('Error fetching ISS location:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch ISS location',
            error: error.message
        });
    }
};

// 4. TechPort Projects (NEW)
const getTechPortProjects = async (req, res) => {
    try {
        const { updatedSince } = req.query;
        
        // Get list of all project IDs
        let url = `https://api.nasa.gov/techport/api/projects`;
        if (updatedSince) {
            url += `?updatedSince=${updatedSince}`;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        
        // Get first 20 project details (to avoid too many requests)
        const projectIds = data.projects.slice(0, 20);
        const projectPromises = projectIds.map(project => 
            fetch(`https://api.nasa.gov/techport/api/projects/${project.projectId}`)
                .then(res => res.json())
                .catch(err => null)
        );
        
        const projects = await Promise.all(projectPromises);
        const validProjects = projects.filter(p => p && p.project);
        
        res.json({
            success: true,
            data: validProjects.map(p => p.project),
            total: data.projects.length
        });
    } catch (error) {
        console.error('Error fetching TechPort projects:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch NASA TechPort projects',
            error: error.message
        });
    }
};

// 5. TechPort Project Details (NEW)
const getTechPortProjectDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await fetch(`https://api.nasa.gov/techport/api/projects/${id}`);
        const data = await response.json();
        
        res.json({
            success: true,
            data: data.project
        });
    } catch (error) {
        console.error('Error fetching TechPort project details:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch project details',
            error: error.message
        });
    }
};

module.exports = {
    getAPOD,
    getNearEarthObjects,
    getISSLocation,
    getTechPortProjects,
    getTechPortProjectDetails
};