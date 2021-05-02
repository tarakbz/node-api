const {Sequelize, DataTypes} = require('sequelize')
const bcrypt = require('bcrypt')
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user')
const pokemons = require('./mock-pokemon')

const sequelize = new Sequelize('pokedex', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

const Pokemon = PokemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

const initDb = () => {
    return sequelize.sync({force: true}).then(_ => {
        console.log('Init DB')
        pokemons.map(pokemon => {
            Pokemon.create({
                name: pokemon.name,
                hp: pokemon.hp,
                cp: pokemon.cp,
                picture: pokemon.picture,
                types: pokemon.types
            }).then(pokemon => console.log(pokemon.toJSON()))
        });
        bcrypt.hash('advil', 10)
            .then(hash => {
                User.create({
                    username: "advil",
                    password: hash
                }).then(user => console.log(user.toJSON()))
            })

        console.log('La base de donnée a bien été initialisée !')
    })
}

module.exports = {
    initDb, Pokemon, User
}
