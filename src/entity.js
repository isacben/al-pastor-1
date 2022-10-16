export default class Entity {
    type = "";
    pos = {x: 0, y: 0};
    size = {w: 0, h: 0};
    color = "";

    constructor(type, pos, size, color) {
        this.pos = pos;
        this.size = size;
        this.color = color;
    }

    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y, this.size.w, this.size.h);
    }

    get getPosition() {
        return this.pos;
    }

    get bounds() {
        return {
            left: this.pos.x,
            right: this.pos.x + this.size.w,
            top: this.pos.y,
            bottom: this.pos.y + this.size.h,
        };
    }

    checkCollision(other) {
        return (
            this.bounds.left < other.bounds.right &&
            this.bounds.right > other.bounds.left &&
            this.bounds.top < other.bounds.bottom &&
            this.bounds.bottom > other.bounds.top
        );
    }

}