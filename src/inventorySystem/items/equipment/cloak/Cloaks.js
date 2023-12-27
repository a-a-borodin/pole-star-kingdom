import Resources from '/src/constants/Resources.js';
import Strings from '/src/constants/Strings.js';

import ItemTypes from '/src/inventorySystem/items/ItemTypes.js';
import ItemsRarity from '/src/inventorySystem/items/ItemsRarity.js';

import CloakTitles from "/src/inventorySystem/items/equipment/cloak/CloakTitles.js";

const Cloaks = {
    SimpleCloak:{
        title:CloakTitles.SimpleCloak,
        type:ItemTypes.Cloak,
        isEquipable:true,
        isEquiped:false,
        isStoraged:false,
        cost:700,
        saleCost:450,
        rarity:ItemsRarity.Rare,
        features:{
            healthIncrease:15,
            speedIncrease:35,
        },
        icon:{
            texture:Resources.Sprites.Items.Icons.CloakIcons,
            frame:0, 
        },
        maxAmount:1,
        id:4000,
    },
};

export default Cloaks;