const canvas = document.getElementById('tictactoeCanvas');
const ctx = canvas.getContext('2d');

// Define canvas dimensions
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const squareSize = 20;
const numRows = canvasHeight / squareSize;
const numCols = canvasWidth / squareSize;

class Game{
    constructor(){
        this.board=[["","",""],["","",""],["","",""]];
        this.turn="X";
        this.winner="";
        this.xWins=0;
        this.oWins=0;
        this.ties=0;
    }

    place(position1,position2){
        if(this.board[position2][position1]==""){
            this.board[position2][position1]=this.turn;
            ctx.lineWidth=10;
            if(this.turn=="X"){
                ctx.strokeStyle="#ff0000";
                ctx.beginPath();
                ctx.moveTo(10+position1*110,10+position2*110);
                ctx.lineTo(90+position1*110,90+position2*110);
                ctx.moveTo(10+position1*110,90+position2*110);
                ctx.lineTo(90+position1*110,10+position2*110);
                ctx.stroke();
                this.turn="O";
            }else if(this.turn=="O"){
                ctx.strokeStyle = "#2000ff";
                ctx.beginPath();
                ctx.arc(50+position1*110,50+position2*110, 40, 0, 2 * Math.PI);
                ctx.stroke();
                this.turn="X";
            }
        }
    }

    drawXAndY(){
        ctx.fillStyle = "black";
        ctx.fillRect(100,0,10,320);
        ctx.fillRect(210,0,10,320);
        ctx.fillRect(0,100,320,10);
        ctx.fillRect(0,210,320,10);
        ctx.lineWidth=10;
        for(let y=0;y<=2;y++){
            for(let x=0;x<=2;x++){
                if(this.board[y][x]=="X"){
                    ctx.strokeStyle="#ff0000";
                    ctx.beginPath();
                    ctx.moveTo(10+x*110,10+y*110);
                    ctx.lineTo(90+x*110,90+y*110);
                    ctx.moveTo(10+x*110,90+y*110);
                    ctx.lineTo(90+x*110,10+y*110);
                    ctx.stroke();
                }else if(this.board[y][x]=="O"){
                    ctx.strokeStyle = "#2000ff";
                    ctx.beginPath();
                    ctx.arc(50+x*110,50+y*110, 40, 0, 2 * Math.PI);
                    ctx.stroke();
                }
            }
        }
    }

    detectWin(){
        let oOrX=["X","O"]
        for(let i=0;i<oOrX.length;i++)
        if((oOrX[i]==this.board[0][1]) && (oOrX[i]==this.board[0][2]) && (oOrX[i]==this.board[0][0])){
            this.winner=this.board[0][0];
        }else if((oOrX[i]==this.board[1][0]) && (oOrX[i]==this.board[2][0]) && (oOrX[i]==this.board[0][0])){
            this.winner=this.board[0][0];
        }else if((oOrX[i]==this.board[2][1]) && (oOrX[i]==this.board[2][0]) && (oOrX[i]==this.board[2][2])){
            this.winner=this.board[2][2];
        }else if((oOrX[i]==this.board[1][2]) && (oOrX[i]==this.board[0][2]) && (oOrX[i]==this.board[2][2])){
            this.winner=this.board[2][2];
        }else if((oOrX[i]==this.board[1][0]) && (oOrX[i]==this.board[1][2]) && (oOrX[i]==this.board[1][1])){
            this.winner=this.board[1][1];
        }else if((oOrX[i]==this.board[0][1]) && (oOrX[i]==this.board[2][1]) && (oOrX[i]==this.board[1][1])){
            this.winner=this.board[1][1];
        }else if((oOrX[i]==this.board[0][0]) && (oOrX[i]==this.board[2][2]) && (oOrX[i]==this.board[1][1])){
            this.winner=this.board[1][1];
        }else if((oOrX[i]==this.board[0][2]) && (oOrX[i]==this.board[2][0]) && (oOrX[i]==this.board[1][1])){
            this.winner=this.board[1][1];
        }else if(!(this.board[0]).includes("")){if(!(this.board[1]).includes("")){if(!(this.board[2]).includes("")){
            this.winner="T";
        }}}
        if(this.winner!=""){
            this.board=[["","",""],["","",""],["","",""]];
            if(this.winner=="X"){
                this.xWins++;
            }else if(this.winner=="O"){
                this.oWins++;
            }else if(this.winner=="T"){
            this.ties++;
        }}
        console.log(this.board[0][0]);
        console.log(this.board[0][1]);
        console.log(this.board[0][2]);
        console.log(this.board[1][0]);
        console.log(this.board[1][1]);
        console.log(this.board[1][2]);
        console.log(this.board[2][0]);
        console.log(this.board[2][1]);
        console.log(this.board[2][2]);
        console.log("-----------------")
    }
    congratulateWinner(){
        ctx.fillStyle = "#000000";
        ctx.font = "35px arial";
        ctx.fillText("Click anywhere", 40, 110);
        ctx.fillText(" to play again", 50, 145);
        ctx.font = "50px arial";
        ctx.fillText("  wins: "+this.xWins, 65, 200);
        ctx.fillText("  wins: "+this.oWins, 65, 250);
        ctx.fillText("Ties: "+this.ties, 80, 305);
        ctx.fillStyle="#ff0000";
        ctx.fillText("X", 50, 200);
        ctx.fillStyle = "#2000ff";
        ctx.fillText("O", 48, 250);
        ctx.font = "75px arial";
        if(this.winner!="T"){
            ctx.fillStyle = "#000000";
            ctx.fillText("   WON!", 33, 70);
            if(this.winner=="X"){
                ctx.fillStyle="#ff0000";
                ctx.fillText(this.winner, 25, 70);
            }else if(this.winner=="O"){
                ctx.fillStyle = "#2000ff";
                ctx.fillText(this.winner, 21, 70);
            }
        }else if(this.winner=="T"){
            ctx.fillStyle = "#000000";
            ctx.fillText("TIE!", 93, 70);
        }
    }
}

document.addEventListener('click',(event)=>{
    const clickX = event.clientX - canvas.getBoundingClientRect().left;
    const clickY = event.clientY - canvas.getBoundingClientRect().top;
    if(gam.winner==""){
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
    }}else if ((clickX >= 0) && (clickX <= 320) && (clickY >= 0) && (clickY <= 320)){
        gam.winner="";
    }
});

function gameLoop(currentTime) {
    const deltaTime = currentTime - lastTime;


    if (deltaTime >= gameSpeed) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        if(gam.winner==""){
            gam.detectWin();
            gam.drawXAndY();
        }else{
            gam.congratulateWinner();
        }
        lastTime = currentTime;
    }


    requestAnimationFrame(gameLoop);
}
const gam = new Game();
let gameSpeed=200;
let lastTime=0;
gameLoop(0,0,1);