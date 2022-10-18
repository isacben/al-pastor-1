import Entity from "./entity.js";
import Player from "./player.js";

/** @type {HTMLCanvasElement} */

export default class Game {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    player = new Player();
    jump = false;
    started = false;

    ground = new Entity("ground", {x: 0, y: 250}, {w: 300, h: 10}, "red");
    things = [this.ground];

    tacoTimer = 0;
    tacoInterval = 200;

    enemyTimer = 0;
    enemyInterval = 300;

    constructor() {
        this.canvas.width = 300;
        this.canvas.height = 300;

        document.addEventListener("keydown", (ev) => this.handleKey(ev, true));
        document.addEventListener("keyup", (ev) => this.handleKey(ev, false));
    }

    tick(){

        this.ctx.fillStyle = "yellow";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.showScore(this.player.getScore);

        if (this.started) {
            this.addTaco();
            this.addEnemy();
        }

        if (this.jump) {
            this.player.jump();
        }

        this.player.tick(this.things);
        this.player.draw(this.ctx);

        this.things.forEach(thing => {
            if (thing.type === "taco") {
                thing.move(2);
            } else if (thing.type === "enemy") {
                thing.move(3);
            }
            thing.draw(this.ctx);
        });

        this.deleteThing(); 
        this.gameOver();
    }

    addTaco(){
        if (this.tacoTimer > this.tacoInterval) {
            this.things.push(
                new Entity(
                    "taco",
                    {x: 300, y:100},
                    {w: 32, h: 32},
                    "brown"
                )
            );
            //console.log(this.things) 
            this.tacoTimer = 0;
        } else {
            this.tacoTimer++;
        }
    }

    addEnemy(){
        if (this.enemyTimer > this.enemyInterval) {
            this.things.push(
                new Entity(
                    "enemy",
                    {x: 300, y:250 - 32},
                    {w: 32, h: 32},   
                    "violet"
                )
            );
            console.log(this.things) 
            this.enemyTimer = 0;
        } else {
            this.enemyTimer++;
        }
    }

    deleteThing(){
        this.things.forEach(function(thing, index, object) {
            if (thing.pos.x + thing.size.w < 0) {
              object.splice(index, 1);
            }
        });
    }

    showScore(score) {
        this.ctx.fillStyle = "black";
        this.ctx.font = "16px Arial";
        this.ctx.textAlign = "right";
        this.ctx.fillText(score, 290, 25);
    }

    handleKey(ev, isDown) {
        if (!this.player.getHit) {
            switch (ev.key) {
                default:
                    return;
                case "ArrowUp":
                case "w":
                case " ":
                    this.jump = isDown;
                    break;
            }
        }
    }

    gameOver() {
        if (this.player.getHit) {
            this.ctx.font = "32px Arail";
            this.ctx.textAlign = "center";
            this.ctx.fillText("Game Over", 150, 70);
            this.started = false;
        }
    }

    restart() {
        this.player.resetPlayer();
        this.started = true;
        this.things = this.things.slice(0, 1)
    }

    get isStarter() {
        return this.started;
    }
}