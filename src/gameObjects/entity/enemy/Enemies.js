import Resources from '/src/constants/Resources.js';
import Anims from '/src/constants/Anims.js';

import Weapons from "/src/inventorySystem/items/equipment/weapon/Weapons.js";
import Chestplates from "/src/inventorySystem/items/equipment/chestplate/Chestplates.js";
import Amulets from "/src/inventorySystem/items/equipment/amulet/Amulets.js";
import Potions from "/src/inventorySystem/items/potion/Potions.js";
import Boots from "/src/inventorySystem/items/equipment/boots/Boots.js";
import Cloaks from "/src/inventorySystem/items/equipment/cloak/Cloaks.js";
import Helmets from "/src/inventorySystem/items/equipment/helmet/Helmets.js";
import Gloves from "/src/inventorySystem/items/equipment/gloves/Gloves.js";
import Rings from "/src/inventorySystem/items/equipment/ring/Rings.js";

const Enemies = {
    WolfBlack:{
        health:15,
        maxHealth:15,
        damage:4,
        speed:110,
        defense:20,
        attackSpeed:1500,
        knockback:100,
        coinsAmount:8,
        inventory:[
            Weapons.WoodenSword,
            Gloves.WoodenGloves,
            Helmets.WoodenHelmet,
            Potions.WeakHealPotion,
        ],
        texture:Resources.Sprites.Entities.Enemies.WolfBlack,
        frame:2,
        anims : {
            run:Anims.WolfBlack.Run,
            attack:Anims.WolfBlack.Attack,
            dead:Anims.WolfBlack.Dead,
        }
    },
    
    WolfWhite:{
        health:20,
        maxHealth:20,
        damage:7,
        speed:140,
        defense:30,
        attackSpeed:1000,
        knockback:150,
        coinsAmount:13,
        inventory:[
            Rings.WoodenRing,
            Chestplates.WoodenChestplate,
            Boots.WoodenBoots,
            Gloves.WoodenGloves,
            Potions.WeakHealPotion,
        ],
        texture:Resources.Sprites.Entities.Enemies.WolfWhite,
        frame:2,
        anims : {  
            run:Anims.WolfWhite.Run,
            attack:Anims.WolfWhite.Attack,
            dead:Anims.WolfWhite.Dead,
        }
    },
    
    SlimeGreen:{
        health:10,
        maxHealth:10,
        damage:2,
        speed:70,
        defense:0,
        attackSpeed:1900,
        knockback:100,
        coinsAmount:5,
        inventory:[
            Potions.WeakHealPotion,
        ],
        texture:Resources.Sprites.Entities.Enemies.SlimeGreen,
        frame:0,
        anims : {
            run:Anims.SlimeGreen.Run,
            attack:Anims.SlimeGreen.Attack,
            dead:Anims.SlimeGreen.Dead,
        }
    },
    
    AlienBlue:{
        health:25,
        maxHealth:25,
        damage:9,
        speed:90,
        defense:35,
        attackSpeed:1000,
        knockback:200,
        coinsAmount:18,
        inventory:[
            Chestplates.WoodenChestplate,
            Amulets.WoodenAmulet,
            Cloaks.SimpleCloak,
            Potions.WeakHealPotion,
        ],
        texture:Resources.Sprites.Entities.Enemies.AlienBlue,
        frame:0,
        anims : {
            run:Anims.AlienBlue.Run,
            attack:Anims.AlienBlue.Attack,
            dead:Anims.AlienBlue.Dead,
        }
    },
};

export default Enemies;