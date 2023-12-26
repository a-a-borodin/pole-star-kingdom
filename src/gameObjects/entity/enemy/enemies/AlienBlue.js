import Enemy from '/src/gameObjects/entity/enemy/Enemy.js';
import Enemies from '/src/gameObjects/entity/enemy/Enemies.js';

class AlienBlue extends Enemy {
    constructor(scene, x, y){
        super(scene, x, y, Enemies.AlienBlue);
    }
}

export default AlienBlue;