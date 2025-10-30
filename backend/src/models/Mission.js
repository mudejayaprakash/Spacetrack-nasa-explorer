/**
 * Mission Model
 * Represents NASA space missions
 */

class Mission {
    constructor(data) {
        this.missionId = data.missionId;
        this.name = data.name;
        this.type = data.type;
        this.status = data.status;
        this.launchDate = data.launchDate || null;
        this.description = data.description || '';
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }

    // Convert to JSON
    toJSON() {
        return {
            missionId: this.missionId,
            name: this.name,
            type: this.type,
            status: this.status,
            launchDate: this.launchDate,
            description: this.description,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

// In-memory storage for missions
let missions = [
    new Mission({
        missionId: 1,
        name: 'Artemis I',
        type: 'Lunar',
        status: 'Completed',
        launchDate: '2022-11-16',
        description: 'Uncrewed Moon mission to test Orion spacecraft'
    }),
    new Mission({
        missionId: 2,
        name: 'Perseverance',
        type: 'Mars Rover',
        status: 'Active',
        launchDate: '2020-07-30',
        description: 'Mars rover searching for signs of ancient life'
    }),
    new Mission({
        missionId: 3,
        name: 'James Webb Space Telescope',
        type: 'Space Telescope',
        status: 'Active',
        launchDate: '2021-12-25',
        description: 'Most powerful space telescope ever built'
    }),
    new Mission({
        missionId: 4,
        name: 'Parker Solar Probe',
        type: 'Heliophysics',
        status: 'Active',
        launchDate: '2018-08-12',
        description: 'Studying the Sun\'s outer corona'
    }),
    new Mission({
        missionId: 5,
        name: 'Hubble Space Telescope',
        type: 'Space Telescope',
        status: 'Active',
        launchDate: '1990-04-24',
        description: 'Iconic space telescope observing the universe'
    }),
    new Mission({
        missionId: 6,
        name: 'International Space Station',
        type: 'Space Station',
        status: 'Active',
        launchDate: '1998-11-20',
        description: 'Habitable artificial satellite in low Earth orbit'
    }),
    new Mission({
        missionId: 7,
        name: 'Voyager 1',
        type: 'Interstellar',
        status: 'Active',
        launchDate: '1977-09-05',
        description: 'First spacecraft to enter interstellar space'
    }),
    new Mission({
        missionId: 8,
        name: 'Europa Clipper',
        type: 'Planetary',
        status: 'Planned',
        launchDate: '2024-10-10',
        description: 'Mission to study Jupiter\'s moon Europa'
    })
];

// Model methods (CRUD operations for missions)
const MissionModel = {
    // Get all missions
    findAll() {
        return missions.map(m => m.toJSON());
    },

    // Get mission by ID
    findById(missionId) {
        const mission = missions.find(m => m.missionId === parseInt(missionId));
        return mission ? mission.toJSON() : null;
    },

    // Get missions by status
    findByStatus(status) {
        return missions
            .filter(m => m.status.toLowerCase() === status.toLowerCase())
            .map(m => m.toJSON());
    },

    // Get missions by type
    findByType(type) {
        return missions
            .filter(m => m.type.toLowerCase() === type.toLowerCase())
            .map(m => m.toJSON());
    }
};

module.exports = MissionModel;