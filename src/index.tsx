import React from 'react';
import ReactDOM from 'react-dom'; //
import App from './App';

//conectando a aplicacao ao firebase
import './services/firebase';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') 
);

/* **------- Ex 2 - PROPRIEDADE ----------**
 // Em HTML é conhecido como atributos
 // Propriedades sao informacoes que iremos passar para um componente para se comporta de maneira diferente

import React from 'react';
import ReactDOM from 'react-dom'; //
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') 
);

*/  

/* **------- Ex 1 - COMPONENTES ---------** 

import React from 'react';
// DOM = Document Object Model -> representacao do html dentro de um objeto JS
import ReactDOM from 'react-dom'; //
import App from './App';

//renderizar - exibir alguma coisa dentro de um elemento no html
// App - é o que esta sendo exibido na pagina, tbm pode ser substituido por um codigo em html
// HTML dentro do JS = JSX (Javascript XML) ou TSX, no caso no tsx é pq a linguagem usada é typescript
// Components - pedaços isolados de codigo que juntos formam a aplicacao
// Components é uma funçao que devolve um HTML - no React tudo é components

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') //esta colocando o codigo acima dentro de root e colocando no arquivo html
);
*/
