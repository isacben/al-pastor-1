import Entity from "./entity.js";

export default class Player extends Entity {
    vel = {x: 0, y: 0};
    grounded = false;
    gravity = 0.4;
    jumpForce = 11;

    constructor() {
        super({x: 20, y: 250 - 48}, {w: 48, h: 48}, "blue");
    }

    jump() {
        if (this.grounded) {
            this.vel.y += this.jumpForce;
        }
    }

    tick(ground) {
        this.pos.y -= this.vel.y;

        this.grounded = false;

        if (this.checkCollision(ground)) {
            this.pos.y -= 
                this.vel.y > 0 
                ? this.bounds.top - ground.bounds.bottom 
                : this.bounds.bottom - ground.bounds.top;
            this.vel.y = 0;
            this.grounded = this.pos.y < ground.getPosition.y;
        }
        this.vel.y -= this.gravity;
    }
}