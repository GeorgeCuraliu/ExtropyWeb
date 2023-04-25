

let kingAlive = true;//when a king dies, the gamse stop
let choosePiece = 0;
let table = [[],[],[],[],[],[],[],[],[]];
let piecesLocation = [[],[],[],[],[],[],[],[],[],[]];
let posibleMove = [];
let thisMove =[[],[],[],[],[],[],[],[],[]];
let turn = 0;
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {//every element false
    piecesLocation[i][j] = false;
  }
}

for (let i = 1; i < 3; i++) {
  for (let j = 1; j < 9; j++) {//set location of white pieces
    piecesLocation[i][j] = "white";
  }
}

for (let i = 7; i < 9; i++) {
  for (let j = 1; j < 9; j++) {//set location of black pieces
    piecesLocation[i][j] = "black";
  }
}

table[1][1] = document.getElementById("1-1");//1
table[1][2] = document.getElementById("1-2");
table[1][3] = document.getElementById("1-3");
table[1][4] = document.getElementById("1-4");
table[1][5] = document.getElementById("1-5");
table[1][6] = document.getElementById("1-6");
table[1][7] = document.getElementById("1-7");
table[1][8] = document.getElementById("1-8");

table[2][1] = document.getElementById("2-1");//2
table[2][2] = document.getElementById("2-2");
table[2][3] = document.getElementById("2-3");
table[2][4] = document.getElementById("2-4");
table[2][5] = document.getElementById("2-5");
table[2][6] = document.getElementById("2-6");
table[2][7] = document.getElementById("2-7");
table[2][8] = document.getElementById("2-8");

table[3][1] = document.getElementById("3-1");//3
table[3][2] = document.getElementById("3-2");
table[3][3] = document.getElementById("3-3");
table[3][4] = document.getElementById("3-4");
table[3][5] = document.getElementById("3-5");
table[3][6] = document.getElementById("3-6");
table[3][7] = document.getElementById("3-7");
table[3][8] = document.getElementById("3-8");

table[4][1] = document.getElementById("4-1");//4
table[4][2] = document.getElementById("4-2");
table[4][3] = document.getElementById("4-3");
table[4][4] = document.getElementById("4-4");
table[4][5] = document.getElementById("4-5");
table[4][6] = document.getElementById("4-6");
table[4][7] = document.getElementById("4-7");
table[4][8] = document.getElementById("4-8");

table[5][1] = document.getElementById("5-1");//5
table[5][2] = document.getElementById("5-2");
table[5][3] = document.getElementById("5-3");
table[5][4] = document.getElementById("5-4");
table[5][5] = document.getElementById("5-5");
table[5][6] = document.getElementById("5-6");
table[5][7] = document.getElementById("5-7");
table[5][8] = document.getElementById("5-8");

table[6][1] = document.getElementById("6-1");//6
table[6][2] = document.getElementById("6-2");
table[6][3] = document.getElementById("6-3");
table[6][4] = document.getElementById("6-4");
table[6][5] = document.getElementById("6-5");
table[6][6] = document.getElementById("6-6");
table[6][7] = document.getElementById("6-7");
table[6][8] = document.getElementById("6-8");

table[7][1] = document.getElementById("7-1");//7
table[7][2] = document.getElementById("7-2");
table[7][3] = document.getElementById("7-3");
table[7][4] = document.getElementById("7-4");
table[7][5] = document.getElementById("7-5");
table[7][6] = document.getElementById("7-6");
table[7][7] = document.getElementById("7-7");
table[7][8] = document.getElementById("7-8");

table[8][1] = document.getElementById("8-1");//8
table[8][2] = document.getElementById("8-2");
table[8][3] = document.getElementById("8-3");
table[8][4] = document.getElementById("8-4");
table[8][5] = document.getElementById("8-5");
table[8][6] = document.getElementById("8-6");
table[8][7] = document.getElementById("8-7");
table[8][8] = document.getElementById("8-8");


//the deleted pieces section
let white_deleted1 = document.getElementById("half-left-1");
let white_deleted2 = document.getElementById("half-left-2");
let black_deleted1 = document.getElementById("half-right-1");
let black_deleted2 = document.getElementById("half-right-2");

let positionOfDeletedPiece = [];
let selected;
let a;
let valuesOfPieceWhenAttacks = [];
//is verifing if there is piece inside the squere and what piece
function check(theSquare, x, y){


  if(choosePiece == 1 && kingAlive){//where we should move the piece
    //parentDiv.querySelector("#childDivId");
    if(theSquare.classList.contains("posible_move")){
      console.log("moving");
      selected.possibleMove(theSquare, x, y);
      choosePiece = 0;
      turn++;
      turnChange(selected.color);
    }
    else if(theSquare.classList.contains("posible_attack")){//case of attacking a piece
      console.log(`piece attack`);
      turn++;
      selected.attackMove1();
      turnChange(selected.color);
      var newSelected = selected;
      pieceInsideDiv(theSquare).deletePiece();
      newSelected.attackMove2(theSquare, x, y);
      choosePiece = 0;
      newSelected = false;
      
      
    }else{
      
      choosePiece = 0;
      
      selected.clearTable();
      if(selected.type == "pawn"){
        console.log("pawn detected, searching for his position")
        if(selected.x == 2 || selected.x == 7)//the initial position of pawns
        {
          console.log("pawn first move is true again")
          selected.firstMovePawn = true;
        }
        }
        check(theSquare, x, y);
    }
  }


 else if (theSquare.children[0].tagName === "DIV" && choosePiece == 0 && kingAlive) {//error if the div is empty so has to be the last if, beacuse will break in case of an error
    
    pieceInsideDiv(theSquare);
    selectingPieceToMove();
    
}



}

