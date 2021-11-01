import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useParams } from 'react-router-dom';

import '../styles/room.scss';
import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

//tipagem - room 
//As questions sao um objeto que a chave é uma string que recebe outro objeto que possui outra string e recebe outro objeto
// Record -> tipagem de objetos - podemos pensar que é um objeto que possui uma chave string
type FirebaseQuestions = Record<string, {
    // campos que existem dentro do objeto
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}>;

//tipagem - questions
type Question = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}

// tipagem - ira passar os parametros para o useParams()
type RoomParams = {
    id: string;
}

export function Room() {
    // Perguntas - Apenas usuarios autenticados poderao fazer novas perguntas
    const { user } = useAuth();

    //parametro para uma rota - usa o react-router-dom - useParams
    //por padrao o useParams() nao sabe quais parametros ira pegar na rota
    //<RoomParams> -> no typescript é chamado de generic , é um parametro que passa para a tipagem  
    const params = useParams<RoomParams>();

    // Estado - 
    const [newQuestion, setNewQuestion] = useState('');

    //Estado - questions - ele armazena um array 
    //useState<Question[]>([]) - no typescript se chama generic 
    const [questions, setQuestions] = useState<Question[]>([]);

    const [title, setTitle] = useState('');

    const roomId = params.id;

    // A implementação do useEffect depende da documentação do firebase
    // hook - função que dispara um evento, sempre que alguma informação mudar  
    // se [] estiver vazio, a função {} sera disparado uma unica vez assim que o componente for exibido em tela 
    useEffect(() => {
        //console.log(roomId);

        // ir na API do firebase e buscar os dados das perguntas 
        const roomRef = database.ref(`rooms/${roomId}`);

        // Event Listerner -> once (uma unica vez) ou on (mais de uma vez)
        //roomRef.once('value', room => {

        // ira ficar ouvindo toda vez que uma nova informação é cadastrada na sala com o ${roomId }, ele ira executar o codigo de novo e vai substituir as informações em tela
        roomRef.on('value', room => {    
            //console.log(room.val());

            const databaseRoom = room.val();
            //const firebaseQuestions = databaseRoom.questions as FirebaseQuestions; // pode ser escrito dessa forma, ou da forma abaixo.
            const firebaseQuestions : FirebaseQuestions = databaseRoom.questions ?? {};

            //modificar as questions - transformar de objeto para array
            //o room.questions -> pode ser vazio, entao caso esteja ira retornar um objeto vazio 
            //const parsedQuestions = Object.entries(room.questions ?? {});
            
            //o map ira percorrer cada valor dessa interação, o value é um conjunto de vetores - value[0] value[1] 
            //destruturação - colocar um array no lado esquerdo da estruturação e obter essa informação
            //adicionar o key no map para estruturar as informações que serao recebidas
            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                //retornar os dados
                return{
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered
                }
            }); 
            //console.log(parsedQuestions);
            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        })
    }, [roomId]); //isso evita que o usuario fique transitando entre salas 

    // Criação de novas perguntas
    //todas as vezes que se coloca no formulario, deve-se incluir a variavel event 
    async function handleSendQuestion(event: FormEvent){
        //para nao recarregar a tela
        event.preventDefault();

        //verificar se a newQuestion esta vazia
        if(newQuestion.trim() === ''){
            return;
        }

        // verificar se o usuario esta autenticado
        if(!user){
            throw new Error('Você precisa está logado para inserir novas perguntas')
        }

        //objeto - tera todas as informacoes da pergunta
        const question = {
            content: newQuestion, //conteudo - texto digitado em newQuestion
            author: { //autor da pergunta
                name: user.name, //nome do autor
                avatar: user.avatar, //avatar do autor
            },
            //
            isHighlighted: false, //destaque que o admin da para essa pergunta ser respondida
            isAnswered: false, //se a pergunta foi respondida ou nao 
        };

        //salvar a pergunta
        // ira criar uma nova coluna (questions) no firebase e ira incluir o objeto question
        await database.ref(`rooms/${roomId}/questions`).push(question);

        // assim que enviar a pergunta, ira deixara o campo em branco 
        // ira substituir o estado do setNewQuestion e sera refletido no newQuestion
        setNewQuestion('');
    }

    // <Button type="submit" disabled={!user}> Enviar pergunta</Button> -> no botao para enviar a pergunta sera desabilitado, caso o usuario nao esteja autenticado
    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <RoomCode code={roomId} />
                    {/*<Link to="/rooms/-MmxyvDjkTMkEoWXE_Bf">Teste de sala</Link> */}
                </div>
            </header>

            <main className='content'>
                <div className='room-title'>
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                    
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea 
                    placeholder='O que você quer perguntar? '
                    //Pegar o valor do input
                    onChange={event => setNewQuestion(event.target.value) }
                    value={newQuestion}
                    />

                    <div className='form-footer'>
                        {/** Para fazer if/else dentro do react é usado o operador ternario 
                         * user - se tiver alguma informação dentro do usuario
                         * () - ira mostrar alguma coisa
                         * : - senao 
                         * () - ira mostrar outra coisa
                         * 
                         * user-info -> Informações do usuario
                        *  */}
                        {user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span> Para enviar uma pergunta, <button>faça seu login</button></span>
                        )}
                        <Button type="submit" disabled={!user}> Enviar pergunta</Button>
                    </div>
                </form>
                {/** Para visualizar as informações das perguntas em tela */}
                {JSON.stringify(questions)};

            </main>
        </div>
    );
};