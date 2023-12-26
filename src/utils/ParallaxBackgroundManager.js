class ParallaxBackgroundManager{
    layers = [];
    
    constructor(scene){
        this.Layer = class {
            constructor(layer,speed){
                this.speed = speed;
                this.layer = layer;
            }
        };
        this.scene = scene;
    }
    
    addLayer(layer,speed){
        this.layers.push(new this.Layer(layer,speed));
    }
    
    startMove(delta,flipped){
        if(this.timer != undefined)
           this.timer.remove();
        this.timer = this.scene.time.addEvent({
            delay: delta,
            callback: ()=>{
                this.move(flipped);
            },
            callbackScope: this.scene,
            loop:true,
        });
    }
    
    move(flipped){
        this.layers.forEach((layer,index,array)=>{
            if(flipped){
                layer.layer.tilePositionX -= layer.speed;
            }else{
                layer.layer.tilePositionX += layer.speed;
            }
        });
    }
    
    stopMove(){
        this.timer.remove();
    }
}

export default ParallaxBackgroundManager;