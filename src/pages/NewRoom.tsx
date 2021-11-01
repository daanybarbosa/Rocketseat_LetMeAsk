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

    // Acesso ao nome da sala inserido no input -> mais comum é utilizar um estado para armazenar o valor do input
    // String vazia -> Sempre iniciar o estado com o mesmo tipo que será salvo na variavel, no caso, sempre será vazio.
    const [newRoom, setNewRoom] = useState('');

    // Função que ira criar sala
    // event -> ira gerar um evento para obter os dados inseridos pelo o usuario
    // dessa forma, quando o usuario preencher o formulario nao ira piscar/redirecionar para a mesma tela.
    async function handleCreateRoom(event: FormEvent){
        event.preventDefault();

        //console.log(newRoom);

        // verificar se existe algum texto digitado pelo o usuario para criar uma nova sala
        // trim() -> remover os espaços tanto na direita quanto na esquerda
        if(newRoom.trim() === ''){
            return; //ira retornar caso esteja vazio
        }

        // Banco de dados firebase
        // Reference -> referencia para um registro de dado dentro do banco de dados
        // rooms -> categoria dentro do banco de dados, que pode incluir dados, como o nome da sala, ou dados interativos, como um array/lista de perguntas
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

    // No React, para salvar os dados inseridos pelo o usuario, precisa informar dentro do form.
    // Por exemplo, <form onSubmit={handleCreateRoom}>, quando o usuario clicar no botao ira salvar as informações inseridas.
    // onChange={event => setNewRoom(event.target.value)} -> toda vez que o input tiver o seu valor alterado, ira pegar o evento.
    // value={newRoom} -> caso a variavel seja alterada por algum motivo, ira refletir no input.
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