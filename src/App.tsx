import { BrowserRouter, Route } from 'react-router-dom';

import { Home } from "./pages/Home";
import { NewRoow } from "./pages/NewRoom";

function App() {
  return (  
    // para criação de rotas/navegação
    //  exact -> significa que o nome da rota precisa ser exatamente oq esta no caminho, por exemplo "/".
    //  exact -> por padrao ele é verdadeiro, caso seja falso precisa especificar.
    // exemplo: <Route path="/" exact={false} component={Home} />

    <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" exact component={NewRoow} />

    </BrowserRouter>


    // para visualizar as paginas criadas
    //< Home />
    //< NewRoow />

  
  );
}

export default App;