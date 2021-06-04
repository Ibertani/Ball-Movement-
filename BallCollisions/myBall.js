//arrays that the ball attributes get pushed into when they are created
const xC = [];
const yC = [];
const velocity_xC = [];
const velocity_yC = [];
const xS = [];
const yS = [];
const velocity_xS = [];
const velocity_yS = [];
const ballsStick = [];
const ballsCollide = [];

//this function creates a ball within the red area on the right side of the screen
function createCollide(color, i) {
  // actually creates ball then stores in variable ball
  var ball = document.createElement("svg");
  // lets javascript access and use the red area made in the html code areas then stores in variable area
  var area = document.getElementById("areaCollide");
  // sets ball attributes when it is created
  ball.style.backgroundColor = color;
  ball.style.width = 50;
  ball.style.height = 50;
  ball.style.setProperty("top", Math.random() * 350);
  ball.style.setProperty("left", Math.random() * 350);
  ball.style.setProperty("position", "absolute");
  ball.style.setProperty("border-radius", "50%");
  // gives the ball a unique identifier
  ball.id = i.toString();
  // pushes the newly created divs into an array ballsCollide
  ballsCollide.push(ball);
  // pushes all the initial x positions of every ball created into an array xC
  xC.push(ball.style.left);
  // pushes y positions into array yC
  yC.push(ball.style.top);
  // pushes initial velocities into the arrays and sets initial velocities to random value
  velocity_xC.push(Math.random() * 10);
  velocity_yC.push(Math.random() * 10);
  // creates ball on the red area
  area.appendChild(ball);
}

// this function does the same for the blue stick side as the one above for the red collide side
function createStick(color, j) {
  var ball = document.createElement("svg");

  var area = document.getElementById("areaStick");

  ball.style.backgroundColor = color;
  ball.style.width = 50;
  ball.style.height = 50;
  ball.style.borderRadius = "50%";
  ball.style.setProperty("top", Math.random() * 350);
  ball.style.setProperty("left", Math.random() * 350);
  ball.style.setProperty("position", "absolute");
  ball.id = j.toString();

  ballsStick.push(ball);
  xS.push(ball.style.left);
  yS.push(ball.style.top);

  velocity_xS.push(Math.random() * 10);
  velocity_yS.push(Math.random() * 10);

  area.appendChild(ball);
}
var maxBalls = 6;
var maxBallstwo = 5;
//this is like function factory it makes multiple balls at once in both the red and blue side simultaneously
function createBalls() {
  // this can create as many balls as needed in this case five
  for (i = 0; i < maxBalls; i++) {
    // calls the function
    createCollide("red", i);
  }
  //does the same for stick side
  for (j = maxBalls + 1; j < maxBallstwo; j++) {
    createStick("blue", j);
  }

  // this just shows whats happening with the arrays when createBalls() is called
  //all the balls with id 0-4 and 5-9 and attributes are pushed into arrays
  console.log(ballsCollide);

  console.log(ballsStick);

  console.log(xC);

  console.log(yC);

  console.log(xS);

  console.log(yS);
  console.log(velocity_xC);
  console.log(velocity_yC);
}

// edge detection for red side
function checkWalls(i) {
  // allows javascript to access html file information like the width and height of the areas using border.style.width/height
  var border = document.getElementById("areaCollide");
  // everything has to be changed into integers because when created as styles its all in strings but you can't add or compare strings
  // so the width and height of the red and blue areas has to be converted to a number

  if (xC[i] < 0 || xC[i] > parseInt(border.style.width) - 50)
    velocity_xC[i] = -velocity_xC[i];
  if (yC[i] < 0 || yC[i] > parseInt(border.style.height) - 50)
    velocity_yC[i] = -velocity_yC[i];
}
// edge detection for blue side
function checkWallsTwo(j) {
  var borderTwo = document.getElementById("areaStick");

  if (xS[j] < 0 || xS[j] > parseInt(borderTwo.style.width) - 50)
    velocity_xS[j] = -velocity_xS[j];
  if (yS[j] < 0 || yS[j] > parseInt(borderTwo.style.height) - 50)
    velocity_yS[j] = -velocity_yS[j];
}

function collide(i) {
  for (k = i + 1; k < ballsCollide.length; k++) {
    var distance = Math.pow(
      Math.pow(xC[i] - xC[k], 2) + Math.pow(yC[i] - yC[k], 2),
      0.5
    );
    var ballWidthSum = parseInt(ballsCollide[i].style.width)/2 + parseInt(ballsCollide[k].style.width)/2;
    console.log(ballWidthSum + " plus " + distance);
    

    if (distance <= ballWidthSum ) { 
      var xCisign = Math.sign(velocity_xC[i]);
      var yCisign = Math.sign(velocity_yC[i]);
      var averageVelx = (Math.abs(velocity_xC[i]) + Math.abs(velocity_xC[k]))/2;
      var averageVely = (Math.abs(velocity_yC[i]) + Math.abs(velocity_yC[k]))/2;
      
      velocity_xC[i] = -xCisign*averageVelx;
      velocity_yC[i] = -yCisign*averageVely;
      velocity_xC[k] = xCisign*averageVelx;
      velocity_yC[k] = yCisign*averageVely;
    }
  }
}

// move every ball with edge detection
function moveBalls() {
  // so for every div that was stored in ballsCollide
  for (i = 0; i < ballsCollide.length; i++) {
    // move the div identified by 0 at i =0 and so on
    xC[i] = parseInt(xC[i]) + velocity_xC[i];
    yC[i] = parseInt(yC[i]) + velocity_yC[i];
    // have that div check walls
    checkWalls(i);
    collide(i);
    // actually move that divs position to the new position
    ballsCollide[i].style.setProperty("left", xC[i]);
    ballsCollide[i].style.setProperty("top", yC[i]);
  }

  setTimeout(moveBalls, 100);
}

//does same on other side
function moveballsTwo() {
  for (j = 0; j < ballsStick.length; j++) {
    xS[j] = parseInt(xS[j]) + velocity_xS[j];
    yS[j] = parseInt(yS[j]) + velocity_yS[j];

    checkWallsTwo(j);

    ballsStick[j].style.setProperty("left", xS[j]);
    ballsStick[j].style.setProperty("top", yS[j]);
  }

  setTimeout(moveballsTwo, 100);
}

