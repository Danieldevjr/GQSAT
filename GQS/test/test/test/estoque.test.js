const request = require("supertest");
const { app } = require("../app");
const { sequelize } = require("../models/database");
const { Estoque } = require("../models/estoque");
const { Produto } = require("../models/produto");
const { Categoria } = require("../models/categoria");

beforeAll(async () => {
    await sequelize.sync({ force: true });

    // Criar uma categoria e um produto
    const categoria = await Categoria.create({ nome: "Eletrônicos" });
    const produto = await Produto.create({
        nome: "Celular",
        preco: 1200.00,
        categoriaId: categoria.id,
    });

    // Criar um registro de estoque para o produto
    await Estoque.create({
        produtoId: produto.id,
        quantidade: 100,
    });
});

afterAll(async () => {
    await sequelize.close();
});

describe("Testes de Estoque", () => {

    // 1. Teste de Criação de Registro de Estoque
    it("Deve criar um novo registro de estoque com sucesso", async () => {
        const categoria = await Categoria.create({ nome: "Móveis" });
        const produto = await Produto.create({
            nome: "Sofá",
            preco: 2000.00,
            categoriaId: categoria.id,
        });

        const response = await request(app)
            .post("/api/estoque")
            .send({ produtoId: produto.id, quantidade: 50 });

        expect(response.status).toBe(201); // Verifica o status 201
        expect(response.body.produtoId).toBe(produto.id); // Verifica se o produtoId corresponde ao produto criado
        expect(response.body.quantidade).toBe(50); // Verifica se a quantidade foi correta
    });

    // 2. Teste de Listagem de Estoque
    it("Deve listar todos os registros de estoque", async () => {
        const response = await request(app).get("/api/estoque");

        expect(response.status).toBe(200); // Verifica o status 200
        expect(response.body.length).toBeGreaterThan(0); // Verifica se há pelo menos 1 registro
    });

    // 3. Teste de Atualização de Registro de Estoque
    it("Deve atualizar um registro de estoque específico", async () => {
        const estoque = await Estoque.findOne();

        const response = await request(app)
            .put(`/api/estoque/${estoque.id}`)
            .send({ quantidade: 150 });

        expect(response.status).toBe(200); // Verifica o status 200
        expect(response.body.quantidade).toBe(150); // Verifica se a quantidade foi atualizada corretamente
    });

    // 4. Teste de Remoção de Registro de Estoque
    it("Deve remover um registro de estoque", async () => {
        const estoque = await Estoque.findOne();

        const response = await request(app).delete(`/api/estoque/${estoque.id}`);

        expect(response.status).toBe(204); // Verifica o status 204 (sem conteúdo)
        
        // Verifica se o estoque foi realmente removido
        const estoqueRemovido = await Estoque.findByPk(estoque.id);
        expect(estoqueRemovido).toBeNull(); // Deve retornar null, ou seja, o estoque foi removido
    });
});
