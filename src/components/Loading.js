import React, { Component } from 'react';
import '../css/loading.css';

class Loading extends Component {
  render() {
    return (
      <div className="div-loading">
        <p className="loading">Carregando...</p>
        <div className="c-loader" />
      </div>
    );
  }
}

export default Loading;
