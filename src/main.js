/*

Sam Vik
Rocket Patrol Modded
4/21/21

Took me about 20/25 hours to complete. A lotta bugs.

Points:
New, smaller spaceship thats faster and worth more. Resets burst.       (20) $
Two simultaneous player mode                                            (30) $
Display time remaining                                                  (10) $
Score now equals adding to time remaining                               (20) $
New Burst weapon                                                        (20) $

Total                                                                   (100)

*/

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard variables
let keyW, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN, keyJ, keyL, keyI, keyA, keyD, keyE, keyO;