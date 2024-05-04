import { k } from "./kaboomContext";
import { player } from "./player";
import { increaseScore } from "./score";
import { ENEMY_HEALTH, ENEMY_SPEED, ENEMY_MAX_COUNT } from './contants';

k.loadSprite("enemy", "./sprites/ghosty.png");

let enemyCount = 0;
export function addEnemy() {
    if (k.get("enemy").length >= ENEMY_MAX_COUNT) return

    let position;
    do {
        position = player.pos.add(k.vec2(k.rand(-k.width(), k.width()), k.rand(-k.height(), k.height())));
    } while (k.camPos().sub(position).len() < k.width() / 2);

    const enemy = k.add([
        k.sprite("enemy"),
        k.pos(position),
        k.area(),
        k.anchor("center"),
        k.state("move", [ "idle", "move" ]),
        "enemy",
        {
            health: ENEMY_HEALTH,
            maxHealth: ENEMY_HEALTH
        }
    ]);

    const hpBar = enemy.add([
        k.rect(40, 8),
        k.color(0, 255, 0),
        k.pos(-20, -40), // Adjust the position so the HP bar is still above the enemy
        k.anchor('left'),
        "hpBar"
    ]);

    enemy.onStateEnter("idle", async () => {
        await k.wait(0.5)
        enemy.enterState("move")
    })

    enemy.onStateEnter("move", async () => {
        await k.wait(2)
        enemy.enterState("idle")
    })

    enemy.onStateUpdate("move", () => {
        if (!player.exists()) return
        const dir = player.pos.sub(enemy.pos).unit()
        enemy.move(dir.scale(ENEMY_SPEED))
    })

    enemy.onCollide("bullet", (bullet) => {
        k.destroy(bullet)
        enemy.health--;
        hpBar.width = (enemy.health / enemy.maxHealth) * 40;


        if (enemy.health / enemy.maxHealth > 0.5) {
            hpBar.color = k.rgb(0, 255, 0); // Green if health is more than 50%
        } else if (enemy.health / enemy.maxHealth > 0.25) {
            hpBar.color = k.rgb(255, 255, 0); // Yellow if health is between 25% and 50%
        } else {
            hpBar.color = k.rgb(255, 0, 0); // Red if health is less than 25%
        }

        if (enemy.health <= 0) { // If the enemy's health reaches zero, destroy the enemy
            k.destroy(enemy)
            k.addKaboom(bullet.pos)
            enemyCount--;

            increaseScore()
        }
    })

    enemyCount++;
    return enemy
}
