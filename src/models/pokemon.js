module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: "le nom du pokemon ne doit pas etre vide"},
                notNull: {msg: "le nom du pokemon est une proprietee requise"}
            }
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {msg: "utiliser uniquement des nombres entier pour les points de vie"},
                notNull: {msg: "les points de vie sont une proprietee requise"}
            }
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {msg: "utiliser uniquement des nombres entier pour les points de degats"},
                notNull: {msg: "les points de degats sont une proprietee requise"}
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: {msg: "utiliser un url valide pour les images"},
                notNull: {msg: "l'image est une proprietee requise"}
            }
        },
        types: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('types').split(',')
            },
            set(types) {
                this.setDataValue('types', types.join())
            }
        }
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}
