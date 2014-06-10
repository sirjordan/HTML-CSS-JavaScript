(function () {
    // Base constants
    var _width = 900,
        _height = 600,
        mario,
        timer,
        speedMiliseconds = 30,
        moves = 0,
        frameCount = 0,
        _separetedFrames = 5,   // The whole frames
        jumpTimer,
        jumpHeightPositionY = _height - 355;

    var position = {
        x: _width / 2 - 85,
        y: _height - 255
    };

    // SVG
    var svgPaper = Raphael(0, 0, _width, _height);
    svgPaper.image("bg.png", 0, 0, _width, _height);

    // Canvas
    // Load the kinetic stage and layer
    var stage = new Kinetic.Stage({
        container: 'canvas-container',
        width: _width,
        height: _height
    });
    var layer = new Kinetic.Layer();

    // Mario image load
    // Get the whole image, and crop it to get a part of it
    function getMarioFrame(frameNumber, x, y) {
        var marioImages = new Image();
        marioImages.src = 'marios.png';

        var mario = new Kinetic.Image({
            x: x,
            y: y,
            image: marioImages,
            width: 80,  // The width of a single mario frame
            height: 175,
            crop: {
                x: frameNumber * 100,
                y: 0,
                width: 88,
                height: 175
            }
        });

        // Return the cropped image to draw to the screen
        return mario;
    };

    function drawMario() {
        if (position.x <= 1 || position.x > _width - 90) {
            clearInterval(timer);
        }

        if (moves >= 15) {
            clearInterval(timer);
            moves = 0;
        }

        layer.removeChildren(mario);
        mario = getMarioFrame(frameCount, position.x, position.y);
        layer.add(mario);
        stage.add(layer);
        moves++;
        frameCount++;
        // If reach the last frame
        if (frameCount > _separetedFrames - 1) {
            frameCount = 0;
        }
    }

    function moveLeft() {
        position.x -= 10;
        drawMario();
    }

    function moveRight() {
        position.x += 10;
        drawMario();
    }

    function drawMarioJumping() {
        layer.removeChildren(mario);
        mario = getMarioFrame(frameCount, position.x, position.y);
        layer.add(mario);
        stage.add(layer);
        position.y -= 20;

        if (position.y <= jumpHeightPositionY) {
            clearInterval(jumpTimer);
            position.y = _height - 255;
            moveRight();
        }
    }

    function jump() {
        var defaultYPosition = position.y;
        jumpTimer = setInterval(drawMarioJumping, speedMiliseconds);
        position.y = defaultYPosition;
    }

    // Keyboard pressing
    addEventListener("keydown", function (keyPressed) {
        // left
        if (keyPressed.key === 'Left') {
            clearInterval(timer);
            timer = setInterval(moveLeft, speedMiliseconds);
        }
        // up
        if (keyPressed.key === 'Up') {
            clearInterval(timer);
            jump();
        }
        // right
        if (keyPressed.key === 'Right') {
            clearInterval(timer);
            timer = setInterval(moveRight, speedMiliseconds);
        }
    });

    // First load
    (function () {
        mario = getMarioFrame(0, position.x, position.y);
        layer.add(getMarioFrame(0, position.x, position.y));
        stage.add(layer);
    })();

})();
