let currDigTile, currDUGTile, currVolTile; 
let score = 0;
let gameover = false;
let gameIntervals = [];
let isPaused = false;

window.onload = function() {
    initializeGame();
    document.getElementById("startButton").addEventListener("click", startGame);
    document.getElementById("pauseButton").addEventListener("click", pauseGame);
    document.getElementById("stopButton").addEventListener("click", stopGame);
};

function startGame() {
    if (gameover || isPaused) {
        resetGame();
    }
    gameover = false;
    isPaused = false;
    score = 0;
    document.getElementById("score").innerText = score;

    gameIntervals.push(setInterval(setDig, 1500));
    gameIntervals.push(setInterval(setDUG, 2000));
    gameIntervals.push(setInterval(setVol, 1000));
}

function pauseGame() {
    if (!gameover) {
        clearGameIntervals();
        isPaused = true;
    }
}

function stopGame() {
    clearGameIntervals();
    gameover = true;
    isPaused = false;
    document.getElementById("score").innerText = "Game Over: " + score;
    clearTiles();
}

function resetGame() {
    clearTiles();
    score = 0;
    document.getElementById("score").innerText = score;
    clearGameIntervals();
}

function initializeGame() {
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
}

function clearGameIntervals() {
    gameIntervals.forEach(interval => clearInterval(interval));
    gameIntervals = [];
}

function getRandomTile() {
    return Math.floor(Math.random() * 9).toString();
}

function setDig() {
    if (gameover) return;
    if (currDigTile) currDigTile.innerHTML = "";
    let Dig = createImage("./diglett.png");
    let num = getRandomTile();
    if (currDUGTile && currDUGTile.id === num) return;
    currDigTile = document.getElementById(num);
    currDigTile.appendChild(Dig);
}

function setDUG() {
    if (gameover) return;
    if (currDUGTile) currDUGTile.innerHTML = "";
    let DUG = createImage("./dugtrio.png");
    let num = getRandomTile();
    if (currDigTile && currDigTile.id === num) return;
    currDUGTile = document.getElementById(num);
    currDUGTile.appendChild(DUG);
}

function setVol() {
    if (gameover) return;
    if (currVolTile) currVolTile.innerHTML = "";
    let Vol = createImage("./voltorb.png");
    let num = getRandomTile();
    currVolTile = document.getElementById(num);
    currVolTile.appendChild(Vol);
}

function createImage(src) {
    let img = document.createElement("img");
    img.src = src;
    return img;
}

function selectTile() {
    if (gameover) return;
    if (this === currDUGTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString();
    }
    if (this === currDigTile) {
         score += 10;
        document.getElementById("score").innerText = score.toString();
    } 
    else if (this === currVolTile) {
        document.getElementById("score").innerText = "GAME OVER: " + score;
        gameover = true;
        clearGameIntervals();
    }
}

function clearTiles() {
    currDigTile && (currDigTile.innerHTML = "");
    currDUGTile && (currDUGTile.innerHTML = "");
    currVolTile && (currVolTile.innerHTML = "");
    currDigTile = currDUGTile = currVolTile = null;
}
