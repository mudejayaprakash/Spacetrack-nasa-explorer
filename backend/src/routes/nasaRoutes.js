// backend/src/routes/nasaRoutes.js
const express = require('express');
const router = express.Router();
const nasaController = require('../controllers/nasaController');

// Existing NASA API routes
router.get('/apod', nasaController.getAPOD);
router.get('/neo', nasaController.getNearEarthObjects);
router.get('/iss-location', nasaController.getISSLocation);

// New TechPort route
router.get('/techport/projects', nasaController.getTechPortProjects);
router.get('/techport/projects/:id', nasaController.getTechPortProjectDetails);

module.exports = router;




// // backend/src/routes/nasaRoutes.js
// const express = require('express');
// const router = express.Router();

// const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';
// const NASA_BASE_URL = 'https://api.nasa.gov';

// // Helper function to fetch from NASA
// async function fetchNASA(endpoint) {
//     const fetch = (await import('node-fetch')).default;
//     const response = await fetch(endpoint);
//     if (!response.ok) {
//         throw new Error(`NASA API error: ${response.statusText}`);
//     }
//     return await response.json();
// }

// // 1. Astronomy Picture of the Day (APOD)
// router.get('/apod', async (req, res) => {
//     try {
//         const { date } = req.query;
//         let url = `${NASA_BASE_URL}/planetary/apod?api_key=${NASA_API_KEY}`;
//         if (date) url += `&date=${date}`;
        
//         console.log('📡 Fetching APOD from NASA...');
//         const data = await fetchNASA(url);
        
//         res.json({
//             success: true,
//             data: data,
//             source: 'NASA APOD API'
//         });
//         console.log('✅ APOD data sent successfully');
//     } catch (error) {
//         console.error('❌ APOD Error:', error.message);
//         res.status(500).json({
//             success: false,
//             message: 'Failed to fetch APOD',
//             error: error.message
//         });
//     }
// });

// // 2. Near Earth Objects (NEO)
// router.get('/neo', async (req, res) => {
//     try {
//         const today = new Date().toISOString().split('T')[0];
//         const url = `${NASA_BASE_URL}/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${NASA_API_KEY}`;
        
//         console.log('📡 Fetching NEO data from NASA...');
//         const data = await fetchNASA(url);
        
//         res.json({
//             success: true,
//             data: data,
//             source: 'NASA NEO API'
//         });
//         console.log('✅ NEO data sent successfully');
//     } catch (error) {
//         console.error('❌ NEO Error:', error.message);
//         res.status(500).json({
//             success: false,
//             message: 'Failed to fetch NEO data',
//             error: error.message
//         });
//     }
// });

// // 3. ISS Location (Real-time tracking)
// router.get('/iss-location', async (req, res) => {
//     try {
//         const url = 'http://api.open-notify.org/iss-now.json';
        
//         console.log('📡 Fetching ISS location...');
//         const data = await fetchNASA(url);
        
//         res.json({
//             success: true,
//             data: data,
//             source: 'Open Notify ISS API'
//         });
//         console.log('✅ ISS location sent successfully');
//     } catch (error) {
//         console.error('❌ ISS Error:', error.message);
//         res.status(500).json({
//             success: false,
//             message: 'Failed to fetch ISS location',
//             error: error.message
//         });
//     }
// });

// module.exports = router;