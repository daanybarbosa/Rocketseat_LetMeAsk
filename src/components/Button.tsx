/* **------- Ex 3 - ESTADO ---------** */
// é manipulavel pelo o usuario 
// é uma informacao mantida por um componente dentro do react, sempre que tera 

import { useState } from "react";


export function Button(){
    // let it change - deixe mudar 
    //let counter = 0;

    // counter é o valor da variavel e setCounter é uma funcao que serve para alterar o valor de counter 
    // imutabilidade - a partir do momento que uma variavel foi criada, dentro de um estado de um componente, ela nao sofre alterações, sempre cria uma nova informacaoo com base na informacao que tinhamos
    const [counter, setCounter] = useState(0) //transformar o counter em estado, e se inicia com 0, e o useState retorna um vetor

    function increment(){
        //counter += 1;
        //console.log(counter);

        setCounter(counter + 1);
        //console.log(counter);
    }

    return (
        <button onClick={increment}>
            {counter}
        </button>
    )
}


/** **------- Ex 2 - PROPRIEDADES ---------** 

type ButtonProps = {
    //propriedade para o botao
    text?: string, //?: torna essa propriedade opcional
    num?: number,
    arrayB?: Array<string>, //ou string[],
    children?: string; //children - é uma tag que tem conteudo
}
// named export - export na linha da funcao
// para incluir uma propriedade no botao, precisa colocar o argumento Props e a propriedade 
// caso o botao nao tenha propriedade será representado por Default
export function Button(props: ButtonProps){
    return (
        //<button>{props.text || 'Default'}</button>
        <button>{props.children || 'Default'}</button>
    )
}
*/

/* **--------- com export default ----------** 
function Button(){
    return(
        <button>Clique aqui</button>
    )
}

export default Button;
*/