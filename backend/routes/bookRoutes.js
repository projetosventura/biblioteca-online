const express = require('express');
const router = express.Router();
const bookModel = require('../models/bookModel');

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - nome
 *         - autor
 *       properties:
 *         nome:
 *           type: string
 *           description: O nome do livro
 *         autor:
 *           type: string
 *           description: O autor do livro
 *         dataLancamento:
 *           type: string
 *           format: date
 *           description: A data de lançamento do livro
 *         numeroEdicao:
 *           type: integer
 *           description: O número da edição do livro
 *         localLancamento:
 *           type: string
 *           description: O local de lançamento do livro
 *         codigoBarras:
 *           type: string
 *           description: O código de barras do livro
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Retorna a lista de todos os livros
 *     responses:
 *       200:
 *         description: A lista de livros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get('/', async (req, res) => {
    try {
        const livros = await bookModel.listarLivros();
        res.json(livros);
    } catch (err) {
        res.status(500).send('Erro ao listar livros: ' + err.message);
    }
});

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Adiciona um novo livro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Livro adicionado com sucesso
 *       500:
 *         description: Erro ao adicionar livro
 */
router.post('/', async (req, res) => {
    try {
      const livro = req.body;
      await bookModel.adicionarLivro(livro);
      res.status(201).send('Livro adicionado com sucesso');
    } catch (err) {
      console.error('Erro ao adicionar livro:', err);
      res.status(500).send('Erro ao adicionar livro');
    }
  });

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Remove um livro pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do livro a ser removido
 *     responses:
 *       204:
 *         description: Livro removido com sucesso
 *       404:
 *         description: Livro não encontrado
 *       500:
 *         description: Erro ao remover livro
 */
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await bookModel.removerLivro(id);
        if (result.affectedRows === 0) {
            return res.status(404).send('Livro não encontrado');
        }
        res.status(204).send(); // Resposta bem-sucedida sem conteúdo
    } catch (err) {
        console.error('Erro ao remover livro:', err);
        res.status(500).send('Erro ao remover livro');
    }
});

// Exemplo de rota PUT para atualização (opcional)
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const livroAtualizado = req.body;

    try {
        const result = await bookModel.atualizarLivro(id, livroAtualizado);
        if (result.affectedRows === 0) {
            return res.status(404).send('Livro não encontrado');
        }
        res.status(200).send('Livro atualizado com sucesso');
    } catch (err) {
        console.error('Erro ao atualizar livro:', err);
        res.status(500).send('Erro ao atualizar livro');
    }
});

module.exports = router;
