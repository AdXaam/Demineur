window.addEventListener("load", async (event) => {
    let inputSubmit = document.querySelector("#inputSubmit");

    inputSubmit.addEventListener("click", async (event) => {
        let cols = document.querySelector("#cols").value;
        let lines = document.querySelector("#lines").value;
        let mines = document.querySelector("#mines").value;

        let data = await ApiTools.fetchData(`https://minesweeper.js.apprendre-est.fun/generate_grid.php?rows=${lines}&cols=${cols}&mines=${mines}`);
        console.log(data)

        let gridContainer = document.getElementById("game-grid");

        gridContainer.innerHTML = "";
        gridContainer.style.gridTemplateColumns = `repeat(${cols}, 30px)`;
        gridContainer.style.gridTemplateRows = `repeat(${lines}, 30px)`;
        gridContainer.style.gap = "2px";
        gridContainer.style.marginTop = "10px";

        // Génération des cases de la grille

        for (let row = 0; row < lines; row++) {

            for (let col = 0; col < cols; col++) {

                const cellValue = data[row][col]; // Valeur de la case actuelle (0 ou 1)

                const cellElement = document.createElement("div");
                cellElement.classList.add("grid-cell");
                cellElement.dataset.row = row;
                cellElement.dataset.col = col;

                // Ajouter la case à la grille
                gridContainer.appendChild(cellElement);
            }
        }

        // Ajout des gestionnaires d'événements "click" aux cases
        let gridCells = document.querySelectorAll(".grid-cell");
        gridCells.forEach((cell) => {
            cell.addEventListener("click", () => {
                const row = parseInt(cell.dataset.row);
                const col = parseInt(cell.dataset.col);
                const cellValue = data[row][col];

                if (cellValue === 0) {

                    cell.classList.add("discovered");
                    revealAdjacentEmptyCells(row, col);
                } else if (cellValue === 1) {

                    cell.classList.add("mine");
                    handleGameOver(false);
                }

            });
        });

        // Fonction pour révéler les cases adjacentes vides (0) en indiquant le nombre de mines autour
        function revealAdjacentEmptyCells(row, col) {
            let minesCount = 0;

            for (let r = row - 1; r <= row + 1; r++) {
                for (let c = col - 1; c <= col + 1; c++) {
                    if (r >= 0 && r < lines && c >= 0 && c < cols) {
                        const adjacentCellValue = data[r][c];

                        if (adjacentCellValue === 1) {
                            minesCount++;
                        }
                    }
                }
            }

            const currentCell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            currentCell.textContent = minesCount;
            currentCell.classList.add("discovered");
        }

        // Fonction pour gérer la fin de partie (victoire ou défaite)
        function handleGameOver(isWin) {
            if (isWin) {
                alert("Vous avez gagné !");
            } else {
                alert("Vous avez perdu !");
            }
        }
    });
});
