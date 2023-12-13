

// Get a reference to the canvas and its context
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var dpi = window.devicePixelRatio;
canvas.width = getComputedStyle(canvas).getPropertyValue('width').slice(0, -2) * dpi;
canvas.height = getComputedStyle(canvas).getPropertyValue('height').slice(0, -2) * dpi;

// Regola la dimensione del canvas tramite CSS
canvas.style.width = getComputedStyle(canvas).getPropertyValue('width');
canvas.style.height = getComputedStyle(canvas).getPropertyValue('height');


var dotsR = [];
var dotsP = [];
var dotsS = [];

var directions = [2, -2];
var speed = 1.5;

var frameLength = 2;

const radius = 15;

//populating dotsR
for (let i = 0; i < 5; i++) {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    var xMove = directions[Math.floor(Math.random() * directions.length)];
    var yMove = directions[Math.floor(Math.random() * directions.length)];
    var dot = {//save the dot values
        type:'r',
        x: x,
        y: y,
        color: "#00272B",
        xMove: xMove,
        yMove: yMove,
    };
    dotsR.push(dot);    
}

//populating dotsP
for (let i = 0; i < 5; i++) {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    var xMove = directions[Math.floor(Math.random() * directions.length)];
    var yMove = directions[Math.floor(Math.random() * directions.length)];
    var dot = {//save the dot values
        type:'p',
        x: x,
        y: y,
        color: "#FF2ECC",
        xMove: xMove,
        yMove: yMove,
    };
    dotsP.push(dot);    
}
//populating dotsS
for (let i = 0; i < 5; i++) {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    var xMove = directions[Math.floor(Math.random() * directions.length)];
    var yMove = directions[Math.floor(Math.random() * directions.length)];
    var dot = {//save the dot values
        type:'s',
        x: x,
        y: y,
        color: "#E0FF4F",
        xMove: xMove,
        yMove: yMove,
    };
    dotsS.push(dot);
    
}
var allDots = [
    dotsP,
    dotsR,
    dotsS
]
//draw all dots
function drawDots() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < allDots.length; i++) {
        for (let j = 0; j < allDots[i].length; j++) {
            drawDot(allDots[i][j]);
        } 
    }
}



// Function to draw a point on the canvas
function drawDot(dot) {
    // Set transparency on the dots.
    context.globalAlpha = 0.9;
    context.beginPath();
    context.arc(dot.x, dot.y, radius, 0, 2 * Math.PI, false);//10 = radius
    context.fillStyle = dot.color;
    context.fill();
};

function moveDots() {

    for (let i = 0; i < allDots.length; i++) {
        for (let j = 0; j < allDots[i].length; j++) {
           var dot = allDots[i][j];
           
           //moving the dots
           dot.x += dot.xMove;
           dot.y += dot.yMove;
           
           //collision borders check
           if(dot.x < 0 ||dot.x + radius > canvas.width){
            dot.xMove *= -1
           }
           if(dot.y < 0 ||dot.y + radius >= canvas.height){
            dot.yMove *= -1
           }

           //collision dots check
           for (let k = 0; k < allDots.length; k++) {
                for (let l = 0; l < allDots[k].length; l++) {
                    var otherDot = allDots[k][l];
                    var distance = Math.sqrt(Math.pow(dot.x - otherDot.x, 2) + Math.pow(dot.y - otherDot.y, 2));//more information for the distance: https://it.wikipedia.org/wiki/Distanza_euclidea
                    if(distance <= radius * 2){
                        //swapping the directions
                        var tempX = dot.xMove;
                        var tempY = dot.yMove;
                        dot.xMove = otherDot.xMove;
                        dot.yMove = otherDot.yMove;
                        otherDot.xMove = tempX;
                        otherDot.yMove = tempY;
                        switch (dot.type) {
                            case 'r':
                                switch (otherDot.type) {
                                    case 's':
                                        //changing the type and the colors
                                        otherDot.color = dot.color;
                                        otherDot.type = dot.type;
                                    break;
                                    case 'p':
                                        dot.color = otherDot.color;
                                        dot.type = otherDot.type;
                                    break;
                                }
                                break;
                            case 'p':
                                switch (otherDot.type) {
                                    case 'r':
                                        //changing the type and the colors
                                        otherDot.color = dot.color;
                                        otherDot.type = dot.type;
                                    break;
                                    case 's':
                                        dot.color = otherDot.color;
                                        dot.type = otherDot.type;
                                    break;
                                }
                            break;
                            case 's':
                                switch (otherDot.type) {
                                    case 'p':
                                        //changing the type and the colors
                                        otherDot.color = dot.color;
                                        otherDot.type = dot.type;
                                    break;
                                    case 'r':
                                        dot.color = otherDot.color;
                                        dot.type = otherDot.type;
                                    break;
                                }
                            break;
                        }
                    }
                }
            }
        }
    }
}
//animation loop 
function animate() {
    moveDots()
    drawDots()
    requestAnimationFrame(animate)
}

animate()

