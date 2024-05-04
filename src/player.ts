import { k } from "./kaboomContext";
import { PLAYER_SPEED, BULLET_SPEED } from './contants';

k.loadSprite("player", "./sprites/bean.png");

// Initialize player
export const player = k.add([
	k.sprite("player"),
	k.pos(k.center()),
	k.rotate(0),
	k.area(),
	k.anchor("center")
]);

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

// Update camera position to follow player
player.onUpdate(() => {
	k.camPos(player.pos)
})

// When a player hit an enemy, destroy the player
player.onCollide("enemy", () => {
	// k.addKaboom(player.pos)
	// player.destroy()
})