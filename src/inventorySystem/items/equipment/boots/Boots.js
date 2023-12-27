import Resources from '/src/constants/Resources.js';
import Strings from '/src/constants/Strings.js';

import ItemTypes from '/src/inventorySystem/items/ItemTypes.js';
import ItemsRarity from '/src/inventorySystem/items/ItemsRarity.js';

import BootsTitles from "/src/inventorySystem/items/equipment/boots/BootsTitles.js";

const Boots = {
    WoodenBoots:{
        title:BootsTitles.WoodenBoots,
        type:ItemTypes.Boots,
        isEquipable:true,
        isEquiped:false,
        isStoraged:false,
        cost:300,
        saleCost:200,
        rarity:ItemsRarity.Common,
        features:{
            defenseIncrease:1,
        },
        icon:{
            texture:Resources.Sprites.Items.Icons.BootsIcons,
            frame:0, 
        },
        maxAmount:1,
        id:2000,
    },
};

export default Boots;