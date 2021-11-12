import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.checkButton = this.checkButton.bind(this);
    this.handleUser = this.handleUser.bind(this);
    this.logedPage = this.logedPage.bind(this);

    this.state = {
      isDisabled: true,
      nameUser: '',
      isLoading: false,
      isLoged: false,
    };
  }

  async handleUser(user) {
    this.setState({ isLoading: true });
    await createUser(user);
    this.setState({
      isLoading: false,
      isLoged: true,
    });
  }

  onInputChange({ target }) {
    const { value } = target;
    this.setState({
      nameUser: value,
    }, () => { this.checkButton(); });
  }

  checkButton() {
    const { nameUser } = this.state;
    const minCharacters = 3;
    if (nameUser.length >= minCharacters) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  logedPage() {
    const { isDisabled, nameUser, isLoged } = this.state;
    if (isLoged) {
      return <Redirect to="/search" />;
    }
    return (
      <>
        <Header />
        <div data-testid="page-login">
          <form>
            <label htmlFor="name-user">
              Nome:
              <input
                data-testid="login-name-input"
                id="name-user"
                name="name-user"
                placeholder="Insira seu nome"
                value={ nameUser }
                onChange={ this.onInputChange }
              />
            </label>
            <button
              data-testid="login-submit-button"
              id="btn-login"
              type="button"
              disabled={ isDisabled }
              onClick={ () => this.handleUser({ name: nameUser }) }
            >
              Entrar
            </button>
          </form>
        </div>
      </>
    );
  }

  render() {
    const { isLoading } = this.state;
    return (
      isLoading ? <Loading /> : this.logedPage()
    );
  }
}

export default Login;
