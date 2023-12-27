import Scenes from '/src/constants/Scenes.js';
import Strings from '/src/constants/Strings.js';
import Misc from '/src/constants/Misc.js';
import TextManager from '/src/utils/TextManager.js';
import Resources from '/src/constants/Resources.js';
import CellContainer from '/src/inventorySystem/CellContainer.js';
import InventoryDialogFrame from '/src/dialogFrames/InventoryDialogFrame.js';
import EventCenter from '/src/constants/EventCenter.js';
import Events from '/src/constants/Events.js';
import Colors from '/src/constants/Colors.js';
import TextButton from '/src/utils/TextButton.js';

let inventoryLayer;

class MenuScene extends Phaser.Scene {
    cells = [];
    equipmentCells = [];

    constructor(config) {
        super(config);
    }

    init() {
        this.sceneWidth = this.cameras.main.width;
        this.sceneHeight = this.cameras.main.height;
        this.scene.bringToTop(Scenes.INVENTORY);
        this.player = this.scene.get(Scenes.MAIN).player;
        this.textManager = new TextManager(this);
        this.margin = 15;
    }

    create() {
        let container = this.add.container(0, 0);
        container.setSize(this.sceneWidth, this.sceneHeight);

        this.buttonsLayer = this.add.container(0, 0);
        this.buttonsLayer.setSize(container.width / 4, container.height);
        container.add(this.buttonsLayer);

        let buttonsLayerPanel = this.add.image(0, 0, Resources.Sprites.UI.Panels.PanelBlack)
            .setOrigin(0)
            .setDisplaySize(this.buttonsLayer.width, this.buttonsLayer.height)
            .setAlpha(0.65);
        this.buttonsLayer.add(buttonsLayerPanel);
        this.initButtons();

        this.inventoryLayer = this.add.container(this.buttonsLayer.x + this.buttonsLayer.width + container.width / 6, 0);
        this.inventoryLayer.setSize(container.width - this.inventoryLayer.x, container.height);
        container.add(this.inventoryLayer);
        console.log(this.inventoryLayer.height)
        let inventoryLayerPanel = this.add.image(0, 0, Resources.Sprites.UI.Panels.PanelBlack)
            .setOrigin(0)
            .setDisplaySize(this.inventoryLayer.width, this.inventoryLayer.height)
            .setAlpha(0.65);
        this.inventoryLayer.add(inventoryLayerPanel);

        this.inventoryButtonsLayer = this.add.container(0, 0)
            .setSize(this.inventoryLayer.width, this.inventoryLayer.height / 6);
        this.inventoryLayer.add(this.inventoryButtonsLayer);

        let inventoryButtonsLayerPanel = this.add.image(0, 0, Resources.Sprites.UI.Panels.PanelBlack)
            .setOrigin(0)
            .setDisplaySize(this.inventoryButtonsLayer.width, this.inventoryButtonsLayer.height)
            .setAlpha(0.6);
        this.inventoryButtonsLayer.add(inventoryButtonsLayerPanel);
        this.initInventoryButtons();
        
        this.initEvents();
        
        let bagWindow = new BagWindow(this,this.margin, this.inventoryButtonsLayer.y + this.inventoryButtonsLayer.height + this.margin, this.inventoryLayer.width - this.margin, this.inventoryLayer.height - this.y);
        this.inventoryLayer.add(bagWindow);
    }

    update() {
      //  this.updateStats();
      //  this.updateCells();
    }

    initButtons() {
        let buttonFont = TextManager.getStyle(TextManager.STROKE);
        buttonFont.fontSize = "35px";

        let resumeButton = new TextButton(this, this.margin, this.buttonsLayer.height / 4, Strings.Resume, buttonFont, null, true).setOrigin(0);
        resumeButton.onClick(() => {
            this.scene.switch(Scenes.UI);
        });
        this.buttonsLayer.add(resumeButton);

        let settingsButton = new TextButton(this, this.margin, resumeButton.y + resumeButton.displayHeight + this.margin, Strings.Settings, buttonFont, null, true).setOrigin(0);
        settingsButton.onClick(() => {});
        this.buttonsLayer.add(settingsButton);

        let achievementsButton = new TextButton(this, this.margin, settingsButton.y + settingsButton.displayHeight + this.margin, Strings.Achievements, buttonFont, null, true).setOrigin(0);
        achievementsButton.onClick(() => {});
        this.buttonsLayer.add(achievementsButton);
    }

