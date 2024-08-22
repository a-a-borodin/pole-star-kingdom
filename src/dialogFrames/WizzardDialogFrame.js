import TextManager from '/src/utils/TextManager.js';
import Resources from '/src/constants/Resources.js';
import Strings from '/src/constants/Strings.js';
import TextButton from '/src/utils/TextButton.js';
import Misc from '/src/utils/Misc.js';
import Scenes from '/src/constants/Scenes.js';
import EventManager from '/src/utils/EventManager.js';
import Waves from '/src/wavesSystem/Waves.js';

class WizzardDialogFrame extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene, 0, 0);
        this.scene = scene;
        this.sceneHeight = scene.game.config.height;
        this.sceneWidth = scene.game.config.width;
        this.width = this.sceneWidth / 1.5;
        this.height = this.sceneHeight / 1.4;
        this.textManager = new TextManager(scene);
        this.margin = 15;
        this.padding = 15;
        this.waveManager = scene.scene.get(Scenes.MAIN).waveManager;
        this.player = scene.scene.get(Scenes.MAIN).player;
        this.waveID = this.waveManager.getWave().id;
        this.currentWave = Waves.get(this.waveID);

        let wrapper = new Phaser.GameObjects.TileSprite(this.scene, 0, 0, this.sceneWidth, this.sceneHeight, Resources.Sprites.UI.Panels.PanelBlack)
            .setOrigin(0)
            .setAlpha(0.8)
            .setInteractive();
        wrapper.on("pointerdown", () => {
            this.destroy();
        });
        this.add(wrapper);

        let container = new Phaser.GameObjects.Container(this.scene, this.sceneWidth / 2 - this.width / 2, this.sceneHeight / 2 - this.height / 2)
            .setSize(this.width, this.height);
        this.add(container);

        let headerContent = new Phaser.GameObjects.Container(this.scene, 0, 0)
            .setSize(container.width, container.height / 5);
        container.add(headerContent);

        let headerBackground = new Phaser.GameObjects.TileSprite(this.scene, 0, 0, headerContent.width, headerContent.height, Resources.Sprites.UI.Panels.PanelBlack)
            .setOrigin(0)
            .setInteractive();
        headerContent.add(headerBackground);

        this.headerText = this.textManager.createText(headerContent.x + this.margin, headerContent.y + headerContent.height / 2, Strings.Wave + " " + this.waveID, TextManager.STROKE)
            .setOrigin(0, 0.5);
        headerContent.add(this.headerText);


        let content = new Phaser.GameObjects.Container(this.scene, 0, headerContent.y + headerContent.displayHeight + this.margin)
            .setSize(this.width, this.height - headerContent.height - this.margin);
        container.add(content);

        let background = new Phaser.GameObjects.TileSprite(this.scene, 0, 0, content.width, content.height, Resources.Sprites.UI.Panels.PanelBlack)
            .setOrigin(0)
            .setInteractive();
        content.add(background);

        this.waveIcon = new Phaser.GameObjects.Sprite(this.scene, this.margin, this.margin, this.currentWave.icon.texture, this.currentWave.icon.frame)
            .setOrigin(0);
        content.add(this.waveIcon);

        let coinsIcon = new Phaser.GameObjects.Sprite(scene, this.margin, this.waveIcon.y + this.waveIcon.displayHeight + this.margin, Resources.Sprites.UI.Icons.StatisticIcons, 0)
            .setOrigin(0);
        this.costText = this.textManager.createText(coinsIcon.x + coinsIcon.displayWidth + this.margin, coinsIcon.y, this.currentWave.warpCost)
            .setOrigin(0);
        content.add(coinsIcon);
        content.add(this.costText);

        this.waveTitle = this.textManager.createText(this.waveIcon.x + this.waveIcon.displayWidth + this.margin, this.margin, this.currentWave.title, TextManager.STROKE)
            .setOrigin(0);
        content.add(this.waveTitle);

        this.description = this.textManager.createText(this.waveTitle.x, this.waveTitle.y + this.waveTitle.displayHeight, this.currentWave.description, TextManager.STROKE, {fontSize:TextManager.FontSize.SMALL})
            .setOrigin(0);
        this.description.width = content.width - this.description.x - this.margin;
        this.description.setWordWrapWidth(this.description.width, true);
        content.add(this.description);

        this.updateWaveInfo();
        
        let selectWaveContainer = new Phaser.GameObjects.Container(this.scene, content.width / 4, content.height - this.margin);
        selectWaveContainer.width = content.width - (content.width / 4) * 2;
        content.add(selectWaveContainer);

        let leftArrow = new Phaser.GameObjects.Sprite(this.scene, 0, 0, Resources.Sprites.UI.Buttons.ArrowButtons, 2)
            .setInteractive()
            .setOrigin(0.5, 1);
        leftArrow.on("pointerdown", () => {
            if (this.waveID <= 1)
                return;
            this.waveID -= 1;
            this.updateWaveInfo();
        });
        selectWaveContainer.add(leftArrow);

        let submit = new TextButton(this.scene, selectWaveContainer.width / 2, -leftArrow.displayHeight / 2, Strings.Battle, TextManager.Style.STROKE, null, true)
            .setFontSize("35px")
            .setOrigin(0.5);
        submit.onClick(() => {
            if (this.player.getScore() < this.currentWave.warpCost)
                return;

            this.player.setScore(this.player.getScore() - this.currentWave.warpCost);
            this.waveManager.setWave(this.currentWave);
            this.waveManager.startWave();
            this.destroy();
        });
        selectWaveContainer.add(submit);

        let rightArrow = new Phaser.GameObjects.Sprite(this.scene, selectWaveContainer.width, 0, Resources.Sprites.UI.Buttons.ArrowButtons, 0)
            .setInteractive()
            .setOrigin(0.5, 1);
        rightArrow.on("pointerdown", () => {
            if (this.waveID >= Waves.size)
                return;
            this.waveID += 1;
            this.updateWaveInfo();
        });
        selectWaveContainer.add(rightArrow);
        
        scene.add.existing(this);
    }

    updateWaveInfo() {
        this.currentWave = Waves.get(this.waveID);
        this.waveTitle.setText(this.currentWave.title);
        this.headerText.setText(Strings.Wave + this.waveID);
        this.costText.setText(this.currentWave.warpCost);
        this.waveIcon.setTexture(this.currentWave.icon.texture, this.currentWave.icon.frame);
        this.description.setText(this.currentWave.description);
    }
}

export default WizzardDialogFrame;