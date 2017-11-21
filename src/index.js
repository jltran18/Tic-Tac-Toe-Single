/**
 * Created by jessica.tran on 9/9/15.
 */
var board;
var player;
var gameOver;
var matchGame;
var winCombos = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

function start() {
    board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    player = 'X';
    text();
    gameOver = false;
    clearBoard();
}

function text() {
    var text = "Player " + player + "'s turn";
    $('.playerTurn').html(text);
}

function switchPlayer() {
    if(player == 'X') {
        player = 'O';
    } else {
        player = 'X';
    }
}

function setCell(cell){
    if (gameOver || board[cell] != " ") {return}
    board[cell] = player;

    if (player == "X") {
        var xp = $("<div class='xPlayer' />");
        $('.c'+cell).append(xp);
    } else {
        var op = $("<div class='oPlayer' />");
        $('.c'+cell).append(op);
    }

    console.log(player);
    checkWin();
    if (gameOver) {return}
    switchPlayer();
    text();
}

function checkWin() {
    matchGame = false;
    $.each(winCombos, function (index) {
        if (
            board[winCombos[index][0]] == board[winCombos[index][1]]
            &&
            board[winCombos[index][0]] == board[winCombos[index][2]]
            &&
            board[winCombos[index][0]] != " "
        ) {
            $('.winner').html('Player ' + player + ' is the winner!');
            gameOver = true;
            matchGame = true;

        } else if(checkTie() && !matchGame) {
            var text = "Tie game. Play again!";
            $('.winner').html(text);
            gameOver = true;
        }
    })

}

function checkTie(){
    var isTie = true;
    for(var i=0; i<board.length; i++){
        if(board[i] == " "){
            isTie = false;
        }
    }
    return isTie;
}

function clearBoard() {
    for(var i=0; i<board.length; i++) {
        $('div').remove('.xPlayer').remove('.oPlayer');
        $('.winner').html("");
    }
}

$(document).ready(function() {
    start();
});