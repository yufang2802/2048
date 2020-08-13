let paper = new Raphael(document.getElementById("mySVGCanvas"));
// Find get paper dimensions
let dimX = paper.width;
let dimY = paper.height;

const mySVGCanvas = document.getElementById('mySVGCanvas');
let upButton = document.getElementById("upButton");
let downButton = document.getElementById("downButton");
let leftButton = document.getElementById("leftButton");
let rightButton = document.getElementById("rightButton");
let scoreboard = document.getElementById("scoreboard");

let startButton = paper.circle(paper.width/2, paper.height/2, 80);
let startText = paper.text(paper.width/2, paper.height/2, 'START');

let goal;
let startTime;

startButton.attr({
    "stroke": "black",
    "fill": "#7EC4CF",
})

startText.attr({
    "font-size": 32,
})

let hideStartButton = function(){
    startButton.hide();
    startText.hide();
}

let showStartButton = function(){
    startButton.show();
    startText.show();
}

let hideGameboard = function(){
    gameBoard.hide();
}

let hideSquares = function(){
    squares.hide();
}

let changeButtonColor1 = function(){
    startButton.animate({
        "fill": "#729B79",
    }, 500, changeButtonColor2);
}

let changeButtonColor2 = function(){
    startButton.animate({
        "fill": "#7EC4CF",
    }, 500, changeButtonColor1);
}

setInterval(changeButtonColor1, 500);

scoreboard.innerHTML = "Score: " + 0;

let updateScore = function(grid) {
    let max = 0;
    for (let row = 0; row < grid.length; row++) { 
        for (let col = 0; col < grid[0].length; col++) {
            if (grid[row][col] > max) {
                max = grid[row][col];
            }
        }
    }
    return max;
}

let grid = [[0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]];

// this is the function to make a 2 appear in the grid
let addNumber = function(){
    while(true) {
        let randRow = Math.floor(Math.random() * 4); // Math.random() gives a random number from [0,1), we need to multiply it by 4 to get random numbers from [0,3.99), then round down to [0,3) using Math.floor().
        let randCol = Math.floor(Math.random() * 4);
        if (grid[randRow][randCol] === 0) { 
            grid[randRow][randCol] = 2;
            break;
        }
    }
}

// call the function twice to get two '2's to appear at the start
addNumber();
addNumber();

// console.table(grid);

let drawGrid = function() {
    var gameBoard = paper.rect(0,0,400,400,5);

    gameBoard.attr({
        "stroke": "grey",
        "stroke-width": 4,
        "fill": "#F9D4BB",
    });


    for (let row = 0; row < grid.length; row++) { //using a loop to draw squares in the grid
        for (let col = 0; col < grid.length; col++) {
            let squareWidth = 100;
            var squares = paper.rect(row*squareWidth, col*squareWidth, squareWidth, squareWidth); 
            squares.attr({
                "stroke": "grey",
                "stroke-width": 4,
            })
            let value = grid[col][row];
                if (value !== 0) {
                    var number = paper.text(row*squareWidth + squareWidth/2, col*squareWidth + squareWidth/2, value);
                    number.attr({
                        "fill": "black",
                        "font-size": 32,
                    })
                }
                if (grid[col][row] == 2) {
                    squares.attr({
                        "stroke": "grey",
                        "stroke-width": 4,
                        "fill": "#FDF8EF",
                    })
                }
                if (grid[col][row] == 4) {
                    squares.attr({
                        "stroke": "grey",
                        "stroke-width": 4,
                        "fill": "#FAE9CF",
                    })
                }
                if (grid[col][row] == 8) {
                    squares.attr({
                        "stroke": "grey",
                        "stroke-width": 4,
                        "fill": "#F6DAAB",
                    })
                }
                if (grid[col][row] == 16) {
                    squares.attr({
                        "stroke": "grey",
                        "stroke-width": 4,
                        "fill": "#C99F73",
                    })
                }
                if (grid[col][row] == 32) {
                    squares.attr({
                        "stroke": "grey",
                        "stroke-width": 4,
                        "fill": "#96C39B",
                    })
                }
                if (grid[col][row] == 64) {
                    squares.attr({
                        "stroke": "grey",
                        "stroke-width": 4,
                        "fill": "#68956D",
                    })
                }
                if (grid[col][row] == 128) {
                    squares.attr({
                        "stroke": "grey",
                        "stroke-width": 4,
                        "fill": "#39523C",
                    })
                }
                if (grid[col][row] == 256) {
                    squares.attr({
                        "stroke": "grey",
                        "stroke-width": 4,
                        "fill": "#648578",
                    })
                }
                if (grid[col][row] == 512) {
                    squares.attr({
                        "stroke": "grey",
                        "stroke-width": 4,
                        "fill": "#426A5A",
                    })
                }
                if (grid[col][row] == 1024) {
                    squares.attr({
                        "stroke": "grey",
                        "stroke-width": 4,
                        "fill": "#F4A3A1",
                    })
                }
                if (grid[col][row] == 2048) {
                    squares.attr({
                        "stroke": "grey",
                        "stroke-width": 4,
                        "fill": "#DA6563",
                    })
                }
            }
        }
    }

