
var kPaddleWidth = 64
var kHalfPaddleWidth = kPaddleWidth / 2
var kPaddleHeight = 16

var kBallWidth = 8
var kBallHalfWidth = kBallWidth / 2
var kBallHeight = 8

if (!String.prototype.format)
{
    String.prototype.format = function()
    {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number)
        { 
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}

var kEncouragements = new Array();
kEncouragements.push("Good job!");
kEncouragements.push("Nice!");
kEncouragements.push("Heeeeey!");
kEncouragements.push("OK!");
kEncouragements.push("Can't Complain!");
kEncouragements.push("Oh boy!");
kEncouragements.push("Amazing!");
kEncouragements.push("Wow!");
kEncouragements.push("Poud of you!");
kEncouragements.push("Way to go!");
kEncouragements.push("Alright!");
kEncouragements.push("You got it!");
kEncouragements.push(":)");
kEncouragements.push("<3");
kEncouragements.push("Woooooo!");
kEncouragements.push("Get outta town!");
kEncouragements.push("Unstoppable!");
kEncouragements.push("You da man!");
kEncouragements.push("I love you!");
kEncouragements.push("You did it!");
kEncouragements.push("Never stop playing!");
kEncouragements.push("Keep it up!");
kEncouragements.push("Keep going!");
kEncouragements.push("Play forever!");
kEncouragements.push("You love it!");
kEncouragements.push("Enjoy!");
kEncouragements.push("Experience it!");
kEncouragements.push("Ha!");
kEncouragements.push("More!");
kEncouragements.push("You want more!");
kEncouragements.push("Good!");
kEncouragements.push("Good times!");
kEncouragements.push("Classic!");
kEncouragements.push("Home run!");
kEncouragements.push("Touchdown!");
kEncouragements.push("Goal!");
kEncouragements.push("TGIF!");
kEncouragements.push("Vacation time!");
kEncouragements.push("Incredible!");
kEncouragements.push("Shazam!");
kEncouragements.push("Astounding!");
kEncouragements.push("Bewildering!");
kEncouragements.push("Breathtaking!");
kEncouragements.push("Extraordinary!");
kEncouragements.push("Impressive!");
kEncouragements.push("Marvelous!");
kEncouragements.push("Do it again!");
kEncouragements.push("Spectacular!");
kEncouragements.push("Staggering!");
kEncouragements.push("Startling!");
kEncouragements.push("Stunning!");
kEncouragements.push("Stupefying!");
kEncouragements.push("Stupendous!");
kEncouragements.push("Wonderful!");
kEncouragements.push("Awe-inspiring!");
kEncouragements.push("Inspiring!");
kEncouragements.push("Exciting!");
kEncouragements.push("Heart-stopping!");
kEncouragements.push("Magnificent!");
kEncouragements.push("Moving!");
kEncouragements.push("Overwhelming!");
kEncouragements.push("Spine-tingling!");
kEncouragements.push("Electrifying!");
kEncouragements.push("Unbelievable!");
kEncouragements.push("No way!");
kEncouragements.push("Thrilling!");
kEncouragements.push("Summer Blockbuster!");
kEncouragements.push("Neat!");
kEncouragements.push("Cool!");
kEncouragements.push("Rip-roaring!");
kEncouragements.push("Mind-blowing!");
kEncouragements.push("Dramatic!");
kEncouragements.push("Interesting!");
kEncouragements.push("Provocative!");
kEncouragements.push("Art!");
kEncouragements.push("Zesty!");
kEncouragements.push("Huzzah!");
function GetRandomEncouragement()
{
    return kEncouragements[Math.floor(Math.random() * kEncouragements.length)];
}

function InitAchievements()
{
    var achievements = new Array();
    for (var g = 3; g < 5000;)
    {
        achievements.push({ stat: "numHits", goal: g, text: "{0} hits! " + GetRandomEncouragement() });
        g += Math.floor((Math.random() * 12) + 1);
    }

    for (var g = 1; g < 5000;)
    {
        achievements.push({ stat: "hitLeft", goal: g, text: "{0} balls hit left! " + GetRandomEncouragement() });
        g += Math.floor((Math.random() * 15) + 1);
    }

    for (var g = 1; g < 5000;)
    {
        achievements.push({ stat: "hitRight", goal: g, text: "{0} balls hit right! " + GetRandomEncouragement() });
        g += Math.floor((Math.random() * 15) + 1);
    }

    for (var g = 1; g < 5000;)
    {
        achievements.push({ stat: "hitTop", goal: g, text: "{0} balls hit top! " + GetRandomEncouragement() });
        g += Math.floor((Math.random() * 15) + 1);
    }

    for (var g = 1; g < 5000;)
    {
        achievements.push({ stat: "hitBottom", goal: g, text: "{0} balls hit below! " + GetRandomEncouragement() });
        g += Math.floor((Math.random() * 15) + 1);
    }

    for (var g = 2; g < 5000;)
    {
        achievements.push({ stat: "blockDestroyed", goal: g, text: "{0} blocks destroyed! " + GetRandomEncouragement() });
        g += Math.floor((Math.random() * 15) + 1);
    }

    for (var g = 2; g < 300;)
    {
        achievements.push({ stat: "levelUp", goal: g, text: "Leveled up to {0}! " + GetRandomEncouragement() });
        g += 1;
    }

    for (var g = 1; g < 300;)
    {
        achievements.push({ stat: "createdBlocks", goal: g, text: "New blocks! " + GetRandomEncouragement() });
        g += 1;
    }

    for (var g = 5; g < 3000;)
    {
        achievements.push({ stat: "earnedAchievement", goal: g, text: "Earned {0} achievements! " + GetRandomEncouragement() });
        g += Math.floor((Math.random() * 15) + 1);
    }

    for (var a = 0; a < achievements.length; a++)
    {
        achievements[a].awarded = false;
    }

    return achievements;
}

function CreateBlocks(numWide, numHigh, AddXP, AddStat)
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

            block.bind("CollisionDestroy",
                function(hitEnts)
                {
                    AddXP(5);
                    AddStat("blockDestroyed", 1);
                });
        }
    }
}

