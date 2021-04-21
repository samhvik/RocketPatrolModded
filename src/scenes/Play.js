class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('rocketA', './assets/rocketA.png');
        this.load.image('rocketB', './assets/rocketB.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('spaceshipSmall', './assets/spaceshipSmall.png');
        this.load.image('starfield', './assets/starfield.png');

        //load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })
    }

    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);

        // add Rocket (p1)
        if(game.settings.playercount == 1){
            this.p1Rocket = new Rocket(1, this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

            //add spaceships x3
            this.ship00 = new Spaceship(true, this, game.config.width + borderUISize*6, borderUISize*4, 'spaceshipSmall', 0, 7500).setOrigin(0,0);
            this.ship01 = new Spaceship(false, this, game.config.width + borderUISize*6, borderUISize*4 + 50, 'spaceship', 0, 5000).setOrigin(0,0);
            this.ship02 = new Spaceship(false, this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2 + 50, 'spaceship', 0, 3000).setOrigin(0,0);
            this.ship03 = new Spaceship(false, this, game.config.width, borderUISize*6 + borderPadding*4 + 50, 'spaceship', 0, 1000).setOrigin(0,0);
        }else{
            this.p1Rocket = new Rocket(1, this, game.config.width/2 - 20, game.config.height - borderUISize - borderPadding, 'rocketA').setOrigin(0.5, 0);
            this.p2Rocket = new Rocket(2, this, game.config.width/2 + 20, game.config.height - borderUISize - borderPadding, 'rocketB').setOrigin(0.5, 0);

            //add spaceships x3
            this.ship00 = new Spaceship(true, this, game.config.width + borderUISize*6, borderUISize*4, 'spaceshipSmall', 0, 5000).setOrigin(0,0);
            this.ship01 = new Spaceship(false, this, game.config.width + borderUISize*6, borderUISize*4 + 50, 'spaceship', 0, 2500).setOrigin(0,0);
            this.ship02 = new Spaceship(false, this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2 + 50, 'spaceship', 0, 1500).setOrigin(0,0);
            this.ship03 = new Spaceship(false, this, game.config.width, borderUISize*6 + borderPadding*4 + 50, 'spaceship', 0, 500).setOrigin(0,0);
        }

        

        // define keys
        //p1
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W); //fire
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E); //fire burst
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R); //restart
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); //left
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D); //right
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        //p2
        if(game.settings.playercount == 2){
            keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I); //fire
            keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O); //fire burst
            keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J); //left
            keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L); //right
        }

        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 9,
                first: 0
            }),
            framerate: 30
        });

        // display score
        let timeConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        this.clock = new Date();
        let timeRemaining = this.game.settings.gameTime;
        this.addedTime = 0;

        //game over flag
        this.gameOver = false;
        
        this.timeRemaining = this.game.settings.gameTimer;

        this.timeLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, 'Time Remaining: ' 
        + timeRemaining, timeConfig);
    }

    update() {
        //restart condition
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 4;  // update tile sprite

        if(!this.gameOver) {
            this.p1Rocket.update(); // update p1
            if(game.settings.playercount == 2){
                this.p2Rocket.update(); //update p2
            }

            this.ship00.update();
            this.ship01.update();   // update spaceship x4
            this.ship02.update();
            this.ship03.update();

            this.timeRemaining -= this.time.timeScale * 10;
            this.timeLeft.text = 'Time Remaining: ' + Math.floor(this.timeRemaining / 1000);

            if(this.timeRemaining <= 0){
                this.timeRemaining = 0;

                let textConfig = {
                    fontFamily: 'Courier',
                    fontSize: '28px',
                    backgroundColor: '#F3B141',
                    color: '#843605',
                    align: 'right',
                    padding: {
                        top: 5,
                        bottom: 5,
                    },
                    fixedWidth: 0
                }

                this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', textConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', textConfig).setOrigin(0.5);
                this.gameOver = true;
            }
        }

        //check collisions
        if(this.checkCollision(this.p1Rocket, this.ship00)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship00);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }

        if(game.settings.playercount == 2){
            if(this.checkCollision(this.p2Rocket, this.ship00)){
                this.p2Rocket.reset();
                this.shipExplode(this.ship00);
            }
            if(this.checkCollision(this.p2Rocket, this.ship01)){
                this.p2Rocket.reset();
                this.shipExplode(this.ship01);
            }
            if(this.checkCollision(this.p2Rocket, this.ship02)){
                this.p2Rocket.reset();
                this.shipExplode(this.ship02);
            }
            if(this.checkCollision(this.p2Rocket, this.ship03)){
                this.p2Rocket.reset();
                this.shipExplode(this.ship03);
            }
        }
    }

    checkCollision(rocket, ship){
        //simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                rocket.resetBurst();
                if(ship.special)
                    rocket.burstReady = true;
                return true;
        }
        return false;
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
        });
        // score add and repaint
        this.timeRemaining += ship.pointValue;
        this.sound.play('sfx_explosion');
    }
}