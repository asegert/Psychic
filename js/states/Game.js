var Psychic = Psychic || {};

Psychic.GameState = {
    create: function ()
    {
        this.data = JSON.parse(this.game.cache.getText('psychicData'));
        this.add.sprite(0, 0, 'background');
        this.levels = this.data.Levels;
        this.currentLevel = 1;
        this.wins = 0;
        //Holds the three crystal balls
        this.crystalBall = new Array();
        this.crystalBall[0]= this.add.sprite(this.data.CrystalBalls.x[0], this.data.CrystalBalls.y[0], 'crystalBall');
        this.crystalBall[1] = this.add.sprite(this.data.CrystalBalls.x[1], this.data.CrystalBalls.y[1], 'crystalBall');
        this.crystalBall[2] = this.add.sprite(this.data.CrystalBalls.x[2], this.data.CrystalBalls.y[2], 'crystalBall');
        //Start the game
        this.showCard();
    },
    showCard:function()
    {
        //Random number to point to the ball in which the card will be placed under
        let num = Math.floor(Math.random() * 3);
        //Create the card           
        this.card = this.add.sprite((num * (this.data.CrystalBalls.x[1] - this.data.CrystalBalls.x[0])) + (this.data.CardOffset + this.data.CrystalBalls.x[0]), 205, 'card');
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
                let lastCardTween = this.add.tween(this.card).to({x: this.card.x - 20, y: 605}, 1000, "Linear", true);
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
                        this.shuffle(0, 10, this.data.ShuffleSpeed[this.currentLevel-1], num);
                    }, this);
                }, this);
            }, this);
        }, this);
    },
    clickable: function(index)
    {
        //Makes all the crystal balls clickable
        for(let i = 0, len = this.crystalBall.length; i<len; i++)
        {
            //If it is the right one 
            if(i == index)
            {
                this.crystalBall[i].inputEnabled = true;
                this.crystalBall[i].events.onInputDown.add(function()
                {
                    //Run the tween
                    this.crystalBall[0].inputEnabled = false;
                    this.crystalBall[1].inputEnabled = false;
                    this.crystalBall[2].inputEnabled = false;
                    this.guessTween(true, i);
                }, this);   
            }
            //If it is wrong
            else
            {
                this.crystalBall[i].inputEnabled = true;
                this.crystalBall[i].events.onInputDown.add(function()
                {
                    //Run the tween
                    this.crystalBall[0].inputEnabled = false;
                    this.crystalBall[1].inputEnabled = false;
                    this.crystalBall[2].inputEnabled = false;
                    this.guessTween(false, 0);
                }, this);
            }
        }
    },
    shuffle: function(index, max, speed, num)
    {
        //Get a random index to be moved and a random index of where to move to
        let rand = Math.floor(Math.random() * 3);
        let rand2 = Math.floor(Math.random() * 3);
        //Make sure the indices are different
        while(rand2 === rand)
        {
            rand2 = Math.floor(Math.random() * 3);
        }
        //Temporarily store the old index  
        let oldx = this.crystalBall[rand].x;
        //Swap the crystal balls 
        this.add.tween(this.crystalBall[rand]).to({x: this.crystalBall[rand2].x}, speed, "Linear", true);
        let switchTween = this.add.tween(this.crystalBall[rand2]).to({x: oldx}, speed, "Linear", true);
        switchTween.onComplete.add(function()
        {
            //If more shuffles should occur recall the function, otherwise place the card back under the correct crystal ball
            (index<max) ? this.shuffle((index + 1), max, speed, num):this.replaceCard(num);
        }, this);
        
    },
    replaceCard: function(index)
    {
        //Allow input from the cryatal balls
        this.clickable(index);
        //Add the card under the correct crystal ball as it was before
        this.card = this.add.sprite(this.crystalBall[index].x + 100, 585, 'cardBack');
        this.card.scale.setTo(0.5, 0.1);
        this.card.anchor.setTo(0.5, 0.5);
        this.world.bringToTop(this.crystalBall[index]); 
    },
    guessTween: function(found, index)
    {
        //Asset to be displayed
        let tex = 'lose';
        //Tilt the crystal ball to reveal the card
        let tiltTween = this.add.tween(this.crystalBall[index]).to({rotation: -0.5}, 1000, "Linear", true);
        
        //If the card was not found have the other two reveal as well, otherwise increase the wins and change the display texture
        if(!found)
        {
            this.add.tween(this.crystalBall[1]).to({rotation: -0.5}, 1000, "Linear", true);
            this.add.tween(this.crystalBall[2]).to({rotation: -0.5}, 1000, "Linear", true);
        }
        else
        {
            this.wins++;
            tex = 'win';
        }
        
        tiltTween.onComplete.add(function()
        {            
            //Bring the card back up to the top at the right size
            this.world.bringToTop(this.card);
            this.add.tween(this.card.scale).to({x: 1, y: 1}, 1000, "Linear", true);
            this.add.tween(this.card).to({x: this.card.x, y: 205}, 1000, "Linear", true);
            //Start tipping the crystal ball back
            let rotateBack = this.add.tween(this.crystalBall[index]).to({rotation: 0}, 1000, "Linear", true);
            //If the card was not found tip them all back
            if(!found)
            {
                this.add.tween(this.crystalBall[1]).to({rotation: 0}, 1000, "Linear", true);
                this.add.tween(this.crystalBall[2]).to({rotation: 0}, 1000, "Linear", true);
            }
            rotateBack.onComplete.add(function()
            {                
                //Start flipping the card
                let firstFlip = this.add.tween(this.card.scale).to({x: -0}, 1000, "Linear", true); 
                firstFlip.onComplete.add(function()
                {
                    //Complete the flip
                    this.card.loadTexture('card');
                    let lastTween = this.add.tween(this.card.scale).to({x: 1}, 1000, "Linear", true);
                    lastTween.onComplete.add(function()
                    {
                        //Show the win/loss text
                        let alert = this.add.sprite(this.world.centerX, this.world.centerY, tex);
                        alert.anchor.setTo(0.5, 0.5);
                        alert.scale.setTo(0.1, 0.1);
                        alert.alpha = 0;
                        this.add.tween(alert.scale).to({x: 1, y: 1}, 1500, "Linear", true);
                        this.add.tween(alert).to({alpha: 1}, 1500, "Linear", true);
                        //Pause for readability
                        this.time.events.add(Phaser.Timer.SECOND * 3, function()
                        {
                            //Remove the alert
                            alert.destroy();
                            //If there is another level load it, otherwise end the game
                            if(this.currentLevel < this.levels)
                            {
                                this.currentLevel++;
                            
                                this.card.destroy();
                                this.crystalBall[0].destroy();
                                this.crystalBall[1].destroy();
                                this.crystalBall[2].destroy();
                            
                                this.crystalBall[0]= this.add.sprite(this.data.CrystalBalls.x[0], this.data.CrystalBalls.y[0], 'crystalBall');
                                this.crystalBall[1] = this.add.sprite(this.data.CrystalBalls.x[1], this.data.CrystalBalls.y[1], 'crystalBall');
                                this.crystalBall[2] = this.add.sprite(this.data.CrystalBalls.x[2], this.data.CrystalBalls.y[2], 'crystalBall');
                            
                                this.showCard();
                            }
                            else
                            {
                                this.state.start('End');
                            }
                        }, this);
                    }, this);
                }, this);
            }, this);
        }, this);
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/