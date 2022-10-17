import Entity from "./entity.js";

export default class Player extends Entity {
    vel = {x: 0, y: 0};
    grounded = false;
    gravity = 0.2;
    jumpForce = 8;
    score = 0;
    hit = false;

    constructor() {
        super("player", {x: 20, y: 250 - 48}, {w: 48, h: 48}, "blue");
    }

    jump() {
        if (this.grounded) {
            this.vel.y += this.jumpForce;
        }
    }

    tick(entities) {
        this.pos.y -= this.vel.y;

        this.grounded = false;

        entities.forEach((entity, index, object) => {
            if (entity.type === "ground") {
                if (this.checkCollision(entity)) {
                    /* this.pos.y -= 
                        this.vel.y > 0 
                        ? this.bounds.top - entity.bounds.bottom 
                        : this.bounds.bottom - entity.bounds.top; */
                    this.pos.y -= this.bounds.bottom - entity.bounds.top;
                    this.vel.y = 0;
                    this.grounded = this.pos.y < entity.getPosition.y;
                }
                this.vel.y -= this.gravity;
            } else if (entity.type === "taco") {
                if (this.checkCollision(entity)) {
                    object.splice(index, 1);
                    this.score++;
                }
            } else if (entity.type === "enemy") {
                if (this.checkCollision(entity)) {
                    this.vel.y = 0;
                    this.vel.y += 5;
                    //object.splice(index, 1);
                    this.hit = true;
                }
            }
        });
    }

    dropPlayer() {
        this.vel.y += 5;
    }

    get getScore() {
        return this.score;
    }

    get getHit() {
        return this.hit;
    }
}