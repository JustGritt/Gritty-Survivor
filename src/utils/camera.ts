import { k } from "../kaboomContext";
import { player } from "../entities/player";
import { MAP_WIDTH, MAP_HEIGHT } from '../utils/contants';

export function cameraFollow() {
    const camX = Math.min(
        Math.max(player.pos.x, k.width() / 2),
        MAP_WIDTH - k.width() / 2
    );
    const camY = Math.min(
        Math.max(player.pos.y, k.height() / 2),
        MAP_HEIGHT - k.height() / 2
    );

    k.camPos(camX, camY);
}