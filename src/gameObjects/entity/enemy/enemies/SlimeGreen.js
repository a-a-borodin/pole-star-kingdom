import Enemy from '/src/gameObjects/entity/enemy/Enemy.js';
import Enemies from '/src/gameObjects/entity/enemy/Enemies.js';

class SlimeGreen extends Enemy {
    constructor(scene, x, y){
        super(scene, x, y, Enemies.SlimeGreen);
    }
}

export default SlimeGreen;