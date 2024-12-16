const { DataTypes } = require('sequelize');
const { sequelize } = require('./database');

const Produto = sequelize.define('Produto', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    preco: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    categoriaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'produtos',
    timestamps: false, // Desativa createdAt e updatedAt
});

module.exports = { Produto };
