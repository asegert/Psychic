var Psychic = Psychic || {};

Psychic.EndState = {
    create: function()
    {
        //Images
        this.add.sprite(0, 0, 'end');
        this.add.sprite(105, 0, 'crystalBallFinal');
        //Coupon reveal
        this.coupon = this.add.sprite(this.world.centerX + 10, this.world.centerY + 20, 'coupon');
        this.coupon.scale.setTo(0.1, 0.1);
        this.coupon.anchor.setTo(0.5, 0.5);
        this.coupon.alpha = 0;
        this.add.tween(this.coupon).to({alpha: 0.7}, 2000, "Linear", true);
        let scaleTween = this.add.tween(this.coupon.scale).to({x: 0.5, y: 0.5}, 2000, "Linear", true);
        scaleTween.onComplete.add(function()
        {
            this.stop = true;
            this.coupon.rotation = 0;
            //Float the coupon in the crystal ball
            let floatTween = this.add.tween(this.coupon).to({y: this.coupon.y+15}, 2000, "Linear", true, 0, -1);
            floatTween.yoyo(true, 50);
        }, this);
        this.stop = false;
    },
    update: function()
    {
        //If the coupon is being revealed, spin it
        if(!this.stop)
        {
            this.coupon.rotation +=0.5;
        }
    }
}