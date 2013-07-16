Game =
{
    width: function()
    {
        return 400;
    },
    
    height: function()
    {
        return 400;
    },
    
    start: function()
    {
        Crafty.init(Game.width(), Game.height());
        Crafty.background("rgb(255, 255, 255)");
        
        Crafty.scene("Game");
    }
}

$center_text_css = { 'text-align': 'center' }