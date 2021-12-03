import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../css/album.css';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      collectionName: '',
      collectionImage: '',
      tracks: [],
    };
  }

  componentDidMount() {
    this.fetchMusics();
  }

  fetchMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const result = await getMusics(id);
    const favorites = await getFavoriteSongs();

    const musics = result.map((resultOne) => (
      {
        ...resultOne,
        isChecked: favorites.some((favorite) => favorite.trackId === resultOne.trackId),
      }
    ));

    this.setState({
      artistName: musics[0].artistName,
      collectionName: musics[0].collectionName,
      collectionImage: musics[0].artworkUrl100,
    }, () => {
      this.setState({
        tracks: [...musics],
      });
    });
  }

  render() {
    const {
      artistName,
      collectionImage,
      collectionName,
      tracks,
    } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <main className="album-details">
          <section className="artist-details">
            <img src={ collectionImage } alt={ collectionName } />
            <h1 data-testid="album-name">{ collectionName }</h1>
            <p data-testid="artist-name">{ artistName }</p>
          </section>
          <section className="tracks">
            {
              tracks
                .filter((track) => track.previewUrl !== undefined)
                .map((track) => (
                  <MusicCard
                    key={ track.trackId }
                    trackName={ track.trackName }
                    previewUrl={ track.previewUrl }
                    trackId={ track.trackId }
                    song={ track }
                    isChecked={ track.isChecked }
                  />
                ))
            }
          </section>
        </main>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
