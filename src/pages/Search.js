import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.checkButton = this.checkButton.bind(this);

    this.state = {
      isDisabled: true,
      nameArtist: '',
    };
  }

  onInputChange({ target }) {
    const { value } = target;
    this.setState({
      nameArtist: value,
    }, () => { this.checkButton(); });
  }

  checkButton() {
    const { nameArtist } = this.state;
    const minCharacters = 2;
    if (nameArtist.length >= minCharacters) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  render() {
    const { isDisabled, nameArtist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="artist-input">
            <input
              data-testid="search-artist-input"
              id="artist-input"
              name="artist-input"
              placeholder="Nome do Artista"
              onChange={ this.onInputChange }
              value={ nameArtist }
            />
          </label>
          <button
            data-testid="search-artist-button"
            id="artist-button"
            type="button"
            disabled={ isDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
