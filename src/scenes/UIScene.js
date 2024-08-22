import TextManager from '/src/utils/TextManager.js';
import Misc from '/src/utils/Misc.js';
import Resources from '/src/constants/Resources.js';
import Joystick from '/src/utils/Joystick.js';
import Scenes from '/src/constants/Scenes.js';
import Strings from '/src/constants/Strings.js';
import WizzardDialogFrame from '/src/dialogFrames/WizzardDialogFrame.js';
import EventManager from '/src/utils/EventManager.js';

class UIScene extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    init() {
        this.sceneWidth = this.cameras.main.width;
        this.sceneHeight = this.cameras.main.height;
        this.input.addPointer(Misc.MAX_TOUCH_COUNT);
        this.scene.bringToTop(Scenes.UI);
        //this.input.setGlobalTopOnly(false)
        this.textManager = new TextManager(this);
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
      /*  this.leftZone = this.add.tileSprite(0,0,this.sceneWidth/2,this.sceneHeight).setOrigin(0)
        this.leftZone.setInteractive();
        this.leftZone.on("pointerdown",()=>{
            EventManager.emit(EventManager.Events.MOVE_LEFT);
        });
        this.leftZone.on("pointerout",()=>{
            EventManager.emit(EventManager.Events.STOP_MOVE);
        });
        this.rightZone = this.add.tileSprite(this.sceneWidth/2,0,this.sceneWidth/2,this.sceneHeight).setOrigin(0)
        this.rightZone.setInteractive();
        this.rightZone.on("pointerdown",()=>{
            EventManager.emit(EventManager.Events.MOVE_RIGHT);
        });
        this.rightZone.on("pointerout",()=>{
            EventManager.emit(EventManager.Events.STOP_MOVE);
        });*/
     /*  this.joystick = new Joystick(this, {
            base: this.add.sprite(0, 0, Resources.Sprites.UI.Joystick.Base),
            thumb: this.add.sprite(0, 0, Resources.Sprites.UI.Joystick.Thumb),
        });
        this.joystick.onLeft(()=> {
            EventManager.emit(EventManager.Events.MOVE_LEFT);
            this.joystick.thumb.flipX = true;
        });
        this.joystick.onRight(()=> {
            EventManager.emit(EventManager.Events.MOVE_RIGHT);
            this.joystick.thumb.flipX = false;
        });
        this.joystick.onPointerOut(()=> {
            EventManager.emit(EventManager.Events.STOP_MOVE);
        });*/

        this.waveIcon = this.add.sprite(this.sceneWidth/2, 15, Resources.Sprites.UI.Icons.SkullIcon, 1).setOrigin(0.5, 0).setAlpha(0);
        this.waveIDText = this.textManager.createText(this.waveIcon.x - this.waveIcon.displayWidth/2 - 10, 15, "", TextManager.STROKE).setOrigin(1, 0.25).setAlpha(0);
        this.waveTimerText = this.textManager.createText(this.waveIcon.x + this.waveIcon.displayWidth/2 + 10, 15, "", TextManager.STROKE).setOrigin(0, 0.25).setAlpha(0);
        this.killsCountText = this.textManager.createText(this.waveIcon.x, this.waveTimerText.y + this.waveTimerText.displayHeight/2 + 10, "", TextManager.STROKE).setOrigin(0.5, 0).setAlpha(0);

        this.logoText = this.textManager.createText(this.sceneWidth/2, this.sceneHeight/2, "").setOrigin(0.5).setAlpha(0);
        this.logoText.setFontSize("80px");

        this.scoreText = this.textManager.createText(this.sceneWidth, 15, 0, TextManager.Style.STROKE).setOrigin(0).setAlpha(0.7);
        this.scoreText.setColor(Misc.Colors.YELLOW);

        this.menuButton = this.add.sprite(15, 15, Resources.Sprites.UI.Buttons.MenuButton).setInteractive().setOrigin(0).on("pointerdown", ()=> {
            this.scene.switch(Scenes.MENU);
        });
        