let start = function(ev){
    console.log("starting game");
    hideStartButton();
    drawGrid();
}

//start function has already been defined, so can call it immediately
startButton.node.addEventListener("click", start);

let end = function(passedGrid){
    for (let row = 0; row < passedGrid.length; row++) {
        for (let col = 0; col < passedGrid.length; col++) {
            if (passedGrid[col][row] === 2048) {
                console.log("game has ended");
                confirm("You've achieved 2048!") 
                return;
            }

            if (passedGrid[row][col] === 0) {
                return;
            }
        }
    }
    confirm("Oh no, game over! Refresh the page to try again!");

    grid = [[0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]];

    hideStartButton();
    drawGrid();
    addNumber();
    addNumber(); 
    scoreboard.innerHTML = "Score: " + 0;
}

upButton.addEventListener("click", function(ev){
    // for when the arrow pressed is 'up'
    let tempGrid = grid.toString(); // assigning tempGrid to the grid before the changes are made

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            if (grid[row][col] !== 0) {
                if (row !== 0) {
                    for (let upRow = row - 1; upRow >= 0; upRow--) {
                        if (grid[upRow][col] == 0) {
                            let temp = grid[upRow+1][col];
                            grid[upRow+1][col] = grid[upRow][col];
                            grid[upRow][col] = temp;

                        } else if (grid[upRow][col] == grid[upRow + 1][col]) { //check if the numbers are the same
                            grid[upRow][col] = grid[upRow][col] * 2; //combine if they are the same
                            grid[upRow+1][col] = 0; //change current square's number to 0
                            
                        break; // the moment we combine 2 numbers into one, we want to break the loop instead of letting the numbers continue combining.
                        } else {
                        break; // as long as we hit a different number, we want to leave the loop.
                        }
                    }
                }
            } 
        }
    }
    
    scoreboard.innerHTML = "Score: " + updateScore(grid);
    
    let changedGrid = grid.toString(); // assigning changedGrid to the grid after the changes are made

    console.log(tempGrid === changedGrid);

    if (tempGrid !== changedGrid) { // to ensure that new numbers will only be generated when there are possible moves in that direction
        while(true) {
            let randRow = Math.floor(Math.random() * 4); // to generate a number between 0 and 3
            let randCol = Math.floor(Math.random() * 4);
            let randValue = Math.floor(Math.random() * 2); // to generate a number between 0 and 1
            //console.log(randValue);

            if (grid[randRow][randCol] == 0) {
                if (randValue == 0) {
                    grid[randRow][randCol] = 2; // if randValue is 0, generate 2
                } else {
                    grid[randRow][randCol] = 4; // if randValue is 1, generate 4
                }
                break;
            }
        }
    }

    //addNumber(2);
    
    console.table(grid);
    drawGrid();
    end(grid);
})


downButton.addEventListener("click", function(ev){
    // for when the arrow pressed is 'down'

    let tempGrid = grid.toString();

    for (let row = grid.length - 1; row >= 0; row--) {
        for (let col = 0; col < grid[0].length; col++) {
            if (grid[row][col] != 0) {
                if (row != grid.length - 1) {
                    for (let downRow = row + 1; downRow < grid.length; downRow++) {
                        if (grid[downRow][col] == 0) {
                            let temp = grid[downRow-1][col];
                            grid[downRow-1][col] = grid[downRow][col];
                            grid[downRow][col] = temp;

                        } else if (grid[downRow][col] == grid[downRow - 1][col])  {
                            grid[downRow][col] = grid[downRow][col] * 2;
                            grid[downRow-1][col] = 0;
                            scoreboard.innerHTML = "Score: " + grid[downRow][col] * 2;

                            break;
                        } else {
                            break;
                        }
                    }
                }
            } 
        }
    }
    scoreboard.innerHTML = "Score: " + updateScore(grid);

//addNumber(2);
    let changedGrid = grid.toString();

    if (tempGrid !== changedGrid) {
        while(true) {
            let randRow = Math.floor(Math.random() * 4);
            let randCol = Math.floor(Math.random() * 4);
            let randValue = Math.floor(Math.random() * 2); // why??????????
            //console.log(randValue);

            if (grid[randRow][randCol] == 0) {
                if (randValue == 0) {
                    grid[randRow][randCol] = 2;
                } else {
                    grid[randRow][randCol] = 4;
                }
                break;
            }
        }
    }
    console.table(grid);
    drawGrid();
    end(grid);
})

