const canvas = document.getElementById('tictactoeCanvas');
const ctx = canvas.getContext('2d');

// Define canvas dimensions
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const squareSize = 20;
const numRows = canvasHeight / squareSize;
const numCols = canvasWidth / squareSize;

function drawBoard(){
    ctx.fillStyle = "black";
    ctx.fillRect(100,0,10,320);
    ctx.fillRect(210,0,10,320);
    ctx.fillRect(0,100,320,10);
    ctx.fillRect(0,210,320,10);
}
class Game{
    constructor(){
        this.board=[["","",""],["","",""],["","",""]];
        this.turn="x";
    }

    place(position1,position2){
        if(this.board[position2][position1]==""){
            this.board[position2][position1]=this.turn;
            ctx.lineWidth=10;
            if(this.turn=="x"){
                ctx.beginPath();
                ctx.moveTo(10+position1*110,10+position2*110);
                ctx.lineTo(90+position1*110,90+position2*110);
                ctx.moveTo(10+position1*110,90+position2*110);
                ctx.lineTo(90+position1*110,10+position2*110);
                ctx.stroke();
                this.turn='o';
            }else if(this.turn=='o'){
                ctx.beginPath();
                ctx.arc(50+position1*110,50+position2*110, 40, 0, 2 * Math.PI);
                ctx.stroke();
                this.turn='x';
            }
        }
    }

    drawXAndY(){
        ctx.lineWidth=10;
        for(let y=0;y<=2;y++){
            for(let x=0;x<=2;x++){
                if(this.board[y][x]=="x"){
                ctx.beginPath();
                ctx.moveTo(10+x*110,10+y*110);
                ctx.lineTo(90+x*110,90+y*110);
                ctx.moveTo(10+x*110,90+y*110);
                ctx.lineTo(90+x*110,10+y*110);
                ctx.stroke();
                }else if(this.board[y][x]=="o"){
                ctx.beginPath();
                ctx.arc(50+x*110,50+y*110, 40, 0, 2 * Math.PI);
                ctx.stroke();
                }
            }
        }
    }

}

document.addEventListener('click',(event)=>{
    const clickX = event.clientX - canvas.getBoundingClientRect().left;
    const clickY = event.clientY - canvas.getBoundingClientRect().top;
    if ((clickX >= 0) && (clickX <= 100) && (clickY >= 0) && (clickY <= 100)){
        gam.place(0,0);
    }else if ((clickX >= 110) && (clickX <= 210) && (clickY >= 0) && (clickY <= 100)){
        gam.place(1,0);
    }else if ((clickX >= 220) && (clickX <= 320) && (clickY >= 0) && (clickY <= 100)){
        gam.place(2,0);
    }else if ((clickX >= 0) && (clickX <= 100) && (clickY >= 110) && (clickY <= 210)){
        gam.place(0,1);
    }else if ((clickX >= 110) && (clickX <= 210) && (clickY >= 110) && (clickY <= 210)){
        gam.place(1,1);
    }else if ((clickX >= 220) && (clickX <= 320) && (clickY >= 110) && (clickY <= 210)){
        gam.place(2,1);
    }else if ((clickX >= 0) && (clickX <= 100) && (clickY >= 220) && (clickY <= 320)){
        gam.place(0,2);
    }else if ((clickX >= 110) && (clickX <= 210) && (clickY >= 220) && (clickY <= 320)){
        gam.place(1,2);
    }else if ((clickX >= 220) && (clickX <= 320) && (clickY >= 220) && (clickY <= 320)){
        gam.place(2,2);
    }
});

function gameLoop(currentTime) {
    const deltaTime = currentTime - lastTime;


    if (deltaTime >= gameSpeed) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        drawBoard();
        gam.drawXAndY();
        
        lastTime = currentTime;
    }


    requestAnimationFrame(gameLoop);
}
const gam = new Game();
let gameSpeed=200;
let lastTime=0;
drawBoard();
gameLoop(0,0,1);