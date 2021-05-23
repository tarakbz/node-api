const validTypes = [
    'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
    'Poison', 'Fée', 'Vol', 'Combat', 'Psy'
]
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
            unique:{
              msg : "le nom est deja pris"
            },
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
                notNull: {msg: "les points de vie sont une proprietee requise"},
                min: {
                    args: [1],
                    msg: "les points de vie ne peuvent pas etres inferieur a 1"
                },
                max: {
                    args: [99],
                    msg: "les points de vie sont limiter a 99"
                }
            }
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {msg: "utiliser uniquement des nombres entier pour les points de degats"},
                notNull: {msg: "les points de degats sont une proprietee requise"}
            },
            min: {
                args: [1],
                msg: "les points de degats ne peuvent pas etres inferieur a 1"
            },
            max: {
                args: [10],
                msg: "les points de degats sont limiter a 10"
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
            ,
            validate: {
                isTypeValide(value){
                    if(!value){
                        throw  new Error("un pokemon doit avoir au moins un type")
                    }
                    if(value.split(",").length > 3){
                        throw  new Error("un pokemon doit avoir maximum 3 types")
                    }
                    value.split(",").forEach(type =>{
                        if(!validTypes.includes(type)){
                            throw  new Error("le type "+ type + " est invalide il doit appartenir a cette liste " + validTypes)
                        }
                    })

                }
            }
        }
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}
