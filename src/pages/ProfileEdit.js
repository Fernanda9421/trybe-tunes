import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.checkButton = this.checkButton.bind(this);
    this.saveInfos = this.saveInfos.bind(this);

    this.state = {
      isLoading: false,
      isDisabled: true,
      name: '',
      email: '',
      description: '',
      image: '',
      redirect: false,
    };
  }

  componentDidMount() {
    this.getInfosUser();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => { this.checkButton(); });
  }

  getInfosUser = async () => {
    this.setState({
      isLoading: true,
    });
    const infosUser = await getUser();
    this.setState({
      isLoading: false,
      name: infosUser.name,
      email: infosUser.email,
      description: infosUser.description,
      image: infosUser.image,
    });
    this.checkButton();
  }

  saveInfos = async () => {
    this.setState({ isLoading: true });
    const { name, email, image, description } = this.state;
    await updateUser({ name, email, image, description });
    this.setState({ redirect: true, isLoading: false });
  }

  checkButton() {
    const { name, email, description, image } = this.state;
    const completedForm = [
      name.length !== 0,
      description.length !== 0,
      email.includes('@'),
      image.length !== 0,
    ];

    if (completedForm.every((item) => item === true)) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  // Redirect: Feito com a ajuda de Emerson Moreira e Rafael Santos!
  render() {
    const {
      isLoading,
      isDisabled,
      name,
      email,
      description,
      image,
      redirect,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {
          isLoading
            ? <Loading />
            : (
              <main>
                <form>
                  <label htmlFor="image">
                    Imagem:
                    <input
                      data-testid="edit-input-image"
                      name="image"
                      id="image"
                      type="text"
                      placeholder="Insira um link"
                      onChange={ this.handleChange }
                      value={ image }
                    />
                  </label>
                  <label htmlFor="name">
                    Nome:
                    <input
                      data-testid="edit-input-name"
                      name="name"
                      id="name"
                      type="text"
                      placeholder="Insira seu nome"
                      onChange={ this.handleChange }
                      value={ name }
                    />
                  </label>
                  <label htmlFor="email">
                    E-mail:
                    <input
                      data-testid="edit-input-email"
                      name="email"
                      id="email"
                      type="email"
                      placeholder="Insira seu email"
                      onChange={ this.handleChange }
                      value={ email }
                    />
                  </label>
                  <label htmlFor="description">
                    Descrição:
                    <textarea
                      data-testid="edit-input-description"
                      name="description"
                      id="description"
                      onChange={ this.handleChange }
                      value={ description }
                    />
                  </label>
                  <button
                    data-testid="edit-button-save"
                    id="button-profile"
                    type="button"
                    disabled={ isDisabled }
                    onClick={ this.saveInfos }
                  >
                    Salvar
                  </button>
                </form>
                {
                  redirect && <Redirect to="/profile" />
                }
              </main>
            )
        }
      </div>
    );
  }
}

export default ProfileEdit;
