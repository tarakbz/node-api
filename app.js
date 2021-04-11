const express = require('express');
const pokemons = require('./mock-pokemon')
const app = express();

const port = 3000;

app.get("/", (req, res) => res.send("hello express 3"));


app.get("/pokemon/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    res.json(pokemon)
});


app.get("/pokemons", (req, res) => {
    res.send("vous avez " + pokemons.length + " pokemons")
});

app.listen(port, () => {
    console.log("notre application ecoute http://localhost:" + port + "/")
})