function selectingPieceToMove(){//conditions from else if in check function


  if(selected.color == "white" && turn % 2 == 0){
    console.log(`white ${turn}`);
    
   
  }else if(selected.color == "black" && turn % 2 == 1){
   console.log(`black ${turn}`);
   
   
  }else{
    choosePiece = 0;
    selected.clearTable();
    if(selected.type == "pawn"){
    selected.firstMovePawn = true;
    }
   
  }
}



function pieceInsideDiv(theSquare){
  if(theSquare.querySelector("#whitePawn1")){//<div id="whitePawn1">&#9817;</div>
    selected = pawn1_white;
    pawn1_white.move();
    choosePiece = 1;
  }

  if(theSquare.querySelector("#whitePawn2")){//<div id="whitePawn2">&#9817;</div>
    selected = pawn2_white;
    pawn2_white.move();
    choosePiece = 1;
  }

  if(theSquare.querySelector("#whitePawn3")){//<div id="whitePawn3">&#9817;</div>
    selected = pawn3_white;
    pawn3_white.move();
    choosePiece = 1;
  }

  if(theSquare.querySelector("#whitePawn4")){//<div id="whitePawn4">&#9817;</div>
    selected = pawn4_white;
    pawn4_white.move();
    choosePiece = 1;
  }

  if(theSquare.querySelector("#whitePawn5")){//<div id="whitePawn5">&#9817;</div>
    selected = pawn5_white;
    pawn5_white.move();
    choosePiece = 1;
  }

  if(theSquare.querySelector("#whitePawn6")){//<div id="whitePawn6">&#9817;</div>
    selected = pawn6_white;
    pawn6_white.move();
    choosePiece = 1;
  }

  if(theSquare.querySelector("#whitePawn7")){//<div id="whitePawn7">&#9817;</div>
    selected = pawn7_white;
    pawn7_white.move();
    choosePiece = 1;
  }

  if(theSquare.querySelector("#whitePawn8")){//<div id="whitePawn8">&#9817;</div>
    selected = pawn8_white;
    pawn8_white.move();
    choosePiece = 1;
  }

  //white rooks
  if(theSquare.querySelector("#whiteRook1")){//<div id="whiteRook1">&#9814;</div>
    selected = rook1_white;
    rook1_white.move();
    choosePiece = 1;
  }
  if(theSquare.querySelector("#whiteRook2")){//<div id="whiteRook2">&#9814;</div>#
    selected = rook2_white;
    rook2_white.move();
    choosePiece = 1;
  }

  //white knights
  if(theSquare.querySelector("#whiteKnight1")){//<div id="whiteKnight1">&#9816;</div>
    selected = knight1_white;
    knight1_white.move();
    choosePiece = 1;
  }
  if(theSquare.querySelector("#whiteKnight2")){//<div id="whiteKnight2">&#9816;</div>
    selected = knight2_white;
    knight2_white.move();
    choosePiece = 1;
  }

  //white bishop
  if(theSquare.querySelector("#whiteBishop1")){//<div id="whiteBishop1">&#9815;</div>
    selected = bishop1_white;
    bishop1_white.move();
    choosePiece = 1;
  }
  if(theSquare.querySelector("#whiteBishop2")){//<div id="whiteBishop2">&#9815;</div>
    selected = bishop2_white;
    bishop2_white.move();
    choosePiece = 1;
  }

  //white king and queen
  if(theSquare.querySelector("#whiteKing")){//<div id="whiteKing">&#9812;</div>
    selected = king_white;
    king_white.move();
    choosePiece = 1;
  }
  if(theSquare.querySelector("#whiteQueen")){//<div id="whiteKing">&#9812;</div>
    selected = queen_white;
    queen_white.move();
    choosePiece = 1;
  }







  //black
  if(theSquare.querySelector("#blackPawn1")){//<div id="blackPawn1">&#9817;</div>
    selected = pawn1_black;
    pawn1_black.move();
    choosePiece = 1;
  }

  if(theSquare.querySelector("#blackPawn2")){//<div id="blackPawn2">&#9817;</div>
    selected = pawn2_black;
    pawn2_black.move();
    choosePiece = 1;
  }

  if(theSquare.querySelector("#blackPawn3")){//<div id="blackPawn3">&#9817;</div>
    selected = pawn3_black;
    pawn3_black.move();
    choosePiece = 1;
  }

  if(theSquare.querySelector("#blackPawn4")){//<div id="blackPawn4">&#9817;</div>
    selected = pawn4_black;
    pawn4_black.move();
    choosePiece = 1;
  }

  if(theSquare.querySelector("#blackPawn5")){//<div id="blackPawn5">&#9817;</div>
    selected = pawn5_black;
    pawn5_black.move();
    choosePiece = 1;
  }

  if(theSquare.querySelector("#blackPawn6")){//<div id="blackPawn6">&#9817;</div>
    selected = pawn6_black;
    pawn6_black.move();
    choosePiece = 1;
  }

  if(theSquare.querySelector("#blackPawn7")){//<div id="blackPawn7">&#9817;</div>
    selected = pawn7_black;
    pawn7_black.move();
    choosePiece = 1;
  }

  if(theSquare.querySelector("#blackPawn8")){//<div id="blackPawn8">&#9817;</div>
    selected = pawn8_black;
    pawn8_black.move();
    choosePiece = 1;
  }

  //black rooks
  if(theSquare.querySelector("#blackRook1")){//<div id="blackRook1">&#9814;</div>
    selected = rook1_black;
    rook1_black.move();
    choosePiece = 1;
  }
  if(theSquare.querySelector("#blackRook2")){//<div id="blackRook1">&#9814;</div>
    selected = rook2_black;
    rook2_black.move();
    choosePiece = 1;
  }

  //black knights
  if(theSquare.querySelector("#blackKnight1")){//<div id="blackKnight1">&#9816;</div>
    selected = knight1_black;
    knight1_black.move();
    choosePiece = 1;
  }
  if(theSquare.querySelector("#blackKnight2")){//<div id="blackKnight2">&#9816;</div>
    selected = knight2_black;
    knight2_black.move();
    choosePiece = 1;
  }

  //black bishop
  if(theSquare.querySelector("#blackBishop1")){//<div id="blackBishop1">&#9815;</div>
    selected = bishop1_black;
    bishop1_black.move();
    choosePiece = 1;
  }
  if(theSquare.querySelector("#blackBishop2")){//<div id="blackBishop2">&#9815;</div>
    selected = bishop2_black;
    bishop2_black.move();
    choosePiece = 1;
  }

  //black king and queen
  if(theSquare.querySelector("#blackKing")){//<div id="blackKing">&#9812;</div>
    selected = king_black;
    king_black.move();
    choosePiece = 1;
  }
  if(theSquare.querySelector("#BlackQueen")){//<div id="BlackQueen">&#9812;</div>
    selected = queen_black;
    queen_black.move();
    choosePiece = 1;
  }
  return selected;
}





