export default class LoadScene extends Phaser.Scene
{
    constructor(){
        super({ key: 'load' })
    }

    preload() {
        this.load.atlas('assets', 'assets/breakout.png', 'assets/breakout.json')
    }

    create() {
        this.scene.start('game')
    }
}