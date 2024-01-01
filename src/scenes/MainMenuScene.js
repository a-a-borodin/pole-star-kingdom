import Scenes from '/src/constants/Scenes.js';
import Strings from '/src/constants/Strings.js';
import Misc from '/src/utils/Misc.js';
import TextManager from '/src/utils/TextManager.js';
import Resources from '/src/constants/Resources.js';
import LocalStorageManager from '/src/utils/LocalStorageManager.js';
import ParallaxBackgroundManager from '/src/utils/ParallaxBackgroundManager.js';
class MainMenuScene extends Phaser.Scene{
    constructor(config){
        super(config);
    }
    
    init(){
        this.sceneWidth = this.cameras.main.width;
		this.sceneHeight = this.cameras.main.height;			
		this.cameras.main.flash(Misc.FLASH_DURATION);
		this.textManager = new TextManager(this);
		this.parallaxBackgroundManager = new ParallaxBackgroundManager(this);
    }
    
    create(){
        this.input.on("pointerup",()=>{
            this.scene.start(Scenes.UI);
            this.scene.start(Scenes.MAIN);
        });
        
	    let bgType = this.randomBackground();
    
        let backgroundEmpty = this.add.tileSprite(0,0,this.sceneWidth,this.sceneHeight,bgType,0).setOrigin(0);
        this.parallaxBackgroundManager.addLayer(backgroundEmpty,0);
	    let backgroundFirst = this.add.tileSprite(0,0,this.sceneWidth,this.sceneHeight,bgType,1).setOrigin(0);
	    this.parallaxBackgroundManager.addLayer(backgroundFirst,0.15);
	    let backgroundSecond = this.add.tileSprite(0,0,this.sceneWidth,this.sceneHeight,bgType,2).setOrigin(0);
        this.parallaxBackgroundManager.addLayer(backgroundSecond,0.3);
        let backgroundThird = this.add.tileSprite(0,0,this.sceneWidth,this.sceneHeight,bgType,3).setOrigin(0);
        this.parallaxBackgroundManager.addLayer(backgroundThird,0.45);
		let backgroundFour = this.add.tileSprite(0,0,this.sceneWidth,this.sceneHeight,bgType,4).setOrigin(0);
        this.parallaxBackgroundManager.addLayer(backgroundFour,0.6);
		let backgroundFive = this.add.tileSprite(0,0,this.sceneWidth,this.sceneHeight,bgType,5).setOrigin(0);
        this.parallaxBackgroundManager.addLayer(backgroundFive,7.5);
		
		this.parallaxBackgroundManager.startMove(1);
		
		this.logo = this.add.sprite(this.sceneWidth/2, this.sceneHeight/4, Resources.Sprites.UI.Logo);
        this.logo.setAngle(-2);
        this.tweens.add({
            targets: this.logo,
            angle: 2,
            ease: 'Sine.easeInOut',
            duration: 3000,
            repeat: -1,
            yoyo: true,
        });
        
        let tapToStart = this.textManager.createText(this.sceneWidth/2, this.sceneHeight/1.5, Strings.TapToStart, TextManager.STROKE).setOrigin(0.5).setAlpha(0.7);
        this.tweens.add({
            targets: tapToStart,
            scaleX: 0.9,
            scaleY: 0.9,
            ease: 'Sine.easeInOut',
            duration: 1500,
            repeat: -1,
            yoyo: true,
        });
        
        let version = this.textManager.createText(10,this.sceneHeight-10,Strings.VERSION,TextManager.STROKE).setAlpha(0.70).setOrigin(0,1);
    }
    
    randomBackground(){
        let keys = Object.keys(Resources.Sprites.Backgrounds.Menu.Parallax);
        return Resources.Sprites.Backgrounds.Menu.Parallax[keys[ keys.length * Math.random() << 0]];
    }
}

export default MainMenuScene;