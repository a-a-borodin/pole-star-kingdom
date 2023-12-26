import EventCenter from '/src/constants/EventCenter.js';
import Events from '/src/constants/Events.js';
import Entity from '/src/gameObjects/Entity/Entity.js';
import Anims from '/src/constants/Anims.js';
import Resources from '/src/constants/Resources.js';
import Equipment from "/src/inventorySystem/equipment/Equipment.js";
import Scenes from '/src/constants/Scenes.js';

class Player extends Entity {
    constructor(scene, x, y, texture, frame, stats) {
        super(scene, x, y, texture, frame, stats, {
            walk: Anims.Player.Walk,
            idle: Anims.Player.Idle,
            attack: Anims.Player.Attack,
            dead: Anims.Player.Dead,
        });

        this.initEvents();
        this.getHealthBar()
            .setForeground(scene.add.sprite(30, 0, Resources.Sprites.UI.ProgressBars.YellowSimple, 1)
            .setOrigin(1, 0.5));
        this.setEquipment(new Equipment(this));

        //TODO
        this.onDestroy(() => {
            scene.registry.destroy();
            scene.events.off();
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

    initEvents() {
        EventCenter.on(Events.STOP_MOVE, () => {
            this.stopMove();
        }, this);
        EventCenter.on(Events.MOVE_LEFT, () => {
            this.moveLeft();
        }, this);
        EventCenter.on(Events.MOVE_RIGHT, () => {
            this.moveRight();
        }, this);
        EventCenter.on(Events.UPDATE_SCORE, (newScore) => {
            this.setScore(newScore);
        });
    }
}

export default Player;