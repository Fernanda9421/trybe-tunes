import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import music from '../imgs/headphone.png';
import '../css/favorites.css';

class Favorites extends Component {
  constructor() {
    super();
    this.newSongs = this.newSongs.bind(this);

    this.state = {
      isLoading: false,
      tracks: [],
    };
  }

  componentDidMount() {
    this.favoriteSongs();
  }

  newSongs = async () => {
    this.setState({
      isLoading: true,
    });
    const newListSongs = await getFavoriteSongs();
    this.setState({
      tracks: newListSongs,
      isLoading: false,
    });
  }

  favoriteSongs = async () => {
    this.setState({ isLoading: true });
    const favoriteMusics = await getFavoriteSongs();
    const favoriteSongs = favoriteMusics.map((song) => (
      {
        ...song,
        isChecked: true,
      }
    ));
    this.setState({
      isLoading: false,
      tracks: favoriteSongs,
    });
  }

  render() {
    const { isLoading, tracks } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          isLoading
            ? <Loading />
            : (
              <div className="favorites__container">
                <p className="favorites__title">Músicas Favoritas</p>
                <div className="favorites__infos">
                  {
                    tracks.map((track) => (
                      <div className="favorites__card" key={ track.trackId }>
                        <img
                          className="favorites__image"
                          src={ music }
                          alt="headphones"
                        />
                        <MusicCard
                          key={ track.trackId }
                          trackName={ track.trackName }
                          previewUrl={ track.previewUrl }
                          trackId={ track.trackId }
                          song={ track }
                          isChecked={ track.isChecked }
                          onChange={ this.newSongs }
                        />
                      </div>
                    ))
                  }
                </div>
              </div>
            )
        }
      </div>
    );
  }
}

export default Favorites;
