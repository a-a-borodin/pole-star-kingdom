import Misc from '/src/utils/Misc.js';

const BASE_COLOR = Misc.Colors.WHITE;
const HOVER_COLOR = Misc.Colors.YELLOW;

class TextButton extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, font, config, isInteractive){
        super(scene, x, y, text, font);
        
        if(config != null && config != undefined) {
            this.setBaseColor(config.BaseColor);
            this.setHoverColor(config.HoverColor);
            
            if(config.BaseColor == undefined)
                this.setBaseColor(BASE_COLOR);
            if(config.HoverColor == undefined)
                this.setHoverColor(HOVER_COLOR);
        }else{
            this.setBaseColor(BASE_COLOR);
            this.setHoverColor(HOVER_COLOR);
        }
        
        this.setColor(this.getBaseColor());
        
        if(isInteractive)
            this.setInteractive();
         
        this.on('pointerdown', ()=> {
            this.setColor(this.getHoverColor());
        });  
        
        this.on('pointerover', ()=> {
            this.setColor(this.getHoverColor());
        });
        
        this.on('pointerup', ()=> {
            this.setColor(this.getBaseColor());
            if(this.onClickFn != undefined)
                this.onClickFn();
	    });
	    
	    this.on('pointerout', ()=> {
            this.setColor(this.getBaseColor());
	    });
    }
    
    setBaseColor(value) {
        this.baseColor = value;
    }
    
    getBaseColor() {
        return this.baseColor;
    }
    
    setHoverColor(value) {
        this.hoverColor = value;
    }
    
    getHoverColor() {
        return this.hoverColor;
    }
    
    onClick(func) {
        this.onClickFn = func;
    }
}

export default TextButton;