import Item from "/src/inventorySystem/items/Item.js";
import Strings from '/src/constants/Strings.js';

class Potion extends Item {
    constructor(item, cell) {
        super(item, cell);
        
        if(item.features.healPower){
            this.setHealPower(item.features.healPower);
            this.description.push(Strings.HealPower + Strings.Delemiter + this.getHealPower());
            this.description.push(Strings.SaleCost + this.getSaleCost());
        }
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