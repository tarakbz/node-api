const {Op} = require("sequelize");
const {Pokemon} = require('../db/sequelize')

module.exports = (app) => {
    app.get('/api/pokemons', (req, res) => {
        if (req.query.name) {
            const name = req.query.name;
            const limit = parseInt(req.query.limit) || 5;

            if (name.length < 2) {
                const message = 'la recherche doit contenir 2 caracteres ou plus.'
                return res.status(400).json({message})
            }

            return Pokemon.findAndCountAll({
                where: {
                    name: {
                        [Op.like]: '%' + name + '%'
                    }
                },
                limit: limit,
                order: [['name', 'ASC']]
            })
                .then(({count, rows}) => {
                    const message = 'il y a ' + count + ' pokémons qui correspondent a votre recherche ' + name;
                    res.json({message, data: rows})
                })
        }
        Pokemon.findAll({order: ['name']})
            .then(pokemons => {
                const message = 'La liste des pokémons a bien été récupérée.'
                res.json({message, data: pokemons})
            })
            .catch(error => {
                const message = "la list des pokémons n'a pas pu etre récupérée";
                res.status(500).json({message, data: error})
            })
    })
}
