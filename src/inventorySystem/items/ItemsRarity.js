import Misc from '/src/utils/Misc.js';

const ItemsRarity = {
    Primary:0.9,
    Common:0.7,
    Rare:0.3,
    Epic:0.09,
    Legendary:0.01,
    Developer:0.0,
};

ItemsRarity.getColorByRarity = function(rarity) {
    switch(rarity) {
        case ItemsRarity.Primary:
            return Misc.Colors.GREY;
        case ItemsRarity.Common:
            return Misc.Colors.WHITE;
        case ItemsRarity.Rare:
            return Misc.Colors.BLUE;
        case ItemsRarity.Epic:
            return Misc.Colors.PINK;
        case ItemsRarity.Legendary:
            return Misc.Colors.RED;
        case ItemsRarity.Developer:
            return Misc.Colors.PINK;
    }
}

export default ItemsRarity;