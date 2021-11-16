import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

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
    this.setState({
      artistName: result[0].artistName,
      collectionName: result[0].collectionName,
      collectionImage: result[0].artworkUrl100,
    }, () => {
      this.setState({
        tracks: [...result],
      });
    });
  }

  render() {
    const { artistName, collectionImage, collectionName, tracks } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <main>
          <img src={ collectionImage } alt={ collectionName } />
          <h1 data-testid="album-name">{ collectionName }</h1>
          <p data-testid="artist-name">{ artistName }</p>
        </main>
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
              />
            ))
        }
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
