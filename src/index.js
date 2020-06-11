import Phaser from 'phaser'
import LoadScene from './LoadScene'
import GameScene from './GameScene'

new Phaser.Game({
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: [LoadScene, GameScene],
    physics: {
        default: 'arcade'
    }
})