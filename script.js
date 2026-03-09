const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

let player = {
    x:370,
    y:340,
    width:60,
    height:30,
    speed:8
}

let moedas = []
let score = 0

let left = false
let right = false

function criarMoeda(){

    moedas.push({
        x: Math.random()*760,
        y:0,
        size:20,
        speed:4
    })

}

function desenharPlayer(){

    ctx.fillStyle = "blue"
    ctx.fillRect(player.x,player.y,player.width,player.height)

}

function desenharMoedas(){

    ctx.fillStyle="gold"

    moedas.forEach(m=>{
        ctx.beginPath()
        ctx.arc(m.x,m.y,m.size,0,Math.PI*2)
        ctx.fill()
    })

}

function atualizar(){

    if(left){
        player.x -= player.speed
    }

    if(right){
        player.x += player.speed
    }

    moedas.forEach((m,index)=>{

        m.y += m.speed

        if(colisao(player,m)){
            moedas.splice(index,1)
            score++
        }

        if(m.y > canvas.height){
            moedas.splice(index,1)
        }

    })

}

function colisao(p,m){

    return m.x > p.x &&
           m.x < p.x + p.width &&
           m.y > p.y &&
           m.y < p.y + p.height

}

function desenharScore(){

    ctx.fillStyle="black"
    ctx.font="20px Arial"
    ctx.fillText("Pontuação: "+score,10,30)

}

function loop(){

    ctx.clearRect(0,0,canvas.width,canvas.height)

    atualizar()

    desenharPlayer()
    desenharMoedas()
    desenharScore()

    requestAnimationFrame(loop)

}

document.addEventListener("keydown",e=>{

    if(e.key==="ArrowLeft") left=true
    if(e.key==="ArrowRight") right=true

})

document.addEventListener("keyup",e=>{

    if(e.key==="ArrowLeft") left=false
    if(e.key==="ArrowRight") right=false

})

setInterval(criarMoeda,1000)

loop()
loop()
scoreLoop();
