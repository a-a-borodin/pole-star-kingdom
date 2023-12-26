import EventCenter from '/src/constants/EventCenter.js';
import Events from '/src/constants/Events.js';
import Waves from '/src/wavesSystem/Waves.js';
import EnemyFactory from '/src/gameObjects/entity/enemy/EnemyFactory.js';

class WaveManager {
    constructor(scene, config){
        this.wave = config.wave;
        this.spawnPointX = config.spawnPointX;
        this.spawnPointY = config.spawnPointY;
        this.player = config.player;
        this.ground = config.ground;
        this.scene = scene;
    }
    
    startWave(){
        if(this.waveTimer != undefined)
            this.waveTimer.remove();
        
        if(this.onWaveStart != undefined)
            this.onWaveStart();
        
        EventCenter.emit(Events.UPDATE_WAVE_INFO,this.getWave());
        EventCenter.emit(Events.WAVE_START, this.wave.isStarted);
        
        this.wave.isStarted = true;
        this.waveTimer = this.scene.time.addEvent({
            delay: 1000,
            callback: ()=>{
                this.wave.currentTime += 1000;
                if(this.wave.currentTime >= this.wave.maxTime){
                    this.waveEnd();
                    return;
                }
                EventCenter.emit(Events.UPDATE_WAVE_INFO, this.wave);
            },
            callbackScope: this,
            repeat: ((this.wave.maxTime - this.wave.currentTime)/1000),
        });
    }
    
    waveEnd(){
        this.getWave().isStarted = false;
        EventCenter.emit(Events.WAVE_END);  
    }
    
    waveComplete(){
        this.getWave().isStarted = false;
        EventCenter.emit(Events.WAVE_COMPLETE);
    }
    
    onWaveStart(){
        let wave = this.getWave();
        let enemy = EnemyFactory.create(this.scene,this.spawnPointX,this.spawnPointY,wave.enemy);
        enemy.setAlpha(0);
        enemy.setGround(this.getGround());
        this.scene.tweens.add({
            targets: enemy,
            alpha:1,
            ease: 'Sine.easeInOut',
            duration: 3000,
            repeat: 0,
        }).on("complete",()=>{
            enemy.setEnemy(this.getPlayer());
            this.getPlayer().setEnemy(enemy);
        });
        enemy.onDead(()=>{
            if(!wave.isStarted)
                return;
              
            this.wave.currentKills += 1; 
            EventCenter.emit(Events.UPDATE_WAVE_INFO,this.wave);
            if(this.wave.currentKills >= this.wave.enemiesAmount){
                this.waveComplete();
                return;
            }
            
            this.wave.currentEnemy += 1;
            this.onWaveStart();
        });
    }
    
    getWave() {
        return this.wave;
    }
    
    setWave(wave) {
        let waveClone = {};
        for(let key in wave)
            waveClone[key] = wave[key];
        
        this.wave = waveClone;
    }
    
    setPlayer(player){
        this.player = player;
    }
    
    getPlayer(){
        return this.player;
    }
    
    setGround(ground){
        this.ground = ground;
    }
    
    getGround(){
        return this.ground;
    }
    
    setSpawnPosition(config){
        this.spawnPointX = config.x;
        this.spawnPointY = config.y;
    }
    
    getSpawnPosition(){
        return {
            x:this.spawnPointX,
            y:this.spawnPointY,
        };
    }
}

export default WaveManager;