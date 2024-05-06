import { k } from "../kaboomContext";
import { player } from "./player";
import { increaseXP } from '../utils/experience';
import { ENEMY_MAX_COUNT, ENEMY_OCTOPUS, ENEMY_SNAKE, ENEMY_EWE, ENEMY_RAM } from '../utils/contants';

k.loadSprite("octopus", "./sprites/octopus.png");
k.loadSprite("snake", "./sprites/snake.png");
k.loadSprite("ewe", "./sprites/ewe.png");
k.loadSprite("ram", "./sprites/ram.png");

// ==============================
// Functions
// ==============================

function setSpawnLocation() {
    let position;
    do {
        position = player.pos.add(k.vec2(k.rand(-k.width(), k.width()), k.rand(-k.height(), k.height())))
    } while (k.camPos().sub(position).len() < k.width() / 2);
    return position;
}

function setEnemyType() {
    const enemyTypes = [
        { type: ENEMY_RAM, spawnChance: ENEMY_RAM.spawnChance },
        { type: ENEMY_EWE, spawnChance: ENEMY_EWE.spawnChance },
        { type: ENEMY_OCTOPUS, spawnChance: ENEMY_OCTOPUS.spawnChance },
        { type: ENEMY_SNAKE, spawnChance: ENEMY_SNAKE.spawnChance }
    ];

    enemyTypes.sort((a, b) => a.spawnChance - b.spawnChance);
    const roll = Math.random();
    const enemyType = enemyTypes.find(enemy => roll < enemy.spawnChance);
    return enemyType ? enemyType.type : enemyTypes[enemyTypes.length - 1].type;
}

// ==============================
// Handle enemy
// ==============================

export function spawnEnemy() {
    // Quick exit if we have reached the max number of enemies
    if (k.get("enemy").length >= ENEMY_MAX_COUNT) return;

    const enemyType = setEnemyType();
    const enemy = k.add([
        k.sprite(enemyType.sprite),
        k.pos(setSpawnLocation()),
        k.area(),
        k.anchor("center"),
        k.state("move", [ "idle", "move", "pause" ]),
        "enemy",
        enemyType.sprite,
        {
            health: enemyType.health,
            maxHealth: enemyType.health,
            speed: enemyType.speed,
        }
    ]);

    // ==============================
    // Handle health
    // ==============================

    const healthBar = k.add([
        k.rect(50, 8),
        k.pos(-25, -40),
        k.anchor('left'),
        k.color(0, 255, 0),
        "healthBar",
        {
            visible: false,
        }
    ]);

    k.onUpdate(() => {
        // Hide health bar if player is at full health
        if(enemy.health === enemy.maxHealth) {
            healthBar.width = 0;
        }

        // Update health bar of enemy
        healthBar.pos = enemy.pos.add(k.vec2(-25, -40));
    });

    // ==============================
    // States
    // ==============================

    enemy.onStateEnter("pause", () => {
        enemy.speed = 0;
    })

    enemy.onStateEnter("idle", async () => {
        await k.wait(0.5)
        if (enemy.state !== "pause") {
            enemy.enterState("move")
        }
    })

    enemy.onStateEnter("move", async () => {
        await k.wait(2)
        if (enemy.state !== "pause") {
            enemy.enterState("idle")
        }
    })

    enemy.onStateUpdate("move", () => {
        if (!player.exists()) return
        const dir = player.pos.sub(enemy.pos).unit()
        enemy.move(dir.scale(enemyType.speed))
    })

    // ==============================
    // Collision
    // ==============================

    enemy.onCollide("bullet", (bullet) => {
        k.destroy(bullet)
        enemy.health -= 10;

        // Destroy enemy if health is 0
        if (enemy.health <= 0) {
            k.destroy(enemy)
            k.addKaboom(enemy.pos)

            // Update score and experience
            increaseXP(enemyType.experience);
        }

        // Update enemy health bar
        healthBar.width = (enemy.health / enemy.maxHealth) * 50;
        if(enemy.health / enemy.maxHealth > 0.5) {
            healthBar.color = k.Color.GREEN;
        } else if(enemy.health / enemy.maxHealth > 0.25) {
            healthBar.color = k.Color.YELLOW;
        } else {
            healthBar.color = k.Color.RED;
        }
    })

    return enemy;
}
