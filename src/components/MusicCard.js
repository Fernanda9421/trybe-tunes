import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.getFavorited = this.getFavorited.bind(this);

    this.state = {
      isLoading: false,
      isFavorited: false,
    };
  }

  componentDidMount() {
    this.getFavorited();
  }

  handleChange() {
    const { song } = this.props;
    const { isFavorited } = this.state;

    if (isFavorited === false) {
      song.isChecked = true;
      this.setState({
        isLoading: true,
      }, () => {
        addSong(song).then(() => {
          this.setState({ isLoading: false, isFavorited: true });
        });
      });
    } else {
      const { onChange } = this.props;
      song.isChecked = false;
      this.setState({ isLoading: true }, () => {
        removeSong(song).then(() => {
          this.setState({ isLoading: false, isFavorited: false });
          if (onChange !== undefined) {
            onChange();
          }
        });
      });
    }
  }

  getFavorited() {
    const { isChecked } = this.props;
    if (isChecked === true) {
      this.setState({
        isFavorited: true,
      });
    }
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isLoading, isFavorited } = this.state;

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
                id="favorite"
                type="checkbox"
                checked={ isFavorited }
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
  isChecked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  song: PropTypes.shape({
    trackId: PropTypes.number,
    isChecked: PropTypes.bool,
  }).isRequired,
};

export default MusicCard;