    initInventoryButtons() {
        let inventoryButtonsLayer = this.inventoryButtonsLayer;
        let fn = (elem) => {
            inventoryButtonsLayer.getAll().forEach((child) => {
                if (child == elem) {
                    child.setFrame(0);
                    return;
                }
                child.setFrame(1);
            });
        };

        this.bagButton = this.add.image(this.margin, 0, Resources.Sprites.UI.Buttons.BagButton, 0).setInteractive().setOrigin(0);
        this.bagButton.on("pointerup", () => {
            fn(this.bagButton);
        });
        this.bagButton.setDisplaySize(this.inventoryButtonsLayer.height, this.inventoryButtonsLayer.height);
        this.inventoryButtonsLayer.add(this.bagButton);

        this.shopButton = this.add.image(this.bagButton.x + this.bagButton.displayWidth + this.margin, 0, Resources.Sprites.UI.Buttons.ShopCoinButton, 1).setInteractive().setOrigin(0);
        this.shopButton.on("pointerup", ()=>{
            fn(this.shopButton);
        });
        this.shopButton.setDisplaySize(this.inventoryButtonsLayer.height, this.inventoryButtonsLayer.height);
        this.inventoryButtonsLayer.add(this.shopButton);

        this.storageButton = this.add.image(this.shopButton.x + this.shopButton.displayWidth + this.margin, 0, Resources.Sprites.UI.Buttons.ChestButton, 1).setInteractive().setOrigin(0);
        this.storageButton.on("pointerup", () => {
            fn(this.storageButton);
        });
        this.storageButton.setDisplaySize(this.inventoryButtonsLayer.height, this.inventoryButtonsLayer.height);
        this.inventoryButtonsLayer.add(this.storageButton);

        this.upgradesButton = this.add.image(this.storageButton.x + this.storageButton.displayWidth + this.margin, 0, Resources.Sprites.UI.Buttons.BookButton, 1).setInteractive().setOrigin(0);
        this.upgradesButton.on("pointerup", ()=>{
            fn(this.upgradesButton);
        });
        this.upgradesButton.setDisplaySize(this.inventoryButtonsLayer.height, this.inventoryButtonsLayer.height);
        this.inventoryButtonsLayer.add(this.upgradesButton);
    }

    initEvents() {
        EventCenter.on(Events.SHOP_COLLIDE_START, () => {
            this.shopButton.setInteractive();
            this.shopButton.setAlpha(1);
        });
        EventCenter.on(Events.SHOP_COLLIDE_FINISH, () => {
            this.shopButton.disableInteractive();
            this.shopButton.setAlpha(0.4);
        });

        EventCenter.on(Events.HOME_COLLIDE_START, () => {
            this.upgradesButton.setInteractive();
            this.upgradesButton.setAlpha(1);
            
            this.storageButton.setInteractive();
            this.storageButton.setAlpha(1);
        });
        EventCenter.on(Events.HOME_COLLIDE_FINISH, () => {
            this.upgradesButton.disableInteractive();
            this.upgradesButton.setAlpha(0.4);
            
            this.storageButton.disableInteractive();
            this.storageButton.setAlpha(0.4);
        });
    }
}

class BagWindow extends Phaser.GameObjects.Container {
    cells = [];
    equipmentCells = [];
    
