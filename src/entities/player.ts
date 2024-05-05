import { k } from "../kaboomContext";
import { cameraFollow } from '../utils/camera';
import { PLAYER_SPEED, BULLET_SPEED, BULLET_COOLDOWN, BULLET_EXPIRATION } from '../utils/contants';

k.loadSprite("player", "./sprites/bean.png");

// Initialize player
export const player = k.add([
	k.sprite("player"),
	k.pos(k.center()),
	k.rotate(0),
	k.area(),
	k.anchor("center"),
	"player",
	{
		level: 1,
		experience: 0,
		health: 100,
		maxHealth: 100,
		speed: PLAYER_SPEED,
	}
]);

// ==============================
// Handle shooting
// ==============================

let lastShotTime = 0;
export function shoot() {
    const shootBullet = (angle: number) => {
		const currentTime = Date.now();
		if (currentTime - lastShotTime >= BULLET_COOLDOWN) {
			const bullet = k.add([
				k.rect(12, 12),
				k.pos(player.pos),
				k.area(),
				k.move(angle, BULLET_SPEED),
				k.outline(1),
				k.color(0, 0, 1),
				"bullet",
			]);
			lastShotTime = currentTime;

			setTimeout(() => {
				k.destroy(bullet);
			}, BULLET_EXPIRATION);

			return bullet;
		}
	};

    k.onKeyDown("up", () => shootBullet(270));
    k.onKeyDown("left", () => shootBullet(180));
    k.onKeyDown("down", () => shootBullet(90));
    k.onKeyDown("right", () => shootBullet(0));
}

// ==============================
// Handle movements
// ==============================

export const move = () => {
    k.onKeyDown("z", () => {
        player.move(0, -player.speed);
		cameraFollow();
    });

    k.onKeyDown("q", () => {
        player.move(-player.speed, 0);
		cameraFollow();
    });

    k.onKeyDown("s", () => {
        player.move(0, player.speed);
		cameraFollow();
    });

    k.onKeyDown("d", () => {
        player.move(player.speed, 0);
		cameraFollow();
    });
}

// ==============================
// Handle health
// ==============================

export const healthBar = () => {
	const healthBar = k.add([
		k.rect(100, 10),
		k.pos(player.pos.x - 50, player.pos.y - 50),
		k.color(0, 255, 0),
		k.fixed(),
		"healthBar",
	]);

	k.onUpdate(() => {
		healthBar.width = (player.health / player.maxHealth) * 100;
	});
}

// ==============================
// Events
// ==============================

player.onCollide("enemy", () => {
	k.addKaboom(player.pos)
	player.health -= 10;
})