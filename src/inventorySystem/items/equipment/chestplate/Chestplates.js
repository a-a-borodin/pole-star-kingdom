import Resources from '/src/constants/Resources.js';
import Strings from '/src/constants/Strings.js';

import ItemTypes from '/src/inventorySystem/items/ItemTypes.js';
import ItemsRarity from '/src/inventorySystem/items/ItemsRarity.js';

import ChestplateTitles from "/src/inventorySystem/items/equipment/chestplate/ChestplateTitles.js";

const Chestplates = {
    WoodenChestplate:{
        title:ChestplateTitles.WoodenChestplate,
        type:ItemTypes.Chestplate,
        isEquipable:true,
        isEquiped:false,
        isStoraged:false,
        cost:60,
        saleCost:15,
        rarity:ItemsRarity.Common,
        features:{
            defenseIncrease:2,
        },
        icon:{
            texture:Resources.Sprites.Items.Icons.ChestplateIcons,
            frame:0, 
        },
        maxAmount:1,
        id:3000,
    },
};

export default Chestplates;