    constructor(context,x,y,width,height) {
        super(context,x,y);
        
        this.context = context;
        this.margin = 10;
        this.setSize(width,height);
        
        this.cellsLayer = context.add.container(0, 0);
        this.cellsLayer.setSize(this.width / 2, this.height / 1.5);
        this.add(this.cellsLayer);
        
        console.log(height);
        let coinsIcon = context.add.sprite(this.margin, this.cellsLayer.y + this.cellsLayer.height, Resources.Sprites.UI.Icons.StatisticIcons, 0);
        this.coinsText = context.textManager.createText(coinsIcon.x + coinsIcon.displayWidth / 1.5, coinsIcon.y, context.player.getScore(), TextManager.SIMPLE, "25px").setOrigin(0, 0.5);
        this.cellsLayer.add(coinsIcon);
        this.cellsLayer.add(this.coinsText);
        
        this.initCells();
        /*this.equipmentLayer = this.add.container(this.cellsLayer.x + this.cellsLayer.width, 0);
        this.equipmentLayer.setSize(this.bagElementsLayer.width - this.equipmentLayer.x, this.bagElementsLayer.height / 1.5);
        this.bagElementsLayer.add(this.equipmentLayer);
        this.initCells();
        
        this.statsLayer = this.add.container(this.equipmentLayer.x, this.equipmentLayer.y + this.equipmentLayer.height);
        this.statsLayer.setSize(this.bagElementsLayer.width - this.statsLayer.x, this.bagElementsLayer.height / 1.5);
        this.bagElementsLayer.add(this.statsLayer);
        this.initStats();*/
    }
    
    show() {
        
    }
    
    hide() {
        
    }
    
