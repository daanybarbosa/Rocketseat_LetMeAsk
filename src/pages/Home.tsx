// webpack (snowpack, vite, ...) ->  é um module bundler 

// para usar navegacao dentro do botao 
import { useHistory } from 'react-router-dom';

import {auth, firebase} from '../services/firebase';

//importar imagens
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

// importacao do componente Button (ButtonHTMLAttributes)
import { Button } from '../components/Button';

import '../styles/auth.scss';


//todos os componentes precisam iniciar com letra maiuscula
// no react as classes dentro das tags são chamadas de className, por conta que class já é reservado para a criacao de classes 
// Button (ButtonHTMLAttributes) no "entrar na sala" é o componente criado para ser usado em varias paginas diferentes
export function Home(){

    //useHistory é um Hook, ele precisa ficar dentro do componente, pq ele faz uso de informacoes que sao do contexto do componente
    const history = useHistory();

    function handleCreateRoom(){

        // Autenticacao do usuario com o firebase
        const provider = new firebase.auth.GoogleAuthProvider();

        // Processo de login
        auth.signInWithPopup(provider).then(result => {
            console.log(result);

            // essa funcao sera incluida no botao do google para ser redirecionado para a nova pagina
            // redirecionar o usuario para a criação da tela
            history.push('/rooms/new')
        })
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
                    <form>
                        <input 
                        type="text" 
                        placeholder="Digite o código da sala"
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