/* ============================================
   SPACETRACK - MAIN JAVASCRIPT
   Navigation, Mobile Menu, CRUD Simulator
   ============================================ */

// ——————————————————————————————————————————
// MOBILE MENU TOGGLE
// ——————————————————————————————————————————
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Update aria-label for accessibility
            const isOpen = navLinks.classList.contains('active');
            menuBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                menuBtn.setAttribute('aria-label', 'Open menu');
            }
        });

        // Close mobile menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                menuBtn.setAttribute('aria-label', 'Open menu');
            });
        });
    }
});

// ——————————————————————————————————————————
// CRUD DROPDOWN TOGGLE
// ——————————————————————————————————————————
document.addEventListener('DOMContentLoaded', function() {
    const crudToggle = document.querySelector('.crud-toggle');
    const crudMenu = document.querySelector('.crud-menu');
    
    if (crudToggle && crudMenu) {
        crudToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = crudMenu.style.display === 'block';
            crudMenu.style.display = isOpen ? 'none' : 'block';
            crudToggle.setAttribute('aria-expanded', String(!isOpen));
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            crudMenu.style.display = 'none';
            crudToggle.setAttribute('aria-expanded', 'false');
        });

        // Prevent clicks inside menu from closing it
        crudMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});

// ——————————————————————————————————————————
// CRUD SIMULATOR - DUMMY DATA
// ——————————————————————————————————————————
window.CRUD = (function() {
    
    // NASA Missions Data
    const Missions = [
        { missionId: 1, name: 'Artemis I', type: 'Lunar', status: 'Completed' },
        { missionId: 2, name: 'Perseverance', type: 'Mars Rover', status: 'Active' },
        { missionId: 3, name: 'JWST', type: 'Space Telescope', status: 'Active' },
        { missionId: 4, name: 'Parker Solar Probe', type: 'Heliophysics', status: 'Active' },
        { missionId: 5, name: 'Hubble', type: 'Space Telescope', status: 'Active' },
        { missionId: 6, name: 'ISS', type: 'Space Station', status: 'Active' },
        { missionId: 7, name: 'Voyager 1', type: 'Interstellar', status: 'Active' },
        { missionId: 8, name: 'Europa Clipper', type: 'Planetary', status: 'Planned' }
    ];

    // Activities/Observations Data
    let Activities = [
        { id: 1, missionId: 2, type: 'image', date: '2025-01-15', title: 'Jezero Crater panorama' },
        { id: 2, missionId: 3, type: 'observation', date: '2025-02-10', title: 'Deep field galaxy survey' },
        { id: 3, missionId: 1, type: 'maneuver', date: '2024-12-05', title: 'Trans-lunar injection burn' },
        { id: 4, missionId: 4, type: 'instrument', date: '2025-03-20', title: 'Solar corona measurement' },
        { id: 5, missionId: 5, type: 'image', date: '2025-01-28', title: 'Carina Nebula observation' },
        { id: 6, missionId: 2, type: 'sample', date: '2025-02-15', title: 'Rock core drilling Site A' },
        { id: 7, missionId: 6, type: 'observation', date: '2025-03-10', title: 'Earth atmospheric study' },
        { id: 8, missionId: 3, type: 'image', date: '2025-04-01', title: 'Exoplanet spectrum analysis' },
        { id: 9, missionId: 2, type: 'image', date: '2025-04-12', title: 'Martian dust storm tracking' },
        { id: 10, missionId: 7, type: 'instrument', date: '2025-03-25', title: 'Interstellar plasma reading' }
    ];

    let nextId = 11; // For auto-increment

    // ——————————————————————————————————————————
    // CRUD OPERATIONS
    // ——————————————————————————————————————————

    // CREATE
    function createActivity(data) {
        const newActivity = {
            id: nextId++,
            missionId: data.missionId,
            type: data.type,
            date: data.date,
            title: data.title || '(untitled)'
        };
        Activities.push(newActivity);
        console.log('✅ Created:', newActivity);
        return newActivity.id;
    }

    // READ (List all)
    function listActivities() {
        return [...Activities]; // Return a copy
    }

    // READ (Get by ID)
    function getActivity(id) {
        return Activities.find(a => a.id === id) || null;
    }

    // UPDATE
    function updateActivity(id, updates) {
        const index = Activities.findIndex(a => a.id === id);
        if (index === -1) return false;
        
        Activities[index] = {
            ...Activities[index],
            ...updates,
            id: id // Ensure ID doesn't change
        };
        console.log('✅ Updated:', Activities[index]);
        return true;
    }

    // DELETE
    function deleteActivity(id) {
        const index = Activities.findIndex(a => a.id === id);
        if (index === -1) return false;
        
        const deleted = Activities.splice(index, 1)[0];
        console.log('✅ Deleted:', deleted);
        return true;
    }

    // ——————————————————————————————————————————
    // HELPER FUNCTIONS
    // ——————————————————————————————————————————

    // Get mission name by ID
    function missionName(missionId) {
        const mission = Missions.find(m => m.missionId === missionId);
        return mission ? mission.name : 'Unknown Mission';
    }

    // Get mission object by ID
    function getMission(missionId) {
        return Missions.find(m => m.missionId === missionId) || null;
    }

    // Render activities as HTML table
    function renderTable(container, activities, includeActions = true) {
        if (!container) return;
        
        if (activities.length === 0) {
            container.innerHTML = `
                <div class="notice">
                    <p style="margin: 0; text-align: center;">
                        <i class="fa-solid fa-inbox"></i> No activities found.
                    </p>
                </div>
            `;
            return;
        }

        let html = `
            <div class="table-wrapper">
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Mission</th>
                            <th>Type</th>
                            <th>Date</th>
                            <th>Title</th>
                            ${includeActions ? '<th class="right">Actions</th>' : ''}
                        </tr>
                    </thead>
                    <tbody>
        `;

        activities.forEach(activity => {
            html += `
                <tr data-id="${activity.id}">
                    <td><span class="badge">#${activity.id}</span></td>
                    <td>${missionName(activity.missionId)}</td>
                    <td>${activity.type}</td>
                    <td>${activity.date}</td>
                    <td>${activity.title}</td>
                    ${includeActions ? '<td class="right"></td>' : ''}
                </tr>
            `;
        });

        html += `
                    </tbody>
                </table>
            </div>
        `;

        container.innerHTML = html;
    }

    // ——————————————————————————————————————————
    // PUBLIC API
    // ——————————————————————————————————————————
    return {
        // Data
        Missions: Missions,
        
        // CRUD Operations
        createActivity: createActivity,
        listActivities: listActivities,
        getActivity: getActivity,
        updateActivity: updateActivity,
        deleteActivity: deleteActivity,
        
        // Helpers
        missionName: missionName,
        getMission: getMission,
        renderTable: renderTable
    };
})();

// ——————————————————————————————————————————
// SMOOTH SCROLL TO TOP
// ——————————————————————————————————————————
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ——————————————————————————————————————————
// LOG INITIALIZATION
// ——————————————————————————————————————————
console.log('🚀 SpaceTrack Main.js Loaded');
console.log('📊 Activities:', window.CRUD.listActivities().length);
console.log('🛰️ Missions:', window.CRUD.Missions.length);