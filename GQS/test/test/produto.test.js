const request = require("supertest");
const { app } = require("../app");
const { sequelize } = require("../models/database");
const { Produto } = require("../models/produto");
const { Categoria } = require("../models/categoria");

beforeAll(async () => {
    await sequelize.sync({ force: true });

    // Criar uma categoria para associar ao produto
    const categoria = await Categoria.create({ nome: "Eletrônicos" });

    // Criar um produto
    await Produto.create({
        nome: "Celular",
        preco: 1200.00,
        quantidade: 50,
        categoriaId: categoria.id,
    });
});

afterAll(async () => {
    await sequelize.close();
});

describe("Testes de Produto", () => {

    // 1. Teste de Criação de Produto
    it("Deve criar um novo produto com sucesso", async () => {
        const categoria = await Categoria.create({ nome: "Móveis" });

        const response = await request(app)
            .post("/api/produto")
            .send({ nome: "Sofá", preco: 2000.00, quantidade: 10, categoriaId: categoria.id });

        expect(response.status).toBe(201); // Verifica o status 201
        expect(response.body.nome).toBe("Sofá"); // Verifica se o nome do produto foi criado corretamente
        expect(response.body.preco).toBe(2000.00); // Verifica se o preço foi atribuído corretamente
        expect(response.body.quantidade).toBe(10); // Verifica a quantidade do produto
    });

    // 2. Teste de Listagem de Produtos
    it("Deve listar todos os produtos", async () => {
        const response = await request(app).get("/api/produto");

        expect(response.status).toBe(200); // Verifica o status 200
        expect(response.body.length).toBeGreaterThan(0); // Verifica se há pelo menos 1 produto
    });

    // 3. Teste de Atualização de Produto
    it("Deve atualizar um produto específico", async () => {
        const produto = await Produto.findOne();

        const response = await request(app)
            .put(`/api/produto/${produto.id}`)
            .send({ nome: "Smartphone", preco: 1500.00, quantidade: 40, categoriaId: produto.categoriaId });

        expect(response.status).toBe(200); // Verifica o status 200
        expect(response.body.nome).toBe("Smartphone"); // Verifica se o nome foi atualizado
        expect(response.body.preco).toBe(1500.00); // Verifica se o preço foi atualizado
        expect(response.body.quantidade).toBe(40); // Verifica se a quantidade foi atualizada
    });

    // 4. Teste de Remoção de Produto
    it("Deve remover um produto", async () => {
        const produto = await Produto.findOne();

        const response = await request(app).delete(`/api/produto/${produto.id}`);

        expect(response.status).toBe(204); // Verifica o status 204 (sem conteúdo)

        // Verifica se o produto foi removido
        const produtoRemovido = await Produto.findByPk(produto.id);
        expect(produtoRemovido).toBeNull(); // Deve retornar null, ou seja, o produto foi removido
    });
});
