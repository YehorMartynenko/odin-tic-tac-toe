const Gameboard = (function() {
    const size = 3;
    

    const createBoard = () => {
        const arr = [];
        for(let i = 0; i<size; i++){
            arr[i] = [];
                for(let j = 0; j<size; j++){
                    arr[i].push(createCell());
                }
        }
        return arr;
    }

    let board = createBoard();

    const resetBoard = () => {
        board = createBoard();
    }

    const getBoard = () => board;

    const markCell = (row, column, playerMark) => {
        if(board[row][column].getValue() === ""){
            board[row][column].addMark(playerMark);
            return true;
        } else {
            console.log("You have to pick empty cell");
            return false;
        }
    };

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
        return boardWithCellValues;
    };

    return { getBoard, markCell, printBoard, resetBoard };
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
    let winner = null;
    
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

    const newGame = () => {
        Gameboard.printBoard();
        Gameboard.resetBoard();
        winner = null;
        activePlayer = players[0];
        printNewRound();
    }

    const checkWin = () => {
        const board = Gameboard.printBoard();
        
        const getLines = (arr) => {
            const lines = [];
            //rows
            for(let i = 0; i<arr.length; i++){
                lines.push(arr[i]);
            }

            //columns 
            const getColumn = (arr, index) => arr.map(el => el[index]);
            for(let i = 0; i<arr.length; i++){
                lines.push(getColumn(arr, i));
            }
            
            //diagonals 
            const diagonalOne = [];
            const diagonalTwo = [];
            for(let i = 0; i<arr.length; i++){
                diagonalOne.push(arr[i][i]);
                diagonalTwo.push(arr[i][arr.length-(i+1)]);
            }
            lines.push(diagonalOne);
            lines.push(diagonalTwo)

            return lines;
        }

        
        const isEqual = (arrLine, index) => {
            const element = arrLine[index][0];
            console.log(`checking line ${arrLine[index]}, element ${element}`);
            return arrLine[index].every(el => el === element && el != "");
        }

        const checkEquality = () => {
            const arr = getLines(board);

            for(let i = 0; i<arr.length; i++){
                console.log(`Checking for equality ${arr[i]}`);
                if(isEqual(arr, i)){
                    console.log("true");
                    return true;
                } else {
                    console.log("false");
                }
            }
            return false;
        }
        return checkEquality();
    }

    

    const playRound = (row, column) => {
        console.log(`${getActivePlayer().name} puts ${getActivePlayer().mark} into row ${row}, column ${column}`);
        if(!Gameboard.markCell(row, column, getActivePlayer().mark)) {
            printNewRound();
        } else {
            if(checkWin()){
                winner = getActivePlayer();
                console.log(`${winner.name} won`);
                newGame();
            } else {
                switchActivePlayer();
                printNewRound();
            }
        }
    };

    printNewRound();

    return {
        playRound,
        getActivePlayer,
        getBoard: Gameboard.getBoard,
        newGame,
    }
    
})();