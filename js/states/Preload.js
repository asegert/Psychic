var Psychic = Psychic || {};

Psychic.PreloadState = {
    preload: function ()
    {
        var preloadBG = this.add.sprite((this.world.width - 580) * 0.5, (this.world.height + 150) * 0.5, 'loading-background');
        var preloadProgress = this.add.sprite((this.world.width - 540) * 0.5, (this.world.height + 170) * 0.5, 'loading-progress');
        this.load.setPreloadSprite(preloadProgress);

        this.load.image('background', 'assets/images/background.png');
        this.load.image('crystalBall', 'assets/images/crystalball.png');
        this.load.image('crystalBallFinal', 'assets/images/crystalballReveal.png');
        this.load.image('card', 'assets/images/cardJoker.png');
        this.load.image('cardBack', 'assets/images/cardBack_red5.png');
        
        this.load.image('coupon', 'assets/images/Psychic_coupon.jpg');
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