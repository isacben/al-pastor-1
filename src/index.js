import Game from "./game.js";

const game = new Game();

function loop() {
    requestAnimationFrame(loop);
    game.tick();

    if (!game.isStarter) {
        document.getElementById("startbutton").disabled = false;
        document.getElementById("startbutton").style = "display:block";
    }

}
requestAnimationFrame(loop);

function start() {
    game.restart();

    document.getElementById("startbutton").disabled = true;
    document.getElementById("startbutton").style = "display:none";
}
document.getElementById("startbutton").addEventListener("click", start);