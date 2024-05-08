import { k } from "../kaboomContext";
import { player } from "../entities/player";
import { pause, resume } from "./pause";
import { LEVEL_UP_STATS } from "./contants";

// ==============================
// Variables
// ==============================

export let experienceCap = 100;

// ==============================
// Interface
// ==============================

export const experienceBar = () => {
	// Initialize experience bar (100% width, 10 height, yellow color)
	const experienceBar = k.add([
		k.rect(k.width(), 10),
		k.pos(0, 0),
		k.fixed(),
		k.color(255, 255, 0),
		"experienceBar",
	]);

	// Update experience bar width
	k.onUpdate(() => {
		experienceBar.width = player.experience * (k.width() / experienceCap)
	});

    return experienceBar;
}

// ==============================
// Functions
// ==============================

export function increaseXP(amount: number) {
    player.experience += amount;
    if (player.experience >= experienceCap) {
        levelUp();
    }
}

function increasePlayerStat(stat: string) {
    console.log(stat)
    switch (stat) {
        case "Health":
            if(player.max_health >= LEVEL_UP_STATS.health.cap) return;
            player.max_health += 10;
            player.health += 10;
            break;
        case "Damage":
            if(player.damage >= LEVEL_UP_STATS.damage.cap) return;
            player.damage += 10;
            break;
        case "Mov. Speed":
            if(player.movement_speed >= LEVEL_UP_STATS.movement_speed.cap) return;
            player.movement_speed += 10;
            break;
        case "Reload interval":
            if(player.reload_interval <= LEVEL_UP_STATS.reload_interval.cap) return;
            player.reload_interval -= 100;
            break;
        case "Healing factor":
            if(player.healing_factor >= LEVEL_UP_STATS.healing_factor.cap) return;
            player.healing_factor += 10;
            break;
        case "Healing interval":
            if(player.healing_interval <= LEVEL_UP_STATS.healing_interval.cap) return;
            player.healing_interval -= 100;
            break;
    }
}

export function levelUp () {
    player.level++;
    player.experience = 0;
    experienceCap = Math.floor(experienceCap * 1.5);

    // pause();
    levelUpScreen();
}

// Open a gacha to increase player stats
export function levelUpScreen() {

    pause();
    let curDialog = 0
    let gachaEnded = false;
    const playerStats = Object.values(LEVEL_UP_STATS).map(stat => stat.label);

    // Background
    k.add([
        k.rect(k.width(), k.height()),
        k.pos(0, 0),
        k.fixed(),
        k.color(0, 0, 0),
        k.opacity(0.7),
        "levelUpScreen",
    ]);

    k.add([
        k.rect(800, 800, { radius: 8 }),
        k.anchor("center"),
        k.pos(k.center()),
        k.outline(4),
        k.fixed(),
        "levelUpScreen",
    ]);

    const textbox = k.add([
        k.rect(400, 300, { radius: 16 }),
        k.anchor("center"),
        k.pos(k.center()),
        k.outline(4),
        k.fixed(),
        k.z(10),
        k.color(255, 255, 0),
        "levelUpScreen",
    ])

    // Text
    const txt = k.add([
        k.text("Press space to unlock", { size: 32, width: 400 - 50, align: "center" }),
        k.pos(textbox.pos),
        k.anchor("center"),
        k.color(0, 0, 0),
        k.fixed(),
        k.z(10),
        "levelUpScreen",
    ])

    k.onKeyPress("space", () => {
        if (gachaEnded) return;
        levelUpGacha()
    })

    function levelUpGacha() {
        txt.text = "Unlocking..."

        let intervalId = setInterval(() => {
            curDialog = Math.floor(Math.random() * playerStats.length);
            txt.text = playerStats[curDialog];
        }, 100);

        k.wait(3, () => {
            clearInterval(intervalId);
            txt.textSize = 64;
            increasePlayerStat(txt.text);
            gachaEnded = true;

            k.wait(1, () => {
                k.destroyAll("levelUpScreen");
                resume();
            })
        })
    }
}