// ==============================
// Map
// ==============================

export const MAP_WIDTH = 5000;
export const MAP_HEIGHT = 5000;

// ==============================
// Enemies
// ==============================

export const LEVEL_UP_STATS = {
    "health": {
        "label": "Health",
        "value": 10,
        "cap": 9999,
    },
    "damage": {
        "label": "Damage",
        "value": 10,
        "cap": 9999,
    },
    "movement_speed": {
        "label": "Mov. Speed",
        "value": 10,
        "cap": 1000,
    },
    "reload_interval": {
        "label": "Reload interval",
        "value": 10,
        "cap": 500,
    },

    "healing_factor": {
        "label": "Healing factor",
        "value": 5,
        "cap": 100,
    },
    "healing_interval": {
        "label": "Healing interval",
        "value": 100,
        "cap": 1000,
    },
}

// ==============================
// Enemies
// ==============================

export const ENEMY_MAX_COUNT = 50;
export const ENEMY_SPAWN_INTERVAL = 0.5;

export const ENEMY_SNAKE = {
    sprite: "snake",
    speed: 180,
    health: 10,
    damage: 10,
    experience: 10,
    spawnChance: 1,
};

export const ENEMY_OCTOPUS = {
    sprite: "octopus",
    speed: 150,
    health: 30,
    damage: 15,
    experience: 25,
    spawnChance: 0.5,
};

export const ENEMY_EWE = {
    sprite: "ewe",
    speed: 150,
    health: 50,
    damage: 25,
    experience: 50,
    spawnChance: 0.2,
};

export const ENEMY_RAM = {
    sprite: "ram",
    speed: 100,
    health: 100,
    damage: 50,
    experience: 100,
    spawnChance: 0.05,
};