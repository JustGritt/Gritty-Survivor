import { k } from "./kaboomContext";
import { spawnEnemy } from "./entities/enemy";
import { ENEMY_SPAWN_INTERVAL, MAP_WIDTH, MAP_HEIGHT } from './utils/contants';

import { player, shoot, move, healthBar } from "./entities/player"
import { experienceBar } from "./utils/experience";
import { displayDebugInfo } from "./utils/debug";
import { isPaused, pause, resume } from "./utils/pause";

const newGame = () => {
    // Handle player
    k.add(player)
    move()
    shoot()
    healthBar()
    experienceBar()

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
        k.pos(0, 0),
        k.scale(MAP_WIDTH / 600, MAP_HEIGHT / 600),
        k.z(-1),
    ])

    // Handle player
    newGame()

    // Spawn enemies
    k.loop(ENEMY_SPAWN_INTERVAL, () => {
        if(!isPaused) {
            spawnEnemy()
        }
    })

    k.onUpdate(() => {
        k.onKeyDown("escape", () => {
            k.go("menu")
        });

        if(k.isKeyPressed("p")) {
            if(isPaused) {
                resume()
            } else {
                pause()
            }
        }

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