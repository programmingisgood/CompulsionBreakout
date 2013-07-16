
var SetOnAllLoadedCallback = function(callbackFunc)
{
    this.onAllLoaded = callbackFunc;
    if (this.allLoaded)
    {
        this.onAllLoaded();
    }
}

Modules = { SetOnAllLoadedCallback: SetOnAllLoadedCallback, onAllLoaded: null, allLoaded: false, _allModules: [] }

var loadModules = { };
for (var i = 0; i < Modules._allModules.length; i++)
{
    var module = Modules._allModules[i];
    loadModules[module.name] = "RELEASE";
}

Crafty.modules('http://cdn.craftycomponents.com/', loadModules, function()
{
    Modules.allLoaded = true;
    if (Modules.onAllLoaded)
        Modules.onAllLoaded();
});