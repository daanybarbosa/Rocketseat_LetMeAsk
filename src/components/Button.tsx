// importacao para dar ao botao as mesmas funcoes de um html 
import { ButtonHTMLAttributes } from 'react';

import '../styles/button.scss';

//propriedades que o botao ira receber
//ButtonHTMLAttributes -> tipagem do TypeScript para o editor entender as propriedades que o button pode receber
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean;
};

// importante destacar todas as propriedades que o botao do html pode receber
// destruturar o props, substituindo por {} para colocar duas funcionalidades, caso nao atenda a primeira funcionalidade (isOutlined), ira operar na segunda (...props)
export function Button({isOutlined = false, ...props}: ButtonProps){
    return (
        // {...props} - repasse de props - pegando todas as propriedades que esse botao recebe e passando para o botao do html 
        //<button className="button" {...props} />

        //className={`button ${isOutlined ? 'outlined' : ''}`} // condicional -> caso isOutlined exista entao ira colocar uma classe a mais chamada outlined, senao nao coloca nada.
        <button 
            className={`button ${isOutlined ? 'outlined' : ''}`}
            {...props}
        />
    )
}