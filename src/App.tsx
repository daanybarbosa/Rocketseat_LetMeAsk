import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from "./pages/Home";
import { NewRoow } from "./pages/NewRoom";
import {AuthContextProvider} from './contexts/AuthContext';
import { Room } from './pages/Room';

function App() {
  
  return (
    /** Entrar na sala -> Route path="/rooms/:id"
     * Iremos obter o id da sala (id_author) gerado pelo o firebase para identificar qual sala esta sendo acessada.
     * 
     * Switch -> nao vai deixar chamar duas rotas ao mesmo tempo 
     * Se uma das rotas foi satisfeita, ele ira parar de procurar por outras que satisfaçam o mesmo endereço 
     *  */

    <BrowserRouter>
      <AuthContextProvider>
      <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoow} />
          <Route path="/rooms/:id" component={Room} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>

  );
}

export default App;