
var kPaddleWidth = 64
var kHalfPaddleWidth = kPaddleWidth / 2
var kPaddleHeight = 16

var kBallWidth = 8
var kBallHalfWidth = kBallWidth / 2
var kBallHeight = 8

function CreateBlocks(numWide, numHigh)
{
    var blockWidth = (Game.width() / numWide) - 2;
    var blockHeight = (Game.height() / 4 / numHigh) - 2;
    for (var w = 0; w < numWide; w++)
    {
        for (var h = 0; h < numHigh; h++)
        {
            var block = Crafty.e("2D, Canvas, Color, Collision, DestroyOnCollision, Block")
                        .attr({ x: 1 + w * (blockWidth + 2), y: 1 + h * (blockHeight + 2), w: blockWidth, h: blockHeight })
                        .color("#333399")
                        .collision();
        }
    }
}

Crafty.scene('Game', function()
{
    Crafty.background("rgb(190, 190, 190)");

    this.paddle = Crafty.e("2D, Canvas, Color, Twoway, Collision")
                  .attr({ x: Game.width() / 2 - kHalfPaddleWidth, y: Game.height() - kPaddleHeight, w: kPaddleWidth, h: kPaddleHeight })
                  .color("#339933")
                  .twoway(10)
                  .collision();

    this.paddle.bind("EnterFrame",
        function()
        {
            if (this.x < 0)
            {
                this.x = 0;
            }
            if (this.x > Game.width() - this.w)
            {
                this.x = Game.width() - this.w;
            }
        });

    var currentLevel = 1;
    var levelText = Crafty.e("2D, DOM, Text, Color, Tweener")
                    .attr({ x: 10, y: 300, z: 1, w: 120 })
                    .text(function() { return "Level " + currentLevel; })
                    .unselectable()
                    .textFont({ type: "bold", family: "Arial", size: "20px" })
                    .color("#000000");

    var levelBarBG = Crafty.e("2D, Canvas, Color")
                     .attr({ x: levelText.x, y: levelText.y + 8, w: 100, h: 16 })
                     .color("#888888");

    var levelBarFG = Crafty.e("2D, Canvas, Color")
                     .attr({ x: levelText.x, y: levelText.y + 8, z: 1, w: 0, h: 16 })
                     .color("#00EE00");

    var ball = Crafty.e("2D, Canvas, Color, Collision")
                .attr({ x: Game.width() / 2 - kBallHalfWidth, y: Game.height() / 2, w: kBallWidth, h: kBallHeight })
                .color("#993333")
                .collision();

    ball.vel = new Crafty.math.Vector2D(0.8, 1);
    ball.vel.normalize();

    ball.speed = 2;

    ball.bind("EnterFrame",
        function()
        {
            this.shift(this.vel.x * this.speed, this.vel.y * this.speed);

            if (this.x < 0)
            {
                this.x = 0;
                this.vel.x = -this.vel.x;
            }
            if (this.x > Game.width() - this.w)
            {
                this.x = Game.width() - this.w;
                this.vel.x = -this.vel.x;
            }
            if (this.y < 0)
            {
                this.y = 0;
                this.vel.y = -this.vel.y;
            }
        });

    ball.onHit("Collision",
        function(hitEnts)
        {
            for (var i = 0; i < hitEnts.length; i++)
            {
                var hitEnt = hitEnts[i];

            }

            ball.vel.y = -ball.vel.y;
        });

    var numWide = 2;
    var numHigh = 2;
    CreateBlocks(numWide, numHigh);

    Crafty.bind("EnterFrame",
        function()
        {
            if (Crafty("Block").length == 0 && ball.y > Game.height() / 2)
            {
                numWide = Math.min(100, numWide + 1);
                numHigh = Math.min(100, numHigh + 1);
                CreateBlocks(numWide, numHigh);
            }
        })
});