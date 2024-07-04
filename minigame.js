document.getElementById('backButton').addEventListener('click', function() {
    window.location.href = 'index.html';
});

document.getElementById('restartButton').addEventListener('click', function() {
    document.location.reload();
});

document.getElementById('gameOverBackButton').addEventListener('click', function() {
    window.location.href = 'index.html';
});

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

let paddleHeight = 20;
let paddleWidth = 100;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight - 20; // Elevate the paddle a little bit

let ballRadius = 20; // Hitbox radius
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballDX = 2;
let ballDY = -2;

let score = 0;
let gameRunning = true;

// Load the images
const ballImg = new Image();
ballImg.src = 'meme-captain-america.png'; // Adjust the path if needed

const paddleImg = new Image();
paddleImg.src = 'trampoline.png'; // Add your trampoline image here

// Make the paddle follow the mouse
canvas.addEventListener('mousemove', function(e) {
    if (gameRunning) {
        const relativeX = e.clientX - canvas.getBoundingClientRect().left;
        if (relativeX - paddleWidth / 2 >= 0 && relativeX + paddleWidth / 2 <= canvas.width) {
            paddleX = relativeX - paddleWidth / 2;
        }
    }
});

function drawPaddle() {
    if (paddleImg.complete) {
        ctx.drawImage(paddleImg, paddleX, paddleY, paddleWidth, paddleHeight);
    }
}

function drawBall() {
    const ballSize = 60; // Display size
    if (ballImg.complete) {
        ctx.drawImage(ballImg, ballX - ballSize / 2, ballY - ballSize / 2, ballSize, ballSize);
    } else {
        ctx.beginPath();
        ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}

function drawScore() {
    document.getElementById('score').innerText = "Score: " + score;
}

function update() {
    if (!gameRunning) return;

    ballX += ballDX;
    ballY += ballDY;

    if (ballY + ballDY > canvas.height - ballRadius || ballY + ballDY < ballRadius) {
        ballDY = -ballDY;
    }

    if (ballX + ballDX < ballRadius || (ballX + ballDX > canvas.width - ballRadius)) {
        ballDX = -ballDX;
    }

    if (ballY + ballDY > canvas.height - ballRadius - paddleHeight) {
        if (ballX > paddleX && ballX < paddleX + paddleWidth) {
            ballDY = -ballDY;
            score++;
        } else {
            gameOver();
        }
    }
}

function draw() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBall();
    drawScore();
    update();

    requestAnimationFrame(draw);
}

function gameOver() {
    gameRunning = false;
    const gameOverContainer = document.getElementById('gameOver');
    const gameOverVideo = document.getElementById('gameOverVideo');
    const finalScore = document.getElementById('finalScore');
    
    finalScore.innerText = "Final Score: " + score;
    gameOverContainer.style.display = 'flex';
    gameOverVideo.play();
    backButton.style.display = 'none';
}

ballImg.onload = function() {
    paddleImg.onload = function() {
        draw();
    };
};
