import Resources from '/src/constants/Resources.js';
import Strings from '/src/constants/Strings.js';

import ItemTypes from '/src/inventorySystem/items/ItemTypes.js';
import ItemsRarity from '/src/inventorySystem/items/ItemsRarity.js';

import PotionTitles from '/src/inventorySystem/items/potion/PotionTitles.js';

const PotionsList = {
    WeakHealPotion:{
        title:PotionTitles.WeakHealPotion,
        type:ItemTypes.Potion,
        cost:5,
        saleCost:3,
        rarity:ItemsRarity.Primary,
        features:{
            healPower:3,
        },
        icon:{
            texture:Resources.Sprites.Items.Icons.PotionIcons,
            frame:1,
        },
        maxAmount:10,
        id:9000,
    },
};

export default PotionsList;