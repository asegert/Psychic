var Psychic = Psychic || {};

Psychic.GameState = {
    create: function ()
    {
        //temp
        //this.add.text(0, 0, "Find the card and I will show you your future");
        this.crystalBall = new Array();
        this.crystalBall[0]= this.add.sprite(0, 300, 'crystalBall');
        this.crystalBall[1] = this.add.sprite(350, 300, 'crystalBall');
        this.crystalBall[2] = this.add.sprite(700, 300, 'crystalBall');
        this.showCard();
    },
    showCard:function()
    {
        let num = Math.floor(Math.random() * 3);
                   
        this.card = this.add.sprite((num * 350) + 130, 150, 'card');
        this.card.anchor.setTo(0.5, 0.5);
        
        let tiltTween = this.add.tween(this.crystalBall[num]).to({rotation: -0.5}, 1000, "Linear", true);
        let flipFirst = this.add.tween(this.card.scale).to({x: -0}, 1000, "Linear", true);       
        flipFirst.onComplete.add(function()
        {
            this.card.loadTexture('cardBack');
            
            let flipSecond = this.add.tween(this.card.scale).to({x: 1}, 1000, "Linear", true);
            flipSecond.onComplete.add(function()
            {
                this.add.tween(this.card.scale).to({x: 0.5, y: 0.1}, 1000, "Linear", true);
                let lastCardTween = this.add.tween(this.card).to({x: this.card.x - 20, y: 540}, 1000, "Linear", true);
                lastCardTween.onComplete.add(function()
                {
                    this.add.tween(this.crystalBall[num]).to({rotation: 0}, 1000, "Linear", true);
                }, this);
                //Oncomplete rotate back the ball
            }, this);
        }, this);
        //call new func for shuffle
    },
    update: function ()
    {
        
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/