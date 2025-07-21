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
        // const locs=[[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]
        const locs=[1,2,3,4,5,6,7,8,9]
        this.outcomes=[];
        this.path=[];
        let temp=0;
        for(let one=0;one<=locs.length-1;one++){
            this.path.push([locs[one]]);
            const locOne = Array.from(locs);
            locOne.splice(locOne.indexOf(this.path[one][0]),1);
            for(let two=1;two<=locOne.length-1;two++){
                this.path[one].push([locOne[two]]);
                const locTwo = Array.from(locOne);
                locTwo.splice(locTwo.indexOf(this.path[one][two][0],1))
                for(let three=1;three<=locTwo.length-1;three++){
                    this.path[one][two].push([locTwo[three]]);
                    const locThree = Array.from(locTwo);
                    locThree.splice(locThree.indexOf(this.path[one][two][three][0],1))
                    for(let four=1;four<=locThree.length-1;four++){
                        this.path[one][two][three].push([locThree[four]]);
                        const locFour = Array.from(locThree);
                        locFour.splice(locFour.indexOf(this.path[one][two][three][four][0],1))
                        for(let five=1;five<=locFour.length-1;five++){
                            this.path[one][two][three][four].push([locFour[five]]);
                            const locFive = Array.from(locFour);
                            locFive.splice(locFive.indexOf(this.path[one][two][three][four][five][0],1))
                            for(let six=1;six<=locFive.length-1;six++){
                                this.path[one][two][three][four][five].push([locFive[six]]);
                                const locSix = Array.from(locFive);
                                locSix.splice(locSix.indexOf(this.path[one][two][three][four][five][six][0],1))
                                for(let seven=1;seven<=locSix.length-1;seven++){
                                    this.path[one][two][three][four][five][six].push([locSix[seven]]);
                                    const locSeven = Array.from(locSix);
                                    locSeven.splice(locSeven.indexOf(this.path[one][two][three][four][five][six][seven][0],1))
                                    this.path[one][two][three][four][five][six][seven].push([locSeven[0],locSeven[1]]);
                                    this.path[one][two][three][four][five][six][seven].push([locSeven[1],locSeven[0]]);
                                    if(temp==0){
                                        temp=1;
                                        console.log(this.path);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        console.log(this.path);
    }
    logList(list1){
        for(let i=0;i<=list1.length-1;i++){
            console.log(list1[i]);
        }
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
        // console.log((this.path[this.amtGames][this.turnNumber])-1);
        this.place(this.converter[(this.path[this.amtGames][this.turnNumber])-1][0],this.converter[(this.path[this.amtGames][this.turnNumber])-1][1])
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
            gam.turnNumber++;
        }
    }else if ((clickX >= 0) && (clickX <= 320) && (clickY >= 0) && (clickY <= 320)){
        gam.winner="";
        gam.amtGames++;
        gam.turnNumber=0;
    }
});

function gameLoop(currentTime) {
    const deltaTime = currentTime - lastTime;


    if (deltaTime >= gameSpeed) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        
        if(gam.winner==""){
            // console.log(gam.amtGames);
            // console.log(gam.turnNumber);
            // gam.gamePlayer();
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