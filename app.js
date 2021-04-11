const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon')

const {success , getUniqueId} = require('./helper');
const pokemons = require('./mock-pokemon');
const app = express();


app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'));


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

app.post('/pokemons', ((req, res) => {
    const pokemonCreated = {...req.body, ...{id: getUniqueId(pokemons), created: new Date()}};
    pokemons.push(pokemonCreated);
    const message = "un pokemon a ete ajouter";
    res.json(success(message, pokemonCreated));
}))

const port = 3000;
app.listen(port, () => {
    console.log("notre application ecoute http://localhost:" + port + "/")
})
