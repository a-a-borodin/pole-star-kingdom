import Misc from '/src/utils/Misc.js';
import Resources from '/src/constants/Resources.js';
import EventManager from '/src/utils/EventManager.js';
import Player from '/src/gameObjects/entity/Player.js';
import WaveManager from '/src/wavesSystem/WaveManager.js';
import Waves from '/src/wavesSystem/Waves.js';
import Anims from '/src/constants/Anims.js';
import ItemsFactory from '/src/inventorySystem/items/ItemsFactory.js';
import Weapons from "/src/inventorySystem/items/equipment/weapon/Weapons.js";

import OutlineSpriteFX from '/src/utils/OutlineSpriteFX.js';

class MainScene extends Phaser.Scene{
    constructor(config){
        super(config);
    }
    
    init(){
        this.sceneWidth = 50*48;
		this.sceneHeight = this.cameras.main.height;			
		this.input.addPointer(Misc.MAX_TOUCH_COUNT);
		this.groundHeight = 93;
		this.groundLevel = this.sceneHeight - this.groundHeight;
	    this.spawnPointX = this.sceneWidth / 2;
        console.log(this.sceneWidth);
	    this.spawnPointY = this.groundLevel - 32;
	    this.cameras.main.flash(Misc.FLASH_DURATION);
	    this.cameras.main.setBounds(0, 0, this.sceneWidth, this.sceneHeight);
	    this.cameras.main.pan(this.sceneWidth /2, 0, 0);
	    this.physics.world.setBounds(0, 0, this.sceneWidth, this.sceneHeight);
	    this.transition = true;
        this.postFxPlugin = this.plugins.get('rexoutlinepipelineplugin');
   }
    
    create(){
        const bgType = Resources.Sprites.Backgrounds.Game.Parallax.OakWoods;
		const backgroundEmpty = this.add.tileSprite(0,0,this.sceneWidth*3,this.sceneHeight,bgType,0).setOrigin(0);
        backgroundEmpty.setScrollFactor(0.1);
	    const backgroundFirst = this.add.tileSprite(0,0,this.sceneWidth*3,this.sceneHeight,bgType,1).setOrigin(0);
	    backgroundFirst.setScrollFactor(0.3);
	    const backgroundSecond = this.add.tileSprite(0,0,this.sceneWidth*3,this.sceneHeight,bgType,2).setOrigin(0);
	    backgroundSecond.setScrollFactor(0.6);
        
		const groundMap = this.make.tilemap({ key: Resources.Json.Maps.MainGroundMap });
        const groundTileset = groundMap.addTilesetImage("ground",Resources.Sprites.Materials.OakWoods.OakWoodsGround);
        const propsTileset = groundMap.addTilesetImage("villageProps",Resources.Sprites.Materials.OakWoods.VillageProps);
        this.groundLayer = groundMap.createLayer("ground", groundTileset, 0, -230);
        groundMap.createLayer("props", propsTileset, 0, -230);
        groundMap.createLayer("props2", propsTileset, 0, -230);
        this.groundLayer.setCollisionByExclusion(-1, true);

        this.camera = this.add.sprite(this.spawnPointX, this.spawnPointY);
        this.camera.speed = 4;
        this.cameras.main.startFollow(this.camera);
    
        this.home = this.physics.add.sprite(this.sceneWidth /2,this.groundLevel,Resources.Sprites.Materials.OakWoods.OakCoinTree).setOrigin(0.5,1);
        
        this.shop = this.physics.add.sprite(0,this.groundLevel,Resources.Sprites.Materials.OakWoods.Shop,0).setOrigin(0.5,1);
        this.shop.setPosition(this.sceneWidth - this.shop.displayWidth, this.shop.y);
        this.anims.create({
            key:Anims.Shop.Working.key,
            frames: this.anims.generateFrameNumbers(this.shop.texture.key,{frames:Anims.Shop.Working.frames}),
            frameRate:Anims.Shop.Working.frameRate,
            repeat:Anims.Shop.Working.repeat,
        });
        this.shop.play(Anims.Shop.Working.key);

        this.portal = this.physics.add.sprite(0,this.groundLevel,Resources.Sprites.Materials.OakWoods.PortalPurple,0).setOrigin(0,1).setAlpha(0);
        this.anims.create({
            key:Anims.Portal.Working.key,
            frames: this.anims.generateFrameNumbers(this.portal.texture.key,{frames:Anims.Portal.Working.frames}),
            frameRate:Anims.Portal.Working.frameRate,
            repeat:Anims.Portal.Working.repeat,
        });
        this.anims.create({
            key:Anims.Portal.Opens.key,
            frames: this.anims.generateFrameNumbers(this.portal.texture.key,{frames:Anims.Portal.Opens.frames}),
            frameRate:Anims.Portal.Opens.frameRate,
            repeat:Anims.Portal.Opens.repeat,
        });
        this.anims.create({
            key:Anims.Portal.Closes.key,
            frames: this.anims.generateFrameNumbers(this.portal.texture.key,{frames:Anims.Portal.Closes.frames}),
            frameRate:Anims.Portal.Closes.frameRate,
            repeat:Anims.Portal.Closes.repeat,
        });
        
        this.wizzard = this.physics.add.sprite(this.portal.x + this.portal.displayWidth + 130,this.groundLevel,Resources.Sprites.Entities.Npcs.Wizzard,0).setOrigin(0,1);
        this.anims.create({
            key:Anims.Wizzard.Idle.key,
            frames: this.anims.generateFrameNumbers(this.wizzard.texture.key,{frames:Anims.Wizzard.Idle.frames}),
            frameRate:Anims.Wizzard.Idle.frameRate,
            repeat:Anims.Wizzard.Idle.repeat,
        });
        this.wizzard.play(Anims.Wizzard.Idle.key);
        this.wizzard.on("pointerdown",()=>{
            EventManager.emit(EventManager.Events.SHOW_WIZZARD_DIALOG);
        });
        
        this.wizzard.dialog = this.add.sprite(this.wizzard.x + this.wizzard.displayWidth/2, this.wizzard.y - this.wizzard.displayHeight, Resources.Sprites.UI.Dialogs.PopUpTalkDialog).setOrigin(0,1).setAlpha(0);
        
        this.anims.create({
            key:Anims.PopUpTalkDialog.key,
            frames: this.anims.generateFrameNumbers(this.wizzard.dialog.texture.key,{frames:Anims.PopUpTalkDialog.frames}),
            frameRate:Anims.PopUpTalkDialog.frameRate,
            repeat:Anims.PopUpTalkDialog.repeat,
        });
        this.wizzard.dialog.play(Anims.PopUpTalkDialog.key);
        
        let wave = Waves.get(1);
        
        this.waveManager = new WaveManager(this, {
	        ground:this.groundLayer,
	        spawnPointX:this.portal.x + this.portal.displayWidth / 2,
	        spawnPointY:this.portal.y - this.portal.displayHeight / 2,
	        wave: wave
	    });
	    
        this.player = new Player(this,this.spawnPointX,this.spawnPointY,Resources.Sprites.Entities.Player.Simple,0,{
            maxHealth: 10,
            health: 10,
            damage: 1,
            speed: 230,
            defense: 0,
            score: 1000,
            attackSpeed: 1000,
            knockback: 300,
            healthRegen: 0.5,
            merchantReputation: 1,
        });
        this.player.depth = 100;
        
        let item = Weapons.SweetySword;
        this.player.getInventory().push(ItemsFactory.create(item,this.player.getInventory().hasSlotFor(item),this.player));
        this.player.getInventory().push(ItemsFactory.create(item,this.player.getInventory().hasSlotFor(item),this.player));
	      
        this.player.setGround(this.groundLayer);
        
        this.waveManager.setPlayer(this.player);
        this.initColliders();
        this.initEvents();
    }

