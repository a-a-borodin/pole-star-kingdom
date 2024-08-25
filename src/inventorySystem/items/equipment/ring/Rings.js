import Resources from '/src/constants/Resources.js';
import Strings from '/src/constants/Strings.js';

import ItemTypes from '/src/inventorySystem/items/ItemTypes.js';
import ItemsRarity from '/src/inventorySystem/items/ItemsRarity.js';

import RingTitles from "/src/inventorySystem/items/equipment/ring/RingTitles.js";

const Rings = {
    WoodenRing:{
        title:RingTitles.WoodenRing,
        type:ItemTypes.Ring,
        isEquipable:true,
        isEquiped:false,
        isStoraged:false,
        cost:260,
        saleCost:65,
        rarity:ItemsRarity.Rare,
        features:{
            healthIncrease:2,
            damageIncrease:1,
        },
        icon:{
            texture:Resources.Sprites.Items.Icons.RingIcons,
            frame:0, 
        },
        maxAmount:1,
        id:7000,
    },
};

export default Rings;