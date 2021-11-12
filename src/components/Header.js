import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    // this.retrieveUser = this.retrieveUser.bind(this)

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
    return (
      <header
        data-testid="header-component"
        retrieveUser={ this.retrieveUser() }
      >
        <h1>TrybeTunes</h1>
        {isLoadind
          ? <Loading />
          : <span data-testid="header-user-name">{ nameUser }</span>}
      </header>
    );
  }
}

export default Header;
