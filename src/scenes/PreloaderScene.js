import Resources from '/src/constants/Resources.js';
import Scenes from '/src/constants/Scenes.js';
import ProgressBar from '/src/utils/ProgressBar.js';

class PreloaderScene extends Phaser.Scene {
	constructor(config){
        super(config);
    }
    
    init() {
        this.sceneWidth = this.cameras.main.width;
		this.sceneHeight = this.cameras.main.height;	
    }
    
	preload() {
	    let backgroundColor = this.add.graphics();
	    backgroundColor.fillStyle("0xFFFFFF", 1);
        backgroundColor.fillRect(0,0,this.sceneWidth,this.sceneHeight);
	    
	    let progressBar = new ProgressBar(this, this.sceneWidth / 2, this.sceneHeight / 2, this.sceneWidth / 5, this.sceneHeight / 33, {
            background:this.add.sprite(0,0,Resources.Sprites.UI.ProgressBars.GreenSimple,0),
            progressBar:this.add.sprite(-(this.sceneWidth/5)/2,0,Resources.Sprites.UI.ProgressBars.GreenSimple,1).setOrigin(0,0.5),
            maxProgress:1,
            progress:0,
        });
       
        this.load.on('progress', (value) => {
	        progressBar.setProgress(value);
        });
        this.load.on('complete', () => {
            progressBar.destroy();
            backgroundColor.destroy();
        });
        
        this.load.plugin('rexoutlinepipelineplugin', '/src/utils/rexoutlinepipelineplugin.min.js', true);
        
        this.load.tilemapTiledJSON(Resources.Json.Maps.MainGroundMap, 'assets/json/maps/mainGroundMap.json');
        
	    this.load.spritesheet(Resources.Sprites.Backgrounds.Menu.Parallax.GrassMountain, 'assets/sprites/backgrounds/menu/parallax/BackgroundGrassMountainParallax.png',{frameWidth:960,frameHeight:540});
        this.load.spritesheet(Resources.Sprites.Backgrounds.Menu.Parallax.SnowMountain,'assets/sprites/backgrounds/menu/parallax/backgroundSnowMountainParallax.png',{frameWidth:960,frameHeight:540});
	    this.load.spritesheet(Resources.Sprites.Backgrounds.Game.Parallax.OakWoods,'assets/sprites/backgrounds/game/parallax/backgroundOakWoodsParallax.png',{frameWidth:960,frameHeight:540});
	    
	    this.load.spritesheet(Resources.Sprites.Items.CoinGold,'assets/sprites/items/coinGold.png',{frameWidth:16,frameHeight:16});
	    this.load.spritesheet(Resources.Sprites.Items.ChestWooden,'assets/sprites/items/chestWooden.png',{frameWidth:96,frameHeight:64});
        
        this.load.spritesheet(Resources.Sprites.Items.Icons.AmuletIcons,'assets/sprites/items/icons/amuletIcons.png',{frameWidth:32,frameHeight:32});
        this.load.spritesheet(Resources.Sprites.Items.Icons.HelmetIcons,'assets/sprites/items/icons/helmetIcons.png',{frameWidth:32,frameHeight:32});
        this.load.spritesheet(Resources.Sprites.Items.Icons.ChestplateIcons,'assets/sprites/items/icons/chestplateIcons.png',{frameWidth:32,frameHeight:32});
        this.load.spritesheet(Resources.Sprites.Items.Icons.BootsIcons,'assets/sprites/items/icons/bootsIcons.png',{frameWidth:32,frameHeight:32});
        this.load.spritesheet(Resources.Sprites.Items.Icons.GlovesIcons,'assets/sprites/items/icons/glovesIcons.png',{frameWidth:32,frameHeight:32});
        this.load.spritesheet(Resources.Sprites.Items.Icons.CloakIcons,'assets/sprites/items/icons/cloakIcons.png',{frameWidth:32,frameHeight:32});
        this.load.spritesheet(Resources.Sprites.Items.Icons.RingIcons,'assets/sprites/items/icons/ringIcons.png',{frameWidth:32,frameHeight:32});
        this.load.spritesheet(Resources.Sprites.Items.Icons.WeaponIcons,'assets/sprites/items/icons/weaponIcons.png',{frameWidth:32,frameHeight:32});
        this.load.spritesheet(Resources.Sprites.Items.Icons.PotionIcons,'assets/sprites/items/icons/potionIcons.png',{frameWidth:32,frameHeight:32});
        this.load.spritesheet(Resources.Sprites.Items.Icons.EquipmentIcons,'assets/sprites/items/icons/equipmentIcons.png',{frameWidth:32,frameHeight:32});

	    this.load.spritesheet(Resources.Sprites.Entities.Player.Simple,'assets/sprites/entities/player/player.png',{frameWidth:80,frameHeight:80});
	    this.load.spritesheet(Resources.Sprites.Entities.Enemies.WolfBlack,'assets/sprites/entities/enemies/wolfBlack.png',{frameWidth:96,frameHeight:64});
	    this.load.spritesheet(Resources.Sprites.Entities.Enemies.AlienBlue,'assets/sprites/entities/enemies/alienBlue.png',{frameWidth:128,frameHeight:128});
	    this.load.spritesheet(Resources.Sprites.Entities.Enemies.WolfWhite,'assets/sprites/entities/enemies/wolfWhite.png',{frameWidth:96,frameHeight:64});
	    this.load.spritesheet(Resources.Sprites.Entities.Enemies.SlimeGreen,'assets/sprites/entities/enemies/slimeGreen.png',{frameWidth:96,frameHeight:48});
	    this.load.spritesheet(Resources.Sprites.Entities.Npcs.Wizzard,'assets/sprites/entities/npcs/Wizzard.png',{frameWidth:86,frameHeight:130});
	  
	    this.load.image(Resources.Sprites.UI.Joystick.Thumb,'assets/sprites/ui/joystick/thumb.png');
	    this.load.image(Resources.Sprites.UI.Joystick.Base,'assets/sprites/ui/joystick/base.png');
	   
	    this.load.image(Resources.Sprites.UI.Logo,"/assets/sprites/ui/logo.png");
       
        this.load.spritesheet(Resources.Sprites.UI.Icons.SkullIcon,'assets/sprites/ui/icons/skullIcon.png',{frameWidth:26,frameHeight:27});
        this.load.spritesheet(Resources.Sprites.UI.Icons.StatisticIcons,"assets/sprites/ui/icons/statisticIcons.png",{frameWidth:32,frameHeight:32});
        this.load.spritesheet(Resources.Sprites.UI.Icons.EnemyIcons,"assets/sprites/ui/icons/enemyIcons.png",{frameWidth:86,frameHeight:86});
        this.load.spritesheet(Resources.Sprites.UI.Icons.MiniActionButtonsIcons,"assets/sprites/ui/icons/miniActionButtonsIcons.png",{frameWidth:32,frameHeight:32});
        this.load.image(Resources.Sprites.UI.Icons.GoblinIcon,"assets/sprites/ui/icons/goblinIcon.png");

        this.load.spritesheet(Resources.Sprites.UI.Dialogs.PopUpTalkDialog,"assets/sprites/ui/dialogs/popupTalkDialog.png",{frameWidth:57,frameHeight:57});
        
        this.load.spritesheet(Resources.Sprites.UI.Buttons.ShopCoinButton,"assets/sprites/ui/buttons/shopCoinButton.png",{frameWidth:86,frameHeight:86});
        this.load.spritesheet(Resources.Sprites.UI.Buttons.BagButton,"assets/sprites/ui/buttons/bagButton.png",{frameWidth:86,frameHeight:86});
        this.load.spritesheet(Resources.Sprites.UI.Buttons.ChestButton,"assets/sprites/ui/buttons/chestButton.png",{frameWidth:86,frameHeight:86});
        this.load.spritesheet(Resources.Sprites.UI.Buttons.BookButton,"assets/sprites/ui/buttons/bookButton.png",{frameWidth:86,frameHeight:86});
        this.load.image(Resources.Sprites.UI.Buttons.MenuButton,'assets/sprites/ui/buttons/menuButton.png');
        this.load.spritesheet(Resources.Sprites.UI.Buttons.ArrowButtons,'assets/sprites/ui/buttons/arrowButtons.png',{frameWidth:70,frameHeight:70});
       
        this.load.image(Resources.Sprites.UI.Panels.PanelBlack,'assets/sprites/ui/panels/panelBlack.png');
        this.load.spritesheet(Resources.Sprites.UI.ProgressBars.YellowSimple,'assets/sprites/ui/progressBars/yellowProgressBarSimple.png',{frameWidth:10,frameHeight:10});
	    
	    this.load.image(Resources.Sprites.Materials.OakWoods.OakWoodsGround,'assets/sprites/materials/oakWoods/oakWoodsGround.png');
        this.load.image(Resources.Sprites.Materials.OakWoods.VillageProps,'assets/sprites/materials/oakWoods/villageProps.png');
	    this.load.image(Resources.Sprites.Materials.OakWoods.OakCoinTree,'assets/sprites/materials/oakWoods/oakCoinTree.png');
	    this.load.spritesheet(Resources.Sprites.Materials.OakWoods.Shop,'assets/sprites/materials/oakWoods/shop.png',{frameWidth:295,frameHeight:320});
	    this.load.spritesheet(Resources.Sprites.Materials.OakWoods.PortalPurple,'assets/sprites/materials/oakWoods/portalPurple.png',{frameWidth:256,frameHeight:256});
	}

	create() {
	    this.scene.start(Scenes.MAIN_MENU);
	}
}

export default PreloaderScene;