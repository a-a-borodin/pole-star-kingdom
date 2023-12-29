import TextManager from '/src/utils/TextManager.js';
import Resources from '/src/constants/Resources.js';
import Strings from '/src/constants/Strings.js';
import TextButton from '/src/utils/TextButton.js';
import Colors from '/src/constants/Colors.js';
import Scenes from '/src/constants/Scenes.js';
import EventCenter from '/src/constants/EventCenter.js';
import Events from '/src/constants/Events.js';
import ItemTypes from '/src/inventorySystem/items/ItemTypes.js';
import ItemsRarity from '/src/inventorySystem/items/ItemsRarity.js';

const PADDING = 15;
const MARGIN = 15;

class ShopDialogFrame extends Phaser.GameObjects.Container {
    constructor(scene, cell) {
        super(scene, 0, 0);
        this.scene = scene;
        this.cell = cell;
        this.item = cell.getItem();
        this.sceneHeight = scene.game.config.height;
        this.sceneWidth = scene.game.config.width;
        this.width = this.sceneWidth / 2;
        this.height = this.sceneHeight / 2;
        this.textManager = new TextManager(scene);
        this.player = scene.scene.get(Scenes.MAIN).player;

        let wrapper = new Phaser.GameObjects.TileSprite(this.scene, 0, 0, this.sceneWidth, this.sceneHeight, Resources.Sprites.UI.Panels.PanelBlack).setOrigin(0).setInteractive();
        wrapper.setAlpha(0.8);
        this.add(wrapper);

        let container = new Phaser.GameObjects.Container(this.scene, this.sceneWidth / 2 - this.width / 2, this.sceneHeight / 2 - this.height / 2);
        this.add(container);

        let background = new Phaser.GameObjects.TileSprite(this.scene, 0, 0, this.width, this.height, Resources.Sprites.UI.Panels.PanelBlack).setOrigin(0);
        background.setAlpha(1);
        container.add(background);

        this.content = new Phaser.GameObjects.Container(this.scene, PADDING, PADDING);
        container.add(this.content);

        let icon = new Phaser.GameObjects.Sprite(this.scene, 0, 0, this.item.icon.texture, this.item.icon.frame).setOrigin(0);
        icon.setDisplaySize(this.width / 5, this.width / 5);
        this.content.add(icon);

        this.amountText = this.textManager.createText(0, 0, "", TextManager.SIMPLE, "32px");
        this.amountText.setOrigin(1);
        this.content.add(this.amountText);

        this.title = this.textManager.createText(icon.x + icon.displayWidth + MARGIN, 0, "", TextManager.SIMPLE, "32px");
        this.content.add(this.title);

        this.features = this.textManager.createText(icon.x + icon.displayWidth + MARGIN, this.title.y + this.title.displayHeight + MARGIN, "", TextManager.SIMPLE, "22px");
        this.updateText();
        this.content.add(this.features);

        this.initButtons();
        
        scene.add.existing(this);
    }

    updateText() {
        this.title.setText(this.item.getTitle());
        this.title.setColor(ItemsRarity.getColorByRarity(this.item.getRarity()));

        this.amountText.setText(this.item.getAmount());
        this.features.setText(this.item.getDescription());
    }
    
    initButtons() {
        let buttonFont = TextManager.getStyle(TextManager.STROKE);

        let buyButton = new TextButton(this.scene, 0, this.height - MARGIN * 2, Strings.Buy, buttonFont, null, true).setOrigin(0, 1);
        buyButton.onClick(() => {
            
        });
        this.content.add(buyButton);
    }

    checkAmount() {
        if (this.item.getAmount() <= 0) {
            this.cell.clear();
            this.destroy();
        }
    }
}

export default ShopDialogFrame;