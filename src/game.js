import Thing from "./thing.js";
import Entity from "./entity.js";
import Player from "./player.js";

export default class Game {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    player = new Player();
    jump = false;

    ground = new Entity("ground", {x: 0, y: 250}, {w: 300, h: 10}, "red");
    things = [];

    tacoTimer = 0;
    tacoInterval = 200;

    constructor() {
        this.canvas.width = 300;
        this.canvas.height = 300;

        document.addEventListener("keydown", (ev) => this.handleKey(ev, true));
        document.addEventListener("keyup", (ev) => this.handleKey(ev, false));
    }

    tick(){

        this.ctx.fillStyle = "yellow";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.tacoTimer > this.tacoInterval) {
            this.addThing();
            this.tacoTimer = 0;
        } else {
            this.tacoTimer++;
        }

        if (this.jump) {
            this.player.jump();
        }
        this.player.tick(this.ground);
        this.player.draw(this.ctx);

        this.ground.draw(this.ctx);

        this.deleteThing(); 
        this.things.forEach(thing => {
            thing.tick()
            thing.draw(this.ctx); 
        });
    }

    addThing(){
        this.things.push(
            new Thing(
                "taco",
                {x: 300, y:100},
                {w: 32, h: 32},
                "brown"
            )
        );
        console.log(this.things)
    }

    deleteThing(){
        this.things.forEach(function(thing, index, object) {
            if (thing.pos.x + thing.size.w < 0) {
              object.splice(index, 1);
            }
        });
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