function CheckDisplayAchievement(achievements)
{
    if (achievements.length > 0 && Crafty("Achievement").length == 0)
    {
        var displayText = achievements.shift();
        Crafty.e('2D, DOM, Text, Tweener, Achievement')
                .text("Achievement Earned!\n" + displayText)
                .attr({ x: Game.width() * 0.1 / 2, y: Game.height() / 8, w: Game.width() * 0.9 })
                .css($center_text_css)
                .textFont({ size: '45px', weight: 'bold' })
                .textColor('#008800')
                .addTween({ alpha: 0 }, 'easeInQuart', 120, function() { this.destroy(); CheckDisplayAchievement(achievements); });
    }
}

function AddStar(x, y)
{
    var star = Crafty.e("2D, Canvas, Image")
               .attr({ x: x - 16, y: y - 16, w: 32, h: 32 })
               .image("assets/star.png");
}

Crafty.scene('Game', function()
{
    Crafty.background("rgb(190, 190, 190)");

    Crafty.load(['assets/star.png']);

    var achievements = InitAchievements();
    var awardedAchievements = new Array();

    var stats = { };
    stats.levelUp = 1;
    var AddStat =
        function(name, amount)
        {
            if (stats[name] == undefined)
            {
                stats[name] = 0;
            }
            stats[name] += amount;
            // Check if any achievements were earned.
            for (var a = 0; a < achievements.length; a++)
            {
                var achievement = achievements[a];
                if (!achievement.awarded && name == achievement.stat && stats[name] >= achievement.goal)
                {
                    achievement.awarded = true;
                    awardedAchievements.push(achievement.text.format(achievement.goal));
                    AddStat("earnedAchievement", 1);
                    AddStar(Math.random() * Game.width(), Math.random() * Game.height());
                    CheckDisplayAchievement(awardedAchievements);
                }
            }
        }

    var paddle = Crafty.e("2D, Canvas, Color, Twoway, Collision")
                  .attr({ x: Game.width() / 2 - kHalfPaddleWidth, y: Game.height() - kPaddleHeight, w: kPaddleWidth, h: kPaddleHeight })
                  .color("#339933")
                  .twoway(10, 0)
                  .collision();

    paddle.bind("EnterFrame",
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
    var xp = 0;
    var nextLevelXP = 2;

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

    function AddXP(addxp)
    {
        xp += addxp;
        while (xp >= nextLevelXP)
        {
            currentLevel++;
            xp -= nextLevelXP;
            nextLevelXP += 2;
            AddStat("levelUp", 1);
        }
        levelBarFG.w = 100 * (xp / nextLevelXP);

        levelText.text("Level " + currentLevel);
    }

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
                AddXP(1);
                AddStat("hitLeft", 1);
            }
            if (this.x > Game.width() - this.w)
            {
                this.x = Game.width() - this.w;
                this.vel.x = -this.vel.x;
                AddXP(1);
                AddStat("hitRight", 1);
            }
            if (this.y < 0)
            {
                this.y = 0;
                this.vel.y = -this.vel.y;
                AddXP(1);
                AddStat("hitTop", 1);
            }
            if (this.y > Game.height())
            {
                this.y = Game.height() / 2;
                AddXP(1);
                AddStat("hitBottom", 1);
            }
        });

    ball.onHit("Collision",
        function(hitEnts)
        {
            for (var i = 0; i < hitEnts.length; i++)
            {
                var hitEnt = hitEnts[i];
                if (hitEnt.obj == paddle)
                {
                    AddStat("numHits", 1);
                }
            }

            ball.vel.y = -ball.vel.y;

            AddXP(1);
        });

    var numWide = 2;
    var numHigh = 2;
    CreateBlocks(numWide, numHigh, AddXP, AddStat);

    Crafty.bind("EnterFrame",
        function()
        {
            if (Crafty("Block").length == 0 && ball.y > Game.height() / 2)
            {
                numWide = Math.min(100, numWide + 1);
                numHigh = Math.min(100, numHigh + 1);
                CreateBlocks(numWide, numHigh, AddXP, AddStat);
                AddXP(10);
                AddStat("createdBlocks", 1);
            }
        })
});