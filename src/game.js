import Entity from "./entity.js";
import Player from "./player.js";

/** @type {HTMLCanvasElement} */

export default class Game {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    player = new Player();
    jump = false;

    ground = new Entity("ground", {x: 0, y: 250}, {w: 300, h: 10}, "red");
    things = [this.ground];

    tacoTimer = 0;
    tacoInterval = 200;

    score = 0;

    constructor() {
        this.canvas.width = 300;
        this.canvas.height = 300;

        document.addEventListener("keydown", (ev) => this.handleKey(ev, true));
        document.addEventListener("keyup", (ev) => this.handleKey(ev, false));
    }

    tick(){

        this.ctx.fillStyle = "yellow";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.showScore();

        this.addThing();

        if (this.jump) {
            this.player.jump();
        }

        this.player.tick(this.things);
        this.player.draw(this.ctx);

        //this.things[0].draw(this.ctx);

        this.things.forEach(thing => {
            //thing.tick()
            
            if (thing.type !== "ground") {
                thing.move();
            }
            thing.draw(this.ctx);
        });

        this.deleteThing(); 
    }

    addThing(){
        if (this.tacoTimer > this.tacoInterval) {
            this.things.push(
                new Entity(
                    "taco",
                    {x: 300, y:100},
                    {w: 32, h: 32},
                    "brown"
                )
            );
            console.log(this.things) 
            this.tacoTimer = 0;
        } else {
            this.tacoTimer++;
        }
    }

    deleteThing(){
        this.things.forEach(function(thing, index, object) {
            if (thing.pos.x + thing.size.w < 0) {
              object.splice(index, 1);
            }
        });
    }

    showScore() {
        this.score = this.player.getScore;
        this.ctx.fillStyle = "black";
        this.ctx.font = "16px Arial";
        this.ctx.textAlign = "right";
        this.ctx.fillText(this.score, 290, 25);
    }

    handleKey(ev, isDown) {
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