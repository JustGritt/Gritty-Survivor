import { k } from "../kaboomContext";
import { player } from "../entities/player";
import { EXP_PER_KILL } from "./contants";
import { pause, resume } from "./pause";

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

export function increaseXP(amount: number = EXP_PER_KILL) {
    player.experience += amount;
    if (player.experience >= experienceCap) {
        levelUp();
    }
}

export function levelUp () {
    player.level++;
    player.experience = 0;
    experienceCap = Math.floor(experienceCap * 1.5);

    pause();
    levelUpScreen();
}

// Open a gacha to increase player stats
export function levelUpScreen() {
    k.add([
        k.rect(k.width(), k.height()),
        k.color(0, 0, 0),
        k.fixed(),
        "levelUpScreen",
    ]);

    k.wait(3, () => {
        k.get("levelUpScreen").forEach(g => g.destroy());
        resume();
    });

}