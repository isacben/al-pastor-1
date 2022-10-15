import Entity from "./entity.js";
import Player from "./player.js";

export default class Game {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    player = new Player();
    jump = false;

    ground = new Entity({x: 0, y: 250}, {w: 300, h: 10}, "red");

    constructor() {
        this.canvas.width = 300;
        this.canvas.height = 300;

        document.addEventListener("keydown", (ev) => this.handleKey(ev, true));
        document.addEventListener("keyup", (ev) => this.handleKey(ev, false));   
    }

    tick(){
        this.ctx.fillStyle = "yellow";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.jump) {
            this.player.jump();
        }
        this.player.tick(this.ground);
        this.player.draw(this.ctx);

        this.ground.draw(this.ctx);
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