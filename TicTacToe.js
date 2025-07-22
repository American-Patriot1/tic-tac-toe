const canvas = document.getElementById('tictactoeCanvas');
const ctx = canvas.getContext('2d');

// Define canvas dimensions
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const squareSize = 20;
const numRows = canvasHeight / squareSize;
const numCols = canvasWidth / squareSize;
// console.log();
// console.log("-------------------------------");
class Game{
    constructor(){
        this.board=[["","",""],["","",""],["","",""]];
        this.turn="X";
        this.turnNumber=0;
        this.amtGames=0;
        this.winner="";
        this.xWins=0;
        this.oWins=0;
        this.ties=0;
        const locs=[[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]
        this.outcomes=[];
        let path=[];
        this.paths=[];
        for(let one=0;one<=locs.length-1;one++){
            path.push([locs[one]]);
            const locOne = Array.from(locs);
            locOne.splice(locOne.indexOf(path[one][0]),1);
            for(let two=0;two<=locOne.length-1;two++){
                path[one].push([locOne[two]]);
                const locTwo = Array.from(locOne);
                locTwo.splice(locTwo.indexOf(path[one][two+1][0]),1)
                for(let three=0;three<=locTwo.length-1;three++){
                    path[one][two+1].push([locTwo[three]]);
                    const locThree = Array.from(locTwo);
                    locThree.splice(locThree.indexOf(path[one][two+1][three+1][0]),1)
                    for(let four=0;four<=locThree.length-1;four++){
                        path[one][two+1][three+1].push([locThree[four]]);
                        const locFour = Array.from(locThree);
                        locFour.splice(locFour.indexOf(path[one][two+1][three+1][four+1][0]),1)
                        for(let five=0;five<=locFour.length-1;five++){
                            path[one][two+1][three+1][four+1].push([locFour[five]]);
                            const locFive = Array.from(locFour);
                            locFive.splice(locFive.indexOf(path[one][two+1][three+1][four+1][five+1][0]),1)
                            for(let six=0;six<=locFive.length-1;six++){
                                path[one][two+1][three+1][four+1][five+1].push([locFive[six]]);
                                const locSix = Array.from(locFive);
                                locSix.splice(locSix.indexOf(path[one][two+1][three+1][four+1][five+1][six+1][0]),1)
                                for(let seven=0;seven<=locSix.length-1;seven++){
                                    path[one][two+1][three+1][four+1][five+1][six+1].push([locSix[seven]]);
                                    const locSeven = Array.from(locSix);
                                    locSeven.splice(locSeven.indexOf(path[one][two+1][three+1][four+1][five+1][six+1][seven+1][0]),1)
                                    path[one][two+1][three+1][four+1][five+1][six+1][seven+1].push([locSeven[0],locSeven[1]]);
                                    path[one][two+1][three+1][four+1][five+1][six+1][seven+1].push([locSeven[1],locSeven[0]]);
                                }
                            }
                        }
                    }
                }
            }
        }
        console.log(path);
        for(let one=0;one<=path.length-1;one++){
            for(let two=1;two<=path[one].length-1;two++){
                for(let three=1;three<=path[one][two].length-1;three++){
                    for(let four=1;four<=path[one][two][three].length-1;four++){
                        for(let five=1;five<=path[one][two][three][four].length-1;five++){
                            for(let six=1;six<=path[one][two][three][four][five].length-1;six++){
                                for(let seven=1;seven<=path[one][two][three][four][five][six].length-1;seven++){
                                    for(let eight=1;eight<=path[one][two][three][four][five][six][seven].length-1;eight++){
                                        this.paths.push([
                                            path[one][0],
                                            path[one][two][0],
                                            path[one][two][three][0],
                                            path[one][two][three][four][0],
                                            path[one][two][three][four][five][0],
                                            path[one][two][three][four][five][six][0],
                                            path[one][two][three][four][five][six][seven][0],
                                            path[one][two][three][four][five][six][seven][eight][0],
                                            path[one][two][three][four][five][six][seven][eight][1]]);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        console.log(this.paths);
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
            // this.turnNumber++;
        }
    }
    gamePlayer(){
        this.place(this.paths[this.amtGames][this.turnNumber][0],this.paths[this.amtGames][this.turnNumber][1])
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
            }
            // this.amtGames++;
            // this.turnNumber=0;
        }
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
        console.log("AAAAAAAAAAAAAAAAAAAAAAAA");
        this.winner==""
        this.amtGames++;
        this.turnNumber=0;
    }
}

document.addEventListener('click',(event)=>{
    const clickX = event.clientX - canvas.getBoundingClientRect().left;
    const clickY = event.clientY - canvas.getBoundingClientRect().top;
    if(gam.winner==""){
        // if ((clickX >= 0) && (clickX <= 100) && (clickY >= 0) && (clickY <= 100)){
        //     gam.place(0,0);
        // }else if ((clickX >= 110) && (clickX <= 210) && (clickY >= 0) && (clickY <= 100)){
        //     gam.place(1,0);
        // }else if ((clickX >= 220) && (clickX <= 320) && (clickY >= 0) && (clickY <= 100)){
        //     gam.place(2,0);
        // }else if ((clickX >= 0) && (clickX <= 100) && (clickY >= 110) && (clickY <= 210)){
        //     gam.place(0,1);
        // }else if ((clickX >= 110) && (clickX <= 210) && (clickY >= 110) && (clickY <= 210)){
        //     gam.place(1,1);
        // }else if ((clickX >= 220) && (clickX <= 320) && (clickY >= 110) && (clickY <= 210)){
        //     gam.place(2,1);
        // }else if ((clickX >= 0) && (clickX <= 100) && (clickY >= 220) && (clickY <= 320)){
        //     gam.place(0,2);
        // }else if ((clickX >= 110) && (clickX <= 210) && (clickY >= 220) && (clickY <= 320)){
        //     gam.place(1,2);
        // }else if ((clickX >= 220) && (clickX <= 320) && (clickY >= 220) && (clickY <= 320)){
        //     gam.place(2,2);
        // }
        if ((clickX >= 0) && (clickX <= 320) && (clickY >= 0) && (clickY <= 320)){
            // gam.turnNumber++;
        }
    }else if ((clickX >= 0) && (clickX <= 320) && (clickY >= 0) && (clickY <= 320)){
        gam.winner="";
        // gam.amtGames++;
        // gam.turnNumber=0;
    }
});

function gameLoop(currentTime) {
    const deltaTime = currentTime - lastTime;
    if (deltaTime >= gameSpeed) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        if(gam.winner==""){
            gam.gamePlayer();
            gam.detectWin();
            gam.drawXAndY();
            timer2++;
            if(timer2>=1){
                timer2=0;
                gam.turnNumber++;
            }
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
let timer2=0
gameLoop(0,0,1);