import EventManager from '/src/utils/EventManager.js';
import Entity from '/src/gameObjects/Entity/Entity.js';
import Anims from '/src/constants/Anims.js';
import Resources from '/src/constants/Resources.js';
import Equipment from "/src/inventorySystem/equipment/Equipment.js";
import Scenes from '/src/constants/Scenes.js';
import Storage from "/src/inventorySystem/Storage.js";

class Player extends Entity {
    constructor(scene, x, y, texture, frame, stats) {
        super(scene, x, y, texture, frame, stats, {
            walk: Anims.Player.Walk,
            idle: Anims.Player.Idle,
            attack: Anims.Player.Attack,
            dead: Anims.Player.Dead,
        });
        
        this.storage = new Storage(9);
        this.initEvents();
        this.getHealthBar()
            .setForeground(scene.add.sprite(30, 0, Resources.Sprites.UI.ProgressBars.YellowSimple, 1)
            .setOrigin(1, 0.5));
        this.setEquipment(new Equipment(this));

        //TODO
        this.onDestroy(() => {
            scene.registry.destroy();
            scene.EventManager.Events.off();
            scene.scene.restart();
            scene.scene.stop(Scenes.UI);
            scene.scene.run(Scenes.UI);
        });
    }

    setEquipment(equipment) {
        this.equipment = equipment;
    }

    getEquipment() {
        return this.equipment;
    }

    getStorage() {
        return this.storage;
    }

    setScore(score) {
        let isNegative = score < this.getScore();
        super.setScore(score);
        EventManager.emit(EventManager.Events.UPDATE_SCORE, this.getScore(), isNegative);
    }

    setMerchantReputation(reputation) {
        this.stats.merchantReputation = reputation;
    }

    getMerchantReputation() {
        return this.stats.merchantReputation;
    }

    initEvents() {
        EventManager.on(EventManager.Events.STOP_MOVE, () => {
            this.stopMove();
        }, this);
        EventManager.on(EventManager.Events.MOVE_LEFT, () => {
            this.moveLeft();
        }, this);
        EventManager.on(EventManager.Events.MOVE_RIGHT, () => {
            this.moveRight();
        }, this);
    }
}

export default Player;