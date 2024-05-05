import { k } from "../kaboomContext";
import { player } from "./player";
import { increaseScore } from "../utils/score";
import { ENEMY_HEALTH, ENEMY_SPEED, ENEMY_MAX_COUNT } from '../utils/contants';
import { increaseXP } from "../utils/experience";

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

    const healthBar = enemy.add([
        k.rect(40, 8),
        k.pos(-20, -40),
        k.anchor('left'),
        k.color(0, 255, 0),
        "healthBar"
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
        healthBar.width = (enemy.health / enemy.maxHealth) * 40;


        if (enemy.health / enemy.maxHealth > 0.7) {
            healthBar.color = k.rgb(0, 255, 0);
        } else if (enemy.health / enemy.maxHealth > 0.25) {
            healthBar.color = k.rgb(255, 255, 0);
        } else {
            healthBar.color = k.rgb(255, 0, 0);
        }

        if (enemy.health <= 0) {
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
