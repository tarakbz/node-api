const {ValidationError, UniqueConstraintError} = require("sequelize");
const {Pokemon} = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.put('/api/pokemons/:id', auth, (req, res) => {
        const id = req.params.id
        Pokemon.update(req.body, {
            where: {id: id}
        })
            .then(_ => {
                // return pass the error to the last catch
                return Pokemon.findByPk(id).then(pokemon => {
                    if (pokemon === null) {
                        const message = "le pokémon n'existe pas."
                        return res.status(404).json({message})
                    }
                    const message = `Le pokémon ${pokemon.name} a bien été modifié.`
                    res.json({message, data: pokemon})
                })
            })
            .catch(error => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({message: error.message, data: error});
                }
                if (error instanceof UniqueConstraintError) {
                    return res.status(400).json({message: error.message, data: error});
                }
                const message = "le pokémon n'a pas pu etre modifié";
                res.status(500).json({message, data: error})
            })
    })
}
