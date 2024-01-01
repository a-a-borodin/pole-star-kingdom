import TextManager from '/src/utils/TextManager.js';
import Resources from '/src/constants/Resources.js';
import Strings from '/src/constants/Strings.js';
import TextButton from '/src/utils/TextButton.js';
import Misc from '/src/utils/Misc.js';
import Scenes from '/src/constants/Scenes.js';
import EventManager from '/src/utils/EventManager.js';
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

        this.amountText = this.textManager.createText(0, 0, "");
        this.amountText.setOrigin(1);
        this.content.add(this.amountText);
        
        this.priceText = this.textManager.createText(this.width, 0, "");
        this.priceText.setOrigin(1);
        this.priceText.setColor(Misc.Colors.YELLOW);
        this.content.add(this.priceText);

        this.title = this.textManager.createText(icon.x + icon.displayWidth + MARGIN, 0, "");
        this.content.add(this.title);

        this.features = this.textManager.createText(icon.x + icon.displayWidth + MARGIN, this.title.y + this.title.displayHeight + MARGIN, "", TextManager.SIMPLE, {fontSize:TextManager.FontSize.SMALL});
        this.updateText();
        this.content.add(this.features);

        this.initButtons();
        
        scene.add.existing(this);
    }

    updateText() {
        this.title.setText(this.item.getTitle());
        this.title.setColor(ItemsRarity.getColorByRarity(this.item.getRarity()));
        this.priceText.setText(this.item.getCost());
        this.amountText.setText(this.item.getAmount());
        this.features.setText(this.item.getDescription());
    }
    
    initButtons() {
        let buttonFont = TextManager.Style.STROKE;

        let buyButton = new TextButton(this.scene, 0, this.height - MARGIN * 2, Strings.Buy, buttonFont, null, true).setOrigin(0, 1);
        buyButton.onClick(this.buy.bind(this));
        if(this.player.getScore() < this.item.getCost()) {
            buyButton.setAlpha(0.7);
            buyButton.disableInteractive();
        }
        this.content.add(buyButton);
        
        let backButton = new TextButton(this.scene, buyButton.x + buyButton.displayWidth + MARGIN, this.height - PADDING * 2, Strings.Back, buttonFont, null, true).setOrigin(0, 1);
        this.content.add(backButton);
        backButton.onClick(() => {
            this.destroy();
        });
    }

    checkAmount() {
        if (this.item.getAmount() <= 0) {
            this.cell.clear();
            this.destroy();
        }
    }
    
    buy() {
        if(this.player.getScore() < this.item.getCost())
            return;
        
        if (this.player.getInventory().hasSlotFor(this.item)) {
            this.cell.clear();
            this.player.getInventory().push(this.item);
            this.player.setScore(this.player.getScore() - this.item.getCost());
            this.destroy();
        }
    }
}

export default ShopDialogFrame;