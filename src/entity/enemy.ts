import { k } from "../kaboomContext";
import { player } from "./player";
import { increaseScore } from "../utils/score";
import { ENEMY_HEALTH, ENEMY_SPEED, ENEMY_MAX_COUNT } from '../utils/contants';
import { increaseXP } from "../utils/experience";
import { initHealthBar } from "../utils/health";

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
        k.health(ENEMY_HEALTH),
        "enemy",
    ]);

    const enemyHealthBar = initHealthBar(enemy, 50);

    // const healthBar = enemy.add([
    //     k.rect(40, 8),
    //     k.pos(-20, -40),
    //     k.anchor('left'),
    //     k.color(0, 255, 0),
    //     "healthBar"
    // ]);

    function hurtEnemy(amount: number) {
        k.addKaboom(enemy.pos)

        if (enemy.hp() <= 0) {
            // player.destroy();
            return
        }
        enemy.hurt(amount);
        // Update health bar width and color
        // updateHealthBar(enemyHealthBar, amount);
    }

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

        hurtEnemy(10)
        if (enemy.hp() <= 0) {
            k.destroy(enemy)
            k.addKaboom(bullet.pos)
            enemyCount--;
            increaseXP()
            increaseScore()
        }
    })

    enemyCount++;
    return enemy
}