//the class
class Pieces{
    constructor(type, color, x, y){
        this.type = type;
        this.color = color;
        this.x = x;
        this.y = y;
        this.firstMovePawn = true;
    }

  


    move(){
      let firstSquareFree = false;
      if(this.type == "pawn"){//pawn
        if( this.color == "white"){

          if(this.firstMovePawn &&(this.x == 2 || this.x == 7)){//pawn-first move
            
          this.firstMovePawn = false;
          if(piecesLocation[this.x+1][this.y] == false){
          table[this.x+1][this.y].classList.add("posible_move");//check if he can move forward
          firstSquareFree = true;
          }

          if(piecesLocation[this.x+2][this.y] == false && firstSquareFree){
            table[this.x+2][this.y].classList.add("posible_move");//check if he can move forward
          }
          
          console.log("pawn-white");
          
          if(piecesLocation[this.x+1][this.y+1] == "black"){
            table[this.x+1][this.y+1].classList.add("posible_attack");//check for pawn on left and right is there is enemy
            
          }

          if(table[this.x+1][this.y-1] == "black"){
            table[this.x+1][this.y-1].classList.add("posible_attack");//check for pawn on left and right is there is enemy
            
          }

        }else{//not first pawn move
          if(piecesLocation[this.x+1][this.y]== false){
            table[this.x+1][this.y].classList.add("posible_move");//check if he can move forward
          }

          if(piecesLocation[this.x+1][this.y+1] == "black"){
            table[this.x+1][this.y+1].classList.add("posible_attack");//check for pawn on left and right is there is enemy
          }

          if(piecesLocation[this.x+1][this.y-1] == "black"){
            table[this.x+1][this.y-1].classList.add("posible_attack");//check for pawn on left and right is there is enemy
          }
        }
      }else{

        if(this.firstMovePawn &&(this.x == 2 || this.x == 7)){//pawn-first move
            
          this.firstMovePawn = false;
          if(piecesLocation[this.x-1][this.y] == false){
          table[this.x-1][this.y].classList.add("posible_move");//check if he can move forward
          firstSquareFree = true;
          }

          if(piecesLocation[this.x-2][this.y] == false && firstSquareFree){
            table[this.x-2][this.y].classList.add("posible_move");//check if he can move forward
          }
          
          console.log("pawn-black");
          
          if(piecesLocation[this.x-1][this.y-1] == "white"){
            table[this.x-1][this.y-1].classList.add("posible_attack");//check for pawn on left and right is there is enemy
          }

          if(piecesLocation[this.x-1][this.y+1] == "white"){
            table[this.x-1][this.y+1].classList.add("posible_attack");//check for pawn on left and right is there is enemy
          }

        }else{//not first pawn move
          if(piecesLocation[this.x-1][this.y] == false){
            table[this.x-1][this.y].classList.add("posible_move");//check if he can move forward
          }

          if(piecesLocation[this.x-1][this.y+1] == "white"){
            table[this.x-1][this.y+1].classList.add("posible_attack");//check for pawn on left and right is there is enemy
          }

          if(piecesLocation[this.x-1][this.y-1] == "white"){
            table[this.x-1][this.y-1].classList.add("posible_attack");//check for pawn on left and right is there is enemy
          }
        }
      }
      }
      if(this.type == "knight"){//knight
        console.log("knight");
        if(this.y-1<9 && this.y-1>0 && this.x-2<9 && this.x-2>0 && piecesLocation[this.x-2][this.y-1] != this.color){
          console.log("knight-possible 1");
            if(piecesLocation[this.x-2][this.y-1] == false){
              table[this.x-2][this.y-1].classList.add("posible_move");
            }else{
              table[this.x-2][this.y-1].classList.add("posible_attack");
            }

          }
          
        if(this.y-2<9 && this.y-2>0 && this.x-1<9 && this.x-1>0 && piecesLocation[this.x-1][this.y-2] != this.color){
          console.log("knight-possible 2");
          {
            if(piecesLocation[this.x-1][this.y-2] == false){
              table[this.x-1][this.y-2].classList.add("posible_move");
            }else{
              table[this.x-1][this.y-2].classList.add("posible_attack");
            }

          }

        }

           
        if(this.y-2<9 && this.y-2>0 && this.x+1<9 && this.x+1>0 && piecesLocation[this.x+1][this.y-2] != this.color){
          console.log("knight-possible 3");
          {
            if(piecesLocation[this.x+1][this.y-2] == false){
              table[this.x+1][this.y-2].classList.add("posible_move");
            }else{
              table[this.x+1][this.y-2].classList.add("posible_attack");
            }

          }

        }
           
        if(this.y-1<9 && this.y-1>0 && this.x+2<9 && this.x+2>0  && piecesLocation[this.x+2][this.y-1] != this.color){
          console.log("knight-possible 4");
          {
            if(piecesLocation[this.x+2][this.y-1] == false){
              table[this.x+2][this.y-1].classList.add("posible_move");
            }else{
              table[this.x+2][this.y-1].classList.add("posible_attack");
            }

          }

        }
            
        if(this.y+1<9 && this.y+1>0 && this.x+2<9 && this.x+2>0  && piecesLocation[this.x+2][this.y+1] != this.color){
          console.log("knight-possible 5");
          {
            if(piecesLocation[this.x+2][this.y+1] == false){
              table[this.x+2][this.y+1].classList.add("posible_move");
            }else{
              table[this.x+2][this.y+1].classList.add("posible_attack");
            }

          }

        }
            
        if(this.y+2<9 && this.y+2>0 && this.x+1<9 && this.x+1>0  && piecesLocation[this.x+1][this.y+2] != this.color){
          console.log("knight-possible 6");
          {
            if(piecesLocation[this.x+1][this.y+2] == false){
              table[this.x+1][this.y+2].classList.add("posible_move");
            }else{
              table[this.x+1][this.y+2].classList.add("posible_attack");
            }

          }

        }

        if(this.y+2<9 && this.y+2>0 && this.x-1<9 && this.x-1>0  && piecesLocation[this.x-1][this.y+2] != this.color){
          console.log("knight-possible 7");
          {
            if(piecesLocation[this.x-1][this.y+2] == false){
              table[this.x-1][this.y+2].classList.add("posible_move");
            }else{
              table[this.x-1][this.y+2].classList.add("posible_attack");
            }

          }

        }
            
        if(this.y+1<9 && this.y+1>0 && this.x-2<9 && this.x-2>0  && piecesLocation[this.x-2][this.y+1] != this.color){
          console.log("knight-possible 8");
          {
            if(piecesLocation[this.x-2][this.y+1] == false){
              table[this.x-2][this.y+1].classList.add("posible_move");
            }else{
              table[this.x-2][this.y+1].classList.add("posible_attack");
            }

          }

        }


      }
    
      if(this.type == "bishop"){//bishop
        let tempX = this.x;
        let tempY = this.y;
        let canContinue = true;//value that help decide when to stop this loop
        console.log("bishop");

        tempX++;
        tempY++;

        while(canContinue){
      
          if(tempX<9 && tempX>0 && tempY<9 && tempY>0 && piecesLocation[tempX][tempY] != this.color){
            console.log("bishop-1");
            if(piecesLocation[tempX][tempY] == false){
             table[tempX][tempY].classList.add("posible_move");
            }else{
              table[tempX][tempY].classList.add("posible_attack");
              canContinue = false;
            }
            tempX++;
            tempY++;
          }else{
            canContinue = false;
          }
        }
         tempX = this.x;
         tempY = this.y;//resets the value of tempX and tempY
        canContinue = true;//so it can start the next loop

        tempX--;
        tempY++;

        while(canContinue){
          
          if(tempX<9 && tempX>0 && tempY<9 && tempY>0 && piecesLocation[tempX][tempY] != this.color){
            console.log("bishop-2");
            if(piecesLocation[tempX][tempY] == false){
             table[tempX][tempY].classList.add("posible_move");
            }else{
              table[tempX][tempY].classList.add("posible_attack");
              canContinue = false;
            }
            tempX--;
            tempY++;
          }else{
            canContinue = false;
          }
        }

        tempX = this.x;
        tempY = this.y;
       canContinue = true;

       tempX++;
       tempY--;

       while(canContinue){
        
         if(tempX<9 && tempX>0 && tempY<9 && tempY>0 && piecesLocation[tempX][tempY] != this.color){
          console.log("bishop-3");
           if(piecesLocation[tempX][tempY] == false){
            table[tempX][tempY].classList.add("posible_move");
           }else{
             table[tempX][tempY].classList.add("posible_attack");
             canContinue = false;
           }
           tempX++;
           tempY--;
         }else{
           canContinue = false;
         }
       }

       tempX = this.x;
       tempY = this.y;
      canContinue = true;

      tempX--;
      tempY--;

      while(canContinue){
  
        if(tempX<9 && tempX>0 && tempY<9 && tempY>0 && piecesLocation[tempX][tempY] != this.color){
          console.log("bishop-4");
          if(piecesLocation[tempX][tempY] == false){
           table[tempX][tempY].classList.add("posible_move");
          }else{
            table[tempX][tempY].classList.add("posible_attack");
            canContinue = false;
          }
          tempX--;
          tempY--;
        }else{
          canContinue = false;
        }
      }


      }
      if(this.type == "queen"){//queen

        let canContinue = true;
        let tempX = this.x;
        let tempY = this.y;


        console.log("queen");
        tempX++;
        while(canContinue){
  
          if(tempX<9 && tempX>0 && tempY<9 && tempY>0 && piecesLocation[tempX][tempY] != this.color){
            console.log("queen-1");
            if(piecesLocation[tempX][tempY] == false){
             table[tempX][tempY].classList.add("posible_move");
            }else{
              table[tempX][tempY].classList.add("posible_attack");
              canContinue = false;
            }
            tempX++;
            
          }else{
            canContinue = false;
          }

        }
          canContinue = true;
           tempX = this.x;
           tempY = this.y;

          tempY++;
          while(canContinue){
    
            if(tempX<9 && tempX>0 && tempY<9 && tempY>0 && piecesLocation[tempX][tempY] != this.color){
              console.log("queen-2");
              if(piecesLocation[tempX][tempY] == false){
               table[tempX][tempY].classList.add("posible_move");
              }else{
                table[tempX][tempY].classList.add("posible_attack");
                canContinue = false;
              }
              tempY++;
              
            }else{
              canContinue = false;
            }
          }

          canContinue = true;
           tempX = this.x;
           tempY = this.y;

          tempY--;
          while(canContinue){
    
            if(tempX<9 && tempX>0 && tempY<9 && tempY>0 && piecesLocation[tempX][tempY] != this.color){
              console.log("queen-3");
              if(piecesLocation[tempX][tempY] == false){
               table[tempX][tempY].classList.add("posible_move");
              }else{
                table[tempX][tempY].classList.add("posible_attack");
                canContinue = false;
              }
              tempY--;
              
            }else{
              canContinue = false;
            }
          }


          canContinue = true;
           tempX = this.x;
           tempY = this.y;

          tempX--;
          while(canContinue){
    
            if(tempX<9 && tempX>0 && tempY<9 && tempY>0 && piecesLocation[tempX][tempY] != this.color){
              console.log("queen-4");
              if(piecesLocation[tempX][tempY] == false){
               table[tempX][tempY].classList.add("posible_move");
              }else{
                table[tempX][tempY].classList.add("posible_attack");
                canContinue = false;
              }
              tempX--;
              
            }else{
              canContinue = false;
            }
          }
          tempX = this.x;
          tempY = this.y;
          canContinue = true;
          tempX++;
          tempY++;
  
          while(canContinue){
        
            if(tempX<9 && tempX>0 && tempY<9 && tempY>0 && piecesLocation[tempX][tempY] != this.color){
              console.log("quuen-5");
              if(piecesLocation[tempX][tempY] == false){
               table[tempX][tempY].classList.add("posible_move");
              }else{
                table[tempX][tempY].classList.add("posible_attack");
                canContinue = false;
              }
              tempX++;
              tempY++;
            }else{
              canContinue = false;
            }
          }

           tempX = this.x;
           tempY = this.y;//resets the value of tempX and tempY
          canContinue = true;//so it can start the next loop
  
          tempX--;
          tempY++;
  
          while(canContinue){
            
            if(tempX<9 && tempX>0 && tempY<9 && tempY>0 && piecesLocation[tempX][tempY] != this.color){
              console.log("quuen-6");
              if(piecesLocation[tempX][tempY] == false){
               table[tempX][tempY].classList.add("posible_move");
              }else{
                table[tempX][tempY].classList.add("posible_attack");
                canContinue = false;
              }
              tempX--;
              tempY++;
            }else{
              canContinue = false;
            }
          }
  
          tempX = this.x;
          tempY = this.y;
         canContinue = true;
  
         tempX++;
         tempY--;
  
         while(canContinue){
          
           if(tempX<9 && tempX>0 && tempY<9 && tempY>0 && piecesLocation[tempX][tempY] != this.color){
            console.log("quuen-7");
             if(piecesLocation[tempX][tempY] == false){
              table[tempX][tempY].classList.add("posible_move");
             }else{
               table[tempX][tempY].classList.add("posible_attack");
               canContinue = false;
             }
             tempX++;
             tempY--;
           }else{
             canContinue = false;
           }
         }
  
         tempX = this.x;
         tempY = this.y;
        canContinue = true;
  
        tempX--;
        tempY--;
  
        while(canContinue){//a while for every direction the piece can go
    
          if(tempX<9 && tempX>0 && tempY<9 && tempY>0 && piecesLocation[tempX][tempY] != this.color){
            console.log("quuen-8");
            if(piecesLocation[tempX][tempY] == false){
             table[tempX][tempY].classList.add("posible_move");
            }else{
              table[tempX][tempY].classList.add("posible_attack");
              canContinue = false;
            }
            tempX--;
            tempY--;
          }else{
            canContinue = false;
          }
        }









      }
      if(this.type == "king"){//king
        let tempX = this.x;//temporary variable used for if. so i dont change everywhere the value
        let tempY = this.y;

        tempX = this.x-1;
        tempY = this.y;
        if(tempX < 9 && tempX > 0  && tempY < 9 && tempY > 0 && piecesLocation[tempX][tempY] != this.color){
          console.log("king-1");
          if(piecesLocation[tempX][tempY] == false){
             table[tempX][tempY].classList.add("posible_move");
            }else{
              table[tempX][tempY].classList.add("posible_attack");
              
            }
        }

        tempX = this.x-1;
        tempY = this.y+1;
        if(tempX < 9 && tempX > 0  && tempY < 9 && tempY > 0 && piecesLocation[tempX][tempY] != this.color){
          console.log("king-2");
          if(piecesLocation[tempX][tempY] == false){
             table[tempX][tempY].classList.add("posible_move");
            }else{
              table[tempX][tempY].classList.add("posible_attack");
              
            }
        }

        tempX = this.x;
        tempY = this.y+1;
        if(tempX < 9 && tempX > 0  && tempY < 9 && tempY > 0 && piecesLocation[tempX][tempY] != this.color){
          console.log("king-3");
          if(piecesLocation[tempX][tempY] == false){
             table[tempX][tempY].classList.add("posible_move");
            }else{
              table[tempX][tempY].classList.add("posible_attack");
              
            }
        }

        tempX = this.x+1;
        tempY = this.y+1;
        if(tempX < 9 && tempX > 0  && tempY < 9 && tempY > 0 && piecesLocation[tempX][tempY] != this.color){
          console.log("king-4");
          if(piecesLocation[tempX][tempY] == false){
             table[tempX][tempY].classList.add("posible_move");
             console.log("inside a");
            }else{
              table[tempX][tempY].classList.add("posible_attack");
              console.log("inside b");
            }
        }
       
        tempX = this.x+1;
        tempY = this.y;
        if(tempX < 9 && tempX > 0  && tempY < 9 && tempY > 0 && piecesLocation[tempX][tempY] != this.color){
          console.log("king-5");
          if(piecesLocation[tempX][tempY] == false){
             table[tempX][tempY].classList.add("posible_move");
            }else{
              table[tempX][tempY].classList.add("posible_attack");
              
            }
        }

        tempX = this.x+1;
        tempY = this.y-1;
        if(tempX < 9 && tempX > 0  && tempY < 9 && tempY > 0 && piecesLocation[tempX][tempY] != this.color){
          console.log("king-6");
          if(piecesLocation[tempX][tempY] == false){
             table[tempX][tempY].classList.add("posible_move");
            }else{
              table[tempX][tempY].classList.add("posible_attack");
              
            }
        }

        tempX = this.x;
        tempY = this.y-1;
        if(tempX < 9 && tempX > 0  && tempY < 9 && tempY > 0 && piecesLocation[tempX][tempY] != this.color){
          console.log("king-7");
          if(piecesLocation[tempX][tempY] == false){
             table[tempX][tempY].classList.add("posible_move");
            }else{
              table[tempX][tempY].classList.add("posible_attack");
              
            }
        }

        tempX = this.x-1;
        tempY = this.y-1;
        if(tempX < 9 && tempX > 0  && tempY < 9 && tempY > 0 && piecesLocation[tempX][tempY] != this.color){
          console.log("king-8");
          if(piecesLocation[tempX][tempY] == false){
             table[tempX][tempY].classList.add("posible_move");
            }else{
              table[tempX][tempY].classList.add("posible_attack");
              
            }
        }













      }
      if(this.type == "rook"){//rook

        let canContinue = true;
        let tempX = this.x;
        let tempY = this.y;


        console.log("rook");
        tempX++;

        while(canContinue){
  
          if(tempX<9 && tempX>0 && tempY<9 && tempY>0 && piecesLocation[tempX][tempY] != this.color){
            console.log("rook-1");
            if(piecesLocation[tempX][tempY] == false){
             table[tempX][tempY].classList.add("posible_move");
             console.log("1");
            }else{
              table[tempX][tempY].classList.add("posible_attack");
              canContinue = false;
              console.log("2");
            }
            tempX++;
            
          }else{
            canContinue = false;
          }

        }
          canContinue = true;
           tempX = this.x;
           tempY = this.y;

          tempY++;
          while(canContinue){
    
            if(tempX<9 && tempX>0 && tempY<9 && tempY>0 && piecesLocation[tempX][tempY] != this.color){
              console.log("rook-2");
              if(piecesLocation[tempX][tempY] == false){
               table[tempX][tempY].classList.add("posible_move");
              }else{
                table[tempX][tempY].classList.add("posible_attack");
                canContinue = false;
              }
              tempY++;
              
            }else{
              canContinue = false;
            }
          }

          canContinue = true;
           tempX = this.x;
           tempY = this.y;

          tempY--;
          while(canContinue){
    
            if(tempX<9 && tempX>0 && tempY<9 && tempY>0 && piecesLocation[tempX][tempY] != this.color){
              console.log("rook-3");
              if(piecesLocation[tempX][tempY] == false){
               table[tempX][tempY].classList.add("posible_move");
              }else{
                table[tempX][tempY].classList.add("posible_attack");
                canContinue = false;
              }
              tempY--;
              
            }else{
              canContinue = false;
            }
          }


          canContinue = true;
           tempX = this.x;
           tempY = this.y;

          tempX--;
          while(canContinue){
    
            if(tempX<9 && tempX>0 && tempY<9 && tempY>0 && piecesLocation[tempX][tempY] != this.color){
              console.log("rook-4");
              if(piecesLocation[tempX][tempY] == false){
               table[tempX][tempY].classList.add("posible_move");
              }else{
                table[tempX][tempY].classList.add("posible_attack");
                canContinue = false;
              }
              tempX--;
              
            }else{
              canContinue = false;
            }
          }

        
      }
    }

