import { k } from "../kaboomContext";
import { cameraFollow } from '../utils/camera';
import { MAP_WIDTH, MAP_HEIGHT, PLAYER_SPEED, PLAYER_HEALING_FACTOR, PLAYER_HEALING_INTERVAL, BULLET_SPEED, BULLET_COOLDOWN, BULLET_EXPIRATION } from '../utils/contants';

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
	const enemies = k.get("enemy");
	enemies.forEach((enemy: any) => {
		if (player.isColliding(enemy)) {
			k.addKaboom(player.pos)
			player.health -= 10;
		}
	});
});