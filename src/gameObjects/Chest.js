import Anims from '/src/constants/Anims.js';
import Resources from '/src/constants/Resources.js';
import ItemsRarity from '/src/inventorySystem/items/ItemsRarity.js';
import EventCenter from '/src/constants/EventCenter.js';
import Events from '/src/constants/Events.js';

class Chest extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, item) {
        super(scene, x, y, Resources.Sprites.Items.ChestWooden, 0, null);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.setItem(item);

        scene.anims.create({
            key: Anims.Chest.Opens.key,
            frames: scene.anims.generateFrameNumbers(this.texture.key, {
                frames: Anims.Chest.Opens.frames
            }),
            frameRate: Anims.Chest.Opens.frameRate,
            repeat: Anims.Chest.Opens.repeat,
        });
    }

    open() {
        if (this.isOpened())
            return;

        let item = this.getItem();
        this.setOpened(true);
        this.play(Anims.Chest.Opens.key);
        this.on("animationcomplete", () => {
            this.destroy();
        });
        EventCenter.emit(Events.SHOW_FANCY_TEXT, {
            x: this.x,
            y: this.y,
            title: item.getTitle(),
            color: ItemsRarity.getColorByRarity(item.getRarity()),
            scene: this.scene,
        });

        return item;
    }

    setItem(item) {
        this.item = item;
    }

    getItem() {
        return this.item;
    }

    isOpened() {
        return this.opened;
    }

    setOpened(value) {
        this.opened = value;
    }
}

export default Chest;