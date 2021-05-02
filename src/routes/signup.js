const bcrypt = require('bcrypt')
const {UniqueConstraintError} = require("sequelize");
const {User} = require('../db/sequelize')


module.exports = (app) => {
    app.post('/api/signup', (req, res) => {
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                User.create({
                    username: req.body.username,
                    password: hash
                }).then(user => {
                        const message = `L'utilisateur a été creer avec succès`;
                        return res.json({message, data: user})
                    }
                )
                    .catch(error => {
                        if (error instanceof UniqueConstraintError) {
                            return res.status(400).json({message: error.message, data: error});
                        }

                    })
            })
    })
}
