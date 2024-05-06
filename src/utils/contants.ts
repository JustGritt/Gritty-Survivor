// Map
export const MAP_WIDTH = 5000;
export const MAP_HEIGHT = 5000;

// ==============================
// TODO: Refactor variables
// ==============================

// Enemies
export const ENEMY_SPEED = 80;
export const ENEMY_MAX_COUNT = 25;
export const ENEMY_SPAWN_INTERVAL = 0.5;
export const ENEMY_HEALTH = 30;

// Experience
export const EXP_PER_KILL = 10;
export const EXP_BAR_WIDTH = 100;


// ==============================
// Enemies
// ==============================

export const ENEMY_OCTOPUS = {
    sprite: "octopus",
    speed: 60,
    health: 30,
    damage: 10,
    experience: 10,
    spawnChance: 0.6,
};

export const ENEMY_SNAKE = {
    sprite: "snake",
    speed: 150,
    health: 10,
    damage: 20,
    experience: 10,
    spawnChance: 0.5,
};

export const ENEMY_EWE = {
    sprite: "ewe",
    speed: 120,
    health: 250,
    damage: 25,
    experience: 25,
    spawnChance: 0.3,
};

export const ENEMY_RAM = {
    sprite: "ram",
    speed: 80,
    health: 500,
    damage: 50,
    experience: 100,
    spawnChance: 0.1,
};