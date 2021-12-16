import React, { Component } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../css/header.css';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      nameUser: '',
      isLoadind: true,
    };
  }

  retrieveUser = () => {
    getUser().then((nameObj) => {
      this.setState({
        nameUser: nameObj.name,
        isLoadind: false,
      });
    });
  }

  render() {
    const { nameUser, isLoadind } = this.state;
    this.retrieveUser();
    return (
      <header data-testid="header-component">
        {
          isLoadind
            ? <Loading />
            : (
              <section>
                <div className="header-user">
                  <h1 className="title">TrybeTunes</h1>
                  <p className="user" data-testid="header-user-name">
                    <FaUserCircle className="icon" />
                    { nameUser }
                  </p>
                </div>
                <nav className="nav-links">
                  <NavLink
                    activeClassName="selected"
                    className="link"
                    data-testid="link-to-search"
                    to="/search"
                  >
                    Search
                  </NavLink>
                  <NavLink
                    activeClassName="selected"
                    className="link"
                    data-testid="link-to-favorites"
                    to="/favorites"
                  >
                    Favorites
                  </NavLink>
                  <NavLink
                    activeClassName="selected"
                    className="link"
                    data-testid="link-to-profile"
                    to="/profile"
                  >
                    Profile
                  </NavLink>
                </nav>
              </section>
            )
        }
      </header>
    );
  }
}

export default Header;
