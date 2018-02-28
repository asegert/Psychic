var Psychic = Psychic || {};

Psychic.StoryState = {
    create: function ()
    {
        Psychic.Audio = this.add.audio('gypsy');
        Psychic.Audio.play('', 0, 1, true);
        //Main screen
        this.background = this.add.sprite(0, 0, 'main');
        this.start = this.add.button(720, 540, 'start', function()
        {
            //If the main screen is active load the instructions, otherwise go to the game
            if(this.background.key === 'main')
            {
                this.background.loadTexture('instructions');
            }
            else
            {
                this.game.state.start('Game');
            }
        }, this);
        this.start.scale.setTo(0.6, 0.6);
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/