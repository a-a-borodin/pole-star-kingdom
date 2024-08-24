import TextManager from '/src/utils/TextManager.js';
import Resources from '/src/constants/Resources.js';
import Strings from '/src/constants/Strings.js';
import TextButton from '/src/utils/TextButton.js';
import Scenes from '/src/constants/Scenes.js';
import Waves from '/src/wavesSystem/Waves.js';
import Misc from '/src/utils/Misc.js';

class WizzardDialogFrame extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene, 0, 0);
        this.scene = scene;
        this.sceneHeight = scene.game.config.height;
        this.sceneWidth = scene.game.config.width;
        this.width = this.sceneWidth / 1.9;
        this.height = this.sceneHeight / 1.6;
        this.textManager = new TextManager(scene);
        this.margin = 15;
        this.padding = 15;
        this.waveManager = scene.scene.get(Scenes.MAIN).waveManager;
        this.player = scene.scene.get(Scenes.MAIN).player;
        this.waveID = this.waveManager.getWave().id;
        this.currentWave = Waves.get(this.waveID);

        let wrapper = new Phaser.GameObjects.TileSprite(this.scene, this.sceneWidth / 2 - this.width / 2, 0, this.width, this.sceneHeight, Resources.Sprites.UI.Panels.PanelBlack)
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

        this.headerText = this.textManager.createText(headerContent.x + headerContent.width / 2, headerContent.y + headerContent.height / 2," ", TextManager.Style.STROKE, {fontSize:TextManager.FontSize.BIG})
            .setOrigin(0.5, 0.5);
        this.headerTextDash = this.textManager.createText(headerContent.x + headerContent.width / 2, headerContent.y + headerContent.height / 2 + this.headerText.height / 2 + this.margin * 2, "▪ ▪ ▪ ────────────────────── ▪ ▪ ▪", TextManager.Style.STROKE, {fontSize:TextManager.FontSize.SMALL})
            .setOrigin(0.5, 1);
        headerContent.add(this.headerText);
        headerContent.add(this.headerTextDash);

        let content = new Phaser.GameObjects.Container(this.scene, 0, headerContent.y + headerContent.displayHeight + this.margin)
            .setSize(this.width, this.height - headerContent.height - this.margin);
        container.add(content);

        this.waveIcon = new Phaser.GameObjects.Sprite(this.scene, this.margin, this.margin, this.currentWave.icon.texture, this.currentWave.icon.frame)
            .setOrigin(0);
        content.add(this.waveIcon);

        this.waveTitle = this.textManager.createText(this.waveIcon.x + this.waveIcon.displayWidth + this.margin, this.margin, "", TextManager.STROKE)
            .setOrigin(0);
        content.add(this.waveTitle);

        this.description = this.textManager.createText(this.waveTitle.x, this.waveTitle.y + this.waveTitle.displayHeight, "", TextManager.STROKE, {fontSize:TextManager.FontSize.SMALL})
            .setOrigin(0);
        this.description.width = content.width - this.description.x - this.margin;
        this.description.setWordWrapWidth(this.description.width, true);
        content.add(this.description);

        this.notice = this.textManager.createText(this.waveTitle.x, 0, "", TextManager.STROKE, {fontSize: TextManager.FontSize.SMALL, fontColor: Misc.Colors.GREY})
            .setOrigin(0);
        this.notice.width = content.width - this.notice.x - this.margin;
        this.notice.setWordWrapWidth(this.notice.width, true);
        content.add(this.notice);
   
        let selectWaveContainer = new Phaser.GameObjects.Container(this.scene, content.width / 4, content.height - this.margin);
        selectWaveContainer.width = content.width - (content.width / 4) * 2;
        content.add(selectWaveContainer);

        let leftArrow = new Phaser.GameObjects.Sprite(this.scene, 0, 0, Resources.Sprites.UI.Buttons.ArrowButtons, 3)
            .setInteractive()
            .setAlpha(0.7)
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

        let rightArrow = new Phaser.GameObjects.Sprite(this.scene, selectWaveContainer.width, 0, Resources.Sprites.UI.Buttons.ArrowButtons, 1)
            .setInteractive()
            .setAlpha(0.7)
            .setOrigin(0.5, 1);
        rightArrow.on("pointerdown", () => {
            if (this.waveID >= Waves.size)
                return;
            this.waveID += 1;
            this.updateWaveInfo();
        });
        selectWaveContainer.add(rightArrow);

        this.priceContainer = new Phaser.GameObjects.Container(this.scene, content.width / 4, content.height - this.margin);
        this.priceContainer.width = content.width - (content.width / 4) * 2;
        content.add(this.priceContainer);

        this.coinsIcon = new Phaser.GameObjects.Sprite(this.scene, 0, this.margin / 2, Resources.Sprites.UI.Icons.StatisticIcons, 0)
            .setOrigin(0.5);
        this.costText = this.textManager.createText(0, this.coinsIcon.y - this.coinsIcon.displayHeight / 2, "")
            .setOrigin(0);

        this.priceContainer.add(this.coinsIcon);
        this.priceContainer.add(this.costText);
        
        scene.add.existing(this);
        this.updateWaveInfo();
    }

    updateWaveInfo() {
        this.currentWave = Waves.get(this.waveID);
        this.waveTitle.setText(this.currentWave.title);
        this.headerText.setText(Strings.Wave + this.waveID);
        this.costText.setText(this.currentWave.warpCost);
        this.waveIcon.setTexture(this.currentWave.icon.texture, this.currentWave.icon.frame);
        this.description.setText(this.currentWave.description);
        this.notice.setText(this.currentWave.notice);
        this.coinsIcon.setX(this.priceContainer.width / 2 - this.costText.displayWidth / 2 - this.margin / 2);
        this.costText.setX(this.coinsIcon.x + this.coinsIcon.displayWidth / 2 + this.margin / 2);
        this.notice.setY(this.description.y + this.description.displayHeight);
    }
}

export default WizzardDialogFrame;