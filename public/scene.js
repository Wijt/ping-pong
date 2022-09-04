class Scene{
    constructor(){
        this.started = false;
        this.sceneManager = null;
    }

    start(){

    }

    update(){
        if(!this.started){
            this.start();
            this.started = true;
        }
    }

    draw(){

    }

    keyPressed(key){
        
    }

    exit(){

    }
}