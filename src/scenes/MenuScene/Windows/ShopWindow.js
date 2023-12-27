import CellContainer from '/src/inventorySystem/CellContainer.js';
import InventoryDialogFrame from '/src/dialogFrames/InventoryDialogFrame.js';
import Strings from '/src/constants/Strings.js';
import TextManager from '/src/utils/TextManager.js';

class ShopWindow extends Phaser.GameObjects.Container {
    cells = [];
    
    constructor(context,x,y,width,height) {
        super(context,x,y);
        
        this.context = context;
        this.margin = 10;
        this.setSize(width,height);

        this.cellsLayer = context.add.container(0, 0);
        this.cellsLayer.setSize(this.width / 2 - this.margin * 2, this.height / 1.5);
        this.add(this.cellsLayer);
        
        this.initCells();
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
    }
    
    update() {
        
    }

}

export default ShopWindow;