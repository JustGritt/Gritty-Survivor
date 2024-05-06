// ==============================
// Map
// ==============================

export const MAP_WIDTH = 5000;
export const MAP_HEIGHT = 5000;

// ==============================
// Enemies
// ==============================

export const ENEMY_MAX_COUNT = 25;
export const ENEMY_SPAWN_INTERVAL = 0.5;

export const ENEMY_SNAKE = {
    sprite: "snake",
    speed: 150,
    health: 10,
    damage: 20,
    experience: 10,
    spawnChance: 1,
};

export const ENEMY_OCTOPUS = {
    sprite: "octopus",
    speed: 60,
    health: 30,
    damage: 10,
    experience: 10,
    spawnChance: 0.5,
};

export const ENEMY_EWE = {
    sprite: "ewe",
    speed: 100,
    health: 50,
    damage: 25,
    experience: 25,
    spawnChance: 0.25,
};

export const ENEMY_RAM = {
    sprite: "ram",
    speed: 80,
    health: 100,
    damage: 50,
    experience: 100,
    spawnChance: 0.05,
};