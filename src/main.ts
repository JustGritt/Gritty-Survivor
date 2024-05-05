import { k } from "./kaboomContext";
import { addEnemy } from "./entities/enemy";
import { ENEMY_SPAWN_INTERVAL } from './utils/contants';

import { player, shoot, move, healthBar } from "./entities/player";
import { displayDebugInfo } from "./utils/debug";

// Menu scene
k.scene("menu", () => {
    k.add([
        k.rect(k.width(), k.height()),
        k.color(0, 0, 0),
    ])

    k.add([
        k.text("Gritty Survivor"),
        k.pos(k.width() / 2, k.height() / 4),
        k.anchor("center"),
    ])

    k.add([
        k.text("Press space to start"),
        k.pos(k.width() / 2, k.height() / 2),
        k.anchor("center"),
        k.scale(2),
    ])

    k.onKeyPress("space", () => {
        k.go("game")
        k.addKaboom(player.pos)
    })
})

// Game scene
k.scene("game", () => {
    // Handle player
    k.add(player)
    move()
    shoot()
    healthBar()

    // Spawn enemies
    k.loop(ENEMY_SPAWN_INTERVAL, () => {
        addEnemy()
    })


    k.onUpdate(() => {
        k.onKeyDown("escape", () => {
            k.go("menu")
        });

        if(player.health <= 0) {
            k.go("gameOver")
        }
    })

    // Debug
    displayDebugInfo()
})

// Game over scene
k.scene("gameOver", () => {
    k.add([
        k.rect(k.width(), k.height()),
        k.color(0, 0, 0),
    ])

    k.add([
        k.text("Game Over"),
        k.pos(k.width() / 2, k.height() / 4),
        k.anchor("center"),
    ])

    k.add([
        k.text("Press space to restart"),
        k.pos(k.width() / 2, k.height() / 2),
        k.anchor("center"),
        k.scale(2),
    ])

    k.onKeyPress("space", () => {
        k.go("game")
    })
})

function start() {
	k.go("menu");
}

start()
k.debug.inspect = true