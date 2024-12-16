const { Produto } = require('../models/produto');

// Adiciona um novo produto
const adicionarProduto = async (req, res) => {
    try {
        const { nome, preco, quantidade, categoriaId } = req.body;

        // Cria o novo produto
        const produto = await Produto.create({ nome, preco, quantidade, categoriaId });
        res.status(201).json(produto);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao adicionar produto', details: error.message });
    }
};

// Lista todos os produtos
const listarProdutos = async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar produtos', details: error.message });
    }
};

// Atualiza um produto específico
const atualizarProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, preco, quantidade, categoriaId } = req.body;

        const produto = await Produto.findByPk(id);
        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        produto.nome = nome;
        produto.preco = preco;
        produto.quantidade = quantidade;
        produto.categoriaId = categoriaId;
        await produto.save();

        res.status(200).json(produto);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar produto', details: error.message });
    }
};

// Remove um produto
const removerProduto = async (req, res) => {
    try {
        const { id } = req.params;

        const produto = await Produto.findByPk(id);
        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        await produto.destroy();
        res.status(204).send(); // Retorna sem conteúdo (no content)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover produto', details: error.message });
    }
};

module.exports = {
    adicionarProduto,
    listarProdutos,
    atualizarProduto,
    removerProduto
};
