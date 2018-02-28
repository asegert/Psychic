var Psychic = Psychic || {};

Psychic.PreloadState = {
    preload: function ()
    {
        var preloadBG = this.add.sprite((this.world.width - 580) * 0.5, (this.world.height + 150) * 0.5, 'loading-background');
        var preloadProgress = this.add.sprite((this.world.width - 540) * 0.5, (this.world.height + 170) * 0.5, 'loading-progress');
        this.load.setPreloadSprite(preloadProgress);

        this.load.image('main', 'assets/images/main.png');
        this.load.image('instructions', 'assets/images/instructions.png');
        this.load.image('end', 'assets/images/endBackground.png');
        
        this.load.image('background', 'assets/images/background.png');
        this.load.image('crystalBall', 'assets/images/crystalball.png');
        this.load.image('crystalBallFinal', 'assets/images/crystalballReveal.png');
        this.load.image('card', 'assets/images/cardJoker.png');
        this.load.image('cardBack', 'assets/images/cardBack_red5.png');
        this.load.image('win', 'assets/images/win.png');
        this.load.image('lose', 'assets/images/lose.png');
        
        this.load.image('start', 'assets/images/start.png');
        this.load.image('coupon', 'assets/images/Psychic_coupon.jpg');
        
        this.load.audio('gypsy', ['assets/audio/gypsy.mp3', 'assets/audio/gypsy.m4a', 'assets/audio/gypsy.ogg'])
        
        this.load.text('psychicData', 'assets/data/psychicData.json');
        
        /*JSON
        Holds...
        Levels -> number of levels to be played
        ShuffleSpeed -> An array holding the numerical values of the speed at which the crystal balls should be shuffled. 
                        Each entry corresponds to a level.
                        Recommended between 300-1000.
                        Speed must be evenly divided
        CardOffset -> number to offset the card
        CrystalBalls -> Holds...
                        x -> An array holding the x values for each of the three crystal balls
                        y -> An array holding the y values for each of the three crystal balls
        Due to the sheer number of tweens used they have not been generalized, but potentially could be.
        */
    },
    create: function ()
    {
        this.state.start('Story');
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/