import React, { Component } from 'react';
import './App.css'; // Certifique-se de que o CSS está importado

class Formulario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      autor: '',
      dataLancamento: '',
      numeroEdicao: '',
      localLancamento: '',
      codigoBarras: '',
      isSubmitting: false // Flag para controlar o envio
    };
  }

  escutadorDeInput = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  submitFormulario = async () => {
    if (this.state.isSubmitting) {
      console.log('Envio em progresso, ignorando');
      return;
    }
  
    this.setState({ isSubmitting: true }); // Marca como enviando
    console.log('submitFormulario chamado');
  
    const { nome, autor, dataLancamento, numeroEdicao, localLancamento, codigoBarras } = this.state;
  
    if (!nome || !autor || !dataLancamento) {
      console.error('Por favor, preencha todos os campos obrigatórios.');
      this.setState({ isSubmitting: false });
      return;
    }
  
    const livroData = { nome, autor, dataLancamento, numeroEdicao, localLancamento, codigoBarras };
  
    try {
      console.log('Enviando dados:', livroData);
      const response = await fetch('http://localhost:3000/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(livroData),
      });
  
      if (response.ok) {
        console.log('Livro adicionado com sucesso');
        this.props.escutadorDeSubmit(livroData);
        this.setState({
          nome: '',
          autor: '',
          dataLancamento: '',
          numeroEdicao: '',
          localLancamento: '',
          codigoBarras: '',
          isSubmitting: false
        });
      } else {
        console.error('Erro ao salvar livro:', response.statusText);
        this.setState({ isSubmitting: false });
      }
    } catch (error) {
      console.error('Erro ao enviar requisição:', error);
      this.setState({ isSubmitting: false });
    }
  };
  

  render() {
    const { nome, autor, dataLancamento, numeroEdicao, localLancamento, codigoBarras } = this.state;

    return (
      <form>
        <div className="row">
          <div className="input-field col s4">
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              type="text"
              name="nome"
              value={nome}
              onChange={this.escutadorDeInput}
            />
          </div>
          <div className="input-field col s4">
            <label htmlFor="autor">Autor</label>
            <input
              id="autor"
              type="text"
              name="autor"
              value={autor}
              onChange={this.escutadorDeInput}
            />
          </div>
          <div className="input-field col s4">
            <label htmlFor="dataLancamento">Data de Lançamento</label>
            <input
              id="dataLancamento"
              type="date"
              name="dataLancamento"
              value={dataLancamento}
              onChange={this.escutadorDeInput}
            />
          </div>
          <div className="input-field col s4">
            <label htmlFor="numeroEdicao">Número da Edição</label>
            <input
              id="numeroEdicao"
              type="number"
              name="numeroEdicao"
              value={numeroEdicao}
              onChange={this.escutadorDeInput}
            />
          </div>
          <div className="input-field col s4">
            <label htmlFor="localLancamento">Local de Lançamento</label>
            <input
              id="localLancamento"
              type="text"
              name="localLancamento"
              value={localLancamento}
              onChange={this.escutadorDeInput}
            />
          </div>
          <div className="input-field col s4">
            <label htmlFor="codigoBarras">Código de Barras</label>
            <input
              id="codigoBarras"
              type="text"
              name="codigoBarras"
              value={codigoBarras}
              onChange={this.escutadorDeInput}
            />
          </div>
        </div>
        <button
          className="waves-effect waves-light btn indigo lighten-2"
          type="button"
          onClick={this.submitFormulario}
          disabled={this.state.isSubmitting} // Desabilita o botão durante o envio
        >
          Salvar
        </button>
      </form>
    );
  }
}

export default Formulario;
