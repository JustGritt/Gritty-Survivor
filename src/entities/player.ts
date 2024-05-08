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
export let PLAYER_HEALING_INTERVAL = 10000;

export let BULLET_SPEED = 400;
export let BULLET_DAMAGE = 10;
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
		health: PLAYER_HEALTH,
		max_health: PLAYER_MAX_HEALTH,
		damage: BULLET_DAMAGE,
		movement_speed: PLAYER_SPEED,
		reload_interval: BULLET_COOLDOWN,
		healing_factor : PLAYER_HEALING_FACTOR,
		healing_interval: PLAYER_HEALING_INTERVAL,
	}
]);

// ==============================
// Handle shooting
// ==============================

let lastShotTime = 0;
export function shoot() {
    const shootBullet = (angle: number) => {
		const currentTime = Date.now();
		if (currentTime - lastShotTime >= player.reload_interval) {
			const bullet = k.add([
				k.rect(12, 12, {radius: 6}),
				k.pos(player.pos),
				k.area(),
				k.move(angle, BULLET_SPEED),
				"bullet",
				{
					damage: player.damage,
					critical_damage: player.damage * 2,
				}
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
            player.move(0, -player.movement_speed);
            cameraFollow();
        }
    });

    k.onKeyDown("q", () => {
        if (player.pos.x > 0) {
            player.move(-player.movement_speed, 0);
            cameraFollow();
        }
    });

    k.onKeyDown("s", () => {
        if (player.pos.y < MAP_HEIGHT - player.height) {
            player.move(0, player.movement_speed);
            cameraFollow();
        }
    });

    k.onKeyDown("d", () => {
        if (player.pos.x < MAP_WIDTH - player.width) {
            player.move(player.movement_speed, 0);
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
		healthBar.width = (player.health / player.max_health) * 100;

		// Hide health bar if player is at full health
		if(player.health >= player.max_health) {
			healthBar.width = 0;
		}

		// Update health bar color
		if (player.health / player.max_health > 0.5) {
			healthBar.color = k.Color.GREEN;
		} else if (player.health / player.max_health > 0.25) {
			healthBar.color = k.Color.YELLOW;
		} else {
			healthBar.color = k.Color.RED;
		}
	});

	// Heal player
	k.loop(1, () => {
		if(player.health < player.max_health && Date.now() - lastHitTime > player.healing_interval) {
			player.health = Math.min(player.health + player.healing_factor, player.max_health);
		}
	});
}

// ==============================
// Events
// ==============================

player.onCollide("enemy", (currentEnemy) => {
	k.addKaboom(player.pos)
	player.health -= currentEnemy.damage;
	lastHitTime = Date.now();
})
