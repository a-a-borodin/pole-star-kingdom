import CellContainer from '/src/inventorySystem/CellContainer.js';
import InventoryDialogFrame from '/src/dialogFrames/InventoryDialogFrame.js';
import Strings from '/src/constants/Strings.js';
import TextManager from '/src/utils/TextManager.js';

class StorageWindow extends Phaser.GameObjects.Container {
    cells = [];
    storageCells = [];
    
    constructor(context,x,y,width,height) {
        super(context,x,y);
        
        this.context = context;
        this.margin = 10;
        this.setSize(width,height);

        this.bagText = this.context.textManager.createText(0, 0, Strings.Bag, TextManager.STROKE).setOrigin(0);
        this.add(this.bagText);

        this.cellsLayer = context.add.container(0, this.bagText.y + this.bagText.displayHeight + this.margin);
        this.cellsLayer.setSize(this.width / 2 - this.margin * 2, this.height / 1.5);
        this.add(this.cellsLayer);
        
        this.storageText = this.context.textManager.createText(this.cellsLayer.x + this.cellsLayer.width + this.margin * 2, 0, Strings.Storage, TextManager.STROKE).setOrigin(0);
        this.add(this.storageText);

        this.storageLayer = context.add.container(this.cellsLayer.x + this.cellsLayer.width + this.margin * 2, this.storageText.y + this.storageText.displayHeight + this.margin);
        this.storageLayer.setSize(this.width - this.storageLayer.x, this.height / 2);
        this.add(this.storageLayer);

        this.initCells();
    }
    
    initCells() {
        let cellClickFn = (cell) => {
            if (cell != undefined)
                return new InventoryDialogFrame(this.context, cell);
        };

        let bagHRow = 3;
        let bagVRrow = 3;
        let margin = this.margin;
        let bagCellWidth = (this.cellsLayer.width / bagHRow) - margin;
        let bagCellHeight = bagCellWidth;
        let padding = 20;
        let y = 0;
        let x = 0;

        for (let v = 0; v < bagVRrow; v++) {
            for (let h = 0; h < bagHRow; h++) {
                let cell = new CellContainer(this.context, x, y, bagCellWidth, bagCellHeight, padding, true, null);
                cell.onClick(() => {
                    cellClickFn(cell.getCell());
                });

                this.cellsLayer.add(cell);
                this.cells.push(cell);
                x += bagCellWidth + margin;
            }
            y += bagCellHeight + margin;
            x = 0;
        }

        x = 0;
        y = 0;

        let storageVRow = 4;
        let storageHRow = 4;
        let storageCellWidth = (this.cellsLayer.width / storageHRow) - margin;
        let storageCellHeight = storageCellWidth;

        for (let v = 0; v < storageVRow; v++) {
            for (let h = 0; h < storageHRow; h++) {
                let cell = new CellContainer(this.context, x, y, storageCellWidth, storageCellHeight, padding, true, null);
                cell.onClick(() => {
                    cellClickFn(cell.getCell());
                });

                this.storageLayer.add(cell);
                this.storageCells.push(cell);
                x += storageCellWidth + margin;
            }
            y += storageCellHeight + margin;
            x = 0;
        }
    }
    
    updateCells() {
        for (let cell in this.cells) {
            let playerCell = this.context.player.getInventory().getCells()[cell];
            this.cells[cell].setCell(playerCell);
        }

        for (let cell in this.storageCells) {
            let playerCell = this.context.player.getStorage().getCells()[cell];
            this.storageCells[cell].setCell(playerCell);
        }
    }

    update() {
        this.updateCells();
    }

}

export default StorageWindow;