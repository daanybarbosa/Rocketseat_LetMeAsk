//import { useContext} from 'react';

// para colocar uma navegacao na ancora (href)
import { Link } from 'react-router-dom';
//import { AuthContext } from '../contexts/AuthContext';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
//import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';
//import { useAuth } from '../hocks/useAuth';
//import { TestContext } from '../App';

import '../styles/auth.scss';

export function NewRoow(){
    //const {value, setValue} = useContext(TestContext)
    //const { user } = useContext(AuthContext);
    //const { user } = useAuth();

    return (
        // <h1>{user?.name}</h1> -> exibe o nome do usuario na tela
        <div id="page-auth">
            <aside>
               <img src={illustrationImg} alt="Ilustracao simbolizando perguntas e respostas" />
                <strong> Crie salas de Q&amp;A ao vivo</strong>
                <p>Tire as suas dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <h2>Criar uma nova sala </h2>
                    <form>
                        <input 
                        type="text" 
                        placeholder="Nome da sala"
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/"> Clique aqui </Link>
                    </p>
                </div>
            </main>
        </div>
    )
}