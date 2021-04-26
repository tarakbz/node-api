const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const {Sequelize} = require("sequelize");

const {success, getUniqueId} = require('./helper');
let pokemons = require('./mock-pokemon');

const app = express();


const sequelize = new Sequelize(
   'pokedex',
    'root',
    '',
    {
        host: 'localhost',
        dialect : 'mysql'
    }
);

sequelize.authenticate()
    .then(_ => console.log("connection a la base de donnees a bien ete effectuer"))
    .catch(error => console.log('Impossible de se connecter a la base de donnees ' + error));

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json());


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

app.post('/pokemons', (req, res) => {
    const pokemonCreated = {...req.body, ...{id: getUniqueId(pokemons), created: new Date()}};
    pokemons.push(pokemonCreated);
    const message = "un pokemon a ete ajouter";
    res.json(success(message, pokemonCreated));
});

app.put('/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemonUpdate = {...req.body, id: id};
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id ? pokemonUpdate : pokemon
    });
    const message = "un pokemon a ete modifier";
    res.json(success(message, pokemonUpdate));
});

app.delete('/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id);
    pokemons = pokemons.filter(pokemon => pokemon.id !== id);
    const message = "un pokemon a ete supprimer";
    res.json(success(message, pokemonDeleted));
});

const port = 3000;
app.listen(port, () => {
    console.log("notre application ecoute http://localhost:" + port + "/")
})
