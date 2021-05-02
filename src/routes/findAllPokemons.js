const {Op} = require("sequelize");
const {Pokemon} = require('../db/sequelize')

module.exports = (app) => {
    app.get('/api/pokemons', (req, res) => {
        if (req.query.name) {
            const name = req.query.name;
            let limit = 5;
            if (req.query.limit) {
                limit = parseInt(req.query.limit);
            }
            return Pokemon.findAndCountAll({
                where: {
                    name: {
                        [Op.like]: '%' + name + '%'
                    }
                },
                limit: limit
            })
                .then(({count, rows}) => {
                    const message = 'il y a ' + count + ' pokémons qui correspondent a votre recherche ' + name;
                    res.json({message, data: rows})
                })
        }
        Pokemon.findAll()
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
