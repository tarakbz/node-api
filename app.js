const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./src/db/sequelize');
const cors = require('cors')

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json())
    .use(cors());

sequelize.initDb();

app.get('/', (req, res) => {
    const message = "hello pokedex!";
    res.json({message});
});

// Endpoints
require('./src/routes/findAllPokemons')(app);
require('./src/routes/findPokemonByPk')(app);
require('./src/routes/createPokemon')(app);
require('./src/routes/updatePokemon')(app);
require('./src/routes/deletePokemon')(app);
require('./src/routes/login')(app);
require('./src/routes/signup')(app);

// Errors 404
app.use(({res}) => {
    const message = "Ressource introuvable!";
    res.status(404).json({message});
})

app.listen(port, () => {
    console.log("notre application ecoute http://localhost:" + port + "/")
})