    possibleMove(thisMove, x, y){
      console.log("moved to position");
      this.declareNewPosition(x, y);
      thisMove.innerHTML = this.emptyPosition();//piece location var have to be changed(clear the initial position to false, new position = this.type)
      this.clearTable();
      this.x = x;//updates the location in class
      this.y = y;
      this.exchangeMovePawn();
    }


    attackMove1(){
      console.log("attack-1");
      piecesLocation[this.x][this.y] = false;
      valuesOfPieceWhenAttacks[0] = this.color;
      valuesOfPieceWhenAttacks[1] = table[this.x][this.y].innerHTML;
      table[this.x][this.y].innerHTML = "";


    }
    attackMove2(thisMove,  x, y){
      console.log("attack-2");
      piecesLocation[x][y] = valuesOfPieceWhenAttacks[0];
      thisMove.innerHTML = valuesOfPieceWhenAttacks[1];
      this.x = x;
      this.y = y;
      this.exchangeMovePawn();
    }


    exchangeMovePawn(){
      if(this.type == "pawn" && (this.x == 1 || this.x == 8)){//where we excahnge pawn if it reaches x 1 or 8
        console.log(`exchange position for pawn reached -- ${this.type}`);
        if(this.color == "white"){
          console.log(`selecting white elements ${white_deleted1.childNodes.length}  ${white_deleted2.childNodes.length}`)
          if(white_deleted1.childNodes.length != 0){
            for(i = 0; i < white_deleted1.childNodes.length - 1; i++){
              console.log("added class for excgange piece")
              white_deleted1[i].classList.add(`exchange_piece`);
            }
          }
        }
      }
    }


