import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useParams } from 'react-router-dom';

import '../styles/room.scss';
import { FormEvent, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';

/* ** transferido para o useRoom.ts
type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}>; */

/* ** transferido para o useRoom
type QuestionType = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}*/

type RoomParams = {
    id: string;
}

export function Room() {
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('');
    const roomId = params.id;

    //importando as funções transferidas para o useRoom
    const {title, questions} = useRoom(roomId);
    
    // transferido para a pagina useRoom
    //const [questions, setQuestions] = useState<QuestionType[]>([]);
    //const [title, setTitle] = useState('');

    /* **transferido para o useRoom.ts
    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);
        // ira ficar ouvindo toda vez que uma nova informação é cadastrada na sala com o ${roomId }, ele ira executar o codigo de novo e vai substituir as informações em tela
        roomRef.on('value', room => {    
            const databaseRoom = room.val();
            const firebaseQuestions : FirebaseQuestions = databaseRoom.questions ?? {};
            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return{
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered
                }
            }); 
            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        })
    }, [roomId]); //isso evita que o usuario fique transitando entre salas 
*/
    // Criação de novas perguntas
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
        await database.ref(`rooms/${roomId}/questions`).push(question);

        // assim que enviar a pergunta, ira deixara o campo em branco 
        setNewQuestion('');
    }

    //Funcionalidade do Like
    //questionId -> ira trazer o id da pergunta 
    async function handleLikeQuestion(questionId: string, likeId: string | undefined){
        
        // Caso o usuario ja tenha dado like, sera desmarcado o like 
        if (likeId){
            // remover o like
            await database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`).remove();
        } else {
            await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
                authorId: user?.id,
            });
        }

        /*
        await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
            authorId: user?.id,
        });
        */
    }

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
                    onChange={event => setNewQuestion(event.target.value) }
                    value={newQuestion}
                    />

                    <div className='form-footer'>
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
                {/*JSON.stringify(questions)}; */}

            {/** O metodo map() funciona da mesma forma que o ForEach
             * ele percorre cada um dos itens do questions e permite que retorne um componente novo em cada um deles 
             * */}
            <div className="question-list">
            {questions.map(question => {
                /** key={question.id} -> Algoritmo de reconcilição -É necessario passar o id para o react diferenciar uma pergunta da outra*/
                    return (
                        <Question 
                        key={question.id} 
                        content={question.content}
                        author={question.author}
                        >
                        {/* Botoes de controle - like, responder, e etc 
                          * aria-label -> acessibilidade - informar a funcionalidade do icone
                        */}
                        <button
                            className={`like-button ${question.likeId ? 'liked' : ''}`}
                            type='button'
                            aria-label='Marcar como gostei'
                            onClick={() => handleLikeQuestion(question.id, question.likeId)}
                        >

                            {/** numeros de like 
                             * Apenas ira mostrar o likecount se o contador for maior que 0 */}
                           { question.likeCount > 0 && <span>{question.likeCount}</span>}
                            {/** Importar a imagem diretamento do svg - isso é feito para pode customizar o icone 
                             * E precisa alterar as variaveis da imagem para camelCase 
                            */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                        </Question>
                    );
                })}
            </div>
            </main>
        </div>
    );
};