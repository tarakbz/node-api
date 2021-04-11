const express = require('express');
const {success} = require('./helper');
const pokemons = require('./mock-pokemon');
const app = express();

// exemple plus simple
// const logger = (req, res, next) => {
//     console.log("Time: " + Date.now());
//     console.log("Url: " + req.url);
//     next();
// }
// // middleware application
// app.use(logger);

// middleware application
app.use((req, res, next) => {
    console.log("Time: " + Date.now());
    console.log("Url: " + req.url);
    next();
});


app.get("/", (req, res) => res.send("hello express 3"));

app.get("/pokemons/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = "un pokemon a ete trouver";
    res.json(success(message, pokemon));
});


app.get("/pokemons", (req, res) => {
    const message = "la liste des pokemons a bien etait retourner";
    res.json(success(message, pokemons));
});

const port = 3000;
app.listen(port, () => {
    console.log("notre application ecoute http://localhost:" + port + "/")
})
