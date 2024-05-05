import { k } from "../kaboomContext";
import { player } from "../entities/player";

export function cameraFollow() {
	k.camPos(player.pos)
}