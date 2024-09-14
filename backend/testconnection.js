const oracledb = require('oracledb');
const { listarLivros, adicionarLivro } = require('./models/bookModel');

(async () => {
  try {
    // Testar listagem de livros
    const livros = await listarLivros();
    console.log('Livros:', livros);

    // Testar adição de um livro
    await adicionarLivro({
      nome: 'Pense logo e Enriquessa',
      autor: 'Apoleão Hill',
      data_lancamento: new Date('2024-10-10'),
      numero_edicao: 10,
      local_lancamento: 'São Paulo',
      codigo_barras: '808080'
    });
    console.log('Livro adicionado com sucesso!');
  } catch (err) {
    console.error('Erro durante o teste:', err);
  }
})();
