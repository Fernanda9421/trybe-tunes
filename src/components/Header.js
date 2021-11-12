import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      nameUser: '',
      isLoadind: true,
    };
  }

  retrieveUser = async () => {
    const name = await getUser();
    this.setState({
      nameUser: name.name,
      isLoadind: false,
    });
  }

  render() {
    const { nameUser, isLoadind } = this.state;
    this.retrieveUser();
    return (
      <header data-testid="header-component">
        <h1>TrybeTunes</h1>
        <nav>
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </nav>
        {isLoadind
          ? <Loading />
          : <p data-testid="header-user-name">{ nameUser }</p>}
      </header>
    );
  }
}

export default Header;
