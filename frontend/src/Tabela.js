import React from 'react';

const Tabela = ({ livros = [], removeLivro }) => {
  return (
    <table className="centered highlight">
      <TableHead />
      <TableBody livros={livros} removeLivro={removeLivro} />
    </table>
  );
};

const TableHead = () => {
  return (
    <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Autor</th>
        <th>Data de Lançamento</th>
        <th>Número da Edição</th>
        <th>Local de Lançamento</th>
        <th>Código de Barras</th>
        <th>Remover</th>
      </tr>
    </thead>
  );
};

const TableBody = ({ livros = [], removeLivro }) => {
  return (
    <tbody>
      {livros.length === 0 ? (
        <tr>
          <td colSpan="8">Nenhum livro encontrado.</td>
        </tr>
      ) : (
        livros.map(livro => (
          <tr key={livro.id}>
            <td>{livro.id}</td>
            <td>{livro.nome}</td>
            <td>{livro.autor}</td>
            <td>
              {livro.dataLancamento ? new Date(livro.dataLancamento).toLocaleDateString('pt-BR') : 'Data não disponível'}
            </td>
            <td>{livro.numeroEdicao}</td>
            <td>{livro.localLancamento}</td>
            <td>{livro.codigoBarras}</td>
            <td>
              <button
                className="waves-effect waves-light btn indigo lighten-2"
                onClick={() => removeLivro(livro.id)}
              >
                Remover
              </button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  );
};


export default Tabela;
