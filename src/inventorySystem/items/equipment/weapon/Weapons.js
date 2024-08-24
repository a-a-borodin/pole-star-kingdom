import Resources from '/src/constants/Resources.js';
import Strings from '/src/constants/Strings.js';

import ItemTypes from '/src/inventorySystem/items/ItemTypes.js';
import ItemsRarity from '/src/inventorySystem/items/ItemsRarity.js';

import WeaponTitles from "/src/inventorySystem/items/equipment/weapon/WeaponTitles.js";

const Weapons = {
    WoodenSword:{
        title:WeaponTitles.WoodenSword,
        type:ItemTypes.Weapon,
        isEquipable:true,
        isEquiped:false,
        isStoraged:false,
        cost:100,
        saleCost:15,
        rarity:ItemsRarity.Common,
        features:{
            damageIncrease:1,
        },
        icon:{
            texture:Resources.Sprites.Items.Icons.WeaponIcons,
            frame:0, 
        },
        maxAmount:1,
        id:8000,
    },
    
    SweetySword:{
        title:WeaponTitles.SweetySword,
        type:ItemTypes.Weapon,
        isEquipable:true,
        isEquiped:false,
        isStoraged:false,
        cost:0,
        saleCost:0,
        rarity:ItemsRarity.Developer,
        features:{
            defenseIncrease:9999,
            healthRegenIncrease:9999,
            speedIncrease:100,
            attackSpeed:250,
        },
        icon:{
            texture:Resources.Sprites.Items.Icons.WeaponIcons,
            frame:99, 
        },
        maxAmount:1,
        id:8001,
    }
};

export default Weapons;