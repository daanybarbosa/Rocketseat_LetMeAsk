// importacao para dar ao botao as mesmas funcoes de um html 
import { ButtonHTMLAttributes } from 'react';

import '../styles/button.scss';

//propriedades que o botao ira receber
//ButtonHTMLAttributes -> tipagem do js para o editor entender as propriedades que o button pode receber
//ButtonHTMLAttributes -> tipagem do TypeScript para o editor entender as propriedades que o button pode receber
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

// importante destacar todas as propriedades que o botao do html pode receber
export function Button(props: ButtonProps){
    return (
        // {...props} - repasse de props - pegando todas as propriedades que esse botao recebe e passando para o botao do html 
        <button className="button" {...props} />
    )
}