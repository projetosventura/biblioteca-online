const livroModel = require('../models/bookModel'); // Importa o módulo correto

// Controller para listar livros
async function listarLivros(req, res) {
  try {
    const livros = await livroModel.listarLivros(); // Usa o nome correto
    res.json(livros); // Retorna a lista de livros
  } catch (err) {
    console.error('Erro ao listar livros:', err); // Log detalhado do erro
    res.status(500).json({ message: 'Erro ao listar livros', error: err.message }); // Inclui mensagem de erro
  }
}

// Controller para adicionar um livro
async function adicionarLivro(req, res) {
  try {
    // Adiciona o livro
    const livro = req.body;
    await livroModel.adicionarLivro(livro);
    // Retorna o livro adicionado com status 201
    res.status(201).json({ message: 'Livro adicionado com sucesso', livro });
  } catch (err) {
    console.error('Erro ao adicionar livro:', err); // Log detalhado do erro
    res.status(500).json({ message: 'Erro ao adicionar livro', error: err.message }); // Inclui mensagem de erro
  }
}

module.exports = { listarLivros, adicionarLivro };
