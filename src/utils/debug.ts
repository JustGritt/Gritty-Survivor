import { k } from "../kaboomContext";
import { player } from '../entities/player';
import { experienceCap } from '../utils/experience';

export function mousePosition(y: number) {
    k.add([
        k.text("Mouse position: " + k.mousePos().toString()),
        k.pos(32, y),
        k.fixed(),
        "mousePosition",
    ]);

    k.onUpdate(() => {
        k.get("mousePosition")[0].text = "Mouse position: " + k.mousePos().x.toString() + " " + k.mousePos().y.toString();
    })
}

export function shootingAngle(y: number) {
    k.add([
        k.text("Direction: " + k.mousePos().sub(player.pos).unit().toString()),
        k.pos(32, y),
        k.fixed(),
        "angle",
    ]);

    k.onUpdate(() => {
        const angle = ((Math.atan2(k.mousePos().y - player.pos.y, k.mousePos().x - player.pos.x) * (180 / Math.PI) + 360) % 360);
        k.get("angle")[0].text = "Angle: " + angle;
    })
}

export function playerPosition(y: number) {
    k.add([
        k.text("Player position: " + player.pos.toString()),
        k.pos(32, y),
        k.fixed(),
        "playerPosition",
    ]);

    k.onUpdate(() => {
        k.get("playerPosition")[0].text = "Player position: " + player.pos.toString();
    })
}

export function playerHealth(y: number) {
    k.add([
        k.text("Player health: " + player.health),
        k.pos(32, y),
        k.fixed(),
        "playerHealth",
    ]);

    k.onUpdate(() => {
        k.get("playerHealth")[0].text = "Player health: " + player.health;
    })
}

export function playerMaxHealth(y: number) {
    k.add([
        k.text("Player max health: " + player.max_health),
        k.pos(32, y),
        k.fixed(),
        "playerMaxHealth",
    ]);

    k.onUpdate(() => {
        k.get("playerMaxHealth")[0].text = "Player max health: " + player.max_health;
    })
}

export function playerDamage(y: number) {
    k.add([
        k.text("Player damage: " + player.damage),
        k.pos(32, y),
        k.fixed(),
        "playerDamage",
    ]);

    k.onUpdate(() => {
        k.get("playerDamage")[0].text = "Player damage: " + player.damage;
    })
}

export function playerMovementSpeed(y: number) {
    k.add([
        k.text("Player speed: " + player.movement_speed),
        k.pos(32, y),
        k.fixed(),
        "playerMovementSpeed",
    ]);

    k.onUpdate(() => {
        k.get("playerMovementSpeed")[0].text = "Player speed: " + player.movement_speed;
    })
}

export function playerReloadSpeed(y: number) {
    k.add([
        k.text("Player reload speed: " + player.reload_interval),
        k.pos(32, y),
        k.fixed(),
        "playerReloadSpeed",
    ]);

    k.onUpdate(() => {
        k.get("playerReloadSpeed")[0].text = "Player reload speed: " + player.reload_interval;
    })
}

export function playerHealingFactor(y: number) {
    k.add([
        k.text("Player healing factor: " + player.healing_factor),
        k.pos(32, y),
        k.fixed(),
        "playerHealingFactor",
    ]);

    k.onUpdate(() => {
        k.get("playerHealingFactor")[0].text = "Player healing factor: " + player.healing_factor;
    })
}

export function playerHealingInterval(y: number) {
    k.add([
        k.text("Player healing interval: " + player.healing_interval),
        k.pos(32, y),
        k.fixed(),
        "playerHealingInterval",
    ]);

    k.onUpdate(() => {
        k.get("playerHealingInterval")[0].text = "Player healing interval: " + player.healing_interval;
    })
}

export function numberOfEnemies(y: number) {
    k.add([
        k.text("Number of enemies: " + k.get("enemy").length),
        k.pos(32, y),
        k.fixed(),
        "numberOfEnemies",
    ]);

    k.onUpdate(() => {
        k.get("numberOfEnemies")[0].text = "Number of enemies: " + k.get("enemy").length;
    })
}

export function playerExperience(y: number) {
    k.add([
        k.text("Experience: " + player.experience),
        k.pos(32, y),
        k.fixed(),
        "experience",
    ]);

    k.onUpdate(() => {
        k.get("experience")[0].text = "Experience: " + player.experience;
    })
}

export function playerLevel(y: number) {
    k.add([
        k.text("Level: " + player.level),
        k.pos(32, y),
        k.fixed(),
        "level",
    ]);

    k.onUpdate(() => {
        k.get("level")[0].text = "Level: " + player.level;
    })
}

export function playerExperienceCap(y: number) {
    k.add([
        k.text("Experience cap: " + experienceCap),
        k.pos(32, y),
        k.fixed(),
        "experienceCap",
    ]);

    k.onUpdate(() => {
        k.get("experienceCap")[0].text = "Experience cap: " + experienceCap;
    })
}

export function displayEnemyType(y: number) {
    k.add([
        k.text("Number of enemies: " + k.get("enemy").length),
        k.pos(32, y),
        k.fixed(),
        "enemyTypes",
    ]);

    k.onUpdate(() => {
        k.get("enemyTypes")[0].text = "Snakes: " + k.get("snake").length + " Octopuses: " + k.get("octopus").length + " Ewes: " + k.get("ewe").length + " Ram: " + k.get("ram").length;
    })
}


export function displayDebugInfo() {
    const debugFunctions = [
        // mousePosition,
        // shootingAngle,
        playerPosition,
        playerHealth,
        playerMaxHealth,
        playerDamage,
        playerMovementSpeed,
        playerReloadSpeed,
        playerHealingFactor,
        playerHealingInterval,
        playerLevel,
        playerExperience,
        playerExperienceCap,
        numberOfEnemies,
        displayEnemyType,
    ];
    let y = 32;

    debugFunctions.forEach(debugFunction => {
        debugFunction(y);
        y += 40;
    });
}