        this.initEvents();
    }

    update() {
        if (this.cursors.left.isDown)
        {
            EventManager.emit(EventManager.Events.MOVE_LEFT);
        }
        else if (this.cursors.right.isDown)
        {
            EventManager.emit(EventManager.Events.MOVE_RIGHT);
        }
        else
        {
            EventManager.emit(EventManager.Events.STOP_MOVE);
        }
    }

    initEvents() {
        EventManager.on(EventManager.Events.UPDATE_SCORE, (score, negative)=> {
            //if(this.scoreText._text > score)
            if (negative)
                this.scoreText.setColor(Misc.Colors.RED);

            this.scoreText.setText(score);

            if (this.scoreTween != undefined)
                this.scoreTween.remove();

            this.scoreTween = this.tweens.add({
                targets: this.scoreText,
                x: this.sceneWidth-this.scoreText.displayWidth-20,
                duration: 250,
                hold: 1500,
            });
            this.scoreTween.on("complete", ()=> {
                this.scoreTween = this.tweens.add({
                    targets: this.scoreText,
                    x: this.sceneWidth,
                    duration: 250,
                });
                this.scoreTween.on("complete", ()=> {
                    this.scoreText.setColor(Misc.Colors.YELLOW);
                });
            });
        },
            this);

        EventManager.on(EventManager.Events.UPDATE_WAVE_INFO,
            (wave) => {
                this.waveTimerText.setText(Misc.fancyTimeFormat(wave.currentTime/1000));
                this.killsCountText.setText(wave.currentKills + "/" + wave.enemiesAmount);
                this.waveIDText.setText(Strings.Wave + " " + wave.id);
            });

        EventManager.on(EventManager.Events.WAVE_START,
            (resumed)=> {
                this.killsCountText.setAlpha(0.7);
                this.waveIcon.setAlpha(0.7);
                this.waveIDText.setAlpha(0.7);
                this.waveTimerText.setAlpha(0.7);

                if (!resumed) {
                    this.logoText.setText(Strings.WaveBegun);
                    this.showLogo(500, 1500);
                }
            });

        EventManager.on(EventManager.Events.WAVE_END,
            ()=> {
                this.killsCountText.setAlpha(0);
                this.waveIcon.setAlpha(0);
                this.waveIDText.setAlpha(0);
                this.waveTimerText.setAlpha(0);

                this.logoText.setText(Strings.WaveIsOver);
                this.showLogo(500, 1500);
            });

        EventManager.on(EventManager.Events.WAVE_COMPLETE,
            ()=> {
                this.killsCountText.setAlpha(0);
                this.waveIcon.setAlpha(0);
                this.waveIDText.setAlpha(0);
                this.waveTimerText.setAlpha(0);

                this.logoText.setText(Strings.WaveCompleted);
                this.showLogo(500, 1500);
            });

        EventManager.on(EventManager.Events.SHOW_WIZZARD_DIALOG,
            ()=> {
                if (this.wizzardDialog != undefined)
                    this.wizzardDialog.destroy();
                this.wizzardDialog = new WizzardDialogFrame(this, this.sceneWidth/2, this.sceneHeight/2);
            });

        EventManager.on(EventManager.Events.SHOW_FANCY_TEXT,
            (config)=> {
                let title = config.title;
                let style = TextManager.Style.STROKE;
                let text = config.scene.add.text(config.x, config.y, title, style).setOrigin(0.5);
                text.depth = 999;
                text.setColor(config.color);
                text.setFontSize("23px");
                text.strokeThickness = "7px";

                config.scene.tweens.add({
                    targets: text,
                    alpha: 0,
                    y: config.y - 50,
                    ease: 'Sine.easeInOut',
                    duration: 1300,
                    repeat: 0,
                    yoyo: false,
                }).on("complete", () => {
                    text.destroy();
                });
            });
    }

    showLogo(duration,
        hold) {
        this.logoTween = this.tweens.add({
            targets: this.logoText,
            alpha: 0.7,
            duration: duration,
            hold: hold,
            yoyo: true,
            repeat: 0,
        });
    }
}

export default UIScene;