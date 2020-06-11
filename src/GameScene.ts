import createBricks from './Bricks'
import createBall from './Ball'
import createPaddle from './Paddle'

export default class GameScene extends Phaser.Scene {
    bricks: Phaser.Physics.Arcade.StaticGroup
    paddle: Phaser.Physics.Arcade.Image
    ball: Phaser.Physics.Arcade.Image

    constructor() {
        super({ key: 'game' })
    }

    create() {
        //  Enable world bounds, but disable the floor
        this.physics.world.setBoundsCollision(true, true, true, false)

        this.bricks = createBricks(this)
        this.ball = createBall(this)
        this.paddle = createPaddle(this)

        //  Our colliders
        this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this)
        this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this)

        //  Input events
        this.input.on('pointermove', function (pointer) {

            //  Keep the paddle within the game
            this.paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748)

            if (this.ball.getData('onPaddle')) {
                this.ball.x = this.paddle.x
            }

        }, this)

        this.input.on('pointerup', function (pointer) {

            if (this.ball.getData('onPaddle')) {
                this.ball.setVelocity(-75, -300)
                this.ball.setData('onPaddle', false)
            }

        }, this)
    }

    update() {
        if (this.ball.y > 600) {
            this.resetBall();
        }
    }

    hitBrick(ball, brick) {
        brick.disableBody(true, true);

        if (this.bricks.countActive() === 0) {
            this.resetLevel();
        }
    }

    resetBall() {
        this.ball.setVelocity(0);
        this.ball.setPosition(this.paddle.x, 500);
        this.ball.setData('onPaddle', true);
    }

    resetLevel() {
        this.resetBall();

        this.bricks.children.each(function (brick: Phaser.Physics.Arcade.Sprite) {

            brick.enableBody(false, 0, 0, true, true);

        });
    }

    hitPaddle(ball, paddle) {
        var diff = 0;

        if (ball.x < paddle.x) {
            //  Ball is on the left-hand side of the paddle
            diff = paddle.x - ball.x;
            ball.setVelocityX(-10 * diff);
        }
        else if (ball.x > paddle.x) {
            //  Ball is on the right-hand side of the paddle
            diff = ball.x - paddle.x;
            ball.setVelocityX(10 * diff);
        }
        else {
            //  Ball is perfectly in the middle
            //  Add a little random X to stop it bouncing straight up!
            ball.setVelocityX(2 + Math.random() * 8);
        }
    }
}