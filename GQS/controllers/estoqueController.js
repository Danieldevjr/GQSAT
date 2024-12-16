const { Estoque } = require('../models/estoque');

// Adiciona um novo registro de estoque
const adicionarEstoque = async (req, res) => {
    try {
        const { produtoId, quantidade } = req.body;

        // Cria um novo registro de estoque
        const estoque = await Estoque.create({ produtoId, quantidade });
        res.status(201).json(estoque);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao adicionar estoque', details: error.message });
    }
};

// Lista todos os registros de estoque
const listarEstoque = async (req, res) => {
    try {
        const estoque = await Estoque.findAll();
        res.status(200).json(estoque);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar estoque', details: error.message });
    }
};

// Atualiza um registro de estoque específico
const atualizarEstoque = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantidade } = req.body;

        const estoque = await Estoque.findByPk(id);
        if (!estoque) {
            return res.status(404).json({ error: 'Estoque não encontrado' });
        }

        estoque.quantidade = quantidade;
        await estoque.save();
        res.status(200).json(estoque);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar estoque', details: error.message });
    }
};

// Remove um registro de estoque
const removerEstoque = async (req, res) => {
    try {
        const { id } = req.params;

        const estoque = await Estoque.findByPk(id);
        if (!estoque) {
            return res.status(404).json({ error: 'Estoque não encontrado' });
        }

        await estoque.destroy();
        res.status(204).send(); // Retorna sem conteúdo (no content)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover estoque', details: error.message });
    }
};

module.exports = {
    adicionarEstoque,
    listarEstoque,
    atualizarEstoque,
    removerEstoque,
};
