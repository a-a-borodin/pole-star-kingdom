import TextManager from '/src/utils/TextManager.js';
import Resources from '/src/constants/Resources.js';
import Strings from '/src/constants/Strings.js';
import TextButton from '/src/utils/TextButton.js';
import Scenes from '/src/constants/Scenes.js';
import EventManager from '/src/utils/EventManager.js';
import ItemTypes from '/src/inventorySystem/items/ItemTypes.js';
import ItemsRarity from '/src/inventorySystem/items/ItemsRarity.js';

const PADDING = 15;
const MARGIN = 15;

class InventoryDialogFrame extends Phaser.GameObjects.Container {
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

        this.title = this.textManager.createText(icon.x + icon.displayWidth + MARGIN, 0, "");
        this.content.add(this.title);

        this.features = this.textManager.createText(icon.x + icon.displayWidth + MARGIN, this.title.y + this.title.displayHeight + MARGIN, "", TextManager.SIMPLE, {fontSize:TextManager.FontSize.SMALL});
        this.updateText();
        this.content.add(this.features);

        this.initButtons();
        this.initEvents();
        
        scene.add.existing(this);
    }

    updateText() {
        this.title.setText(this.item.getTitle());
        this.title.setColor(ItemsRarity.getColorByRarity(this.item.getRarity()));

        this.amountText.setText(this.item.getAmount());
        this.features.setText(this.item.getDescription());
    }
    
    initEvents() {
        EventManager.on(EventManager.Events.SHOP_COLLIDE_FINISH, () => {
            this.sellButton.disableInteractive();
            this.sellButton.setAlpha(0.7);
        });
        EventManager.on(EventManager.Events.SHOP_COLLIDE_START, () => {
            if(this.sellButton.scene == undefined)
                return;

            this.sellButton.setInteractive();
            this.sellButton.setAlpha(1);
        });

        EventManager.on(EventManager.Events.HOME_COLLIDE_FINISH, () => {
            this.storeButton.disableInteractive();
            this.storeButton.setAlpha(0.7);
        });
        EventManager.on(EventManager.Events.HOME_COLLIDE_START, () => {
            if(this.storeButton.scene == undefined)
                return;

            this.storeButton.setInteractive();
            this.storeButton.setAlpha(1);
        });
    }

    initButtons() {
        let buttonFont = TextManager.Style.STROKE;

        let actionText;
        if (this.item.isEquipable) {
            if (this.item.isEquiped) {
                actionText = Strings.Remove;
            } else {
                actionText = Strings.Equip;
            }
        } else {
            actionText = Strings.Use;
        }

        let storeText;
        if (this.item.isStored) {
            storeText = Strings.Get;
        } else {
            storeText = Strings.Store;
        }

        let actionButton = new TextButton(this.scene, 0, this.height - MARGIN * 2, actionText, buttonFont, null, true).setOrigin(0, 1);
        actionButton.onClick(() => {
            if (this.item.isEquipable) {
                this.equipItem();
            } else {
                this.useItem();
            }
        });
        this.content.add(actionButton);

        this.sellButton = new TextButton(this.scene, actionButton.x + actionButton.displayWidth + MARGIN, this.height - PADDING * 2, Strings.Sell, buttonFont, null, true).setOrigin(0, 1);
        this.sellButton.onClick(this.sellItem.bind(this));
        this.content.add(this.sellButton);
        
        this.storeButton = new TextButton(this.scene, this.sellButton.x + this.sellButton.displayWidth + MARGIN, this.height - PADDING * 2, storeText, buttonFont, null, true).setOrigin(0, 1);
        this.storeButton.onClick(()=>{
          if (this.item.isStored) {
                this.getItem();
            } else {
                this.storeItem();
            }   
        });
        this.content.add(this.storeButton);

        let deleteButton = new TextButton(this.scene, this.storeButton.x + this.storeButton.displayWidth + MARGIN, this.height - PADDING * 2, Strings.Delete, buttonFont, null, true).setOrigin(0, 1);
        deleteButton.onClick(this.deleteItem.bind(this));
        this.content.add(deleteButton);

        let backButton = new TextButton(this.scene, deleteButton.x + deleteButton.displayWidth + MARGIN, this.height - PADDING * 2, Strings.Back, buttonFont, null, true).setOrigin(0, 1);
        this.content.add(backButton);
        backButton.onClick(() => {
            this.destroy();
        });
    }

    deleteItem() {
        this.item.setAmount(this.item.getAmount() - 1);
        this.updateText();
        this.checkAmount();
    }

    sellItem() {
        this.item.setAmount(this.item.getAmount() - 1);
        this.updateText();
        EventManager.emit(EventManager.Events.UPDATE_SCORE, this.player.getScore() + this.item.getSaleCost());
        this.checkAmount();
    }

    storeItem() {
        if (this.player.getStorage().hasSlotFor(this.item)) {
            this.item.isStored = true;
            this.item.isEquiped = false;
            this.cell.clear();
            this.player.getStorage().push(this.item);
            this.destroy();
        }
    }

    getItem() {
        if (this.player.getInventory().hasSlotFor(this.item)) {
            this.item.isStored = false;
            this.cell.clear();
            this.player.getInventory().push(this.item);
            this.destroy();
        }
    }

    useItem() {
        this.item.use(this.player);
        this.checkAmount();
        this.updateText();
    }

    equipItem() {
        if (this.item.isEquiped) {
            if (this.player.getInventory().hasSlotFor(this.item)) {
                this.item.isEquiped = false;
                this.cell.clear();
                this.player.getInventory().push(this.item);
                this.destroy();
            }
            return;
        }

        let selectedCell;
        switch (this.item.type) {
            case ItemTypes.Weapon:
                selectedCell = this.player.getEquipment().getWeaponCell();
                break;

            case ItemTypes.Helmet:
                selectedCell = this.player.getEquipment().getHelmetCell();
                break;

            case ItemTypes.Chestplate:
                selectedCell = this.player.getEquipment().getChestplateCell();
                break;

            case ItemTypes.Boots:
                selectedCell = this.player.getEquipment().getBootsCell();
                break;

            case ItemTypes.Gloves:
                selectedCell = this.player.getEquipment().getGlovesCell();
                break;

            case ItemTypes.Amulet:
                selectedCell = this.player.getEquipment().getAmuletCell();
                break;

            case ItemTypes.Cloak:
                selectedCell = this.player.getEquipment().getCloakCell();
                break;
            
            case ItemTypes.Ring:
                if (this.player.getEquipment().getFirstRingCell().getItem() == undefined) {
                    selectedCell = this.player.getEquipment().getFirstRingCell();
                } else if (this.player.getEquipment().getSecondRingCell().getItem() == undefined) {
                    selectedCell = this.player.getEquipment().getSecondRingCell();
                } else {
                    return;
                }
            break
        }
        
        let itemInSlot = selectedCell.getItem();
        
        if (itemInSlot != undefined) {
            if (this.player.getInventory().hasSlotFor(itemInSlot)) {
                itemInSlot.isEquiped = false;
                this.player.getInventory().push(itemInSlot);
                selectedCell.clear();
            } else
                return;
        }
        
        this.item.isEquiped = true;
        this.item.isStored = false;
        selectedCell.setItem(this.item);
        this.cell.clear();
        this.destroy();
    }

    checkAmount() {
        if (this.item.getAmount() <= 0) {
            this.cell.clear();
            this.destroy();
        }
    }
}

export default InventoryDialogFrame;