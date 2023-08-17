class ApiTools{

    url = "https://minesweeper.js.apprendre-est.fun/generate_grid.php?rows=2&cols=2&mines=2"

    static async fetchData(url){
        //Requete et attente de reponse
        let response = await fetch(url);
        // Attends le resultat de la requete
        let data = await response.json();

        return data;

    }

}