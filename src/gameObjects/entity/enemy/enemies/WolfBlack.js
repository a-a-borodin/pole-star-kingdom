import Enemy from '/src/gameObjects/entity/enemy/Enemy.js';
import Enemies from '/src/gameObjects/entity/enemy/Enemies.js';

class WolfBlack extends Enemy {
    constructor(scene, x, y){
        super(scene, x, y, Enemies.WolfBlack);
    }
}

export default WolfBlack;