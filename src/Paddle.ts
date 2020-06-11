export default function createPaddle(scene: Phaser.Scene): Phaser.Physics.Arcade.Image
{
    return scene.physics.add.image(400, 550, 'assets', 'paddle1')
        .setImmovable()
}