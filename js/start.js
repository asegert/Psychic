var Psychic = Psychic || {};//replace with game name variable

if(Phaser.Device.ie) //Checks that internet explorer is being used
{
    if(Phaser.Device.ieVersion < 10) //Check for old version
    {
        var error = document.createElement("DIV");
        error.setAttribute("id", "ieError");
        document.body.appendChild(error);
        document.getElementById("ieError").innerHTML = "Please upgrade your Browser <br><br> <a href = 'https://www.microsoft.com/en-ca/download/internet-explorer.aspx'>Internet Explorer</a><br><a href='https://www.google.com/chrome/browser/desktop/index.html'>Chrome</a><br><a href='https://www.mozilla.org/en-US/firefox/new/'>Firefox</a>";
    
    }
    else
    {
        Psychic.game = new Phaser.Game(960, 640, Phaser.AUTO);

        Psychic.game.state.add('Cache', Psychic.CacheState);
        Psychic.game.state.add('Boot', Psychic.BootState); 
        Psychic.game.state.add('Preload', Psychic.PreloadState); 
        Psychic.game.state.add('Game', Psychic.GameState);
        Psychic.game.state.add('Story', Psychic.StoryState);

        Psychic.game.state.start('Cache'); 
    }
}
else
{
    Psychic.game = new Phaser.Game(960, 640, Phaser.AUTO);

    Psychic.game.state.add('Cache', Psychic.CacheState);
    Psychic.game.state.add('Boot', Psychic.BootState); 
    Psychic.game.state.add('Preload', Psychic.PreloadState); 
    Psychic.game.state.add('Game', Psychic.GameState);
    Psychic.game.state.add('Story', Psychic.StoryState);

    Psychic.game.state.start('Cache');
}
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/