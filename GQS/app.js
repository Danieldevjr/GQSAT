const express = require("express");
const categoriaRoutes = require("./routes/categoriaRoutes");
const produtoRoutes = require("./routes/produtoRoutes");
const estoqueRoutes = require("./routes/estoqueRoutes");
const { sequelize } = require("./models/database"); // Importar a conexão com o banco de dados

// Criação da aplicação Express
const app = express();
const port = 3000;

// Middleware para processar o corpo das requisições como JSON
app.use(express.json());

// Definir as rotas da API para categorias, produtos e estoque
app.use("/api/categorias", categoriaRoutes);
app.use("/api/produtos", produtoRoutes);
app.use("/api/estoque", estoqueRoutes);

// Rota para verificar se o servidor está funcionando
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Iniciar o servidor e conectar ao banco de dados
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
}).catch((error) => {
  console.error("Erro ao conectar ao banco de dados:", error);
});

module.exports = { app };
