import { k } from "./kaboomContext";
import { player } from "./player";
import { ENEMY_SPEED } from './contants';

k.loadSprite("enemy", "./sprites/ghosty.png");

export function addEnemy(position = k.vec2(0)) {
    const enemy = k.add([
        k.sprite("enemy"),
        k.pos(position),
        k.area(),
        k.anchor("center"),
        k.state("move", [ "idle", "move" ]),
        "enemy"
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
        k.destroy(enemy)
        k.addKaboom(bullet.pos)
    })

    return enemy
}

