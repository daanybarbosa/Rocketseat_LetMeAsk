import copyImg from '../assets/images/copy.svg';

import '../styles/room-code.scss';

// Componente RoomCode recebe a propriedade code, que é o codigo da sala
type RoomCodeProps = {
    code: string;
};

//Componente para o código da sala
export function RoomCode(props: RoomCodeProps){
    function copyRoomCodeToClipboard(){
        //ira chamar um API do navegador 
        navigator.clipboard.writeText(props.code)
    };

    return (
        <button className="room-code" onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span>Sala #{props.code}</span>
        </button>
    )
}