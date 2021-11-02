import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<string, {
        authorId: string;
    }>;
}>;

type QuestionType = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likeCount: number;
    //hasLiked: boolean;
    likeId: string | undefined;
}

//iremos receber como parametro o roomId 
export function useRoom(roomId: string){
    const { user } = useAuth();
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value', room => {    

            const databaseRoom = room.val();
            const firebaseQuestions : FirebaseQuestions = databaseRoom.questions ?? {};

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return{
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                    likeCount: Object.values(value.likes ?? {}).length, //numeros de likes que a pergunta recebeu - ?? (ou) um {} objeto vazio 
                    //hasLiked: Object.values(value.likes ?? {}).some(like => like.authorId === user?.id) //se o usuario deu like ou nao - some() ira percorrer o array ate encontrar alguma condição que satisfaça a solicitação e sempre retorna true/false.
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0], //se o usuario deu like ou nao - some() ira percorrer o array ate encontrar alguma condição que satisfaça a solicitação e sempre retorna true/false.
                }
            }); 

            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        })

        //Função unsubscribe (desinscrever) do eventListener - useEffect.
        //parametro encontrado na documentacao do firebase
        return () => {
            roomRef.off('value');
        }

    }, [roomId, user?.id]);

    return {questions, title};
} 