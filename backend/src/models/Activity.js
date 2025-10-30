/**
 * Activity Model
 * Represents space observation activities
 */

class Activity {
    constructor(data) {
        this.id = data.id;
        this.missionId = data.missionId;
        this.type = data.type;
        this.date = data.date;
        this.title = data.title;
        this.description = data.description || '';
        this.location = data.location || '';
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }

    // Convert to JSON
    toJSON() {
        return {
            id: this.id,
            missionId: this.missionId,
            type: this.type,
            date: this.date,
            title: this.title,
            description: this.description,
            location: this.location,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

// In-memory storage for activities
let activities = [
    new Activity({
        id: 1,
        missionId: 2,
        type: 'image',
        date: '2025-01-15',
        title: 'Jezero Crater panorama',
        description: 'High-resolution panoramic image of Jezero Crater',
        location: 'Mars - Jezero Crater'
    }),
    new Activity({
        id: 2,
        missionId: 3,
        type: 'observation',
        date: '2025-02-10',
        title: 'Deep field galaxy survey',
        description: 'Webb captures thousands of distant galaxies',
        location: 'Deep Space'
    }),
    new Activity({
        id: 3,
        missionId: 1,
        type: 'maneuver',
        date: '2024-12-05',
        title: 'Trans-lunar injection burn',
        description: 'Critical engine burn to reach lunar orbit',
        location: 'Earth-Moon Transfer'
    }),
    new Activity({
        id: 4,
        missionId: 4,
        type: 'instrument',
        date: '2025-03-20',
        title: 'Solar corona measurement',
        description: 'Temperature and density readings of solar corona',
        location: 'Solar Corona'
    }),
    new Activity({
        id: 5,
        missionId: 5,
        type: 'image',
        date: '2025-01-28',
        title: 'Carina Nebula observation',
        description: 'Stunning image of star-forming region',
        location: 'Carina Nebula'
    }),
    new Activity({
        id: 6,
        missionId: 2,
        type: 'sample',
        date: '2025-02-15',
        title: 'Rock core drilling Site A',
        description: 'Collected rock sample for analysis',
        location: 'Mars - Sample Site A'
    }),
    new Activity({
        id: 7,
        missionId: 6,
        type: 'observation',
        date: '2025-03-10',
        title: 'Earth atmospheric study',
        description: 'Climate monitoring from ISS',
        location: 'Low Earth Orbit'
    }),
    new Activity({
        id: 8,
        missionId: 3,
        type: 'image',
        date: '2025-04-01',
        title: 'Exoplanet spectrum analysis',
        description: 'Analyzing atmospheric composition of distant planet',
        location: 'Exoplanet TRAPPIST-1e'
    }),
    new Activity({
        id: 9,
        missionId: 2,
        type: 'image',
        date: '2025-04-12',
        title: 'Martian dust storm tracking',
        description: 'Monitoring regional dust storm movement',
        location: 'Mars - Syrtis Major'
    }),
    new Activity({
        id: 10,
        missionId: 7,
        type: 'instrument',
        date: '2025-03-25',
        title: 'Interstellar plasma reading',
        description: 'Measuring plasma density beyond solar system',
        location: 'Interstellar Space'
    })
];

let nextId = 11; // For auto-increment

// Model methods (CRUD operations)
const ActivityModel = {
    // CREATE - Add new activity
    create(data) {
        const newActivity = new Activity({
            id: nextId++,
            missionId: parseInt(data.missionId),
            type: data.type,
            date: data.date,
            title: data.title,
            description: data.description || '',
            location: data.location || ''
        });
        
        activities.push(newActivity);
        return newActivity.toJSON();
    },

    // READ - Get all activities
    findAll() {
        return activities.map(a => a.toJSON());
    },

    // READ - Get activity by ID
    findById(id) {
        const activity = activities.find(a => a.id === parseInt(id));
        return activity ? activity.toJSON() : null;
    },

    // READ - Get activities by mission ID
    findByMissionId(missionId) {
        return activities
            .filter(a => a.missionId === parseInt(missionId))
            .map(a => a.toJSON());
    },

    // READ - Get activities by type
    findByType(type) {
        return activities
            .filter(a => a.type.toLowerCase() === type.toLowerCase())
            .map(a => a.toJSON());
    },

    // UPDATE - Update activity by ID
    update(id, data) {
        const index = activities.findIndex(a => a.id === parseInt(id));
        
        if (index === -1) {
            return null;
        }

        // Update only provided fields
        activities[index] = new Activity({
            ...activities[index],
            ...data,
            id: parseInt(id), // Keep original ID
            updatedAt: new Date()
        });

        return activities[index].toJSON();
    },

    // DELETE - Remove activity by ID
    delete(id) {
        const index = activities.findIndex(a => a.id === parseInt(id));
        
        if (index === -1) {
            return false;
        }

        activities.splice(index, 1);
        return true;
    },


    // SEARCH - Search activities by query
    search(query) {
        const searchTerm = query.toLowerCase();
        const MissionModel = require('./Mission'); // Import mission model
    
        return activities
            .filter(a => {
            // Get mission name for this activity
                const mission = MissionModel.findById(a.missionId);
                const missionName = mission ? mission.name.toLowerCase() : '';
            
                    return (
                        a.title.toLowerCase().includes(searchTerm) ||
                        a.type.toLowerCase().includes(searchTerm) ||
                        a.description.toLowerCase().includes(searchTerm) ||
                        a.location.toLowerCase().includes(searchTerm) ||
                        missionName.includes(searchTerm) ||  // ← ADDED THIS LINE
                        a.id.toString().includes(searchTerm)
            );
        })
        .map(a => a.toJSON());
}
};

module.exports = ActivityModel;