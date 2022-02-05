import Game from "./Game.js";


//declare canvas enviroment
const canvas = document.querySelector('#gameArea');

let ctx = canvas.getContext('2d');

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;


//Initialize game 
let game = new Game(GAME_WIDTH, GAME_HEIGHT);
// game.start(ctx);

//initialize the last time
let last_time = 0;
function gameLoop(timeStamp){
    let deltaTime = timeStamp - last_time;
    last_time = timeStamp;
    ctx.clearRect(0,0,800,600);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(gameLoop);
}

//request for browser to make animations
requestAnimationFrame(gameLoop);





