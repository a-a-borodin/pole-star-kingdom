import CellContainer from '/src/inventorySystem/CellContainer.js';
import InventoryDialogFrame from '/src/dialogFrames/InventoryDialogFrame.js';
import Strings from '/src/constants/Strings.js';
import TextManager from '/src/utils/TextManager.js';
import Resources from '/src/constants/Resources.js';

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
     
        let coinsIcon = context.add.sprite(this.margin, this.cellsLayer.y + this.cellsLayer.height, Resources.Sprites.UI.Icons.StatisticIcons, 0);
        this.coinsText = context.textManager.createText(coinsIcon.x + coinsIcon.displayWidth / 1.5, coinsIcon.y, context.player.getScore(), TextManager.SIMPLE, "25px").setOrigin(0, 0.5);
        this.cellsLayer.add(coinsIcon);
        this.cellsLayer.add(this.coinsText);
        
        this.equipmentLayer = context.add.container(this.cellsLayer.x + this.cellsLayer.width, 0);
        this.equipmentLayer.setSize(this.width - this.equipmentLayer.x, this.height / 1.5);
        this.add(this.equipmentLayer);
        this.initCells();
        
        this.statsLayer = context.add.container(this.equipmentLayer.x, this.equipmentLayer.y + this.equipmentLayer.height);
        this.statsLayer.setSize(this.width - this.statsLayer.x, this.height / 1.5);
        this.add(this.statsLayer);
        this.initStats();
    }
    
    initStats() {
        let fontSize = "25px";
        let heartIcon = this.context.add.sprite(this.margin, 0, Resources.Sprites.UI.Icons.StatisticIcons, 3);
        this.healthText = this.context.textManager.createText(heartIcon.x + heartIcon.displayWidth / 1.5, heartIcon.y, this.context.player.getHealth() + Strings.Slash + this.context.player.getMaxHealth(), TextManager.SIMPLE, fontSize).setOrigin(0, 0.5);
        this.statsLayer.add(heartIcon);
        this.statsLayer.add(this.healthText);

        let defenseIcon = this.context.add.sprite(this.margin, heartIcon.y + heartIcon.displayHeight, Resources.Sprites.UI.Icons.StatisticIcons, 2);
        this.defenseText = this.context.textManager.createText(defenseIcon.x + defenseIcon.displayWidth / 1.5, defenseIcon.y, this.context.player.getDefense(), TextManager.SIMPLE, fontSize).setOrigin(0, 0.5);
        this.statsLayer.add(defenseIcon);
        this.statsLayer.add(this.defenseText);

        let damageIcon = this.context.add.sprite(this.margin, defenseIcon.y + defenseIcon.displayHeight, Resources.Sprites.UI.Icons.StatisticIcons, 1);
        this.damageText = this.context.textManager.createText(damageIcon.x + damageIcon.displayWidth / 1.5, damageIcon.y, this.context.player.getDamage(), TextManager.SIMPLE, fontSize).setOrigin(0, 0.5);
        this.statsLayer.add(damageIcon);
        this.statsLayer.add(this.damageText);
    }
    
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

        x = 0;
        y = 0;

        let equipment = this.context.player.getEquipment();

        this.amuletCell = new CellContainer(this.context, x, y, cellWidth, cellHeight, padding, false, equipment.getAmuletCell(), null, {
            texture: Resources.Sprites.Items.Icons.EquipmentIcons,
            frame: 0
        });
        this.equipmentLayer.add(this.amuletCell);
        this.amuletCell.onClick(() => {
            cellClickFn(this.amuletCell.getCell());
        });
        x += cellWidth + margin;

        this.helmetCell = new CellContainer(this.context, x, y, cellWidth, cellHeight, padding, false, equipment.getHelmetCell(), null, {
            texture: Resources.Sprites.Items.Icons.EquipmentIcons,
            frame: 1
        });
        this.equipmentLayer.add(this.helmetCell);
        this.helmetCell.onClick(() => {
            cellClickFn(this.helmetCell.getCell());
        });
        x += cellWidth + margin;

        this.cloakCell = new CellContainer(this.context, x, y, cellWidth, cellHeight, padding, false, equipment.getCloakCell(), null, {
            texture: Resources.Sprites.Items.Icons.EquipmentIcons,
            frame: 2
        });
        this.equipmentLayer.add(this.cloakCell);
        this.cloakCell.onClick(() => {
            cellClickFn(this.cloakCell.getCell());
        });
        x = 0;
        y += cellHeight + margin;

        this.weaponCell = new CellContainer(this.context, x, y, cellWidth, cellHeight, padding, false, equipment.getWeaponCell(), null, {
            texture: Resources.Sprites.Items.Icons.EquipmentIcons,
            frame: 3
        });
        this.equipmentLayer.add(this.weaponCell);
        this.weaponCell.onClick(() => {
            cellClickFn(this.weaponCell.getCell());
        });
        x += cellWidth + margin;

        this.chestplateCell = new CellContainer(this.context, x, y, cellWidth, cellHeight, padding, false, equipment.getChestplateCell(), null, {
            texture: Resources.Sprites.Items.Icons.EquipmentIcons,
            frame: 4
        });
        this.equipmentLayer.add(this.chestplateCell);
        this.chestplateCell.onClick(() => {
            cellClickFn(this.chestplateCell.getCell());
        });
        x += cellWidth + margin;

        this.glovesCell = new CellContainer(this.context, x, y, cellWidth, cellHeight, padding, false, equipment.getGlovesCell(), null, {
            texture: Resources.Sprites.Items.Icons.EquipmentIcons,
            frame: 5
        });
        this.equipmentLayer.add(this.glovesCell);
        this.glovesCell.onClick(() => {
            cellClickFn(this.glovesCell.getCell());
        });
        x = 0;
        y += cellHeight + margin;

        this.leftRingCell = new CellContainer(this.context, x, y, cellWidth, cellHeight, padding, false, equipment.getFirstRingCell(), null, {
            texture: Resources.Sprites.Items.Icons.EquipmentIcons,
            frame: 6
        });
        this.equipmentLayer.add(this.leftRingCell);
        this.leftRingCell.onClick(() => {
            cellClickFn(this.leftRingCell.getCell());
        });
        x += cellWidth + margin;

        this.bootsCell = new CellContainer(this.context, x, y, cellWidth, cellHeight, padding, false, equipment.getBootsCell(), null, {
            texture: Resources.Sprites.Items.Icons.EquipmentIcons,
            frame: 7
        });
        this.equipmentLayer.add(this.bootsCell);
        this.bootsCell.onClick(() => {
            cellClickFn(this.bootsCell.getCell());
        });
        x += cellWidth + margin;

        this.rightRingCell = new CellContainer(this.context, x, y, cellWidth, cellHeight, padding, false, equipment.getSecondRingCell(), null, {
            texture: Resources.Sprites.Items.Icons.EquipmentIcons,
            frame: 6
        });
        this.equipmentLayer.add(this.rightRingCell);
        this.rightRingCell.onClick(() => {
            cellClickFn(this.rightRingCell.getCell());
        });
    }
    
    updateStats() {
        this.healthText.setText(this.context.player.getHealth() + Strings.Slash + this.context.player.getMaxHealth());
        this.defenseText.setText(this.context.player.getDefense());
        this.damageText.setText(this.context.player.getDamage());
        this.coinsText.setText(this.context.player.getScore());
    }

    updateCells() {
        for (let cell in this.cells) {
            let playerCell = this.context.player.getInventory().getCells()[cell];
            this.cells[cell].setCell(playerCell);
        }

        let equipment = this.context.player.getEquipment();
        this.amuletCell.setCell(equipment.getAmuletCell());
        this.cloakCell.setCell(equipment.getCloakCell());
        this.leftRingCell.setCell(equipment.getFirstRingCell());
        this.rightRingCell.setCell(equipment.getSecondRingCell());
        this.helmetCell.setCell(equipment.getHelmetCell());
        this.chestplateCell.setCell(equipment.getChestplateCell());
        this.glovesCell.setCell(equipment.getGlovesCell());
        this.bootsCell.setCell(equipment.getBootsCell());
        this.weaponCell.setCell(equipment.getWeaponCell());
    }

    update() {
        this.updateStats();
        this.updateCells();
    }

}

export default BagWindow;