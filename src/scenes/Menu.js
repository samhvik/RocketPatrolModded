class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload() {
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }

    create(){
        // menu text configuration
        let menuConfig = {
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

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - 150 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);

        this.add.text(game.config.width/2, game.config.height/2 - 80 - 50, 'P1: Use A / D keys to move.', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - 40 - 50, '(W) Fire Main. (E) Fire Burst.', menuConfig).setOrigin(0.5);

        this.add.text(game.config.width/2, game.config.height/2 + 20 - 50, 'P2: Use J / L keys to move.', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 60 - 50, '(I) Fire Main. (O) Fire Burst.', menuConfig).setOrigin(0.5);

        this.add.text(game.config.width/2, game.config.height/2 + 60 + 20, 'Hit Small Ship to Gain another Burst', menuConfig).setOrigin(0.5);

        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + 100 + borderUISize + borderPadding, '1P: Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2  + 150 + borderUISize + borderPadding, '2P: Press ↑ for Novice or ↓ for Expert', menuConfig).setOrigin(0.5);
      

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // Novice mode
          game.settings = {
            spaceshipSpeed: 3,
            spaceshipSpeedSpecial: 5,
            gameTimer: 60000,
            playercount: 1    
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // Expert mode
          game.settings = {
            spaceshipSpeed: 4,
            spaceshipSpeedSpecial: 6,
            gameTimer: 45000,
            playercount: 1    
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
          // Novice mode
          game.settings = {
            spaceshipSpeed: 3,
            spaceshipSpeedSpecial: 5,
            gameTimer: 40000,
            playercount: 2    
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
          // Expert mode
          game.settings = {
            spaceshipSpeed: 4,
            spaceshipSpeedSpecial: 6,
            gameTimer: 25000,
            playercount: 2    
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
    }
}