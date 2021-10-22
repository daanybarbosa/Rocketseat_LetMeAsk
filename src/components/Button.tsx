// importacao para dar ao botao as mesmas funcoes de um html 
import { ButtonHTMLAttributes } from 'react';

import '../styles/button.scss';

//propriedades que o botao ira receber
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps){
    return (
        <button className="button" {...props} />
    )
}