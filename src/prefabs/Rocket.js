// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(player, scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);   // add to existing, displayList, updateList
        this.isFiring = false;      // track rocket's firing status
        this.burst = false;
        this.moveSpeed = 2;         // pixels per frame
        this.burstReady = true;

        this.player = player;
        this.sfxRocket = scene.sound.add('sfx_rocket');

        this.burstNum = 5;
    }

    update() {
        // left/right movement
        if(this.player == 1){
            if(!this.isFiring) {
                if(keyA.isDown && this.x >= borderUISize + this.width) {
                    this.x -= this.moveSpeed;
                } else if (keyD.isDown && this.x <= game.config.width - borderUISize - this.width) {
                    this.x += this.moveSpeed;
                }
            }
        
            // fire button
            if(Phaser.Input.Keyboard.JustDown(keyW) && !this.isFiring && !this.burst) {
                this.isFiring = true;
                this.sfxRocket.play();
            }

            // burst fire button
            if(Phaser.Input.Keyboard.JustDown(keyE) && !this.isFiring && !this.burst && this.burstReady) {
                this.burst = true;
                this.burstReady = false;
                this.sfxRocket.play();
            }
        }
        else if(this.player == 2){
            if(!this.isFiring) {
                if(keyJ.isDown && this.x >= borderUISize + this.width) {
                    this.x -= this.moveSpeed;
                } else if (keyL.isDown && this.x <= game.config.width - borderUISize - this.width) {
                    this.x += this.moveSpeed;
                }
            }
        
            // fire button
            if(Phaser.Input.Keyboard.JustDown(keyI) && !this.isFiring) {
                this.isFiring = true;
                this.sfxRocket.play();
            }

            // burst fire button
            if(Phaser.Input.Keyboard.JustDown(keyO) && !this.isFiring && !this.burst && this.burstReady) {
                this.burst = true;
                this.burstReady = false;
                this.sfxRocket.play();
            }
        }

        if(this.burstNum == 0){
            this.burst = false;
            this.burstNum = 5;
        }

        // if fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding && !this.burst) {
            this.y -= this.moveSpeed;
        }
        //firing burst
        if(!this.isFiring && this.y >= borderUISize * 3 + borderPadding && this.burst) {
            this.y -= this.moveSpeed * 6;
        }
        // reset on miss
        if(this.y <= borderUISize * 3 + borderPadding && !this.burst) {
            this.reset();
        }
        if(this.y <= borderUISize * 3 + borderPadding && this.burst) {
            this.resetBurst();
        }

        

    }

    //reset rocket to ground
    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }

    resetBurst(){
        this.burstNum--;
        this.y = game.config.height - borderUISize - borderPadding;
        if(this.burstNum != 0)
            this.sfxRocket.play();
    }
}