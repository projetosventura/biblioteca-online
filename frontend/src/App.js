import React, { Component, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';
import Tabela from './Tabela';
import Form from './Formulario';
import Header from './Header';
import axios from 'axios'; // Importando axios para as requisições

class App extends Component {
  state = {
    livros: [], // Inicialmente vazio, vamos preencher com dados da API
    error: null, // Para armazenar mensagens de erro
    success: null, // Para armazenar mensagens de sucesso
  };

  // Quando o componente monta, buscamos os dados do backend
  componentDidMount() {
    this.fetchLivros();
  }

  // Função para buscar livros do backend
  fetchLivros = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/books'); // Chamada à API do backend
      this.setState({ livros: response.data, error: null }); // Atualiza o estado com a lista de livros e limpa erros
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
      this.setState({ error: 'Erro ao buscar livros. Tente novamente mais tarde.' });
    }
  };

  // Função para remover um livro no backend
  removeLivro = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/books/${id}`); // Chamada para deletar o livro
      this.fetchLivros(); // Atualiza a lista de livros após a exclusão
      this.setState({ success: 'Livro removido com sucesso!' });

      // Remove a mensagem de sucesso após 3 segundos
      setTimeout(() => this.setState({ success: null }), 3000);
    } catch (error) {
      console.error('Erro ao remover o livro:', error);
      this.setState({ error: 'Erro ao remover o livro. Tente novamente mais tarde.' });
    }
  };

  // Função para adicionar um livro no backend
  escutadorDeSubmit = async (livro) => {
    try {
      await axios.post('http://localhost:3000/api/books', livro); // Envia o novo livro ao backend
      this.fetchLivros(); // Atualiza a lista de livros após a adição
      this.setState({ success: 'Livro adicionado com sucesso!' });

      // Remove a mensagem de sucesso após 3 segundos
      setTimeout(() => this.setState({ success: null }), 3000);
    } catch (error) {
      console.error('Erro ao adicionar o livro:', error);
      this.setState({ error: 'Erro ao adicionar o livro. Tente novamente mais tarde.' });
    }
  };

  render() {
    const { livros, error, success } = this.state;
    
    return (
      <Fragment>
        <Header />
        <div className="container mb-10">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <Tabela livros={livros} removeLivro={this.removeLivro} />
          <Form escutadorDeSubmit={this.escutadorDeSubmit} />
        </div>
      </Fragment>
    );
  }
}

export default App;
