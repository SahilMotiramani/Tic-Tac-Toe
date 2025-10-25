let boxes = document.querySelectorAll(".box");
let restButton = document.querySelector("#restButton");
let countdownEl = document.getElementById('countdown');

let turnO = true; //playerX and PlayerO
let gameEnded = false;

let winningSequence = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
]

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("box was clicked");
        if (gameEnded) return; // ignore clicks after game end

        if(turnO){
            box.innerText = "O";
            turnO=false;
        }else{
            box.innerText = "X";
            turnO=true; 
        }
        box.disabled = true;
        checkWinner();
    })
})

function resetBoard(){
    boxes.forEach((box)=>{
        box.innerText = "";
        box.disabled = false;
        box.classList.remove('win');
    })
    document.querySelector("h1").innerText = "Tic-Tac-Toe";
    countdownEl.textContent = '';
    turnO = true;
    gameEnded = false;
}

const checkWinner = () =>{
    // check for win
    for (let pattern of winningSequence){
        const a = boxes[pattern[0]].innerText;
        const b = boxes[pattern[1]].innerText;
        const c = boxes[pattern[2]].innerText;
        if(a !== "" && a === b && b === c){
            const winner = turnO ? 'X' : 'O'; // turnO was toggled after last move
            console.log(`player ${winner} wins`);
            document.querySelector("h1").innerText = `Player ${winner.toUpperCase()} wins`;

            // highlight winning boxes
            pattern.forEach(i => boxes[i].classList.add('win'));

            // disable the rest
            boxes.forEach((box)=>{ box.disabled = true; })

            gameEnded = true;

            // start countdown then reset
            startCountdownAndReset(`Player ${winner} wins`);
            return;
        }
    }

    // check for draw (all boxes filled)
    const isDraw = Array.from(boxes).every(b => b.innerText !== "");
    if(isDraw){
        console.log('Draw');
        document.querySelector("h1").innerText = 'Draw';
        boxes.forEach(b => b.disabled = true);
        gameEnded = true;
        // add subtle animation to all boxes
        boxes.forEach(b => b.classList.add('win'));
        startCountdownAndReset('Draw');
    }
}

function startCountdownAndReset(message){
    let count = 3;
    countdownEl.textContent = `Resetting in ${count}...`;
    const interval = setInterval(()=>{
        count -= 1;
        if(count > 0){
            countdownEl.textContent = `Resetting in ${count}...`;
        } else {
            clearInterval(interval);
            countdownEl.textContent = '';
            // small delay so animation visible, then reset
            setTimeout(() => {
                resetBoard();
            }, 250);
        }
    }, 1000);
}

restButton.addEventListener("click",()=>{
    boxes.forEach((box)=>{
        box.innerText="";
        box.disabled = false;
        if(!turnO){
            turnO=false;
        }else{
            turnO=true;
        }
    })
    document.querySelector("h1").innerText="Tic-Tac-Toe";
})