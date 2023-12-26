import Potion from "/src/inventorySystem/items/potion/Potion.js";

class WeakHealPotion extends Potion {
    constructor(item, cell) {
        super(item, cell);
    }
    
    use(actionObject) {
        if(actionObject.getHealth() < actionObject.getMaxHealth()){
            super.use(actionObject);
            actionObject.setHealth(actionObject.getHealth() + this.getHealPower());
        }
    }
}

export default WeakHealPotion;