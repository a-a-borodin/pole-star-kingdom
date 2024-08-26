import Item from "/src/inventorySystem/items/Item.js";
import Strings from '/src/constants/Strings.js';

class Equipment extends Item {
    constructor(item, cell) {
        super(item, cell);
        
        if(item.features.defenseIncrease != undefined){
            this.getDescription().push(Strings.DefenseIncrease + Strings.Delemiter + item.features.defenseIncrease);
            this.setDefenseIncrease(item.features.defenseIncrease);
        }
        if(item.features.damageIncrease != undefined){
            this.getDescription().push(Strings.DamageIncrease + Strings.Delemiter + item.features.damageIncrease);
            this.setDamageIncrease(item.features.damageIncrease);
        }
        if(item.features.healthIncrease != undefined){
            this.getDescription().push(Strings.HealthIncrease + Strings.Delemiter + item.features.healthIncrease);
            this.setHealthIncrease(item.features.healthIncrease);
        }
        if(item.features.speedIncrease != undefined){
            let speed = item.features.speedIncrease;
            
            if(speed <= 30) {
                this.getDescription().push(Strings.Slightly + Strings.Increases + Strings.MovementSpeed);
            }else if(speed <= 50) {
                this.getDescription().push(Strings.Increases + Strings.MovementSpeed);
            }else if(speed <= 70) {
                this.getDescription().push(Strings.Greatly + Strings.Increases + Strings.MovementSpeed);
            }else if(speed > 70) {
                this.getDescription().push(Strings.Incredible + Strings.MovementSpeed);
            }
            this.setSpeedIncrease(speed);
        }
        if(item.features.healthRegenIncrease != undefined){
            let regen = item.features.healthRegenIncrease;
            
            if(regen <= 1) {
                this.getDescription().push(Strings.Slightly + Strings.Increases + Strings.HealthRegen);
            } else if(regen <= 3) {
                this.getDescription().push(Strings.Increases + Strings.HealthRegen);
            } else if(regen <= 5) {
                this.getDescription().push(Strings.Greatly + Strings.Increases + Strings.HealthRegen);
            } else if(regen > 5) {
                this.getDescription().push(Strings.Incredible + Strings.HealthRegen);
            }
            this.setHealthRegenIncrease(item.features.healthRegenIncrease);
        }
        if(item.features.attackSpeed != undefined){
            let speed = item.features.attackSpeed;
            
            if(speed >= 3000) {
                this.getDescription().push(Strings.VerySlow + Strings.Speed);
            }else if(speed >=  2000) {
                this.getDescription().push(Strings.Slow + Strings.Speed);
            }else if(speed >= 1500) {
                this.getDescription().push(Strings.Average + Strings.Speed);
            } else if(speed >= 1000) {
                this.getDescription().push(Strings.Fast + Strings.Speed);
            } else if(speed >= 700) {
                this.getDescription().push(Strings.VeryFast + Strings.Speed);
            } else if(speed <= 400) {
                this.getDescription().push(Strings.Incredible + Strings.AttackSpeed);
            }
            this.setAttackSpeed(item.features.attackSpeed);
        }
        
        if(item.saleCost != undefined) {
            this.getDescription().push(Strings.SaleCost + item.saleCost);
        }
    }
    
    setSpeedIncrease(value) {
        this.speedIncrease = value;
    }
    
    getSpeedIncrease() {
        return this.speedIncrease;
    }
    
    setDefenseIncrease(value) {
        this.defenseIncrease = value;
    }
    
    getDefenseIncrease() {
        return this.defenseIncrease;
    }
    
    setDamageIncrease(value) {
        this.damageIncrease = value;
    }
    
    getDamageIncrease() {
        return this.damageIncrease;
    }
    
    getHealthIncrease() {
        return this.healthIncrease;
    }
    
    setHealthIncrease(value) {
        this.healthIncrease = value;
    }
    
    setHealthRegenIncrease(val) {
        this.healthRegenIncrease = val;
    }
    
    getHealthRegenIncrease() {
        return this.healthRegenIncrease;
    }
    
    setAttackSpeed(value) {
        this.attackSpeed = value;
    }
    
    getAttackSpeed() {
        return this.attackSpeed;
    }
}

export default Equipment;