import Resources from '/src/constants/Resources.js';
import Strings from '/src/constants/Strings.js';

import ItemTypes from '/src/inventorySystem/items/ItemTypes.js';
import ItemsRarity from '/src/inventorySystem/items/ItemsRarity.js';

import AmuletTitles from "/src/inventorySystem/items/equipment/amulet/AmuletTitles.js";

const Amulets = {
    WoodenAmulet:{
        title:AmuletTitles.WoodenAmulet,
        type:ItemTypes.Amulet,
        isEquipable:true,
        isEquiped:false,
        isStoraged:false,
        cost:250,
        saleCost:50,
        rarity:ItemsRarity.Rare,
        features:{
            healthIncrease:1,
        },
        icon:{
            texture:Resources.Sprites.Items.Icons.AmuletIcons,
            frame:0, 
        },
        maxAmount:1,
        id:1000,
    },
};

export default Amulets;