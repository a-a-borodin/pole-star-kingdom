import Potions from "/src/inventorySystem/items/potion/Potions.js";
import WeakHealPotion from "/src/inventorySystem/items/potion/potions/WeakHealPotion.js";

class PotionFactory {
    static create(item, cell){
        switch(item) {
            case Potions.WeakHealPotion : 
                return new WeakHealPotion(item, cell);
            
        }
    }
}

export default PotionFactory;