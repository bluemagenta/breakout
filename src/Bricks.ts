//  Create the bricks in a 10x6 grid
export default function createBricks(scene: Phaser.Scene): Phaser.Physics.Arcade.StaticGroup
{
    return scene.physics.add.staticGroup({
        key: 'assets', frame: ['blue1', 'red1', 'green1', 'yellow1', 'silver1', 'purple1'],
        frameQuantity: 10,
        gridAlign: { width: 10, height: 6, cellWidth: 64, cellHeight: 32, x: 112, y: 100 }
    })
}