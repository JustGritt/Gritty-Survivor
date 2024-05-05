import { k } from "../kaboomContext";
import { player } from "../entities/player";
import { EXP_PER_KILL } from "./contants";

export function increaseXP(amount: number = EXP_PER_KILL) {
    player.experience += amount;
    exprienceBar.width = (player.experience / 100) * k.width();

    if (player.experience >= 100) {
        player.level++;
        player.experience = 0;

        // player.setMaxHP(player.maxHP() + 10);
        // player.heal(player.maxHP() ?? 0);
    }
}

const exprienceBar = k.add([
    k.rect(0, 24),
    k.pos(0, 0),
    k.color(0, 255, 0),
]);