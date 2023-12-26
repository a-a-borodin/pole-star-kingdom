import WolfBlack from '/src/gameObjects/entity/enemy/enemies/WolfBlack.js';
import WolfWhite from '/src/gameObjects/entity/enemy/enemies/WolfWhite.js';
import SlimeGreen from '/src/gameObjects/entity/enemy/enemies/SlimeGreen.js';
import AlienBlue from '/src/gameObjects/entity/enemy/enemies/AlienBlue.js';
import Enemies from '/src/gameObjects/entity/enemy/Enemies.js';

class EnemyFactory {
    static create(scene,x,y,type){
        switch(type){
            case Enemies.WolfBlack:
                return new WolfBlack(scene, x, y);
            case Enemies.WolfWhite:
                return new WolfWhite(scene, x, y);
            case Enemies.SlimeGreen:
                return new SlimeGreen(scene, x, y);
            case Enemies.AlienBlue:
                return new AlienBlue(scene, x, y);
        }
    }
}

export default EnemyFactory;