var player = 'O';
let gameActive = true;

let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

const statusDiv = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');

restartBtn.addEventListener('click', restartGame);

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', cellClick);
});

function changeTurn() {
    player = player === 'O' ? 'X' : 'O';
    statusDiv.textContent = "Player " + player + "'s turn";
}

function cellClick(event) {

    if (!gameActive) return;

    const cell = event.target;
    const row = cell.dataset.row;
    const col = cell.dataset.col;

    if (board[row][col] !== "") return;

    board[row][col] = player;
    cell.textContent = player;

    const result = checkBoard();

    if (result === "X" || result === "O") {
        statusDiv.textContent = result + " wins!";
        gameActive = false;
        return;
    }

    if (result === "draw") {
        statusDiv.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    changeTurn();
}

function checkBoard() {

    const size = board.length;
    let lines = [];

    // Rows
    for (let r = 0; r < size; r++) {
        lines.push(board[r]);
    }

    // Columns
    for (let c = 0; c < size; c++) {
        let column = [];
        for (let r = 0; r < size; r++) {
            column.push(board[r][c]);
        }
        lines.push(column);
    }

    // Diagonal ↘
    let diag1 = [];
    for (let i = 0; i < size; i++) {
        diag1.push(board[i][i]);
    }
    lines.push(diag1);

    // Diagonal ↙
    let diag2 = [];
    for (let i = 0; i < size; i++) {
        diag2.push(board[i][size - 1 - i]);
    }
    lines.push(diag2);

    // Check for winner
    for (let line of lines) {
        if (line[0] !== "" && line.every(cell => cell === line[0])) {
            return line[0]; // "X" or "O"
        }
    }

    // Check for draw
    for (let row of board) {
        if (row.includes("")) {
            return null; // still running
        }
    }

    return "draw";
}

function restartGame() {

    player = 'O';
    gameActive = true;

    board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = "";
    });

    statusDiv.textContent = "Player " + player + "'s turn";
}
