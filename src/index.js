import Game from "./game.js";

const game = new Game();

function loop() {
    requestAnimationFrame(loop);
    game.tick();

}
requestAnimationFrame(loop);
