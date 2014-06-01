(function () {
    var canvas = document.getElementById('the-canvas');
    var ctx = canvas.getContext('2d');
    
    var snakeLenght = 20,
        snakeElementRadius = 5,
        movement = 2,
        headPositionX = ctx.canvas.width / 2,
        headPosiitonY = ctx.canvas.height / 2,
        headLastPositionX = 0,
        headLastPositionY = 0,
        xUpdate = movement,
        yUpdate = 0,
        snake = new Array(),
        foodX,
        foodY,
        scorePoints = 0,
        accseleratorCounter = 0,
        pointsForRechLevel = 20;

    ctx.fillStyle = 'blue';
    ctx.strokeStyle = 'green';

    function buildSnakeElement(xPos, yPos) {
        return {
            xPos: xPos,
            yPos: yPos
        }
    }

    // Initialize snake game
    (function () {
        snake.push(buildSnakeElement(headPositionX, headPosiitonY));

        for (var i = 1; i < snakeLenght; i++) {
            snake.push(buildSnakeElement(headPositionX - i, headPosiitonY));
        }

        headLastPositionX = headPositionX - 1;
        headLastPositionY = headPosiitonY;
        
        generateRandomPlacedFood(ctx.canvas.width, ctx.canvas.height);
    })();

    function drawSnake() {
        
        ctx.beginPath();
        
        headPositionX += xUpdate;
        headPosiitonY += yUpdate;

        // Collecting food
        if ((headPositionX > foodX - (snakeElementRadius + 5)) && (headPositionX < foodX + (snakeElementRadius + 5)) &&
                (headPosiitonY > foodY - (snakeElementRadius + 5)) && (headPosiitonY < foodY + (snakeElementRadius + 5))) {

            collectFood();
        }

        // Move tru the walls if reach the end of the game field
        if (headPositionX > ctx.canvas.width) {
            headPositionX = 0;
        }
        if (headPositionX < 0) {
            headPositionX = ctx.canvas.width;
        }
        if (headPosiitonY > ctx.canvas.height) {
            headPosiitonY = 0;
        }
        if (headPosiitonY < 0) {
            headPosiitonY = ctx.canvas.height;
        }

        // Draw the SNAKE
        for (var i = 0; i < snake.length; i++) {
            drawObject(ctx, snake[i].xPos, snake[i].yPos, snakeElementRadius, 'blue');
        }

        // Aggrange the snake parts
        headLastPositionX = snake[0].xPos;
        headLastPositionY = snake[0].yPos;

        snake[0].xPos = headPositionX;
        snake[0].yPos = headPosiitonY;

        for (var i = 1; i < snake.length; i++) {
            var dX = headLastPositionX;
            var dY = headLastPositionY;

            headLastPositionX = snake[i].xPos;
            headLastPositionY = snake[i].yPos;

            snake[i].xPos = dX;
            snake[i].yPos = dY;
        }

        
    }

    function collectFood() {
        for (var i = 0; i < 5; i++) {
            snake.push(buildSnakeElement(headPositionX, headPosiitonY));
        }
        scorePoints += 50;
        generateRandomPlacedFood(ctx.canvas.width, ctx.canvas.height);
        accseleratorCounter++;
       
        // Make the snake more fast
        if (accseleratorCounter >= pointsForRechLevel) {
            movement++;
            pointsForRechLevel += 10;
            accseleratorCounter = 0;
        }
    }

    // Draw cirlce object
    function drawObject(ctx, x, y, radius, fillColor) {
        ctx.beginPath();
        ctx.fillStyle = fillColor;
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }

    function animationFrame() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        drawScores();
        drawFood();
        drawSnake();
        requestAnimationFrame(animationFrame);
    }

    function generateRandomPlacedFood(maxX, maxY) {
        foodX = Math.floor((Math.random() * maxX) + 1);
        foodY = Math.floor((Math.random() * maxY) + 1);
    }

    function drawFood() {
        drawObject(ctx, foodX, foodY, snakeElementRadius * 2, 'red');
    }

    function drawScores() {
        ctx.font = "20px Georgia";
        ctx.fillStyle = 'green';
        ctx.fillText('Score: ' + scorePoints, 0, 20);
    }

    // KeyBoard Event Listener
    addEventListener("keydown", function (keyPressed) {
        // left
        if (keyPressed.key === 'Left') {
            xUpdate = -movement;
            yUpdate = 0;
        }
        // up
        if (keyPressed.key === 'Up') {
            yUpdate = -movement;
            xUpdate = 0;
        }
        // right
        if (keyPressed.key === 'Right') {
            xUpdate = movement;
            yUpdate = 0;
        }
        // down
        if (keyPressed.key === 'Down') {
            yUpdate = movement;
            xUpdate = 0;
        }
    });

    requestAnimationFrame(animationFrame);

})();
