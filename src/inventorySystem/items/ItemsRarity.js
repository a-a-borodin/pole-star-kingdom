import Colors from '/src/constants/Colors.js';

const ItemsRarity = {
    Primary:0.9,
    Common:0.7,
    Rare:0.3,
    Epic:0.09,
    Legendary:0.01
};

ItemsRarity.getColorByRarity = function(rarity) {
    switch(rarity) {
        case ItemsRarity.Primary:
            return Colors.GREY;
        case ItemsRarity.Common:
            return Colors.WHITE;
        case ItemsRarity.Rare:
            return Colors.BLUE;
        case ItemsRarity.Epic:
            return Colors.PINK;
        case ItemsRarity.Legendary:
            return Colors.RED;
    }
}

export default ItemsRarity;