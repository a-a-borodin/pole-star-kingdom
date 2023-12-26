class ProgressBar extends Phaser.GameObjects.Container{
    constructor(scene,x,y,width,height,config){
        super(scene,x,y);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.progress = config.progress;
        this.maxProgress = config.maxProgress;
        
        this.setBackground(config.background);
        this.setForeground(config.progressBar);
        
        this.setProgress(config.progress);
        scene.add.existing(this);
    }
    
    getBackground() {
        return this.background;
    }
    
    getForeground() {
        return this.foreground;
    }
    
    setBackground(background) {
        if(this.background != undefined)
            this.background.destroy();
        this.background = background;
        this.background.setDisplaySize(this.width,this.height);
        this.add(this.background);
    }
    
    setForeground(foreground) {
        if(this.foreground != undefined)
            this.foreground.destroy();
        this.foreground = foreground;
        this.foreground.setDisplaySize(0,this.height);
        this.add(this.foreground);
    }
    
    setProgress(progress){
        this.progress = progress;
        let progressPercent = (this.progress / this.getMaxProgress())*100;
        if(progressPercent > 100)
            return;
        let width = (this.width / 100) * progressPercent;
        
        this.getForeground().displayWidth = width;
    }
    
    setX(x){
        this.x = x;
    }
    
    setY(y){
        this.y = y;
    }
    
    setMaxProgress(value){
        this.maxProgress = value;
    }
    
    getMaxProgress(){
        return this.maxProgress;
    }
}

export default ProgressBar;