    update(){
        this.camera.setPosition(this.camera.x + (this.camera.speed * (this.player.x - this.camera.x) / 100),
                                this.camera.y + (this.camera.speed * (this.player.y - this.camera.y) / 100),
                                );

        if(this.physics.overlap(this.player, this.shop)){
            EventManager.emit(EventManager.Events.SHOP_COLLIDE_START);
            if(this.postFxPlugin.get(this.shop).length == 0)
                this.postFxPlugin.add(this.shop, {
                    thickness: 2,
                    outlineColor: 0xffffff
                });
        }else{
            EventManager.emit(EventManager.Events.SHOP_COLLIDE_FINISH);
            this.postFxPlugin.remove(this.shop);
        }

        if(this.physics.overlap(this.player,this.home)){
            EventManager.emit(EventManager.Events.HOME_COLLIDE_START);
            if(this.postFxPlugin.get(this.home).length == 0)
                this.postFxPlugin.add(this.home, {
                    thickness: 2,
                    outlineColor: 0xffffff
                });
        }else{
            EventManager.emit(EventManager.Events.HOME_COLLIDE_FINISH);
            this.postFxPlugin.remove(this.home);
        }

        if(this.physics.overlap(this.player,this.wizzard)) {
            if(!this.waveManager.getWave().isStarted){
                this.wizzard.setInteractive();
                this.wizzard.dialog.setAlpha(1);
                if(this.postFxPlugin.get(this.wizzard).length == 0)
                    this.postFxPlugin.add(this.wizzard, {
                        thickness: 2,
                        outlineColor: 0xffffff
                    });
            }else{
                this.wizzard.dialog.setAlpha(0);
                this.wizzard.disableInteractive();
                this.postFxPlugin.remove(this.wizzard);
            }
        }else{
            this.wizzard.dialog.setAlpha(0);
            this.wizzard.disableInteractive();
            this.postFxPlugin.remove(this.wizzard);
        }
    }
    
   initColliders(){
        this.physics.add.collider(this.shop, this.groundLayer);
        this.physics.add.collider(this.portal, this.groundLayer);
        this.physics.add.collider(this.wizzard, this.groundLayer);
        this.physics.add.collider(this.home, this.groundLayer);
    }
    
    initEvents() {
        let closePortal = ()=>{
            this.portal.working = false;
            this.portal.play(Anims.Portal.Closes.key);
            this.portal.on("animationcomplete",()=>{
                if(!this.portal.working)
                this.portal.setAlpha(0);
            });
        };
        
        let openPortal = () => {
            console.log(1);
            this.portal.working = true;
            this.portal.play(Anims.Portal.Opens.key);
            this.portal.on("animationcomplete",()=>{
                this.portal.play(Anims.Portal.Working.key);
            });
            this.portal.setAlpha(1);
        };
        
        EventManager.on(EventManager.Events.WAVE_START, function(){
            openPortal();
        });
        
        EventManager.on(EventManager.Events.WAVE_END, ()=>{
            closePortal();
        });
        
        EventManager.on(EventManager.Events.WAVE_COMPLETE, ()=>{
            closePortal();
        });
    }
}

export default MainScene;