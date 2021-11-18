import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

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
              <main>
                <section>
                  <img data-testid="profile-image" src={ image } alt={ name } />
                </section>
                <nav>
                  <Link to="/profile/edit">Editar perfil</Link>
                </nav>
                <section>
                  <span>Nome:</span>
                  <p>{ name }</p>
                  <span>Email:</span>
                  <p>{ email }</p>
                  <span>Descrição:</span>
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
