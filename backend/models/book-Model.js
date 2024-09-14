const oracledb = require('oracledb');

// Função para conectar ao banco de dados Oracle
async function connect() {
  try {
    return await oracledb.getConnection({
      user: 'SYSTEM',          // Substitua pelo seu usuário de banco de dados
      password: 'teste@123',   // Substitua pela sua senha de banco de dados
      connectString: 'localhost:1521/xe'  // Substitua pelo seu connect string
    });
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    throw err;  // Propaga o erro para ser tratado pelo chamador
  }
}

// Função para verificar se um livro já existe
async function livroExiste(nome, autor) {
  let conn;
  try {
    conn = await connect();
    const sql = `
      SELECT COUNT(*) AS count
      FROM livros
      WHERE nome = :nome AND autor = :autor
    `;
    const binds = { nome, autor };
    const result = await conn.execute(sql, binds);
    return result.rows[0][0] > 0;  // Retorna verdadeiro se o livro já existir
  } catch (err) {
    console.error('Erro ao verificar se o livro existe:', err);
    throw err;
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (err) {
        console.error('Erro ao fechar a conexão:', err);
      }
    }
  }
}

// Função para listar todos os livros
async function listarLivros() {
  let conn;
  try {
    conn = await connect();
    const result = await conn.execute(
      'SELECT id, nome, autor, data_lancamento, numero_edicao, local_lancamento, codigo_barras FROM livros'
    );
    // Mapear os resultados para um formato mais legível
    return result.rows.map(row => ({
      id: row[0],  // Inclua o ID para operações de remoção e atualização
      nome: row[1],
      autor: row[2],
      dataLancamento: row[3],  // Certifique-se de que o formato da data está correto
      numeroEdicao: row[4],
      localLancamento: row[5],
      codigoBarras: row[6]
    }));
  } catch (err) {
    console.error('Erro ao listar livros:', err);
    throw err;
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (err) {
        console.error('Erro ao fechar a conexão:', err);
      }
    }
  }
}

// Função para adicionar um novo livro
async function adicionarLivro(livro) {
  let conn;
  try {
    conn = await connect();
    
    // Verificar se o livro já existe
    const existe = await livroExiste(livro.nome, livro.autor);
    if (existe) {
      throw new Error('Livro já existe no banco de dados');
    }

    const sql = `
      INSERT INTO livros (nome, autor, data_lancamento, numero_edicao, local_lancamento, codigo_barras)
      VALUES (:nome, :autor, TO_DATE(:data_lancamento, 'YYYY-MM-DD'), :numero_edicao, :local_lancamento, :codigo_barras)
    `;
    const binds = {
      nome: livro.nome,
      autor: livro.autor,
      data_lancamento: livro.dataLancamento,
      numero_edicao: livro.numeroEdicao,
      local_lancamento: livro.localLancamento,
      codigo_barras: livro.codigoBarras
    };
    await conn.execute(sql, binds, { autoCommit: true });
  } catch (err) {
    console.error('Erro ao adicionar livro:', err);
    throw err;
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (err) {
        console.error('Erro ao fechar a conexão:', err);
      }
    }
  }
}

// Função para remover um livro pelo ID
async function removerLivro(id) {
  let conn;
  try {
    conn = await connect();
    const sql = 'DELETE FROM livros WHERE id = :id';
    const binds = { id };
    const result = await conn.execute(sql, binds, { autoCommit: true });
    
    if (result.rowsAffected === 0) {
      throw new Error('Livro não encontrado');
    }
  } catch (err) {
    console.error('Erro ao remover livro:', err);
    throw err;
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (err) {
        console.error('Erro ao fechar a conexão:', err);
      }
    }
  }
}

// Função para atualizar um livro (opcional)
async function atualizarLivro(id, livroAtualizado) {
  let conn;
  try {
    conn = await connect();
    const sql = `
      UPDATE livros
      SET nome = :nome, autor = :autor, data_lancamento = TO_DATE(:data_lancamento, 'YYYY-MM-DD'), numero_edicao = :numero_edicao, local_lancamento = :local_lancamento, codigo_barras = :codigo_barras
      WHERE id = :id
    `;
    const binds = {
      id,
      nome: livroAtualizado.nome,
      autor: livroAtualizado.autor,
      data_lancamento: livroAtualizado.dataLancamento,
      numero_edicao: livroAtualizado.numeroEdicao,
      local_lancamento: livroAtualizado.localLancamento,
      codigo_barras: livroAtualizado.codigoBarras
    };
    const result = await conn.execute(sql, binds, { autoCommit: true });
    
    if (result.rowsAffected === 0) {
      throw new Error('Livro não encontrado');
    }
  } catch (err) {
    console.error('Erro ao atualizar livro:', err);
    throw err;
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (err) {
        console.error('Erro ao fechar a conexão:', err);
      }
    }
  }
}

module.exports = { listarLivros, adicionarLivro, removerLivro, atualizarLivro };
