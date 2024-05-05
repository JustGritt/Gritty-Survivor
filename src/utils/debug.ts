import { k } from "../kaboomContext";
import { player } from '../entities/player';

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
        k.text("Player max health: " + player.maxHealth),
        k.pos(32, y),
        k.fixed(),
        "playerMaxHealth",
    ]);

    k.onUpdate(() => {
        k.get("playerMaxHealth")[0].text = "Player max health: " + player.maxHealth;
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

export function displayDebugInfo() {
    const debugFunctions = [
        mousePosition,
        shootingAngle,
        playerPosition,
        playerHealth,
        playerMaxHealth,
        numberOfEnemies,
        playerExperience,
        playerLevel,
    ];
    let y = 32;

    debugFunctions.forEach(debugFunction => {
        debugFunction(y);
        y += 40;
    });
}