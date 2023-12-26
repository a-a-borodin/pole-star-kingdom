import Anims from '/src/constants/Anims.js';
import Resources from '/src/constants/Resources.js';

class Coin extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, radius = 10, price = 1) {
        super(scene, x, y, Resources.Sprites.Items.CoinGold, 0, null);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setDisplaySize(radius * 2, radius * 2);
        this.setPrice(price);

        scene.anims.create({
            key: Anims.Coin.Rotating.key,
            frames: scene.anims.generateFrameNumbers(this.texture.key, {
                frames: Anims.Coin.Rotating.frames
            }),
            frameRate: Anims.Coin.Rotating.frameRate,
            repeat: Anims.Coin.Rotating.repeat,
        });
        this.anims.play(Anims.Coin.Rotating.key);
    }

    getPrice() {
        return this.price;
    }

    setPrice(price) {
        this.price = price;
    }
}

export default Coin;