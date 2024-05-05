import { k } from "./kaboomContext";
import { addEnemy } from "./entity/enemy";
import { ENEMY_SPAWN_INTERVAL } from './utils/contants';

k.loop(ENEMY_SPAWN_INTERVAL, () => {
	addEnemy()
})

k.debug.inspect = true