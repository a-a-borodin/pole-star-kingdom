class Item {
    constructor(item, cell) {
        this.setTitle(item.title);
        this.setType(item.type);
        this.setCost(item.cost);
        this.setSaleCost(item.saleCost);
        this.setRarity(item.rarity);
        this.setIcon(item.icon);
        this.setMaxAmount(item.maxAmount);
        this.setId(item.id);
        this.setAmount(item.amount);
        this.setCell(cell);
        this.setEquipable(item.isEquipable);
        this.setEquiped(item.isEquiped);
        this.setStored(item.isStored);
        this.setDescription(item.description);
    }
    
    setStored(val) {
        this.isStored = val;
    }

    isStored() {
        return this.isStored;
    }

    isEquipable(){
        return this.isEquipable;
    }
    
    setEquipable(val){
        this.isEquipable = val;
    }
    
    setAmount(value) {
        this.amount = value;
    }
    
    getAmount() {
        return this.amount;
    }
    
    getTitle() {
        return this.title;
    }
    
    setTitle(title) {
        this.title = title;
    }
    
    getType() {
        return this.type;
    }
    
    setType(value) {
        this.type = value;
    }
    
    getCost() {
        return this.cost;
    }
    
    setCost(value) {
        this.cost = value;
    }
    
    getSaleCost() {
        return this.saleCost;
    }
    
    setSaleCost(value) {
        this.saleCost = value;
    }
    
    getRarity() {
        return this.rarity;
    }
    
    setRarity(value) {
        this.rarity = value;
    }
    
    getIcon() {
        return this.icon;
    }
    
    setIcon(value) {
        this.icon = value;
    }
    
    getMaxAmount() {
        return this.maxAmount;
    }
    
    setMaxAmount(value) {
        this.maxAmount = value;
    }
    
    getId() {
        return this.id;
    }
    
    setId(value) {
        this.id = value;
    }
    
    setCell(cell) {
        this.cell = cell;
    }
    
    getCell() {
        return this.cell;
    }
    
    setEquiped(val){
        this.isEquiped = val;
    }
    
    isEquiped(){
        return this.isEquiped;
    }
    
    getDescription() {
        return this.description;
    }
    
    setDescription(value) {
        if(value == undefined){
            this.description = [];
            return;
        }
        this.description = value;
    }
}

export default Item;