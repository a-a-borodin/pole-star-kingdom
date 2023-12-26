class Cell{
    constructor(item,amount){
        this.item = item;
    }
    
    setItem(item){
        this.item = item;
    }
    
    getItem(){
        return this.item;
    }
    
    clear(){
        this.setItem();
    }
}

export default Cell;