import { collisionDetetcion } from "./collisionDetetction.js";

class Brick{
    constructor(game, position){
        this.image = new Image();
        this.image.src = './images/brick.png';
        this.position = position;
        this.width = 80;
        this.height = 24;
        this.game = game;
        this.markedForDeletion = false;
    }
    draw(ctx){
        ctx.drawImage(this.image,this.position.x,this.position.y,this.width, this.height)
    }
    update(deltaTime){
        if (collisionDetetcion(this.game.ball, this)){
            this.game.ball.speed.y = -this.game.ball.speed.y;
            this.markedForDeletion = true;
        }
    }
}

export default Brick;