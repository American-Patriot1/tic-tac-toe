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
        this.board=[[0,0,0],[0,0,0],[0,0,0]];
        this.turn=1;
        this.turnNumber=0;
        this.amtGames=0;
        this.winner=0;
        this.xWins=0;
        this.oWins=0;
        this.ties=0;
        this.converter=[[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]];
        this.winPositions=[
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
        const locs=[0,1,2,3,4,5,6,7,8];
        // to account for simatry flip the board
        // 512 ways to fill a 3x3 grid with 2 variables
        // {turn1:0,turn2:0,turn3:0,turn4:0,turn5:0,turn6:0,turn7:0,turn8:0,turn9:0,1win:0,2win:0,draw:0,}
        this.result=[];
        let path=[];
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
        let tempResultsArray=[];
        let tempResultsObjects=[];
        let winLevel=-1;
        for(let one=0;one<=path.length-1;one++){
            for(let two=1;two<=path[one].length-1;two++){
                for(let three=1;three<=path[one][two].length-1;three++){
                    for(let four=1;four<=path[one][two][three].length-1;four++){
                        for(let five=1;five<=path[one][two][three][four].length-1;five++){
                            if(winLevel>=4){
                                winLevel=-1;
                            }
                            for(let six=1;six<=path[one][two][three][four][five].length-1;six++){
                                if((winLevel>=5)||(winLevel==-1)){
                                    winLevel=-1;
                                    for(let seven=1;seven<=path[one][two][three][four][five][six].length-1;seven++){
                                        if((winLevel>=6)||(winLevel==-1)){
                                            winLevel=-1;
                                            for(let eight=1;eight<=path[one][two][three][four][five][six][seven].length-1;eight++){
                                                if((winLevel>=7)||(winLevel==-1)){
                                                    winLevel=-1;
                                                    let moveSet=[path[one][0],path[one][two][0],path[one][two][three][0],path[one][two][three][four][0],path[one][two][three][four][five][0],
                                                        path[one][two][three][four][five][six][0],path[one][two][three][four][five][six][seven][0],
                                                        path[one][two][three][four][five][six][seven][eight][0],path[one][two][three][four][five][six][seven][eight][1]];
                                                    let wnr=0;
                                                    let tempObject={turns:[],onewin:0,twowin:0,tie:0,board:[0,0,0,0,0,0,0,0,0],winLevel:-1};
                                                    for(let move=0;wnr===0&&move<=moveSet.length-1;move++){
                                                        let player=0;
                                                        if(move%2===0){
                                                            player=1;
                                                        }else{
                                                            player=2;
                                                        }
                                                        tempObject.board[moveSet[move]]=player;
                                                        tempObject.turns.push(moveSet[move]);
                                                        this.addToList(move,moveSet,tempResultsArray,0);
                                                        if(move>=4){
                                                            for(let i=0;i<=this.winPositions.length-1;i++){
                                                                if(tempObject.board[this.winPositions[i][0]]==tempObject.board[this.winPositions[i][1]]&&
                                                                    tempObject.board[this.winPositions[i][1]]==tempObject.board[this.winPositions[i][2]]&&
                                                                    tempObject.board[this.winPositions[i][1]]!=0
                                                                ){
                                                                    if(tempObject.board[this.winPositions[i][1]]==1){
                                                                        wnr=1;
                                                                        tempObject.onewin++;
                                                                    }else if(tempObject.board[this.winPositions[i][1]]==2){
                                                                        wnr=2;
                                                                        tempObject.twowin++;
                                                                    }
                                                                    winLevel=move;
                                                                    tempObject.winLevel=move;
                                                                }
                                                            }
                                                        }
                                                        if(move===8&&wnr==0){
                                                            wnr=3
                                                            tempObject.tie++;
                                                        }
                                                    }
                                                    tempResultsObjects.push(tempObject);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        let ow = 0;
        let tw = 0;
        let tie = 0;
        let tempPathsCompleted=[];
        for(let i in tempResultsObjects){
            tempPathsCompleted.push(tempResultsObjects[i].turns);
            ow+=tempResultsObjects[i].onewin;
            tw+=tempResultsObjects[i].twowin;
            tie+=tempResultsObjects[i].tie;
        }
        console.log(tempPathsCompleted);
        console.log(tempResultsArray);
        console.log(tempResultsObjects);
        console.log(ow);
        console.log(tw);
        console.log(tie);
    }
    //moveNum starts with 0
    addToList(moveNum,moveOrder,list,index){
        let position=-1;
        let zeroFix=1;
        if(index==0){
            zeroFix=0;
        }
        if((index==0&&list.length===0)||(list.length-zeroFix===0&&zeroFix===1)){
            list.push([moveOrder[index]]);
        }else{
            for(let i=zeroFix;i<=list.length-1&&position==-1;i++){;
                if(list[i].indexOf(moveOrder[index])!=-1){
                    position=i;
                }
            }
            if(position==-1){
                list.push([moveOrder[index]]);
            }
        }
        if(moveNum!=index){
            this.addToList(moveNum,moveOrder,list[position],index+1);
        }
    }
    place(position1,position2){
        if(this.board[position2][position1]==0){
            this.board[position2][position1]=this.turn;
            ctx.lineWidth=10;
            if(this.turn==1){
                ctx.strokeStyle="#ff0000";
                ctx.beginPath();
                ctx.moveTo(10+position1*110,10+position2*110);
                ctx.lineTo(90+position1*110,90+position2*110);
                ctx.moveTo(10+position1*110,90+position2*110);
                ctx.lineTo(90+position1*110,10+position2*110);
                ctx.stroke();
                this.turn=2;
            }else if(this.turn==2){
                ctx.strokeStyle = "#2000ff";
                ctx.beginPath();
                ctx.arc(50+position1*110,50+position2*110, 40, 0, 2 * Math.PI);
                ctx.stroke();
                this.turn=1;
            }
            this.turnNumber++;
            this.detectWin();
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
                if(this.board[y][x]==1){
                    ctx.strokeStyle="#ff0000";
                    ctx.beginPath();
                    ctx.moveTo(10+x*110,10+y*110);
                    ctx.lineTo(90+x*110,90+y*110);
                    ctx.moveTo(10+x*110,90+y*110);
                    ctx.lineTo(90+x*110,10+y*110);
                    ctx.stroke();
                }else if(this.board[y][x]==2){
                    ctx.strokeStyle = "#2000ff";
                    ctx.beginPath();
                    ctx.arc(50+x*110,50+y*110, 40, 0, 2 * Math.PI);
                    ctx.stroke();
                }
            }
        }
    }
    detectWin(){
        if(this.turnNumber>=5){
            for(let i=0;i<=this.winPositions.length-1;i++){
                let space=this.board[this.converter[this.winPositions[i][1]][0]][this.converter[this.winPositions[i][1]][1]];
                if(space!==0&&this.board[this.converter[this.winPositions[i][0]][0]][this.converter[this.winPositions[i][0]][1]]===
                space&&space===this.board[this.converter[this.winPositions[i][2]][0]][this.converter[this.winPositions[i][2]][1]]){
                    this.winner=space;
                }
            }
        }
        if(this.turnNumber===9&&this.winner==0){
            this.winner=-1;
        }
        if(this.winner!=0){
            this.board=[[0,0,0],[0,0,0],[0,0,0]];
            if(this.winner==1){
                this.xWins++;
            }else if(this.winner==2){
                this.oWins++;
            }else if(this.winner==-1){
            this.ties++;
            }
            this.amtGames++;
            this.turnNumber=0;
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
        if(this.winner!=-1){
            ctx.fillStyle = "#000000";
            ctx.fillText("   WON!", 33, 70);
            if(this.winner==1){
                ctx.fillStyle="#ff0000";
                ctx.fillText("X", 25, 70);
            }else if(this.winner==2){
                ctx.fillStyle = "#2000ff";
                ctx.fillText("O", 21, 70);
            }
        }else if(this.winner==-1){
            ctx.fillStyle = "#000000";
            ctx.fillText("TIE!", 93, 70);
        }
        // this.winner=0;
    }
}

document.addEventListener('click',(event)=>{
    const clickX = event.clientX - canvas.getBoundingClientRect().left;
    const clickY = event.clientY - canvas.getBoundingClientRect().top;
    if(gam.winner==0){
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
    }else if ((clickX >= 0) && (clickX <= 320) && (clickY >= 0) && (clickY <= 320)){
        gam.winner=0;
    }
});

function gameLoop(currentTime) {
    const deltaTime = currentTime - lastTime;
    if (deltaTime >= gameSpeed) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        if(gam.winner==0){
            gam.drawXAndY();
            // gam.turnNumber++;
        }else{
            gam.congratulateWinner();
        }
        lastTime = currentTime;
    }


    requestAnimationFrame(gameLoop);
}
const gam = new Game();
let gameSpeed=1;
let lastTime=0;
gameLoop(0,0,1);