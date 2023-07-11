
// class Point2d
// {
//   constructor(x, y)
//   {
//     this.x = x;
//     this.y = y;
//   }

//   moveTo= (p) =>
//   {
//     this.x = p.x;
//     this.y = p.y; 
//   }

//   print = () => {
//     console.log(this.x," ", this.y)
//   }
// }


// class Point3d extends Point2d
// {
//   constructor(x,y,z)
//   {
//     super(x,y);
//     this.z= z;
//   }

//   print = () => {
//     console.log(this.x,"",this.y," ", this.z);
//   }
// }

// let p = new Point2d(0,0);
// let o = new Point2d(1,1);

// let d = new Point3d(1,2,3);
// d.print();

let size = 4
let fieldCells = createField()
let values
let emptyX, emptyY
const LEFT = {dx: -1, dy: 0}
const RIGHT = {dx: 1, dy: 0}
const UP = {dx: 0, dy: -1}
const DOWN = {dx: 0, dy: 1}


function createField () {
let cells = []
const table = document.querySelector(".field")
for(let i=0; i<size; i++){
  let tr = document.createElement("tr")
  table.appendChild(tr)
  let rowCells = []
  cells.push(rowCells)
  for(let j=0; j<size; j++){
    let td = document.createElement("td")
    td.setAttribute("class", "cell")
    tr.appendChild(td)
    rowCells.push(td)
  }
}
  return cells
}

function createInitialValues () {
emptyX = emptyY = size-1
let v = []
let irr = 1
  for(let i=0; i<size; i++){
    let rowValues = []
    v.push(rowValues)
    for(let j=0; j<size; j++){
      rowValues.push(irr)
      irr++
    }
  }
  v[emptyY][emptyX]=0
  return v
}

function draw () {
  for(let i=0; i<size; i++){
    for(let j=0; j<size; j++){
      let v = values[i][j]
      let td = fieldCells[i][j]
      td.innerHTML = v == 0 ? "" : String(v) 
      if (td.innerHTML==""){
        td.style.boxShadow="none"
      }
      else{
        td.style.boxShadow="0px 0px 60px 7px rgba(33, 247, 0, 0.6) inset"
      if(gameOver()){
        win()
      }
      }
    }
  }
}


function makeMove(move){
  let newX = emptyX + move.dx
  let newY = emptyY + move.dy
  if ((newX >= size) || (newX < 0) || (newY >= size) || (newY < 0)){
    return false
  }
  let c = values[newY][newX]
  values[newY][newX] = 0
  values[emptyY][emptyX] = c
  emptyY = newY
  emptyX = newX
  return true
}
let movesCount=0

function movesCounter () {

  let displayCounter = document.querySelector(".moves")
  displayCounter.innerHTML = `Moves: ${movesCount}` 

}
//!!!

function shuffle () {
let options = [LEFT, RIGHT, UP, DOWN]
for (let i = 0; i < 100; i++) {
  let move = options[Math.floor(Math.random() * options.length)]
  makeMove(move)
}

}

function gameOver(){
  let expectedValue = 1
  for(let i=0; i<size; i++){
    for(let j=0; j<size; j++){
      if (values[i][j] == expectedValue){
        expectedValue++
      }
      else {
        if ( j == size-1 && i == size-1 && values[i][j]==0){

        return true
      }
      return false
    }
  }
} 

  return true
}

document.addEventListener("keydown", function(e){
  let moved = false
  switch (e.keyCode) {
    case 38: moved=makeMove(DOWN); break;
    case 40: moved=makeMove(UP); break;
    case 37: moved=makeMove(RIGHT); break;
    case 39: moved=makeMove(LEFT); break;
    
  }
  if (moved){
    movesCount++
    movesCounter()
  }
  draw()
  if (gameOver()) {
      draw()
      stopTimer()
      
    }
})


let timeDisplay = document.querySelector(".timer")
let sec = 0
let min = 0
function timeCounter () {
  sec++
  if(sec==60){
    sec=0
    min++
  }
  let s = sec < 10 ? "0" + sec : sec
  let m = min < 10 ? "0" + min : min
  timeDisplay.innerHTML = `Time: ${m}:${s}`
}
let timerId
function startTimer () {
 timerId = setInterval(timeCounter,1000)
}

function stopTimer () {
  clearInterval(timerId)
}

let body = document.querySelector("body")

function win (){
  body.innerHTML = `
  <h1 class="youWin">YOU WIN!</h1>
  `
  stopTimer()
  setTimeout(displayEndGame,2000)
}

function displayEndGame () {
  makeMove(UP)
  body.innerHTML = `
  <h2>Your result:</h2>
  <p class="displayTime">${timeDisplay.innerHTML}</p>
  <p class="displayMoves">Moves: ${movesCount}</p>
  <input name="input" class="nameInput" type="text" placeholder="Your Name">
  <button class="submitBtn" onclick="submitScore()" >SUBMIT</button>
  `
}

function submitScore () {
  let name = document.querySelector(".nameInput").value
  let playerScore = []
  let obj = {
    player:name,
    time:timeDisplay.innerHTML,
    moves:movesCount
  }
  playerScore.push(obj)
  let fromLs = localStorage.getItem("playerScore")
  if (fromLs) 
    localStorage.setItem("playerScore", JSON.stringify([...JSON.parse(fromLs),obj])) 
  else 
    localStorage.setItem("playerScore", JSON.stringify ([obj]))

    newGame()

}

function newGame (){
// location.reload()
body.innerHTML=`
<img src="../imgs/num15.png" alt="" width="200px">
<a href="./newGame.html">NEW GAME</a>
<a href="./leaderboard.html">LEADERBOARD</a>

`
}



function init () {
  values=createInitialValues()
  shuffle()
  draw()
  startTimer()
}
init()
