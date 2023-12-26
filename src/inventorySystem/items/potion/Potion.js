import Item from "/src/inventorySystem/Items/Item.js";

class Potion extends Item {
    constructor(item, cell) {
        super(item, cell);
        
        if(item.features.healPower)
            this.setHealPower(item.features.healPower);
    }
    
    use(target){
        if(this.getAmount() <= 0)
            return;
        
        this.setAmount(this.getAmount()-1);
    }
    
    setHealPower(value){
        this.healPower = value;
    }
    
    getHealPower(){
        return this.healPower;
    }
}

export default Potion;