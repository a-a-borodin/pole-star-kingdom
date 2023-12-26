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
        cost:350,
        saleCost:225,
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
        cost:10000,
        saleCost:100000,
        rarity:ItemsRarity.Legendary,
        features:{
            damageIncrease:1,
            defenseIncrease:9999,
           // healthIncrease:9999,
            healthRegenIncrease:9999,
            speedIncrease:80,
            attackSpeed:200,
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