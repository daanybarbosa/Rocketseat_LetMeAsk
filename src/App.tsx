// Contexto do React.js
//import { createContext, useState, useEffect } from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import { Home } from "./pages/Home";
import { NewRoow } from "./pages/NewRoom";
//import { auth, firebase } from './services/firebase';

import {AuthContextProvider} from './contexts/AuthContext';

// Contexto do React.js
// ira apresentar um erro de importacao, pq ele exige a identificacao do que sera importado, nesse caso, colocar o ({} as any ) para ele ignorar.
//export const TestContext = createContext({} as any);

/* *** movido para o arquivo AuthContext *** 
//quais informacoes tera no usuario 
type User = {
  id: string;
  name: string;
  avatar: string;
};
*/

/* *** movido para o arquivo AuthContext *** 
//quais informacoes tera no contexto
type AuthContextType = {
  //user: object;
  user: User | undefined ; //informar que o usuario pode ser undefined ou preenchido 
  //signInWithGoogle: () => void;
  signInWithGoogle: () => Promise<void>; //por ser uma função async (assincrona) ele devolve uma promise
}
*/

/* *** movido para o arquivo AuthContext *** */
// Contexto de autenticação
//export const AuthContext = createContext({} as any);
//export const AuthContext = createContext({} as AuthContextType);

function App() {
  /*
  //criar um estado para utilizar o useContext -> Contexto 
  //const [value, setValue] = useState('Teste');
  // Contexto de autenticação
  const [user, setUser] = useState<User>();
  //USEEFFECT - ira disparar uma função sempre que algo acontecer
  // ele recebe dois parametros: 
  //    {} qual funcao quer executar, 
  //    [] quando quer executar a função, o parametro e sempre sera um array/vetor, e dentro do array qual informacao quer ficar monitorando
  //Criando hook de autenticação
  useEffect(() => {
    //eventListener (ouvindo o evento) - se ele conseguir identificar que o usuario ja acessou na aplicação, ele vai retornar o usuario
    // função unsubscribe serve para desligar o eventListener
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid} = user;
        if(!displayName || !photoURL){
          throw new Error('Missing information from Google Account');
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    }) 
    return () => {
      //ira descadastrar de todos os eventListeners
      unsubscribe();
    }
  }, [])
  async function signInWithGoogle() {
    // Autenticacao do usuario com o firebase
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
    // Processo de login
    //auth.signInWithPopup(provider).then(result => {
      // se um usuario fez a autenticacao
      if (result.user){
        //buscar dados do usuario 
        //displayName -> nome que o usuario deixa visivel
        //photoURL -> endereço do avatar do usuario 
        //uid -> identificador unico do usuario 
        const { displayName, photoURL, uid} = result.user;
        // se o usuario nao tiver nome ou avatar ira apresentar um erro
        if(!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.');
        }
        setUser({
          id: uid,
          name:displayName,
          avatar: photoURL
        });
      }
    //})
  }*/

  return (
    // para criação de rotas/navegação
    //  exact -> significa que o nome da rota precisa ser exatamente oq esta no caminho, por exemplo "/".
    //  exact -> por padrao ele é verdadeiro, caso seja falso precisa especificar.
    // exemplo: <Route path="/" exact={false} component={Home} />
    // TestContext.Provider é um componente Provider
    // Na linha: <TestContext.Provider value={{value, setValue}}> // a primeira chave é que sera incluso um codigo JS, e a segunda chave é que sera incluso um objeto

    /* Contexto - Exemplo 
    <BrowserRouter>
      <TestContext.Provider value={{value, setValue}}>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" exact component={NewRoow} />
      </TestContext.Provider>
    </BrowserRouter>
    */

    /* *** movido para o arquivo AuthContext *** 
    <BrowserRouter>
      <AuthContext.Provider value={{ user, signInWithGoogle }}>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" exact component={NewRoow} />
      </AuthContext.Provider>
    </BrowserRouter>
    */

    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" exact component={NewRoow} />
      </AuthContextProvider>
    </BrowserRouter>

    // para visualizar as paginas criadas
    //< Home />
    //< NewRoow />


  );
}

export default App;