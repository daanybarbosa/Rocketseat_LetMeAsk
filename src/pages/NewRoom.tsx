import { Link, useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';

import '../styles/auth.scss';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

export function NewRoow(){
    const { user } = useAuth();

    // Criando a sala -> quando o usuario criar a sala, sera redirecionado para a sala criada 
    const history = useHistory();
    const [newRoom, setNewRoom] = useState('');

    // Função que ira criar sala
    async function handleCreateRoom(event: FormEvent){
        event.preventDefault();

        if(newRoom.trim() === ''){
            return; //ira retornar caso esteja vazio
        }

        // Banco de dados firebase
        const roomRef = database.ref('rooms');

        // ira pegar a referencia dentro do banco de dados e ira fazer um push -> jogar uma informação dentro do roomRef
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id, //o ? é colocado pq em um primeiro momento o usuario é undefined 
        });

        // Criando a sala ->  quando o usuario criar a sala, sera redirecionado para a sala criada
        // key -> é o id (registro) criado pelo o firebase
        history.push(`/rooms/${firebaseRoom.key}`);

    };

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
                    <h2>Criar uma nova sala </h2>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                        type="text" 
                        placeholder="Nome da sala"
                        onChange={event => setNewRoom(event.target.value)}
                        value={newRoom}
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