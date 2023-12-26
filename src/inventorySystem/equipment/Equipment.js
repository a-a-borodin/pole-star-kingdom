import EquipmentCell from '/src/inventorySystem/equipment/EquipmentCell.js';
import ItemTypes from '/src/inventorySystem/items/ItemTypes.js';

class Equipment {
    constructor(target) {
        this.setHelmetCell(new EquipmentCell(target,ItemTypes.Helmet));
        this.setChestplateCell(new EquipmentCell(target,ItemTypes.Chestplate));
        this.setBootsCell(new EquipmentCell(target,ItemTypes.Boots));
        this.setGlovesCell(new EquipmentCell(target,ItemTypes.Gloves));
        this.setFirstRingCell(new EquipmentCell(target,ItemTypes.Ring));
        this.setSecondRingCell(new EquipmentCell(target,ItemTypes.Ring));
        this.setAmuletCell(new EquipmentCell(target,ItemTypes.Amulet));
        this.setCloakCell(new EquipmentCell(target,ItemTypes.Cloak));
        this.setWeaponCell(new EquipmentCell(target,ItemTypes.Weapon));
    }
    
    setHelmetCell(cell) {
        this.helmetCell = cell;
    }
    
    getHelmetCell() {
        return this.helmetCell;
    }
    
    setChestplateCell(cell) {
        this.chestplateCell = cell;
    }
    
    getChestplateCell() {
        return this.chestplateCell;
    }
    
    setBootsCell(cell) {
        this.bootsCell = cell;
    }
    
    getBootsCell() {
        return this.bootsCell;
    }
    
    setGlovesCell(cell) {
        this.glovesCell = cell;
    }
    
    getGlovesCell() {
        return this.glovesCell;
    }
    
    setFirstRingCell(cell) {
        this.firstRingCell = cell;
    }
    
    getFirstRingCell() {
        return this.firstRingCell;
    }
    
    setSecondRingCell(cell) {
        this.secondRingCell = cell;
    }
    
    getSecondRingCell() {
        return this.secondRingCell;
    }
    
    setAmuletCell(cell) {
        this.amuletCell = cell;
    }
    
    getAmuletCell() {
        return this.amuletCell;
    }
    
    setCloakCell(cell) {
        this.cloakCell = cell;
    }
    
    getCloakCell() {
        return this.cloakCell;
    }
    
    setWeaponCell(cell) {
        this.weaponCell = cell;
    }
    
    getWeaponCell() {
        return this.weaponCell;
    }
    
    getAllCells() {
        return [
                this.getHelmetCell(),
                this.getChestplateCell(),
                this.getGlovesCell(),
                this.getBootsCell(),
                this.getFirstRingCell(),
                this.getSecondRingCell(),
                this.getAmuletCell(),
                this.getCloakCell(),
                this.getWeaponCell(),
            ];
    }
}

export default Equipment;