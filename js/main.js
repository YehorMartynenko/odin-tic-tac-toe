const Gameboard = (function() {
    const size = 3;
    const board = [];

    for(let i = 0; i<size; i++){
        board[i] = [];
        for(let j = 0; j<size; j++){
            board[i].push(createCell());
        }
    };

    const getBoard = () => board;

    const markCell = (row, column, playerMark) => {
        if(board[row][column].getValue() === ""){
            board[row][column].addMark(playerMark);
            return "Success";
        } else {
            console.log("You have to pick empty cell");
            return "Error";
        }
    };

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    };

    return { getBoard, markCell, printBoard };
})();

function createCell() {
    let value = "";

    const addMark = (playerMark) => {
        value = playerMark;
    };

    const getValue = () => {
        return value;
    };

    return { addMark, getValue };
}

const GameController = (function(playerOne = "Player One", playerTwo = "Player Two") {

    const players = [
        {
            name: playerOne,
            mark: "X",
        },
        {
            name: playerTwo,
            mark: "O"
        }
    ];

    let activePlayer = players[0];
    
    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => {
        return activePlayer;
    };

    const printNewRound = () => {
        Gameboard.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = (row, column) => {
        console.log(`${getActivePlayer().name} puts ${getActivePlayer().mark} into row ${row}, column ${column}`);
        if(Gameboard.markCell(row, column, getActivePlayer().mark) === "Error") {
            printNewRound();
        } else {
            switchActivePlayer();
            printNewRound();
        }
    };

    printNewRound();

    return {
        playRound,
        getActivePlayer,
        getBoard: Gameboard.getBoard()
    }
    
})();