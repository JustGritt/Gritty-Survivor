import { k } from "../kaboomContext";
import { player } from "../entities/player";
import { EXP_PER_KILL } from "./contants";

export let experienceCap = 100;
export function increaseXP(amount: number = EXP_PER_KILL) {
    player.experience += amount;
    exprienceBar.width = (player.experience / experienceCap) * k.width();

    if (player.experience >= experienceCap) {
        player.level++;
        player.experience = 0;
        experienceCap = Math.floor(experienceCap * 1.5);
    }
}

const exprienceBar = k.add([
    k.rect(0, 24),
    k.pos(0, 0),
    k.color(0, 255, 0),
]);