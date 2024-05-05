import { k } from "../kaboomContext";
import { PLAYER_SPEED, BULLET_SPEED } from '../utils/contants';

k.loadSprite("player", "./sprites/bean.png");

// Initialize player
export const player = k.add([
	k.sprite("player"),
	k.pos(k.center()),
	k.rotate(0),
	k.area(),
	k.anchor("center"),
	k.health(100),
	"player",
	{
		experience: 0,
		level: 1
	}
]);

player.setMaxHP(100);

// Handle movements
k.onKeyDown("left", () => {
	player.move(-PLAYER_SPEED, 0)
})

k.onKeyDown("right", () => {
	player.move(PLAYER_SPEED, 0)
})

k.onKeyDown("up", () => {
	player.move(0, -PLAYER_SPEED)
})

k.onKeyDown("down", () => {
	player.move(0, PLAYER_SPEED)
})

function shoot(direction = k.vec2(0)) {
	const bullet = k.add([
		k.pos(player.pos),
		k.move(direction, BULLET_SPEED),
		k.rect(12, 12),
		k.area(),
		k.offscreen({ destroy: true }),
		k.anchor("center"),
		k.color(k.BLUE),
		"bullet",
	])

	return bullet
}

k.onClick(() => {
	shoot(k.mousePos().sub(player.pos).unit())
})

// Display the player current maxHP
let maxHpLabel = k.add([
	k.text("MAX HP: " + player.maxHP()),
	k.pos(32, 32),
	k.fixed(),
	"health"
])

let currentHpLabel = k.add([
	k.text("HP: " + player.hp()),
	k.pos(32, 64),
	k.fixed(),
	"health"
])

export let healthBar = k.add([
    k.rect(100, 10),
    k.pos(player.pos.add(-50, -50)),
    k.color(0, 255, 0),
    k.fixed(),
    "health",
]);

function updateHealthBar(entity: any, damage: number) {
	const maxHP = player.maxHP();
	if (maxHP !== null) {
		const hpRatio = player.hp() / maxHP;
		healthBar.width = hpRatio * 100;
		// Update color based on health ratio
		if (hpRatio > 0.5) {
			healthBar.color = k.rgb(0, 255, 0);
		} else if (hpRatio > 0.25) {
			healthBar.color = k.rgb(255, 255, 0);
		} else {
			healthBar.color = k.rgb(255, 0, 0);
		}
		healthBar.use(k.rect(healthBar.width, 10));
	}
}

function hurtPlayer(amount: number) {
    k.addKaboom(player.pos)

    if (player.hp() <= 0) {
        player.destroy();
		return
    }
	player.hurt(amount);
    // Update health bar width and color
    updateHealthBar(player, amount)
}

// Update camera position to follow player
player.onUpdate(() => {
	k.camPos(player.pos)

	// Update the player maxHP text
	maxHpLabel.text = "MAX HP: " + player.maxHP()
	currentHpLabel.text = "HP: " + player.hp()
	updateHealthBar(player, 0)
})

// When a player hit an enemy, destroy the player
player.onCollide("enemy", () => {
	hurtPlayer(10)
})