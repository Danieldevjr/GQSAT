const express = require("express");
const router = express.Router();
const estoqueController = require("../controllers/estoqueController");

// Rota para criar um novo registro de estoque
router.post("/estoque", estoqueController.adicionarEstoque);

// Rota para listar todos os registros de estoque
router.get("/estoque", estoqueController.listarEstoque);

// Rota para atualizar um registro de estoque específico
router.put("/estoque/:id", estoqueController.atualizarEstoque);

// Rota para remover um registro de estoque
router.delete("/estoque/:id", estoqueController.removerEstoque);

module.exports = router;