    deletePiece(){
      
      if(this.color == "white"){
        if(white_deleted1.childElementCount <8){//there are 2 collumns---8 pieces on each one
          console.log("white-22");
        white_deleted1.innerHTML += `<div class="deleted_piece">${table[this.x][this.y].innerHTML}</div>`;
        }else{
          console.log("white-22");
        white_deleted2.innerHTML += `<div class="deleted_piece">${table[this.x][this.y].innerHTML}</div>`;
        }
        
      }else{
        if(black_deleted1.childElementCount <8){
          console.log(" black-22");
        black_deleted1.innerHTML += `<div class="deleted_piece">${table[this.x][this.y].innerHTML}</div>`;
        }else{
          console.log("black-22");
        black_deleted2.innerHTML += `<div class="deleted_piece">${table[this.x][this.y].innerHTML}</div>`;
        }
      }
      
      //var numberOfChildren = element.getElementsByTagName('*').length

      console.log(`piece deleted ${this.type} ${this.color}`);
      table[this.x][this.y].innerHTML = "";//there it deletes the piece
      piecesLocation[this.x][this.y] = false;
      this.clearTable();
      positionOfDeletedPiece[0] = this.x;//returns the coordinates so it knows where to move the piece who attacked this one
      positionOfDeletedPiece[1] = this.y;
       if(this.type == "king"){
         console.log(`GAME END KING ${this.color.toUpperCase()} DIED`);
         kingAlive = false;
         gameEnd(this.color);
       }
    }


