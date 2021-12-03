import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../css/search.css';

class Search extends Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.checkButton = this.checkButton.bind(this);

    this.state = {
      isDisabled: true,
      nameArtist: '',
      isLoading: false,
      resposeApi: '',
      artist: [],
    };
  }

  handleArtist = async (artistName) => {
    this.setState({ isLoading: true });
    const artist = await searchAlbumsAPI(artistName);
    if (artist.length !== 0) {
      return this.setState({
        isLoading: false,
        resposeApi: `Resultado de álbuns de: ${artistName} `,
        nameArtist: '',
        artist,
      });
    }
    return this.setState({
      isLoading: false,
      resposeApi: 'Nenhum álbum foi encontrado',
      nameArtist: '',
    });
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
    const { isDisabled, nameArtist, isLoading, resposeApi, artist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {isLoading
          ? <Loading />
          : (
            <form>
              <label htmlFor="artist-input">
                <input
                  data-testid="search-artist-input"
                  className="artist-input"
                  id="artist-input"
                  name="artist-input"
                  placeholder="Nome do Artista"
                  onChange={ this.onInputChange }
                  value={ nameArtist }
                />
              </label>
              <button
                data-testid="search-artist-button"
                className="artist-button"
                id="artist-button"
                type="button"
                disabled={ isDisabled }
                onClick={ () => this.handleArtist(nameArtist) }
              >
                Pesquisar
              </button>
            </form>)}
        <div>
          <div className="responseApi">{ resposeApi }</div>
          <div className="collections">
            {
              artist.map(({
                collectionId,
                artistName,
                collectionName,
                artworkUrl100,
              }) => (
                <div className="collection" key={ collectionId }>
                  <img src={ artworkUrl100 } alt={ artistName } />
                  <p className="collectionName">{ collectionName }</p>
                  <p>{ artistName }</p>
                  <Link
                    className="link-details"
                    data-testid={ `link-to-album-${collectionId}` }
                    to={ `/album/${collectionId}` }
                  >
                    Detalhes
                  </Link>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
