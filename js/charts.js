/*
 * SpaceTrack - NASA Space Data Explorer
 * JavaScript File with Chart.js Integration
 * ISM6225 Assignment 3
 */

// ========================================
// DUMMY DATA FOR CHARTS
// ========================================

// Data for Line Chart - Near-Earth Asteroids Monthly Detection
const asteroidData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
        label: 'Asteroids Detected',
        data: [120, 145, 178, 156, 189, 203],
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: '#6366f1',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 8
    }]
};

// Data for Pie Chart - NASA Mission Distribution
const missionData = {
    labels: [
        'Earth Observation',
        'Mars Exploration',
        'Deep Space',
        'ISS Operations',
        'Lunar Research'
    ],
    datasets: [{
        label: 'Mission Distribution',
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
            '#1e40af', // Blue
            '#7c3aed', // Purple
            '#dc2626', // Red
            '#059669', // Green
            '#ea580c'  // Orange
        ],
        borderColor: '#fff',
        borderWidth: 3,
        hoverOffset: 15
    }]
};

// Data for Bar Chart - Exoplanet Discoveries by Year
const exoplanetData = {
    labels: ['2021', '2022', '2023', '2024', '2025'],
    datasets: [{
        label: 'Exoplanets Discovered',
        data: [285, 342, 468, 521, 608],
        backgroundColor: [
            'rgba(59, 130, 246, 0.8)',
            'rgba(79, 70, 229, 0.8)',
            'rgba(124, 58, 237, 0.8)',
            'rgba(168, 85, 247, 0.8)',
            'rgba(192, 132, 252, 0.8)'
        ],
        borderColor: [
            '#3b82f6',
            '#4f46e5',
            '#7c3aed',
            '#a855f7',
            '#c084fc'
        ],
        borderWidth: 2,
        borderRadius: 8,
        hoverBackgroundColor: [
            'rgba(59, 130, 246, 1)',
            'rgba(79, 70, 229, 1)',
            'rgba(124, 58, 237, 1)',
            'rgba(168, 85, 247, 1)',
            'rgba(192, 132, 252, 1)'
        ]
    }]
};

// ========================================
// CHART CONFIGURATION
// ========================================

// Configuration for Line Chart
const asteroidChartConfig = {
    type: 'line',
    data: asteroidData,
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: '#f8fafc',
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    padding: 20
                }
            },
            tooltip: {
                backgroundColor: 'rgba(30, 41, 59, 0.95)',
                titleColor: '#f8fafc',
                bodyColor: '#94a3b8',
                borderColor: '#6366f1',
                borderWidth: 2,
                padding: 12,
                displayColors: true,
                callbacks: {
                    label: function(context) {
                        return context.dataset.label + ': ' + context.parsed.y + ' asteroids';
                    }
                }
            },
            title: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(148, 163, 184, 0.1)',
                    borderColor: '#94a3b8'
                },
                ticks: {
                    color: '#94a3b8',
                    font: {
                        size: 12
                    },
                    callback: function(value) {
                        return value + ' asteroids';
                    }
                }
            },
            x: {
                grid: {
                    color: 'rgba(148, 163, 184, 0.1)',
                    borderColor: '#94a3b8'
                },
                ticks: {
                    color: '#94a3b8',
                    font: {
                        size: 12
                    }
                }
            }
        },
        interaction: {
            intersect: false,
            mode: 'index'
        }
    }
};

