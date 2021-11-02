//Estrutura das perguntas

import { ReactNode} from 'react';

import './styles.scss';

// tipagem - quais propriedades esse componente recebe
type QuestionProps = {
    content: string; //conteudo da pergunta
    author: {
        name: string; //nome do autor
        avatar: string; //avatar do autor
    };
    //ira receber os botoes de controle das perguntas 
    //ReactNode - qualquer conteudo jsx
    children?: ReactNode; 
}

//export function Question(props: QuestionProps){

//forma destruturada 
export function Question({
    //apenas as propriedades que vamos usar
    content,
    author,
    children,
}: QuestionProps){
    return (
        <div className="question">
            {/*<p>{props.content}</p> {/* Conteudo */} 
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name}/>
                    <span>{author.name}</span>
                </div>

                {/* Controles da pergunta*/}
                <div>
                    {children}
                </div> 
            </footer>
        </div>
    )
}    
