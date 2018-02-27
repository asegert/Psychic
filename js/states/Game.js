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
                    this.world.bringToTop(this.crystalBall[0]);
                    this.world.bringToTop(this.crystalBall[1]);
                    this.world.bringToTop(this.crystalBall[2]);
                    let drop = this.add.tween(this.crystalBall[num]).to({rotation: 0}, 1000, "Linear", true);
                    drop.onComplete.add(function()
                    {
                        this.card.destroy();
                        this.clickable(num);
                        this.shuffle(0, 10, 1000, num);//min 300
                    }, this);
                }, this);
            }, this);
        }, this);
    },
    clickable: function(index)
    {
        for(let i = 0, len = this.crystalBall.length; i<len; i++)
        {
            if(i == index)
            {
                this.crystalBall[i].inputEnabled = true;
                this.crystalBall[i].events.onInputDown.add(function()
                {
                    console.log('You got the right ball');
                }, this);
            }
            else
            {
                this.crystalBall[i].inputEnabled = true;
                this.crystalBall[i].events.onInputDown.add(function()
                {
                    console.log('You got the wrong ball');
                }, this);
            }
        }
    },
    shuffle: function(index, max, speed, num)
    {
        let rand = Math.floor(Math.random() * 3);
        let rand2 = Math.floor(Math.random() * 3);

        while(rand2 === rand)
        {
            rand2 = Math.floor(Math.random() * 3);
        }
            
        let oldx = this.crystalBall[rand].x;
            
        this.add.tween(this.crystalBall[rand]).to({x: this.crystalBall[rand2].x}, speed, "Linear", true);
        let switchTween = this.add.tween(this.crystalBall[rand2]).to({x: oldx}, speed, "Linear", true);
        switchTween.onComplete.add(function()
        {
            if(index<max)
            {
                this.shuffle((index + 1), max, speed, num);
            }
            else
            {
                this.replaceCard(num);
            }
        }, this);
        
    },
    replaceCard: function(index)
    {
        this.card = this.add.sprite(this.crystalBall[index].x + 70, 520, 'cardBack');
        this.card.scale.setTo(0.5, 0.1);
        this.world.bringToTop(this.crystalBall[index]);    
    },
    update: function ()
    {
        
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/