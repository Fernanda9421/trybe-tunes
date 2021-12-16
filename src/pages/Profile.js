import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import userImage from '../imgs/user.png';
import '../css/profile.css';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      image: '',
      name: '',
      email: '',
      description: '',
    };
  }

  componentDidMount() {
    this.getUserLogin();
  }

  getUserLogin = async () => {
    this.setState({
      isLoading: true,
    });
    const user = await getUser();
    this.setState({
      isLoading: false,
      name: user.name,
      email: user.email,
      description: user.description,
      image: user.image,
    });
  }

  render() {
    const { isLoading, name, email, description, image } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          isLoading
            ? <Loading />
            : (
              <main className="profile__main">
                <div className="profile__header">
                  <section>
                    {
                      image ? (
                        <img
                          className="profile__user"
                          data-testid="profile-image"
                          src={ image }
                          alt={ name }
                        />
                      ) : (
                        <img
                          className="profile__user"
                          src={ userImage }
                          alt="Avatar de usuário"
                        />
                      )
                    }
                  </section>
                  <nav>
                    <Link
                      className="profile__link"
                      to="/profile/edit"
                    >
                      Editar perfil
                    </Link>
                  </nav>
                </div>
                <section className="profile__infosUser">
                  <span><strong>Nome:</strong></span>
                  <p>{ name }</p>
                  <span><strong>Email:</strong></span>
                  <p>{ email }</p>
                  <span><strong>Descrição:</strong></span>
                  <p>{ description }</p>
                </section>
              </main>
            )
        }
      </div>
    );
  }
}

export default Profile;
