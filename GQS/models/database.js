const { Sequelize } = require("sequelize");

// Configuração do banco de dados
const sequelize = new Sequelize({
    dialect: "mysql", // ou 'postgres', 'sqlite', 'mssql', dependendo do seu banco
    host: "localhost", // ou seu host de banco de dados
    username: "root", // usuário do banco de dados
    password: "senha", // senha do banco de dados
    database: "sua_base_de_dados",
});

module.exports = { sequelize };
