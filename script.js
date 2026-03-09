const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

let macacoImg = new Image()
macacoImg.src = "img/macaco.png"

let bananaImg = new Image()
bananaImg.src = "img/banana.png"

let macaco = {
    x:80,
    y:200,
    width:60,
    height:60,
    dy:0,
    gravity:0.7,
    jump:-14,
    grounded:true
}

let bananas = []
let pontos = 0
let gameOver = false

function desenharMacaco(){
    ctx.drawImage(macacoImg, macaco.x, macaco.y, macaco.width, macaco.height)
}

function atualizarMacaco(){

    macaco.y += macaco.dy

    if(!macaco.grounded){
        macaco.dy += macaco.gravity
    }

    if(macaco.y >= 200){
        macaco.y = 200
        macaco.dy = 0
        macaco.grounded = true
    }
}

function criarBanana(){

    bananas.push({
        x:canvas.width,
        y:210,
        width:40,
        height:40
    })
}

function desenharBananas(){

    bananas.forEach(b=>{
        ctx.drawImage(bananaImg, b.x, b.y, b.width, b.height)
    })
}

function atualizarBananas(){

    bananas.forEach((b,index)=>{

        b.x -= 6

        if(colisao(macaco,b)){
            gameOver = true
        }

        if(b.x < -50){
            bananas.splice(index,1)
            pontos++
        }

    })
}

function colisao(a,b){

    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y
}

function desenharPontuacao(){

    ctx.fillStyle="black"
    ctx.font="20px Arial"
    ctx.fillText("Pontuação: "+pontos,20,30)

}

function loop(){

    ctx.clearRect(0,0,canvas.width,canvas.height)

    atualizarMacaco()
    atualizarBananas()

    desenharMacaco()
    desenharBananas()
    desenharPontuacao()

    if(gameOver){

        ctx.fillStyle="red"
        ctx.font="50px Arial"
        ctx.fillText("GAME OVER",300,150)
        return
    }

    requestAnimationFrame(loop)
}

document.addEventListener("keydown",e=>{

    if(e.code==="Space" && macaco.grounded){
        macaco.dy = macaco.jump
        macaco.grounded=false
    }

})

setInterval(criarBanana,1800)

loop()
scoreLoop();
