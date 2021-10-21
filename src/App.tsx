/* **------- Ex 3 - ESTADO ---------** */

import {Button} from "./components/Button";

function App() {
  return (  
    <div>
      <Button />
      <Button />
      <Button />
      <Button />
      <Button />
    </div>
  );
}

export default App;

/* **------- Ex 2 - PROPRIEDADES ---------** 
 // <a href="" target="_blank"></a> -> é um atributo que muda comportamento da ancora 


// named export - export na linha da funcao
 import {Button} from "./components/Button";

 function App() {
   return (  
     <div>
       <Button text="Botão 1"/>
       <Button num={1}/>
       <Button arrayB={['1,', '2', '3']}/>
       <Button>Clique aqui</Button> 
       <Button />
     </div>
   );
 }
 
 export default App;
  */

/* **--------- com export default ----------** 
import Button from "./components/Button";

function App() {
  return (  
    <div>
      <Button />
      <Button />
      <Button />
      <Button />
      <Button />
    </div>
  );
}

export default App;
*/

/* **------- Ex 1 - COMPONENTES ---------** 
function App() {
  return (
    <h1> Hello World! </h1>
  );
}

export default App;
*/