leftButton.addEventListener("click", function(ev){
    // for when the arrow pressed is 'left'

    let tempGrid = grid.toString();

    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[0].length; row++) {
            if (grid[row][col] != 0) {
                if (col != 0) {
                    for (let leftCol = col - 1; leftCol >= 0; leftCol--) {
                        if (grid[row][leftCol] == 0) {
                            let temp = grid[row][leftCol + 1];
                            grid[row][leftCol + 1] = grid[row][leftCol];
                            grid[row][leftCol] = temp;

                        } else if (grid[row][leftCol] == grid[row][leftCol + 1])  {
                            grid[row][leftCol] = grid[row][leftCol] * 2;
                            grid[row][leftCol + 1] = 0;
                            scoreboard.innerHTML = "Score: " + grid[row][leftCol] * 2;
                            
                            break;
                        } else {
                            break;
                        }
                    }
                }
            } 
        }
    }
    scoreboard.innerHTML = "Score: " + updateScore(grid);

//addNumber(2);
    let changedGrid = grid.toString();

    if (tempGrid !== changedGrid) {
        while(true) {
            let randRow = Math.floor(Math.random() * 4);
            let randCol = Math.floor(Math.random() * 4);
            let randValue = Math.floor(Math.random() * 2); // why??????????
            //console.log(randValue);

            if (grid[randRow][randCol] == 0) {
                if (randValue == 0) {
                    grid[randRow][randCol] = 2;
                } else {
                    grid[randRow][randCol] = 4;
                }
                break;
            }
        }
    }
    console.table(grid);
    drawGrid();
    end(grid);
})

rightButton.addEventListener("click", function(ev){
    // press the right button

    let tempGrid = grid.toString();

    for (let col = grid.length - 1; col >= 0; col--) {
        for (let row = 0; row < grid[0].length; row++) {

            if (grid[row][col] != 0) {
                if (col != grid.length - 1) {
                    for (let rightCol = col + 1; rightCol < grid.length; rightCol++) {
                        if (grid[row][rightCol] == 0) {
                            let temp = grid[row][rightCol - 1];
                            grid[row][rightCol - 1] = grid[row][rightCol];
                            grid[row][rightCol] = temp;

                        } else if (grid[row][rightCol] == grid[row][rightCol - 1])  {
                            grid[row][rightCol] = grid[row][rightCol] * 2;
                            grid[row][rightCol - 1] = 0;
                            scoreboard.innerHTML = "Score: " + grid[row][rightCol] * 2;

                            break;
                        } else {
                            break;
                        }
                    }
                }
            } 
        }
    }
    scoreboard.innerHTML = "Score: " + updateScore(grid);

//addNumber(2);
    let changedGrid = grid.toString();

    if (tempGrid !== changedGrid) {
        while(true) {
            let randRow = Math.floor(Math.random() * 4);
            let randCol = Math.floor(Math.random() * 4);
            let randValue = Math.floor(Math.random() * 2); 
            //console.log(randValue);

            if (grid[randRow][randCol] == 0) {
                if (randValue == 0) {
                    grid[randRow][randCol] = 2;
                } else {
                    grid[randRow][randCol] = 4;
                }
                break;
            }
        }
    }
    console.table(grid);
    drawGrid();
    end(grid);
})


// let endGame = function(ev){
//     value++;
//     if (value >= 2) { 
//         end();
//     }
// }

// endGame();

/*
let arrayHtml = ''

for (const row of grid) {
    arrayHtml += '<p>'
    for (const cell of row) {
        arrayHtml += '<span>' + cell + '</span>'
    }
    arrayHtml += '</p>'
}
mySVGCanvas.innerHTML = arrayHtml;
*/

// let foo = function(grid) {
//     while(true) {
//         let randRow = Math.floor(Math.random() * 4);
//         let randCol = Math.floor(Math.random() * 4);
//         if (grid[randRow][randCol] == 0) {
//             grid[randRow][randCol] = 2;
//             break;
//         }
//     }
// }
















