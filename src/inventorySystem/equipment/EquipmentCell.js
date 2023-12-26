import Cell from "/src/inventorySystem/Cell.js";

class EquipmentCell extends Cell {
    constructor(target,cellType,item) {
        super(item);
        this.setType(cellType);
        this.setItem(item);
        this.setTarget(target);
    }
    
    setType(type) {
        this.type = type;
    }
    
    getType() {
        return this.type;
    }
    
    setTarget(target){
        this.target = target;
    }
    
    getTarget(){
        return this.target;
    }
    
    setItem(item){
        super.setItem(item);
        if(item == undefined)
            return;
            
        
        let target = this.getTarget();
        
        if(item.getHealthIncrease != undefined){
            if(item.getHealthIncrease() != undefined)
                target.setMaxHealth(target.getMaxHealth() + item.getHealthIncrease());
        }
        
        if(item.getSpeedIncrease != undefined){
            if(item.getSpeedIncrease() != undefined)
                target.setSpeed(target.getSpeed() + item.getSpeedIncrease());
        }
        
        if(item.getDefenseIncrease != undefined){
            if(item.getDefenseIncrease() != undefined)
                target.setDefense(target.getDefense() + item.getDefenseIncrease());
        }
        
        if(item.getDamageIncrease != undefined){
            if(item.getDamageIncrease() != undefined)
                target.setDamage(target.getDamage() + item.getDamageIncrease());
        }
        
        if(item.getHealthRegenIncrease != undefined){
            if(item.getHealthRegenIncrease() != undefined)
                target.setHealthRegen(target.getHealthRegen() + item.getHealthRegenIncrease());
        }
        
        if(item.getAttackSpeed != undefined){
            if(item.getAttackSpeed() != undefined)
                target.setAttackSpeed(item.getAttackSpeed());
        }
    }
    
    //TODO
    clear() {
        let item = this.getItem();
        let target = this.getTarget();
        
        if(item.getHealthIncrease != undefined){
            if(item.getHealthIncrease() != undefined)
                target.setMaxHealth(target.getMaxHealth() - item.getHealthIncrease());
        }
        
        if(item.getSpeedIncrease != undefined){
            if(item.getSpeedIncrease() != undefined)
                target.setSpeed(target.getSpeed() - item.getSpeedIncrease());
        }
        
        if(item.getDefenseIncrease != undefined){
            if(item.getDefenseIncrease() != undefined)
                target.setDefense(target.getDefense() - item.getDefenseIncrease());
        }
        
        if(item.getDamageIncrease != undefined){
            if(item.getDamageIncrease() != undefined)
                target.setDamage(target.getDamage() - item.getDamageIncrease());
        }
        
        if(item.getHealthRegenIncrease != undefined){
            if(item.getHealthRegenIncrease() != undefined)
                target.setHealthRegen(target.getHealthRegen() - item.getHealthRegenIncrease());
        }
        
        if(item.getAttackSpeed != undefined){
            if(item.getAttackSpeed() != undefined)
                target.setAttackSpeed(1000);
        }
        
        super.clear();
    }
}

export default EquipmentCell;