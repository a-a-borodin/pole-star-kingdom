import Resources from '/src/constants/Resources.js';
import Strings from '/src/constants/Strings.js';

import ItemTypes from '/src/inventorySystem/items/ItemTypes.js';
import ItemsRarity from '/src/inventorySystem/items/ItemsRarity.js';

import GlovesTitles from "/src/inventorySystem/items/equipment/gloves/GlovesTitles.js";

const Gloves = {
    WoodenGloves:{
        title:GlovesTitles.WoodenGloves,
        type:ItemTypes.Gloves,
        isEquipable:true,
        isEquiped:false,
        cost:400,
        saleCost:250,
        rarity:ItemsRarity.Common,
        features:{
            defenseIncrease:1,
        },
        icon:{
            texture:Resources.Sprites.Items.Icons.GlovesIcons,
            frame:0, 
        },
        maxAmount:1,
        id:5000,
    },
};

export default Gloves;