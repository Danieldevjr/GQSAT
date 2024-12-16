const request = require("supertest");
const { app } = require("../app");
const { sequelize } = require("../models/database");
const { Categoria } = require("../models/categoria");

beforeAll(async () => {
    await sequelize.sync({ force: true });

    // Criar categorias iniciais
    await Categoria.create({ nome: "Eletrônicos" });
    await Categoria.create({ nome: "Roupas" });
});

afterAll(async () => {
    await sequelize.close();
});

describe("Testes de Categoria", () => {

    // 1. Teste de Criação de Categoria
    it("Deve criar uma nova categoria com sucesso", async () => {
        const response = await request(app)
            .post("/api/categoria")
            .send({ nome: "Móveis" });

        expect(response.status).toBe(201); // Verifica o status 201
        expect(response.body.nome).toBe("Móveis"); // Verifica se o nome da categoria foi criado corretamente
    });

    // 2. Teste de Listagem de Categorias
    it("Deve listar todas as categorias", async () => {
        const response = await request(app).get("/api/categoria");

        expect(response.status).toBe(200); // Verifica o status 200
        expect(response.body.length).toBeGreaterThan(0); // Verifica se há pelo menos 1 categoria
    });

    // 3. Teste de Atualização de Categoria
    it("Deve atualizar uma categoria específica", async () => {
        const categoria = await Categoria.findOne();

        const response = await request(app)
            .put(`/api/categoria/${categoria.id}`)
            .send({ nome: "Tecnologia" });

        expect(response.status).toBe(200); // Verifica o status 200
        expect(response.body.nome).toBe("Tecnologia"); // Verifica se o nome foi atualizado
    });

    // 4. Teste de Remoção de Categoria
    it("Deve remover uma categoria", async () => {
        const categoria = await Categoria.findOne();

        const response = await request(app).delete(`/api/categoria/${categoria.id}`);

        expect(response.status).toBe(204); // Verifica o status 204 (sem conteúdo)

        // Verifica se a categoria foi removida
        const categoriaRemovida = await Categoria.findByPk(categoria.id);
        expect(categoriaRemovida).toBeNull(); // Deve retornar null, ou seja, a categoria foi removida
    });
});
