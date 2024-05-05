import { k } from "./kaboomContext";
import { addEnemy } from "./entities/enemy";
import { ENEMY_SPAWN_INTERVAL, MAP_WIDTH, MAP_HEIGHT } from './utils/contants';

import { player, shoot, move, healthBar } from "./entities/player";
import { displayDebugInfo } from "./utils/debug";

const newGame = () => {
    // Handle player
    k.add(player)
    move()
    shoot()
    healthBar()

    // Spawn the player in the middle of the map width and height
    player.pos = k.vec2(MAP_WIDTH / 2, MAP_HEIGHT / 2)
    player.health = 100
    player.level = 1
    player.experience = 0

    k.camPos(player.pos)
}

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

    // Background
    k.loadSprite("background", "scene/map.png")
    k.add([
        k.sprite("background"),
        k.pos(MAP_WIDTH / 2, MAP_HEIGHT / 2),
        // 100% width and height
        k.scale(MAP_WIDTH / 1000, MAP_HEIGHT / 1000),
        k.z(-1),
    ])

    // Handle player
    newGame()

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
// k.debug.inspect = true