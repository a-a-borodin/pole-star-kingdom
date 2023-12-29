import Resources from '/src/constants/Resources.js';
import TextManager from '/src/utils/TextManager.js';
import Colors from '/src/constants/Colors.js';

class CellContainer extends Phaser.GameObjects.Container{
    constructor(scene,x,y,width,height,padding,showAmount, cell, background, vanishBackground){
        super(scene,x,y);
        
        this.textManager = new TextManager(scene);
        this.scene = scene;
        this.width = width;
        this.height = height;
        this.cell = cell;
        this.showAmount = showAmount;
        this.background = new Phaser.GameObjects.Sprite(this.scene,0,0,Resources.Sprites.UI.Panels.PanelBlack).setInteractive().setOrigin(0);
        this.background.setDisplaySize(this.width,this.height);
        this.add(this.background);
        this.vanishBackground = new Phaser.GameObjects.Sprite(this.scene, padding/2, padding/2, vanishBackground).setInteractive().setOrigin(0);
        this.vanishBackground.setDisplaySize(this.width-padding,this.height-padding);
        this.add(this.vanishBackground);
       
        if(vanishBackground != undefined && vanishBackground != null) {
            this.vanishBackground.setTexture(vanishBackground.texture, vanishBackground.frame);
        }
        if(background != undefined && background != null) {
            this.background.setTexture(background.texture, background.frame);
        }
    
        this.icon = new Phaser.GameObjects.Sprite(this.scene,padding/2,padding/2).setOrigin(0);
        this.icon.setDisplaySize(this.width-padding,this.height-padding);
        this.add(this.icon);
        
        this.amountText = this.textManager.createText(0,0,"",TextManager.SIMPLE).setOrigin(0.5);
        this.add(this.amountText);
        
        scene.add.existing(this);
        this.setCell(cell);
    }
    
    setCell(cell){
        if(cell == undefined || cell == null)
            return;
        
        if(cell.getItem() == undefined || cell.getItem() == null){
            this.vanishBackground.setAlpha(1);
            this.clear();
            return;
        }
        this.vanishBackground.setAlpha(0);
        this.cell = cell;
        this.icon.setTexture(this.cell.getItem().getIcon().texture,this.cell.getItem().getIcon().frame);
        //this.icon.setDisplaySize(this.width-30,this.height-30);
        if(this.showAmount)
        this.amountText.setText(this.cell.getItem().getAmount());
    }
    
    getCell(){
        return this.cell;
    }
    
    clear(){
        this.cell = undefined;
        this.icon.setTexture(undefined);
        this.amountText.setText(null);
    }
    
    onClick(onclick){
        this.background.on("pointerup",onclick);
    }
}

export default CellContainer;