  /*  initStats() {
        let fontSize = "25px";
        let heartIcon = this.add.sprite(this.margin, 0, Resources.Sprites.UI.Icons.StatisticIcons, 3);
        this.healthText = this.textManager.createText(heartIcon.x + heartIcon.displayWidth / 1.5, heartIcon.y, this.player.getHealth() + Strings.Slash + this.player.getMaxHealth(), TextManager.SIMPLE, fontSize).setOrigin(0, 0.5);
        this.statsLayer.add(heartIcon);
        this.statsLayer.add(this.healthText);

        let defenseIcon = this.add.sprite(this.margin, heartIcon.y + heartIcon.displayHeight, Resources.Sprites.UI.Icons.StatisticIcons, 2);
        this.defenseText = this.textManager.createText(defenseIcon.x + defenseIcon.displayWidth / 1.5, defenseIcon.y, this.player.getDefense(), TextManager.SIMPLE, fontSize).setOrigin(0, 0.5);
        this.statsLayer.add(defenseIcon);
        this.statsLayer.add(this.defenseText);

        let damageIcon = this.add.sprite(this.margin, defenseIcon.y + defenseIcon.displayHeight, Resources.Sprites.UI.Icons.StatisticIcons, 1);
        this.damageText = this.textManager.createText(damageIcon.x + damageIcon.displayWidth / 1.5, damageIcon.y, this.player.getDamage(), TextManager.SIMPLE, fontSize).setOrigin(0, 0.5);
        this.statsLayer.add(damageIcon);
        this.statsLayer.add(this.damageText);
    }
    */
    initCells() {
        
        let cellClickFn = (cell) => {
            if (cell != undefined)
                return new InventoryDialogFrame(this.context, cell);
        };

        let hrow = 3;
        let vrow = 3;
        let margin = this.margin;
        let cellWidth = (this.cellsLayer.width / hrow) - margin;
        let cellHeight = cellWidth;
        let padding = 20;
        let y = 0;
        let x = 0;

        for (let v = 0; v < vrow; v++) {
            for (let h = 0; h < hrow; h++) {
                let cell = new CellContainer(this.context, x, y, cellWidth, cellHeight, padding, true, null);
                cell.onClick(() => {
                    cellClickFn(cell.getCell());
                });

                this.cellsLayer.add(cell);
                this.cells.push(cell);
                x += cellWidth + margin;
            }
            y += cellWidth + margin;
            x = 0;
        }

        /*x = 0;
        y = 0;

        let equipment = this.player.getEquipment();

        this.amuletCell = new CellContainer(this, x, y, cellWidth, cellHeight, padding, false, equipment.getAmuletCell(), null, {
            texture: Resources.Sprites.Items.Icons.EquipmentIcons,
            frame: 0
        });
        this.equipmentLayer.add(this.amuletCell);
        this.amuletCell.onClick(() => {
            cellClickFn(this.amuletCell.getCell());
        });
        x += cellWidth + margin;

        this.helmetCell = new CellContainer(this, x, y, cellWidth, cellHeight, padding, false, equipment.getHelmetCell(), null, {
            texture: Resources.Sprites.Items.Icons.EquipmentIcons,
            frame: 1
        });
        this.equipmentLayer.add(this.helmetCell);
        this.helmetCell.onClick(() => {
            cellClickFn(this.helmetCell.getCell());
        });
        x += cellWidth + margin;

        this.cloakCell = new CellContainer(this, x, y, cellWidth, cellHeight, padding, false, equipment.getCloakCell(), null, {
            texture: Resources.Sprites.Items.Icons.EquipmentIcons,
            frame: 2
        });
        this.equipmentLayer.add(this.cloakCell);
        this.cloakCell.onClick(() => {
            cellClickFn(this.cloakCell.getCell());
        });
        x = 0;
        y += cellHeight + margin;

        this.weaponCell = new CellContainer(this, x, y, cellWidth, cellHeight, padding, false, equipment.getWeaponCell(), null, {
            texture: Resources.Sprites.Items.Icons.EquipmentIcons,
            frame: 3
        });
        this.equipmentLayer.add(this.weaponCell);
        this.weaponCell.onClick(() => {
            cellClickFn(this.weaponCell.getCell());
        });
        x += cellWidth + margin;

        this.chestplateCell = new CellContainer(this, x, y, cellWidth, cellHeight, padding, false, equipment.getChestplateCell(), null, {
            texture: Resources.Sprites.Items.Icons.EquipmentIcons,
            frame: 4
        });
        this.equipmentLayer.add(this.chestplateCell);
        this.chestplateCell.onClick(() => {
            cellClickFn(this.chestplateCell.getCell());
        });
        x += cellWidth + margin;

        this.glovesCell = new CellContainer(this, x, y, cellWidth, cellHeight, padding, false, equipment.getGlovesCell(), null, {
            texture: Resources.Sprites.Items.Icons.EquipmentIcons,
            frame: 5
        });
        this.equipmentLayer.add(this.glovesCell);
        this.glovesCell.onClick(() => {
            cellClickFn(this.glovesCell.getCell());
        });
        x = 0;
        y += cellHeight + margin;

        this.leftRingCell = new CellContainer(this, x, y, cellWidth, cellHeight, padding, false, equipment.getFirstRingCell(), null, {
            texture: Resources.Sprites.Items.Icons.EquipmentIcons,
            frame: 6
        });
        this.equipmentLayer.add(this.leftRingCell);
        this.leftRingCell.onClick(() => {
            cellClickFn(this.leftRingCell.getCell());
        });
        x += cellWidth + margin;

        this.bootsCell = new CellContainer(this, x, y, cellWidth, cellHeight, padding, false, equipment.getBootsCell(), null, {
            texture: Resources.Sprites.Items.Icons.EquipmentIcons,
            frame: 7
        });
        this.equipmentLayer.add(this.bootsCell);
        this.bootsCell.onClick(() => {
            cellClickFn(this.bootsCell.getCell());
        });
        x += cellWidth + margin;

        this.rightRingCell = new CellContainer(this, x, y, cellWidth, cellHeight, padding, false, equipment.getSecondRingCell(), null, {
            texture: Resources.Sprites.Items.Icons.EquipmentIcons,
            frame: 6
        });
        this.equipmentLayer.add(this.rightRingCell);
        this.rightRingCell.onClick(() => {
            cellClickFn(this.rightRingCell.getCell());
        });*/
    }
    
   /* updateStats() {
        this.healthText.setText(this.player.getHealth() + Strings.Slash + this.player.getMaxHealth());
        this.defenseText.setText(this.player.getDefense());
        this.damageText.setText(this.player.getDamage());
        this.coinsText.setText(this.player.getScore());
    }

    updateCells() {
        for (let cell in this.cells) {
            let playerCell = this.player.getInventory().getCells()[cell];
            this.cells[cell].setCell(playerCell);
        }

        let equipment = this.player.getEquipment();
        this.amuletCell.setCell(equipment.getAmuletCell());
        this.cloakCell.setCell(equipment.getCloakCell());
        this.leftRingCell.setCell(equipment.getFirstRingCell());
        this.rightRingCell.setCell(equipment.getSecondRingCell());
        this.helmetCell.setCell(equipment.getHelmetCell());
        this.chestplateCell.setCell(equipment.getChestplateCell());
        this.glovesCell.setCell(equipment.getGlovesCell());
        this.bootsCell.setCell(equipment.getBootsCell());
        this.weaponCell.setCell(equipment.getWeaponCell());
    }*/

}


export default MenuScene;