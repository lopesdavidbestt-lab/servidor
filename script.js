const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let macaco = {
    x: 50,
    y: 200,
    width: 40,
    height: 40,
    dy: 0,
    jump: -12,
    gravity: 0.6,
    grounded: true
};

let obstaculos = [];
let gameOver = false;

function desenharMacaco(){
    ctx.fillStyle = "brown";
    ctx.fillRect(macaco.x, macaco.y, macaco.width, macaco.height);
}

function desenharObstaculos(){
    ctx.fillStyle = "green";

    obstaculos.forEach(o => {
        ctx.fillRect(o.x, o.y, o.width, o.height);
    });
}

function atualizarMacaco(){

    macaco.y += macaco.dy;

    if(!macaco.grounded){
        macaco.dy += macaco.gravity;
    }

    if(macaco.y > 200){
        macaco.y = 200;
        macaco.dy = 0;
        macaco.grounded = true;
    }
}

function atualizarObstaculos(){

    obstaculos.forEach(o => {
        o.x -= 6;

        if(colisao(macaco,o)){
            gameOver = true;
        }
    });

}

function colisao(a,b){

    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

function spawnObstaculo(){

    obstaculos.push({
        x:800,
        y:220,
        width:30,
        height:30
    });

}

function loop(){

    if(gameOver){
        ctx.fillStyle="red";
        ctx.font="40px Arial";
        ctx.fillText("GAME OVER",300,150);
        return;
    }

    ctx.clearRect(0,0,800,300);

    atualizarMacaco();
    atualizarObstaculos();

    desenharMacaco();
    desenharObstaculos();

    requestAnimationFrame(loop);
}

setInterval(spawnObstaculo,2000);

document.addEventListener("keydown",function(e){

    if(e.code==="Space" && macaco.grounded){
        macaco.dy = macaco.jump;
        macaco.grounded = false;
    }

});

loop();
scoreLoop();