    emptyPosition(){
      let a = table[this.x][this.y].innerHTML;
      table[this.x][this.y].innerHTML = "";
      return a;
    }

    declareNewPosition(x, y){
      
      piecesLocation[this.x][this.y] = false;
      piecesLocation[x][y] = this.color;//updates the location in 2d array
      console.log(`declare new position ${piecesLocation[x][y]}`);
    }

    clearTable(){     //removes the posible_move class from the html classList
      console.log("clearing the classes");

      var elements = document.querySelectorAll('.posible_attack');
      for (var i = 0; i < elements.length; i++) {//removes the red border
      elements[i].classList.remove('posible_attack');
      }

      var elements1 = document.querySelectorAll('.posible_move');
      for ( i = 0; i < elements1.length; i++) {//removes the blue border
      elements1[i].classList.remove('posible_move');
      }
      console.log(piecesLocation);
      
    }

}
//pieces objects
//white
let pawn1_white = new Pieces("pawn", "white" ,2 ,1 );//white pawns 
let pawn2_white = new Pieces("pawn", "white" ,2 ,2 );
let pawn3_white = new Pieces("pawn", "white" ,2 ,3 );
let pawn4_white = new Pieces("pawn", "white" ,2 ,4 );
let pawn5_white = new Pieces("pawn", "white" ,2 ,5 );
let pawn6_white = new Pieces("pawn", "white" ,2 ,6 );
let pawn7_white = new Pieces("pawn", "white" ,2 ,7 );
let pawn8_white = new Pieces("pawn", "white" ,2 ,8 );