// Configuration for Pie Chart
const missionChartConfig = {
    type: 'pie',
    data: missionData,
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: '#f8fafc',
                    font: {
                        size: 13
                    },
                    padding: 15,
                    generateLabels: function(chart) {
                        const data = chart.data;
                        if (data.labels.length && data.datasets.length) {
                            return data.labels.map((label, i) => {
                                const value = data.datasets[0].data[i];
                                const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return {
                                    text: `${label}: ${percentage}%`,
                                    fillStyle: data.datasets[0].backgroundColor[i],
                                    hidden: false,
                                    index: i
                                };
                            });
                        }
                        return [];
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(30, 41, 59, 0.95)',
                titleColor: '#f8fafc',
                bodyColor: '#94a3b8',
                borderColor: '#6366f1',
                borderWidth: 2,
                padding: 12,
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.parsed;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${label}: ${value} missions (${percentage}%)`;
                    }
                }
            }
        }
    }
};

// Configuration for Bar Chart
const exoplanetChartConfig = {
    type: 'bar',
    data: exoplanetData,
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: '#f8fafc',
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    padding: 20
                }
            },
            tooltip: {
                backgroundColor: 'rgba(30, 41, 59, 0.95)',
                titleColor: '#f8fafc',
                bodyColor: '#94a3b8',
                borderColor: '#6366f1',
                borderWidth: 2,
                padding: 12,
                callbacks: {
                    label: function(context) {
                        return context.dataset.label + ': ' + context.parsed.y + ' planets';
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(148, 163, 184, 0.1)',
                    borderColor: '#94a3b8'
                },
                ticks: {
                    color: '#94a3b8',
                    font: {
                        size: 12
                    },
                    callback: function(value) {
                        return value + ' planets';
                    }
                }
            },
            x: {
                grid: {
                    display: false,
                    borderColor: '#94a3b8'
                },
                ticks: {
                    color: '#94a3b8',
                    font: {
                        size: 12
                    }
                }
            }
        }
    }
};

// ========================================
// CHART INITIALIZATION
// ========================================

let asteroidChart = null;
let missionChart = null;
let exoplanetChart = null;

function initializeCharts() {
    // Destroy existing charts if they exist
    if (asteroidChart) asteroidChart.destroy();
    if (missionChart) missionChart.destroy();
    if (exoplanetChart) exoplanetChart.destroy();

    // Get canvas contexts
    const asteroidCtx = document.getElementById('asteroidChart');
    const missionCtx = document.getElementById('missionChart');
    const exoplanetCtx = document.getElementById('exoplanetChart');

    // Create new charts only if the elements exist
    if (asteroidCtx) {
        asteroidChart = new Chart(asteroidCtx, asteroidChartConfig);
    }

    if (missionCtx) {
        missionChart = new Chart(missionCtx, missionChartConfig);
    }

    if (exoplanetCtx) {
        exoplanetChart = new Chart(exoplanetCtx, exoplanetChartConfig);
    }
}

// ========================================
// PAGE NAVIGATION
// ========================================

function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page-section');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
        
        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Initialize charts if on data visualization page
        if (pageId === 'data') {
            // Small delay to ensure DOM is ready
            setTimeout(() => {
                initializeCharts();
            }, 100);
        }
    }

    // Close mobile menu if open
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.classList.remove('active');
    }
}

// ========================================
// MOBILE MENU TOGGLE
// ========================================

function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

// ========================================
// INITIALIZE ON PAGE LOAD
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('SpaceTrack Application Loaded');
    
    // Set home as default page
    showPage('home');

    // Add event listeners to navigation links
    const homeLinks = document.querySelectorAll('a[href="#"]');
    homeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });

    // Handle window resize for chart responsiveness
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Check if charts exist and current page is data visualization
            const dataPage = document.getElementById('data');
            if (dataPage && dataPage.classList.contains('active')) {
                if (asteroidChart) asteroidChart.resize();
                if (missionChart) missionChart.resize();
                if (exoplanetChart) exoplanetChart.resize();
            }
        }, 250);
    });

    console.log('All event listeners initialized');
});

// ========================================
// ADDITIONAL HELPER FUNCTIONS
// ========================================

// Function to update chart data (for future API integration)
function updateChartData(chartName, newData) {
    let chart;
    
    switch(chartName) {
        case 'asteroid':
            chart = asteroidChart;
            break;
        case 'mission':
            chart = missionChart;
            break;
        case 'exoplanet':
            chart = exoplanetChart;
            break;
        default:
            console.error('Chart not found:', chartName);
            return;
    }

    if (chart) {
        chart.data = newData;
        chart.update('active');
        console.log(`${chartName} chart updated successfully`);
    }
}

// Function to export chart as image (bonus feature)
function exportChart(chartName) {
    let chart;
    
    switch(chartName) {
        case 'asteroid':
            chart = asteroidChart;
            break;
        case 'mission':
            chart = missionChart;
            break;
        case 'exoplanet':
            chart = exoplanetChart;
            break;
        default:
            console.error('Chart not found:', chartName);
            return;
    }

    if (chart) {
        const url = chart.toBase64Image();
        const link = document.createElement('a');
        link.download = `${chartName}-chart.png`;
        link.href = url;
        link.click();
    }
}

// Function to refresh all charts (useful for API updates)
function refreshAllCharts() {
    if (asteroidChart) asteroidChart.update();
    if (missionChart) missionChart.update();
    if (exoplanetChart) exoplanetChart.update();
    console.log('All charts refreshed');
}

// ========================================
// CONSOLE INFO
// ========================================

console.log('%c SpaceTrack - NASA Data Explorer ', 'background: #4f46e5; color: #fff; font-size: 16px; padding: 10px; border-radius: 5px;');
console.log('%c Dummy Data Loaded Successfully! ', 'background: #10b981; color: #fff; font-size: 12px; padding: 5px;');
console.log('Available Charts:', {
    'Asteroid Detection': asteroidData,
    'Mission Distribution': missionData,
    'Exoplanet Discoveries': exoplanetData
});

// ========================================
// FUTURE API INTEGRATION EXAMPLE
// ========================================

/*
// Example function for NASA API integration (for final project)

async function fetchNASAData() {
    try {
        // NASA NEO API
        const neoResponse = await fetch('https://api.nasa.gov/neo/rest/v1/feed?start_date=2025-01-01&end_date=2025-01-07&api_key=DEMO_KEY');
        const neoData = await neoResponse.json();
        
        // Process and update asteroid chart
        console.log('NASA NEO Data:', neoData);
        
        // Mars Rover Photos API
        const marsResponse = await fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY');
        const marsData = await marsResponse.json();
        
        console.log('Mars Rover Data:', marsData);
        
        // Astronomy Picture of the Day
        const apodResponse = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
        const apodData = await apodResponse.json();
        
        console.log('APOD Data:', apodData);
        
    } catch (error) {
        console.error('Error fetching NASA data:', error);
    }
}

// Uncomment to test API (requires valid API key)
// fetchNASAData();
*/