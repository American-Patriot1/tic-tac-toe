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
        this.turnNumber=0;
        this.amtGames=0;
        this.winner="";
        this.xWins=0;
        this.oWins=0;
        this.ties=0;
        this.converter=[[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]
        this.outcomes=[];
        this.path=[];
        this.numbers=[1,2,3,4,5,6,7,8,9];
        // console.log(this.numbers);
        this.plays=[[1],[2],[3],[4],[5],[6],[7],[8],[9]];
        for(let one=0;one<=this.plays.length-1;one++){
            let numsOne=this.createList(this.numbers,this.plays[one][0]);
            this.plays=this.addToList(this.plays,numsOne,1,[one]);
            for(let two=1;two<=this.plays[one].length-1;two++){
                let numsTwo=this.createList(numsOne,this.plays[one,two][0]);
                this.plays=this.addToList(this.plays,numsTwo,2,[one,two]);
                for(let three=1;three<=this.plays[one,two].length-1;three++){
                    let numsThree=this.createList(numsTwo,this.plays[one,two,three][0]);
                    console.log(numsThree);
                    this.plays=this.addToList(this.plays,numsThree,3,[one,two,three]);
                    for(let four=1;four<=this.plays[one,two,three].length-1;four++){
                        let numsFour=this.createList(numsThree,this.plays[one,two,three,four][0]);
                        this.plays=this.addToList(this.plays,numsFour,4,[one,two,three,four]);
                        for(let five=1;five<=this.plays[one,two,three,four].length-1;five++){
                            let numsFive=this.createList(numsFour,this.plays[one,two,three,four,five][0]);
                            this.plays=this.addToList(this.plays,numsFive,5,[one,two,three,four,five]);
                            for(let six=1;six<=this.plays[one,two,three,four,five].length-1;six++){
                                let numsSix=this.createList(numsFive,this.plays[one,two,three,four,five,six][0]);
                                this.plays=this.addToList(this.plays,numsSix,6,[one,two,three,four,five,six]);
                                for(let seven=1;seven<=this.plays[one,two,three,four,five,six].length-1;seven++){
                                    let numsSeven=this.createList(numsSix,this.plays[one,two,three,four,five,six,seven][0]);
                                    this.plays=this.addToList(this.plays,numsSeven,7,[one,two,three,four,five,six,seven]);
                                    for(let eight=1;eight<=this.plays[one,two,three,four,five,six,seven].length-1;eight++){
                                        let numsEight=this.createList(numsSeven,this.plays[one,two,three,four,five,six,seven,eight][0]);
                                        this.plays=this.addToList(this.plays,numsEight,8,[one,two,three,four,five,six,seven,eight]);
        }}}}}}}}
        for(let one=0;one<=this.plays.length-1;one++){
            for(let two=1;two<=this.plays[one].length-1;two++){
                for(let three=1;three<=this.plays[one,two].length-1;three++){
                    for(let four=1;four<=this.plays[one,two,three].length-1;four++){
                        for(let five=1;five<=this.plays[one,two,three,four].length-1;five++){
                            for(let six=1;six<=this.plays[one,two,three,four,five].length-1;six++){
                                for(let seven=1;seven<=this.plays[one,two,three,four,five,six].length-1;seven++){
                                    for(let eight=1;eight<=this.plays[one,two,three,four,five,six,seven].length-1;eight++){
                                        this.path.push([this.plays[one][0],this.plays[one][two][0],this.plays[one][two][three][0],this.plays[one][two][three][four][0],
                                        this.plays[one][two][three][four][five][0],this.plays[one][two][three][four][five][six][0],
                                        this.plays[one][two][three][four][five][six][seven][0],this.plays[one][two][three][four][five][six][seven][eight][0],
                                        this.plays[one][two][three][four][five][six][seven][eight][1][0]]);
        }}}}}}}}
    }
    addToList(addList,numbersAdded,level,levels){
        let listAddedTo=addList;
        // console.log(numbersAdded);
        if(level==1){
            for(let i=0;i<=numbersAdded.length-1;i++){
                listAddedTo[levels[0]].push([numbersAdded[i]]);
        }}else if(level==2){
            for(let i=0;i<=numbersAdded.length-1;i++){
                listAddedTo[levels[0]][levels[1]].push([numbersAdded[i]]);
        }}else if(level==3){
            for(let i=0;i<=numbersAdded.length-1;i++){
                listAddedTo[levels[0]][levels[1]][levels[2]].push([numbersAdded[i]]);
        }}else if(level==4){
            for(let i=0;i<=numbersAdded.length-1;i++){
                listAddedTo[levels[0]][levels[1]][levels[2]][levels[3]].push([numbersAdded[i]]);
        }}else if(level==5){
            for(let i=0;i<=numbersAdded.length-1;i++){
                listAddedTo[levels[0]][levels[1]][levels[2]][levels[3]][levels[4]].push([numbersAdded[i]]);
        }}else if(level==6){
            for(let i=0;i<=numbersAdded.length-1;i++){
                listAddedTo[levels[0]][levels[1]][levels[2]][levels[3]][levels[4]][levels[5]].push([numbersAdded[i]]);
        }}else if(level==7){
            for(let i=0;i<=numbersAdded.length-1;i++){
                listAddedTo[levels[0]][levels[1]][levels[2]][levels[3]][levels[4]][levels[5]][levels[6]].push([numbersAdded[i]]);
        }}else if(level==8){
            for(let i=0;i<=numbersAdded.length-1;i++){
                // console.log(numbersAdded);
                // console.log(i);
                // console.log(levels);
                // console.log(listAddedTo);
                // console.log(listAddedTo[levels[0]][levels[1]][levels[2]][levels[3]][levels[4]][levels[5]][levels[6]]);
                listAddedTo[levels[0]][levels[1]][levels[2]][levels[3]][levels[4]][levels[5]][levels[6]][levels[7]].push([numbersAdded[i]]);
        }}
        return listAddedTo;
    }
    createList(originalList,removedNumber){
        let list=[];
        for(let i=0;i<=originalList.length-1;i++){
            if(removedNumber!=originalList[i]){
                list.push(originalList[i]);
            }
        }
        // console.log(list);
        return list;
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
            gam.gamePlayer();
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