const {Pokemon} = require('../db/sequelize')
const auth = require('../auth/auth')
module.exports = (app) => {
    // ajouter ici auth pour la securite
    app.delete('/api/pokemons/:id', (req, res) => {
        Pokemon.findByPk(req.params.id).then(pokemon => {
            const pokemonDeleted = pokemon;
            if (pokemon === null) {
                const message = "le pokémon n'existe pas."
                return res.status(404).json({message})
            }
            return Pokemon.destroy({
                where: {id: pokemon.id}
            })
                .then(_ => {
                    const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`
                    res.json({message, data: pokemonDeleted})
                })
        })
            .catch(error => {
                const message = "le pokémon n'a pas pu etre supprimé";
                res.status(500).json({message, data: error})
            })
    })
}
