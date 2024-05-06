import { k } from "../kaboomContext";
import { cameraFollow } from '../utils/camera';
import { MAP_WIDTH, MAP_HEIGHT } from '../utils/contants';

k.loadSprite("player", "./sprites/turtle.png");

// ==============================
// Player stats
// ==============================

export let PLAYER_SPEED = 200;
export let PLAYER_HEALTH = 100;
export let PLAYER_MAX_HEALTH = 100;
export let PLAYER_HEALING_FACTOR = 1;
export let PLAYER_HEALING_INTERVAL = 3000;

export let BULLET_SPEED = 400;
export let BULLET_COOLDOWN = 1000;
export let BULLET_EXPIRATION = 5000;

// ==============================
// Handle health
// ==============================

// Initialize player
export const player = k.add([
	k.sprite("player"),
	k.pos(k.center()),
	k.area(),
	k.anchor("center"),
	"player",
	{
		level: 1,
		experience: 0,
		speed: PLAYER_SPEED,
		health: PLAYER_HEALTH,
		maxHealth: PLAYER_MAX_HEALTH,
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
				k.color(0, 0, 0),
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
        if (player.pos.y > 0) {
            player.move(0, -player.speed);
            cameraFollow();
        }
    });

    k.onKeyDown("q", () => {
        if (player.pos.x > 0) {
            player.move(-player.speed, 0);
            cameraFollow();
        }
    });

    k.onKeyDown("s", () => {
        if (player.pos.y < MAP_HEIGHT - player.height) {
            player.move(0, player.speed);
            cameraFollow();
        }
    });

    k.onKeyDown("d", () => {
        if (player.pos.x < MAP_WIDTH - player.width) {
            player.move(player.speed, 0);
            cameraFollow();
        }
    });
}

// ==============================
// Handle health
// ==============================

let lastHitTime = 0;
export const healthBar = () => {
	const healthBar = k.add([
		k.rect(100, 10),
		k.pos(player.pos.x - 50, player.pos.y - 50),
		k.color(0, 255, 0),
		"healthBar",
		{
			visible: false,
		}
	]);

	k.onUpdate(() => {
		healthBar.pos = player.pos.add(-50, -50);
		healthBar.width = (player.health / player.maxHealth) * 100;

		// Hide health bar if player is at full health
		if(player.health === player.maxHealth) {
			healthBar.width = 0;
		}

		// Update health bar color
		if (player.health / player.maxHealth > 0.5) {
			healthBar.color = k.Color.GREEN;
		} else if (player.health / player.maxHealth > 0.25) {
			healthBar.color = k.Color.YELLOW;
		} else {
			healthBar.color = k.Color.RED;
		}
	});

	// Heal player
	k.loop(1, () => {
		if(player.health < player.maxHealth && Date.now() - lastHitTime > PLAYER_HEALING_INTERVAL) {
			player.health += PLAYER_HEALING_FACTOR;
		}
	});
}

// ==============================
// Events
// ==============================

player.onCollide("enemy", () => {
	k.addKaboom(player.pos)
	player.health -= 10;
	lastHitTime = Date.now();
})

k.onUpdate(() => {
	// If player is colliding with an enemy
	k.get("enemy").forEach((enemy: any) => {
		if (player.isColliding(enemy)) {
			k.addKaboom(player.pos)
			player.health -= 10;
		}
	});
});