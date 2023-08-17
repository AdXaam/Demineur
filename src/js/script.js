window.addEventListener("load", async (event) => {
    let inputSubmit = document.querySelector("#inputSubmit");

    inputSubmit.addEventListener("click", async (event) => {
        let cols = document.querySelector("#cols").value;
        let lines = document.querySelector("#lines").value;
        let mines = document.querySelector("#mines").value;

        let data = await ApiTools.fetchData(`https://minesweeper.js.apprendre-est.fun/generate_grid.php?rows=${lines}&cols=${cols}&mines=${mines}`);

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
    }); // Ajoutez la fermeture des parenthèses pour l'écouteur d'événements "click" ici
}); // Ajoutez la fermeture des parenthèses pour l'écouteur d'événements "load" ici
