/* ============================================
   SPACETRACK - WORKING CHARTS.JS
   ============================================ */

// Embedded fallback data
const FALLBACK_DATA = {
    asteroidData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        counts: [42, 38, 55, 61, 48, 72, 64, 70, 58, 63, 46, 39]
    },
    missionData: {
        labels: ["Planetary", "Earth Observation", "Heliophysics", "Astrophysics"],
        values: [12, 9, 7, 10]
    },
    exoplanetData: {
        years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
        discovered: [128, 154, 192, 210, 235, 280, 260, 300, 320]
    }
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, checking for chart canvases...');
    
    const asteroidCanvas = document.getElementById('asteroidChart');
    const missionCanvas = document.getElementById('missionChart');
    const exoplanetCanvas = document.getElementById('exoplanetChart');

    if (asteroidCanvas && missionCanvas && exoplanetCanvas) {
        console.log('All canvases found, initializing charts...');
        initCharts();
    } else {
        console.error('Chart canvases not found!');
    }
});

function initCharts() {
    // Try loading from JSON first, fallback to embedded data
    loadData()
        .then(data => {
            console.log('Data loaded successfully:', data);
            renderAllCharts(data);
        })
        .catch(error => {
            console.error('Error loading data:', error);
            console.log('Using fallback data...');
            renderAllCharts(FALLBACK_DATA);
        });
}

async function loadData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error('Failed to fetch data.json');
        return await response.json();
    } catch (error) {
        // Try alternative path
        try {
            const response = await fetch('./data.json');
            if (!response.ok) throw error;
            return await response.json();
        } catch (err) {
            throw error;
        }
    }
}

function renderAllCharts(data) {
    const colors = {
        primary: '#4f46e5',
        secondary: '#7c3aed',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        info: '#3b82f6',
        textLight: '#f8fafc',
        textMuted: '#94a3b8'
    };

    // Set Chart.js defaults
    Chart.defaults.color = colors.textLight;
    Chart.defaults.font.family = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";

    // Create all three charts
    createAsteroidChart(data.asteroidData, colors);
    createMissionChart(data.missionData, colors);
    createExoplanetChart(data.exoplanetData, colors);
    
    console.log('All charts created successfully!');
}

function createAsteroidChart(data, colors) {
    const ctx = document.getElementById('asteroidChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'NEOs Detected',
                data: data.counts,
                borderColor: colors.secondary,
                backgroundColor: 'rgba(124, 58, 237, 0.2)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: colors.secondary,
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    padding: 12,
                    titleColor: colors.textLight,
                    bodyColor: colors.textLight,
                    callbacks: {
                        label: (context) => `Asteroids: ${context.parsed.y}`
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(148, 163, 184, 0.1)'
                    },
                    ticks: {
                        color: colors.textMuted
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(148, 163, 184, 0.1)'
                    },
                    ticks: {
                        color: colors.textMuted
                    }
                }
            }
        }
    });
}

function createMissionChart(data, colors) {
    const ctx = document.getElementById('missionChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.values,
                backgroundColor: [
                    colors.secondary,
                    colors.info,
                    colors.warning,
                    colors.success
                ],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '60%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        color: colors.textMuted
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    padding: 12,
                    callbacks: {
                        label: (context) => {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

function createExoplanetChart(data, colors) {
    const ctx = document.getElementById('exoplanetChart').getContext('2d');
    
    // Calculate cumulative
    const cumulative = [];
    let sum = 0;
    data.discovered.forEach(val => {
        sum += val;
        cumulative.push(sum);
    });
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.years,
            datasets: [
                {
                    type: 'bar',
                    label: 'Annual Discoveries',
                    data: data.discovered,
                    backgroundColor: 'rgba(59, 130, 246, 0.6)',
                    borderColor: colors.info,
                    borderWidth: 2,
                    borderRadius: 4
                },
                {
                    type: 'line',
                    label: 'Cumulative Total',
                    data: cumulative,
                    borderColor: colors.primary,
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: colors.textMuted
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    padding: 12
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(148, 163, 184, 0.1)'
                    },
                    ticks: {
                        color: colors.textMuted
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(148, 163, 184, 0.1)'
                    },
                    ticks: {
                        color: colors.textMuted
                    }
                }
            }
        }
    });
}

console.log('Charts.js loaded successfully');