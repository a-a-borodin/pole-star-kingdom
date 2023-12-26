import Resources from '/src/constants/Resources.js';
import Strings from '/src/constants/Strings.js';

import ItemTypes from '/src/inventorySystem/items/ItemTypes.js';
import ItemsRarity from '/src/inventorySystem/items/ItemsRarity.js';

import HelmetTitles from "/src/inventorySystem/items/equipment/helmet/HelmetTitles.js";

const Helmets = {
    WoodenHelmet:{
        title:HelmetTitles.WoodenHelmet,
        type:ItemTypes.Helmet,
        isEquipable:true,
        isEquiped:false,
        cost:400,
        saleCost:250,
        rarity:ItemsRarity.Common,
        features:{
            defenseIncrease:1,
        },
        icon:{
            texture:Resources.Sprites.Items.Icons.HelmetIcons,
            frame:0, 
        },
        maxAmount:1,
        id:6000,
    },
};

export default Helmets;