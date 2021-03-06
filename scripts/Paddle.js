//Paddle Class
class Paddle{
    constructor(game){
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.width=120;
        this.height=10;
        this.position = {
            x: this.gameWidth / 2 - this.width / 2,
            y: this.gameHeight - this.height - 10
        }
        this.speed = 0;
        this.maxSpeed = 5;
    }
    draw(ctx){
        ctx.fillStyle = '#000';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    update(deltaTime){
        if (!deltaTime) return;
        this.position.x += this.speed;

        if(this.position.x + this.width > this.gameWidth){
            this.position.x = this.gameWidth - this.width;
        }

        if(this.position.x < 0){
            this.position.x = 0;
        }
        
    }
    moveLeft(){
        this.speed = -this.maxSpeed;
    }
    moveRight(){
        this.speed = this.maxSpeed;
    }
    stop(){
        this.speed = 0;
    }
}

export default Paddle;