// ** copiando o mesmo codigo de Room.tsx
import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useHistory, useParams } from 'react-router-dom';

import '../styles/room.scss';
//import { FormEvent, useState } from 'react';
//import { useAuth } from '../hooks/useAuth';
//import { database } from '../services/firebase';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

type RoomParams = {
    id: string;
}

export function AdminRoom() {
    //const { user } = useAuth();
    const history = useHistory();
    const params = useParams<RoomParams>();
    //const [newQuestion, setNewQuestion] = useState('');

    const roomId = params.id;

    //importando as funções transferidas para o useRoom
    const {title, questions} = useRoom(roomId);



    /* Criação de novas perguntas - nao vai ser usado em AdminRoom
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
     */

    // Encerrar sala 
    //update - ira alterar os dados da sala 
    async function handleEndRoom(){
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })


        // Depois de encerrar a sala, o usuario sera redirecionado para a pagina inicial
        history.push('/')
    };

    async function handleDeleteQuestion(questionId: string){
        //confirm (Browser - javascript) - retorna um boolean 
        if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    {/* A imagem vai totalmente para a direira */}
                    <img src={logoImg} alt="Letmeask" />
                   <div>
                    {/* Os botoes vão totalmente para a esquerda */}
                    <RoomCode code={roomId} />
                    {/*<Link to="/rooms/-MmxyvDjkTMkEoWXE_Bf">Teste de sala</Link> */}
                    {/*<Button isOutlined>Encerrar sala</Button> */}
                    <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
                   </div>
                </div>
            </header>

            <main className='content'>
                <div className='room-title'>
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

            {/** **Na pagina de Admin nao terá formulario 
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
                </form>*/}
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
                            <button
                                type="button"
                                onClick={() => handleDeleteQuestion(question.id)}
                            >
                                <img src={deleteImg} alt="Remover pergunta"/>
                            </button>
                        </Question>
                    )
                })}
            </div>
            </main>
        </div>
    );
}; 