let rook1_white = new Pieces("rook", "white", 1 ,1);//white rooks
let rook2_white = new Pieces("rook", "white", 1 ,8);

let knight1_white = new Pieces("knight", "white", 1, 2); //white knights
let knight2_white = new Pieces("knight", "white", 1, 7);

let bishop1_white = new Pieces("bishop", "white", 1, 3);//white bishops
let bishop2_white = new Pieces("bishop", "white", 1, 6);

let king_white = new Pieces("king", "white", 1, 4);//king and queen
let queen_white = new Pieces("queen", "white", 1, 5);


//black
let pawn1_black = new Pieces("pawn", "black" ,7 ,1 );//black pawns 
let pawn2_black = new Pieces("pawn", "black" ,7 ,2 );
let pawn3_black = new Pieces("pawn", "black" ,7 ,3 );
let pawn4_black = new Pieces("pawn", "black" ,7 ,4 );
let pawn5_black = new Pieces("pawn", "black" ,7 ,5 );
let pawn6_black = new Pieces("pawn", "black" ,7 ,6 );
let pawn7_black = new Pieces("pawn", "black" ,7 ,7 );
let pawn8_black = new Pieces("pawn", "black" ,7 ,8 );

let rook1_black = new Pieces("rook", "black", 8 ,1);//black rooks
let rook2_black = new Pieces("rook", "black", 8 ,8);

