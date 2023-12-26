import ItemTypes from '/src/inventorySystem/items/ItemTypes.js';
import Equipment from "/src/inventorySystem/items/equipment/Equipment.js";
import PotionFactory from "/src/inventorySystem/items/potion/PotionFactory.js";

class ItemsFactory {
    static create(item,cell){
        switch(item.type) {
            case ItemTypes.Potion :
                return PotionFactory.create(item,cell);
            default : 
                return new Equipment(item,cell);
        }
    }
}

export default ItemsFactory;