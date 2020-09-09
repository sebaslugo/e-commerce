const { DataTypes, Op } = require('sequelize');
//Exportamos una funcion que define el modelo de User,
//Le proveemos sequelize para su conexion con la misma.
module.exports = sequelize => {
    sequelize.define('User', {
        // Definimos los parametros con los que debe cumplir el "User" para poder ser creado
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Name must be joined!'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Email must be joined!'
                },
                isUnique: function (value, next) {
                    User.findAll({
                        where: {
                            email: value,
                            id: { [Op.ne]: this.id }
                        }
                    })
                        .then(function (user) {
                            if (user.length == 0) {
                                next();
                            } else {
                                next('Email is already used!');
                            }
                        })
                        .catch(error => {
                            next(error);
                        })
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Password must be joined!'
                },
                len: {
                    args: [8, 30],
                    msg: 'Password must be within the parameters'
                }
            }
        },
        birthday: {
            type: DataTypes.STRING,
            validate: {
                isBefore: '2004-01-01'
            }
            // verificar si funciona correctamente
        }
    })
}