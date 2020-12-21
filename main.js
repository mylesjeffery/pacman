const width = 28;
const grid = document.querySelector('.grid');
const scoreDisplay = document.getElementById('score');
let squares = [];
let score = 0;

//LAYOUT GUIDE
  // 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty

const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,2,2,2,2,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 
]

function createBoard(){
    for(let i=0; i<layout.length; i++){
        const square = document.createElement('div');
        grid.appendChild(square);
        squares.push(square);

        if(layout[i]===0){
            squares[i].classList.add('pac-dot');
        } else if(layout[i]===1){
            squares[i].classList.add('wall');
        } else if(layout[i]===2){
            squares[i].classList.add('ghost-lair');
        } else if(layout[i]===3){
            squares[i].classList.add('power-pellet');
        } else if(layout[i]===4){
            squares[i].classList.add('empty');
        }
    }
}

createBoard();

//starting position
let pacmanCurrentIndex = 490;

squares[pacmanCurrentIndex].classList.add('pacman');

function control(e) {
    squares[pacmanCurrentIndex].classList.remove('pacman')
    switch(e.keyCode){
        case 40: 
        console.log('down');
        if (!squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
            pacmanCurrentIndex + width < width * width){ 
                pacmanCurrentIndex += width;
            }
        break

        case 37: 
        console.log('left');
        if (!squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
            pacmanCurrentIndex % width !== 0) {
            pacmanCurrentIndex -=1
        }
        if (pacmanCurrentIndex === 364) {
            pacmanCurrentIndex = 391
        }
        break

        case 38: 
        console.log('up');
        if (!squares[pacmanCurrentIndex - width].classList.contains('wall') &&
            pacmanCurrentIndex - width >=0){ 
                pacmanCurrentIndex -= width;
            }
        break

        case 39: 
        console.log('right');
        if(!squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
            pacmanCurrentIndex % width < width -1){ 
                pacmanCurrentIndex +=1;
            }
        if (pacmanCurrentIndex === 391) {
            pacmanCurrentIndex = 364
        }
        break
    }
    squares[pacmanCurrentIndex].classList.add('pacman');
    pacDotEaten();
    powerPelletEaten();
    checkForWin();
}
document.addEventListener('keyup', control)

function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
        score++;
        scoreDisplay.innerHTML = score;
        squares[pacmanCurrentIndex].classList.remove('pac-dot');
    }
}

function powerPelletEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
        score += 10;
        scoreDisplay.innerHTML = score;
        squares[pacmanCurrentIndex].classList.remove('power-pellet');

        ghosts.forEach(ghost => ghost.isScared = true);
        setTimeout(unScareGhosts, 10000)

    }
}

function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false);
}




class Ghost {
    constructor(classname, startIndex, speed){
        this.classname = classname;
        this.startIndex = startIndex; 
        this.speed = speed;
        this.currentIndex = startIndex;
        this.isScared = false;
        this.timerId = NaN;
    }
}

const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
]

//draw ghosts on grid
ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
});


//move ghosts
ghosts.forEach(ghost => moveGhost(ghost));

function moveGhost(ghost){
    const directions = [-1, +1, -width, +width];
    let direction = directions[Math.floor(Math.random() * directions.length)];
    console.log(direction);

    ghost.timerId = setInterval(function() {
        
        if(
            !squares[ghost.currentIndex + direction].classList.contains('wall') &&
            !squares[ghost.currentIndex + direction].classList.contains('ghost')
            ){
            squares[ghost.currentIndex].classList.remove(ghost.classname);
            squares[ghost.currentIndex].classList.remove('ghost','scared');
            ghost.currentIndex += direction;

            squares[ghost.currentIndex].classList.add(ghost.classname);
            squares[ghost.currentIndex].classList.add('ghost');
        } else{
            direction = directions[Math.floor(Math.random() * directions.length)];
        }

        //if ghost is currently scared
        if(ghost.isScared){
            squares[ghost.currentIndex].classList.add('scared');
        }

        //if ghost is scared and pacman eats it
        if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')){
            squares[ghost.currentIndex].classList.remove(ghost.classname, 'ghost', 'scared');
            ghost.currentIndex = ghost.startIndex;
            score += 100;
            squares[ghost.currentIndex].classList.add(ghost.classname, 'ghost');
        }
        checkGameOver();


    }, ghost.speed);
}

//check gameover
function checkGameOver(){
    if(
        squares[pacmanCurrentIndex].classList.contains('ghost') &&
        !squares[pacmanCurrentIndex].classList.contains('scared')
        ){
            //stop ghosts moving
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            //stops event listener
            document.removeEventListener('keyup', control);

            scoreDisplay.innerHTML = 'You LOSE';
        }
}

//check for win
function checkForWin(){
    if (score >= 274){
        //stop ghosts moving
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        //stops event listener
        document.removeEventListener('keyup', control);

        scoreDisplay.innerHTML = 'You WIN';
    }
}