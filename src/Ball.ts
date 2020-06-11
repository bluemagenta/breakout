export default function createBall(scene: Phaser.Scene): Phaser.Physics.Arcade.Image
{
    return scene.physics.add.image(400, 500, 'assets', 'ball1')
        .setCollideWorldBounds(true)
        .setBounce(1)
        .setData('onPaddle', true)
}