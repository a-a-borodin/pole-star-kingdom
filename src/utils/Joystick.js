class Joystick{
    constructor(scene,args){
        this.base = args.base;
        this.thumb = args.thumb;
        this.thumb.setAlpha(0);
        this.base.setAlpha(0);
        
        scene.input.on("pointerdown",(cords)=>{
            this.base.setPosition(cords.worldX,cords.worldY);
            this.thumb.setPosition(cords.worldX,cords.worldY);
            this.thumb.setAlpha(0);
            this.base.setAlpha(0);
            if(this.pointerDownFunc != undefined)
                this.pointerDownFunc();
        });
        
        scene.input.on("pointermove",(cords)=>{
            this.thumb.setAlpha(1);
            this.base.setAlpha(1);
            this.thumb.setPosition(cords.worldX,this.thumb.y);
            
            if(this.waveTimer != undefined)
                this.waveTimer.remove();
            
            this.waveTimer = scene.time.addEvent({
                delay: 10,
                callback: ()=>{
                    if(this.thumb.x > this.base.x){
                        if(this.rightFunc != undefined)
                            this.rightFunc();
                    }else{
                        if(this.leftFunc != undefined)
                            this.leftFunc();
                    }
                },
                callbackScope: this,
                loop:true
            });
        });
        
        scene.input.on("pointerup",()=>{
            this.thumb.setAlpha(0);
            this.base.setAlpha(0);
            
            if(this.waveTimer != undefined)
                this.waveTimer.remove();
            
            if(this.pointerOutFunc != undefined)
                this.pointerOutFunc();
        });
    }
    
    onRight(func){
        this.rightFunc = func;
    }
    onLeft(func){
        this.leftFunc = func;
    }
    onPointerOut(func){
        this.pointerOutFunc = func;
    }
    onPointerDown(func){
        this.pointerDownFunc = func;
    }
}

export default Joystick;