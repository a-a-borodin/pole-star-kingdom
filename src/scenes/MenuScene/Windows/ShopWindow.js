import CellContainer from '/src/inventorySystem/CellContainer.js';
import ShopDialogFrame from '/src/dialogFrames/ShopDialogFrame.js';
import Strings from '/src/constants/Strings.js';
import TextManager from '/src/utils/TextManager.js';
import Resources from '/src/constants/Resources.js';
import Weapons from "/src/inventorySystem/items/equipment/weapon/Weapons.js";
import Chestplates from "/src/inventorySystem/items/equipment/chestplate/Chestplates.js";
import Amulets from "/src/inventorySystem/items/equipment/amulet/Amulets.js";
import Potions from "/src/inventorySystem/items/potion/Potions.js";
import Boots from "/src/inventorySystem/items/equipment/boots/Boots.js";
import Cloaks from "/src/inventorySystem/items/equipment/cloak/Cloaks.js";
import Helmets from "/src/inventorySystem/items/equipment/helmet/Helmets.js";
import Gloves from "/src/inventorySystem/items/equipment/gloves/Gloves.js";
import Rings from "/src/inventorySystem/items/equipment/ring/Rings.js";
import Cell from "/src/inventorySystem/Cell.js";
import ItemsFactory from "/src/inventorySystem/items/ItemsFactory.js";
import Misc from '/src/utils/Misc.js';

class ShopWindow extends Phaser.GameObjects.Container {
    cells = [];
    equipment = [Weapons,Chestplates,Amulets,Potions,Boots,Cloaks,Helmets,Gloves,Rings];
    REFRESH_TIME = 60000*10;
    currentTime;
    
    constructor(context,x,y,width,height) {
        super(context,x,y);
        
        this.context = context;
        this.margin = 10;
        this.setSize(width,height);
        this.currentTime = this.REFRESH_TIME;
        
        let coinsIcon = context.add.sprite(this.margin,this.margin, Resources.Sprites.UI.Icons.StatisticIcons, 0);
        this.coinsText = context.textManager.createText(coinsIcon.x + coinsIcon.displayWidth / 1.5, coinsIcon.y, context.player.getScore()).setOrigin(0, 0.5);
        this.add(coinsIcon);
        this.add(this.coinsText);
        
        this.refreshText = context.textManager.createText(0, this.coinsText.y, 0).setOrigin(1, 0.5);
        this.add(this.refreshText);
        
        this.cellsLayer = context.add.container(0,this.coinsText.y + this.coinsText.displayHeight + this.margin);
        this.cellsLayer.setSize(this.width / 1.3 - this.margin, this.height / 1.3 - this.margin);
        this.add(this.cellsLayer);
        this.refreshText.x = this.cellsLayer.x + this.cellsLayer.width;
    
        this.refreshTimer = this.scene.time.addEvent({
            delay: 1000,
            callback: ()=>{
                this.currentTime -= 1000;
                this.refreshText.setText(Misc.fancyTimeFormat(this.currentTime/1000));
                
                if(this.currentTime <= 0){
                    this.currentTime = this.REFRESH_TIME;
                    this.updateGoods();
                }
            },
            callbackScope: context,
            repeat: true,
        });
        
        this.initCells();
        this.generateGoods();
    }
    
    initCells() {
        let cellClickFn = (cell) => {
            if (cell != undefined)
                return new ShopDialogFrame(this.context, cell);
        };

        let hrow = 4;
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
    }
    
    generateGoods() {
        for (let cell in this.cells) {
            let equipmentType = this.equipment[Math.floor(Math.random()*this.equipment.length)];
            let keys = Object.keys(equipmentType);
            let item = equipmentType[keys[ keys.length * Math.random() << 0]];
            console.log(item)
            let newCell = new Cell(null,item.amount)
            let i = ItemsFactory.create(item,newCell);
            newCell.setItem(i);
            this.cells[cell].setCell(newCell);
        }
    }
    
    updateGoods() {
        
    }
    
    update() {
        for (let cell in this.cells) {
            this.cells[cell].setCell(this.cells[cell].getCell());
        }
    }
}

export default ShopWindow;