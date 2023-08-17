window.addEventListener("load", async (event) => {
    let inputSubmit = document.querySelector("#inputSubmit");

    inputSubmit.addEventListener("click", async (event) => {
        let cols = document.querySelector("#cols").value;
        let lines = document.querySelector("#lines").value;
        let mines = document.querySelector("#mines").value;

        let data = await ApiTools.fetchData(`https://minesweeper.js.apprendre-est.fun/generate_grid.php?rows=${lines}&cols=${cols}&mines=${mines}`);

        console.log(data)

        // Supposons que vous avez un conteneur HTML avec l'ID "game-grid" pour afficher la grille
        let gridContainer = document.getElementById("game-grid");

        // Effacer le contenu précédent du conteneur s'il y en avait
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
                cellElement.classList.add("grid-cell"); // Ajouter des classes pour le style
                cellElement.dataset.row = row; // Ajouter un attribut personnalisé pour le numéro de ligne
                cellElement.dataset.col = col; // Ajouter un attribut personnalisé pour le numéro de colonne

                // Ajouter la case à la grille
                gridContainer.appendChild(cellElement);
            }
        }

        // Ajout des gestionnaires d'événements "click" aux cases
        let gridCells = document.querySelectorAll(".grid-cell");
        gridCells.forEach((cell) => {
            cell.addEventListener("click", () => {
                const row = cell.dataset.row; // Récupérer la valeur du numéro de ligne
                const col = cell.dataset.col; // Récupérer la valeur du numéro de colonne
                const cellValue = data[row][col]; // Récupérer la valeur de la case dans le tableau data

                if (cellValue === 0) {
                    // Gérer le cas où la case ne contient pas de mine (0)
                    cell.classList.add("discovered"); // Appliquer un style différent pour les cases découvertes
                    // Ajoutez ici la logique pour révéler les cases adjacentes si elles ne contiennent pas de mine
                } else if (cellValue === 1) {
                    // Gérer le cas où la case contient une mine (1)
                    cell.classList.add("mine"); // Appliquer un style différent pour les cases contenant une mine
                    // Ajoutez ici la logique pour gérer la fin de partie (perdu)
                }

                // Mettez en place la logique d'interaction en fonction de la valeur de cellValue
                // Par exemple, révéler si la case contient une mine, mettre à jour l'affichage, etc.
            });
        });
    }); // Fermez la parenthèse pour l'écouteur d'événements "click" du bouton "inputSubmit"
}); // Fermez la parenthèse pour l'écouteur d'événements "load"
