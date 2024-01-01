import Entity from '/src/gameObjects/Entity/Entity.js';
import Chest from '/src/gameObjects/Chest.js';
import Anims from '/src/constants/Anims.js';
import ItemsFactory from '/src/inventorySystem/items/ItemsFactory.js';
import Coin from '/src/gameObjects/Coin.js';
import EventManager from '/src/utils/EventManager.js';

class Enemy extends Entity{
    constructor(scene, x, y, type){
        super(scene, x, y, type.texture, type.frame, type, type.anims);
        this.type = type;
        this.scene = scene;
        
        if(type.inventory != undefined){
            for(let index in type.inventory)
                this.getInventory().push(ItemsFactory.create(type.inventory[index], null, null));
        }
    }
    
    setEnemy(enemy){
        super.setEnemy(enemy);
        
        this.followTimer = this.scene.time.addEvent({
            delay: 10,
            callback: ()=>{
                this.moveToObject(enemy);
            },
            callbackScope: this,
            loop:true,
        });
    }
    
    kill(){
        this.dropChest();
        this.dropCoin(this.type.coinsAmount);
        this.healthBar.destroy();
        this.followTimer.remove();
        super.kill();
    }
    
    dropChest() {
        let item = this.getInventory().getRandomItemByRarity();
        
        if(item == undefined)
            return;
                
        let chest = new Chest(this.scene,this.x,this.y,item);
        if(this.getGround() != undefined)
            this.scene.physics.add.collider(chest,this.getGround());

        if(this.getEnemy() != undefined){
            this.scene.physics.add.overlap(chest,this.getEnemy(), ()=>{
                if(chest.isOpened())
                    return;
            
                if(!this.getEnemy().getInventory().hasSlotFor(item))
                    return;
                
                 
                this.getEnemy().getInventory().push(chest.open());
            });
        }
    }
    
    dropCoin(amount) {
        for(let i = 0; i < amount; i++){
            let randX = Math.floor(Math.random() * (35 - (-35))) + (-35);
            let randY = Math.floor(Math.random() * 50);
            
            let coin = new Coin(this.scene,this.x+randX,this.y-randY);
            this.scene.physics.add.collider(coin, this.getGround(), ()=>{
                coin.dropped = true;
            });
            this.scene.physics.add.overlap(this.getEnemy(), coin, (player, coin)=>{
                if(!coin.dropped)
                    return;
	            EventManager.emit(EventManager.Events.UPDATE_SCORE, player.getScore() + coin.getPrice());
	            coin.destroy();
	        });
        }
    }
}

export default Enemy;