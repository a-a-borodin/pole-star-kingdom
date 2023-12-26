import Cell from "/src/inventorySystem/Cell.js";

class Inventory{
    constructor(cellsAmount){
        this.cellsAmount = cellsAmount;
        this.init();
    }
    
    init(){
        this.cells = [];
        for(let i = 0; i < this.cellsAmount; i++){
            this.cells.push(new Cell());
        }
    }
    
    push(items){
        if(Array.isArray(items)){
            items.forEach((item)=>{
                this._push(item);
            });
            return;
        }
        
        this._push(items);
    }
    
    _push(item){
        if(item == undefined)
            return;
        let emptyCell;
        for(let key in this.cells){
            let cell = this.cells[key];
            if(cell.getItem() == undefined || cell.getItem() == null){
                if(emptyCell == null)
                    emptyCell = cell;
                continue;
            }
            
            if(cell.getItem().getId() == item.getId()){
                if(cell.getItem().getAmount() < cell.getItem().getMaxAmount()){
                    cell.getItem().setAmount(cell.getItem().getAmount() + 1);
                    return;
                }
            }
        }
        if(emptyCell == null)
            return;
            
        emptyCell.setItem(item);
        item.setAmount(1);
    }
    
    getItemAmount(item){
        let amount = 0;
        for(let key in this.cells){
            if(this.cells[key].getItem() == null)
                continue;
        
            if(this.cells[key].getItem().getId() == item.getId())
                amount++;
        }
        return amount;
    }
    
    getItemsAmount(){
        let amount = 0;
        for(let key in this.cells){
            if(this.cells[key].getItem() == null)
                continue;
            
            amount += this.cells[key].getItem().getAmount();
        }
        return amount;
    }
    
    getAllItems(){
        let items = [];
        for(let key in this.cells){
            if(this.cells[key].getItem() == null)
                continue;
            
            items.push(this.cells[key].getItem());
        }
        return items;
    }
    
    isEmpty() {
        return true ? this.getAllItems().length <= 0 : false;
    }
    
    hasSlotFor(item){
        let cells = this.getCells();
       // console.log(1 > 1 && 2 > 3);
        for(let key in cells){
            let cell = cells[key];
            if(cell.getItem() == undefined)
                return cell;
            
            if(cell.getItem().id == item.id && cell.getItem().getAmount() < cell.getItem().getMaxAmount())
                return cell;
        }
        return false;
    }
    
    getRandomItemByRarity(){
        if(this.isEmpty())
           return;
           
        let items = this.getAllItems();
            
        let item = items[Math.floor(Math.random()*items.length)];
        let rarity = item.rarity;
        
        let chance = Math.random();
        if(chance <= rarity){
            return item;
        }
    }
    
    getCells(){
        return this.cells;
    }
    
    clear(){
        this.init();
    }
}

export default Inventory;