let knight1_black = new Pieces("knight", "black", 8, 2); //black knights
let knight2_black = new Pieces("knight", "black", 8, 7);

let bishop1_black = new Pieces("bishop", "black", 8, 3);//black bishops
let bishop2_black = new Pieces("bishop", "black", 8, 6);

let king_black = new Pieces("king", "black", 8, 4);//king and queen
let queen_black = new Pieces("queen", "black", 8, 5);



//add eventLsitener for evrery squere


for(let i = 1; i<9; i++){
  for(let j=1; j<9; j++){
    table[i][j].addEventListener('click', function(){ check(table[i][j], i, j) });
  }
}




//turn div

let showTurn = document.getElementById("turn");

function turnChange(colorTurn){
  if(colorTurn == "white"){
    colorTurn = "black";
  }else{
    colorTurn = "white";
  }
  if(turn == 0){
    colorTurn = "white";
  }
showTurn.innerHTML = `<h1>Turn ${turn}----------${colorTurn}</h1>`
}
turnChange("white");//it starts the turn div

function gameEnd(colorTurn){
  if(colorTurn == "white"){
    colorTurn = "black";
  }else{
    colorTurn = "white";
  }
  showTurn.innerHTML = `<h1>${colorTurn.toUpperCase()}   WON</h1>`
}


