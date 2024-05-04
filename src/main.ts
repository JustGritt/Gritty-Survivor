import { k } from "./kaboomContext";
import { player } from "./player";
import { addEnemy } from "./enemy";

// Handle mob spawn
const spawner = k.add([
    k.timer(),
])

spawner.loop(2, () => {
	addEnemy(k.vec2(k.rand(0, k.width()), k.rand(0, k.height())))
})

k.debug.inspect = true