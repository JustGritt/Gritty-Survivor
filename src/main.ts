import { k } from "./kaboomContext";
import { addEnemy } from "./enemy";
import { ENEMY_SPAWN_INTERVAL } from './contants';

// Handle mob spawn
const spawner = k.add([
    k.timer(),
])

spawner.loop(ENEMY_SPAWN_INTERVAL, () => {
	addEnemy()
})

k.debug.inspect = false