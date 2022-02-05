import Paddle from "./Paddle.js";
import Brick from "./Brick.js";
import Ball from "./Ball.js";
import inputHandler from "./InputHandler.js";
import {buildLevel, level1} from "./levels.js";

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 3,
    GAMEOVER: 4
}

class Game{
    constructor(gameWidth,gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gamestate = GAMESTATE.MENU;
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.gameObjects = [];
        this.bricks =[];
        this.lives = 3;
        new inputHandler(this, this.paddle);
    }
    start(){
        if(this.gamestate == GAMESTATE.MENU || this.gamestate == GAMESTATE.GAMEOVER){
            this.gamestate = GAMESTATE.RUNNING;
            this.bricks = buildLevel(this, level1);
            this.gameObjects = [this.paddle,this.ball];
        }
    }
    update(deltaTime){
        if (this.lives == 0) this.gamestate = GAMESTATE.GAMEOVER ;
        if(!this.gamestate || this.gamestate == GAMESTATE.MENU || this.gamestate == GAMESTATE.GAMEOVER) return;
        [...this.gameObjects,...this.bricks].forEach(object=>object.update(deltaTime));
        this.bricks = this.bricks.filter(object => !object.markedForDeletion);
    }
    draw(ctx){
        [...this.gameObjects,...this.bricks].forEach(object=>object.draw(ctx));
        if(!this.gamestate){
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fill();
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
        }
        if (this.gamestate === GAMESTATE.MENU) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();
      
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText(
              "Press SPACEBAR To Start",
              this.gameWidth / 2,
              this.gameHeight / 2
            );
          }
          if (this.gamestate === GAMESTATE.GAMEOVER) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();
      
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
          }
    }
    togglePause(){
        this.gamestate = this.gamestate == GAMESTATE.RUNNING ? GAMESTATE.PAUSED : GAMESTATE.RUNNING;
        console.log(this.gamestate);
    }

}
export default Game;