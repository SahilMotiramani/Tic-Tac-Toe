let boxes = document.querySelectorAll(".box");
let restButton = document.querySelector("#restButton");

let turnO = true; //playerX and PlayerO

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

const checkWinner = () =>{
    for (let pattern of winningSequence){
        // console.log(pattern[0],pattern[1],pattern[2]);
        if(boxes[pattern[0]].innerText===boxes[pattern[1]].innerText && boxes[pattern[1]].innerText===boxes[pattern[2]].innerText && boxes[pattern[0]].innerText!=""){
            if(turnO){
                console.log("player X wins");
                winningPerson="X";
                document.querySelector("h1").innerText="player X wins";
                
            }
            else{
                console.log("playerO wins");
                winningPerson="O";
                document.querySelector("h1").innerText="player O wins";
            }
            boxes.forEach((box)=>{
                box.disabled=true;
            })
            return;
        }
    }
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