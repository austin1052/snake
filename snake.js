//variables

const defaultHighScores = [
  ["Austin", 30],
  ["Paige", 40],
  ["Amanda", 70],
  ["Zack", 60],
];

let highScores,
  currentHead,
  foodLocation,
  newFoodLocation,
  currentTail,
	intervalID;
	
const defaultSnake = [
  [17, 15],
  [16, 15],
  [15, 15],
];

let snake = [];
let snakeDirection = "up";
let score = 0;


let gameBoard = [
	['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'x', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
];

// game board functions

function buildGameBoard() {
  defaultSnake.forEach((set) => {
    //builds gameBoard from defaultSnake array.
    snake.push([set[0], set[1]]);
    gameBoard[set[0]][set[1]] = "o";
  });
  let length = snake.length - 1; //makes last item in deafultSnake the head.
  let row = snake[length][0];
  let column = snake[length][0];
  gameBoard[row][column] = "h";
}

function renderGameBoard() {
  gameBoard.forEach((row, rIdx) => {
    row.forEach((column, cIdx) => {
      if (column === "o") {
        $(".game").append(
          `<div class="snake" style="grid-column:${cIdx}; grid-row:${
            rIdx + 1
          }"></div>`
        );
      } else if (column === "h") {
        $(".game").append(
          `<div class="head" style="grid-column:${cIdx}; grid-row:${
            rIdx + 1
          }"></div>`
        );
        currentHead = [rIdx, cIdx];
      } else if (column === "x") {
        $(".game").append(
          `<div class="food" style="grid-column:${cIdx}; grid-row:${
            rIdx + 1
          }"></div>`
        );
        foodLocation = [rIdx, cIdx];
      }
    });
  });
}

function makeFood() {
  let newFoodRow = Math.floor(Math.random() * 31);
  let newFoodCol = Math.floor(Math.random() * 31) + 1;
  while (gameBoard[newFoodRow][newFoodCol] !== "") {
    newFoodRow = Math.floor(Math.random() * 31);
    newFoodCol = Math.floor(Math.random() * 31) + 1;
    console.log("it worked!");
  }
  gameBoard[newFoodRow][newFoodCol] = "x";
}

// snake functions

function eatFood() {
  let a = currentHead[0];
  let b = currentHead[1];
  if (a === foodLocation[0] && b === foodLocation[1]) {
    score = score + 10;
    $(".score-counter").text(`Score: ${score}`);
    makeFood();
  } else {
    let tailLocation = snake.shift(); //removes first array in snake. Assigns the removed array to tailLocation
    gameBoard[tailLocation[0]][tailLocation[1]] = "";
  }
}

function moveSnake(x, y) {
  let a = currentHead[0];
  let b = currentHead[1];
  let newHeadRow = a + x;
  let newHeadColumn = b + y;
  snake.push([newHeadRow, newHeadColumn]);
  snake.forEach((set) => {
    gameBoard[set[0]][set[1]] = "o"; //resets all coordinates to "o"
  });
  gameBoard[newHeadRow][newHeadColumn] = "h"; //sets first coordinate to h
  eatFood();
}

$("body").keydown(function updateDirection(event) {
  let key = event.which;
  // if (snakeDirection === "up" && key === 40) {
  // 	gameOver();
  if (key === 37) {
    snakeDirection = "left";
  } else if (key === 38) {
    snakeDirection = "up";
  } else if (key === 39) {
    snakeDirection = "right";
  } else if (key === 40) {
    snakeDirection = "down";
  }
});

function updateGame(x, y) {
  isGameOver();
  moveSnake(x, y);
  $(".game").empty();
  renderGameBoard();
}

function processTick() {
  let x = 0;
  let y = 0;
  if (snakeDirection === "up") {
    x = -1;
  } else if (snakeDirection === "down") {
    x = 1;
  } else if (snakeDirection === "left") {
    y = -1;
  } else if (snakeDirection === "right") {
    y = 1;
  }
  updateGame(x, y);
}

function startGame() {
  buildGameBoard();
  renderGameBoard();
  intervalID = setInterval(processTick, 100);
  $(".start-screen").removeClass("open");
  $(".game").addClass("started");
}

function stopGame() {
  clearInterval(intervalID);
}

function isGameOver() {
  let a = currentHead[0];
  let b = currentHead[1];
  let filtered = snake.filter((set) => {
    return set[0] === a && set[1] === b;
  });
  if (filtered.length > 1) {
    gameOver();
  } else if (a > 30 || b > 30 || a < 0 || b < 0) {
    gameOver();
  } else if (gameBoard[a][b] !== "h") {
    gameOver();
  }
}

function gameOver() {
  stopGame();
	$(".game-over").addClass("open");
	$(".game").removeClass("started");
	$(".final-score").append(`<div>${score}</div>`);
  snake = [];
  snakeDirection = "up";
  newHighScore(score, highScores);
}

//High Score Functions

function setHighScores() {
  highScores =
    JSON.parse(localStorage.getItem("highScores")) || defaultHighScores;
}

function buildHighScores() {
  highScores.sort(function (a, b) {
    return b[1] - a[1];
  });
  console.log(highScores.length);
  if (highScores.length > 5) {
    highScores = highScores.slice(0, 5);
    console.log(highScores);
  }
  localStorage.setItem("highScores", JSON.stringify(highScores));
}

function renderHighScore(score, index) {
  return `<div class="player-score">
	<div>${index + 1}.</div>
	<div>${score[0]}</div>
	<div>${score[1]}</div>
	</div>`;
}

function renderAllHighScores(highScores) {
  $(".list").empty();
  highScores.forEach((score, index) => {
    newScore = renderHighScore(score, index);
    $(".list").append(newScore);
  });
}

function newHighScore(score, highScores) {
  if (score > highScores[highScores.length - 1][1]) {
    let player = prompt("New High Score! Enter your name:");
    highScores.push([player, score]);
    console.log(highScores);
    buildHighScores();
  }
}

function bootstrap() {
  setHighScores();
  buildHighScores();
  renderAllHighScores(highScores);
}

bootstrap();

//clicks

$(".start-game").click(function () {
  startGame();
});

$(".view-scores").click(function () {
  $(".high-scores").addClass("open");
});

$(".close-scores").click(function () {
  $(".high-scores").removeClass("open");
});

$(".close-game-over").click(function () {
  $(".game-over").removeClass("open");
	$(".start-screen").addClass("open");
  location.reload();
});
