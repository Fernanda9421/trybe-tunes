# Projeto TrybeTunes!

Esse projeto foi desenvolvido durante o curso de Desenvolvimento Web, na Trybe.


# Sumário

- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Habilidades](#habilidades)
- [Contexto](#contexto)
- [Data de desenvolvimento do projeto](#data-de-desenvolvimento-do-projeto)
- [Instruções para clonar o projeto](#instruções-para-clonar-o-projeto)
- [Resultado](#resultado)
- [Funcionalidades](#funcionalidades)


## Tecnologias utilizadas

- React.js;

- CSS 3.
 

## Habilidades

  * Requisições à uma `API`;

  * Ciclos de vida de um componente React;

  * Componente `BrowserRouter` ;

  * Rotas;

  *  `Switch` do `React Router`;

  * Componente `Redirect`;

  * Links de navegação na aplicação com o componente `Link`;


## Contexto

Esta aplicação é capaz de reproduzir músicas das mais variadas bandas e artistas, criar uma lista de músicas favoritas e editar o perfil da pessoa usuária logada. É possível:

  - Fazer login;
  - Pesquisar por uma banda ou artista;
  - Listar os álbuns disponíveis dessa banda ou artista;
  - Visualizar as músicas de um álbum selecionado;
  - Reproduzir uma prévia das músicas deste álbum;
  - Favoritar e desfavoritar músicas;
  - Ver a lista de músicas favoritas;
  - Ver o perfil da pessoa logada;
  - Editar o perfil da pessoa logada;


## Data de Desenvolvimento do Projeto

  - Novembro / 2021.
   

## Instruções para clonar o projeto

1. Clone o repositório

  * `git clone git@github.com:git@github.com:Fernanda9421/trybe-tunes.git`
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd trybe-tunes`

2. Instale as dependências e inicialize o projeto

  * Instale as dependências:

    * `npm install`

  * Inicialize o projeto:

    * `npm start` (uma nova página deve abrir no seu navegador com um texto simples)
      

## Resultado

Após clonar o projeto, o resultado no *Browser* será semelhante à este gif

![Project Gif](./trybe-tunes.gif)






## Funcionalidades

#### Formulário para identificação

O usuário deve ser capaz de fazer *Login*, onde o botão `Entrar` só é habilitado caso o nome digitado tenha mais de 3 caracteres.

Após clicar no botão, o usuário é redirecionado para a página de busca. 

#### Componente Header

O *Header* possui links de redirecionamento de página.

#### Formulário para pesquisar artistas

Aqui o usuário deve ser capaz de digitar o nome de uma banda ou artista.

Os álbuns retornados pela API são exibidos na tela em formato de *cards*, e possuem um link que redireciona para as músicas do artista.

Ao selecionar um album, é exibido uma lista com as músicas do artista.

Se nenhum álbum for encontrado para o nome pesquisado, a API retorna a mensagem `Nenhum álbum foi encontrado`.

#### Adicionar músicas na lista de favoritas

O usuário deve ser capaz de marcar suas músicas favoritas. Elas são salvas no LocalStorage, e ao clicar no link `Favorites`, é exibido uma lista com todas as músicas favoritadas.

O usuário também deve ser capaz de remover músicas da lista de favoritas.

#### Exibição de perfil

Aqui, o nome do usuário logado aparece na tela.

Há um botão `Editar perfil`, onde o usuário é redirecionado e pode adicionar mais informações sobre ele.

#### Formulário de edição de perfil

Há um formulário de edição, e o botão `Enviar` só é habilitado quando todos os campos estiverem preenchidos.

Ao finalizar, o usuário é redirecionado novamente para a página de perfil, que exibe as informações atualizadas.