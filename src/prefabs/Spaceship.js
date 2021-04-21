class Spaceship extends Phaser.GameObjects.Sprite{
    constructor(special, scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);       //adding to the existing scene
        this.pointValue = pointValue;   //store the value
        if(!special){
            this.moveSpeed = game.settings.spaceshipSpeed;             //pixels per frame speed
        }
        else{
            this.moveSpeed = game.settings.spaceshipSpeedSpecial;
        }
        this.special = special;
        
    }

    update(){
        //move spaceship left
        this.x -= this.moveSpeed;

        //wrap around from left to right edge
        if(this.x <= 0 - this.width){
            this.reset();
        }
    }

    //position reset
    reset(){
        this.x = game.config.width;
    }
}