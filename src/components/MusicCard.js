import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      isChecked: false,
      isLoading: false,
    };
  }

  handleChange() {
    const { song } = this.props;
    this.setState({
      isChecked: true,
      isLoading: true,
    }, () => {
      addSong(song).then(() => {
        this.setState({ isLoading: false });
      });
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isChecked, isLoading } = this.state;

    return (
      isLoading
        ? <Loading />
        : (
          <div>
            <span>{ trackName }</span>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            <label htmlFor="favorite">
              Favorita
              <input
                name="favorite"
                type="checkbox"
                checked={ isChecked }
                onChange={ this.handleChange }
                data-testid={ `checkbox-music-${trackId}` }
              />
            </label>
          </div>
        ));
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  song: PropTypes.shape({
    trackId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;
