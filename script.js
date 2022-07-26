const gameBoard = () => {
    function start() {
        for (let i = 0; i < 9; i++) {
            const space = document.createElement("div");
            const text = document.createElement("h3");

            space.classList.add("space");
            space.classList.add("default");

            space.onclick = () => {
                if (space.classList.contains("default")) {
                    if (player1.turn == true) {
                        space.textContent = "X";
                        player1.turn = false;
                        player2.turn = true;
                        space.classList.add("X");
                        space.classList.remove("default");
                    } else {
                        space.textContent = "O";
                        player1.turn = true;
                        player2.turn = false;
                        space.classList.add("O");
                        space.classList.remove("default");
                    }
                }
                if (checkWin("O") || checkWin("X")) {
                    winner();
                }
            };
            document.querySelector(".gameBoard").appendChild(space);
            document.querySelector(".gameBoard").appendChild(text);
        }
    }
    const winnerCombo = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    function checkWin(current) {
        const elements = document.querySelectorAll(".space");
        return newGame.winnerCombo.some(combination => {
            return combination.every(index => {
                console.log(elements[index].classList.contains(current))
                return elements[index].classList.contains(current);
            })
        })
    }

    function winner() {
        if (player1.turn == false) {
            document.querySelector(".winner").textContent = "X has won!"
        }
        if (player2.turn == false) {
            document.querySelector(".winner").textContent = "O has won!"
        }
        document.querySelectorAll(".space").forEach(function(e) {
            e.classList.remove("default");
        })
    }
    const restart = document.querySelector(".restart").onclick = () => {
        document.querySelectorAll(".space").forEach(function(e) {
            e.textContent = "";
            e.classList.remove("O");
            e.classList.remove("X");
            e.classList.add("default");
        })
        document.querySelector(".winner").textContent = "";
        player1.turn = true;
        player2.turn = false;
    };
    return { winnerCombo, restart, start, checkWin, winner };

}

const player = (name, turn) => {
    return { name, turn };
};

const player1 = player('player1', true);
const player2 = player("player2", false);
const newGame = gameBoard();

newGame.start();