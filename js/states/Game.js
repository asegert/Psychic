var Psychic = Psychic || {};

Psychic.GameState = {
    create: function ()
    {
        //temp
        //this.add.text(0, 0, "Find the card and I will show you your future");
        //Holds the three crystal balls
        this.crystalBall = new Array();
        this.crystalBall[0]= this.add.sprite(0, 300, 'crystalBall');
        this.crystalBall[1] = this.add.sprite(350, 300, 'crystalBall');
        this.crystalBall[2] = this.add.sprite(700, 300, 'crystalBall');
        //Start the game
        this.showCard();
    },
    showCard:function()
    {
        //Random number to point to the ball in which the card will be placed under
        let num = Math.floor(Math.random() * 3);
        //Create the card           
        this.card = this.add.sprite((num * 350) + 130, 150, 'card');
        this.card.anchor.setTo(0.5, 0.5);
        //Animation
        //Tilt the crystal ball so the card can be placed under it
        let tiltTween = this.add.tween(this.crystalBall[num]).to({rotation: -0.5}, 1000, "Linear", true);
        //Starts flipping the card
        let flipFirst = this.add.tween(this.card.scale).to({x: -0}, 1000, "Linear", true);       
        flipFirst.onComplete.add(function()
        {
            //Loads the new card texture
            this.card.loadTexture('cardBack');
            //Completes the flip
            let flipSecond = this.add.tween(this.card.scale).to({x: 1}, 1000, "Linear", true);
            flipSecond.onComplete.add(function()
            {
                //Scale the card down and place under the crystal ball
                this.add.tween(this.card.scale).to({x: 0.5, y: 0.1}, 1000, "Linear", true);
                let lastCardTween = this.add.tween(this.card).to({x: this.card.x - 20, y: 540}, 1000, "Linear", true);
                lastCardTween.onComplete.add(function()
                {
                    //Place the crystal ball over the card
                    this.world.bringToTop(this.crystalBall[num]);
                    //Lower the crystal ball over the card
                    let drop = this.add.tween(this.crystalBall[num]).to({rotation: 0}, 1000, "Linear", true);
                    drop.onComplete.add(function()
                    {
                        //Remove the card and begin mixing
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
                    this.guessTween(true, i);
                }, this);   
            }
            else
            {
                this.crystalBall[i].inputEnabled = true;
                this.crystalBall[i].events.onInputDown.add(function()
                {
                    console.log('You got the wrong ball');
                    this.guessTween(false, 0);
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
        this.card = this.add.sprite(this.crystalBall[index].x + 100, 520, 'cardBack');
        this.card.scale.setTo(0.5, 0.1);
        this.card.anchor.setTo(0.5, 0.5);
        this.world.bringToTop(this.crystalBall[index]);    
    },
    guessTween: function(found, index)
    {
        let tiltTween = this.add.tween(this.crystalBall[index]).to({rotation: -0.5}, 1000, "Linear", true);
        
        if(!found)
        {
            this.add.tween(this.crystalBall[1]).to({rotation: -0.5}, 1000, "Linear", true);
            this.add.tween(this.crystalBall[2]).to({rotation: -0.5}, 1000, "Linear", true);
        }
        
        tiltTween.onComplete.add(function()
        {
            this.world.bringToTop(this.card);
            this.add.tween(this.card.scale).to({x: 1, y: 1}, 1000, "Linear", true);
            this.add.tween(this.card).to({x: this.card.x, y: 150}, 1000, "Linear", true);
            let rotateBack = this.add.tween(this.crystalBall[index]).to({rotation: 0}, 1000, "Linear", true);
            if(!found)
            {
                this.add.tween(this.crystalBall[1]).to({rotation: 0}, 1000, "Linear", true);
                this.add.tween(this.crystalBall[2]).to({rotation: 0}, 1000, "Linear", true);
            }
            rotateBack.onComplete.add(function()
            {
                let firstFlip = this.add.tween(this.card.scale).to({x: -0}, 1000, "Linear", true); 
                firstFlip.onComplete.add(function()
                {
                    this.card.loadTexture('card');
                    this.add.tween(this.card.scale).to({x: 1}, 1000, "Linear", true);
                }, this);
            }, this);
        }, this);
    },
    update: function ()
    {
        
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/