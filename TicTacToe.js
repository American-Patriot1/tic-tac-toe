const canvas = document.getElementById('tictactoeCanvas');
const ctx = canvas.getContext('2d');

// Define canvas dimensions
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const squareSize = 20;
const numRows = canvasHeight / squareSize;
const numCols = canvasWidth / squareSize;

function drawBoard() {
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const color = (row + col) % 2 === 0 ? 'DarkGrey' : 'Grey';
            ctx.fillStyle = color;
            ctx.fillRect(col * squareSize, row * squareSize, squareSize, squareSize);
        }
    }
    ctx.fillStyle = "black";
    ctx.fillRect(100,0,10,320);
    ctx.fillRect(210,0,10,320);
    ctx.fillRect(0,100,320,10);
    ctx.fillRect(0,210,320,10);
}




function gameLoop(currentTime) {
    const deltaTime = currentTime - lastTime;


    if (deltaTime >= gameSpeed) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        drawBoard();

        // aple.relocate();
        lastTime = currentTime;
    }


    requestAnimationFrame(gameLoop);
}

let gameSpeed=200;
let lastTime=0;
drawBoard();
gameLoop(0,0,1);