const request = require("supertest");
const { app } = require("../app");
const { sequelize } = require("../models/database");
const { Produto } = require("../models/produto");
const { Categoria } = require("../models/categoria");
const { Estoque } = require("../models/estoque");

beforeAll(async () => {
    await sequelize.sync({ force: true });
    const categoria = await Categoria.create({ nome: "Eletrônicos" });
    const produto = await Produto.create({ nome: "Celular", preco: 1200.0, quantidade: 50, categoriaId: categoria.id });
    await Estoque.create({ produtoId: produto.id, quantidade: 50 });
  });