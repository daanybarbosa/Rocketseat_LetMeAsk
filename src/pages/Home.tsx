import { useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';

//importar imagens
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import { database } from '../services/firebase';

// importacao do componente Button (ButtonHTMLAttributes)
import { Button } from '../components/Button';

import '../styles/auth.scss';
import { useAuth } from '../hooks/useAuth';

export function Home(){

    // useHistory é um Hook, ele precisa ficar dentro do componente, pq ele faz uso de informacoes que sao do contexto do componente
    const history = useHistory();

    // Importar o contexto
    const {user, signInWithGoogle} = useAuth();

    // Criar um estado -> ira armazenado o roomCode (codigo da sala) que o usuario esta tentando entrar
    const [roomCode, setRoomCode] = useState('');

    // Criação de sala 
    async function handleCreateRoom(){
            // se o usuario nao estiver autenticado
            if (!user){
                await signInWithGoogle()
            }

            // redirecionar o usuario para a criação da sala
            history.push('/rooms/new')
        };        

        // Entrando na sala 
        // essa função é usada no formulario, quando se usa uma função em um formulario precisa declarar o evento
        async function handleJoinRoom(event: FormEvent){
            event.preventDefault(); // precisa declarar em todo formulario no react

            // verificar se o roomCode está vazio, se estiver nao sera executado
            if(roomCode.trim() === ''){
                return;
            }

            // ira puxar o id no firebase e comparar 
            // get() -> ira puxar todos os dados dessa sala especificamente
            const roomRef = await database.ref(`rooms/${roomCode}`).get();

            // caso nao exista a sala informada
            if(!roomRef.exists()){
                alert('A sala não existe');
                return;
            }

            // caso a sala exista 
            history.push(`/rooms/${roomCode}`);
        }

    return (
        <div id="page-auth">
            <aside>
               <img src={illustrationImg} alt="Ilustracao simbolizando perguntas e respostas" />
                <strong> Crie salas de Q&amp;A ao vivo</strong>
                <p>Tire as suas dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator"> Ou entre em uma sala </div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                        type="text" 
                        placeholder="Digite o código da sala"
                        onChange={event => setRoomCode(event.target.value)}
                        value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala 
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}