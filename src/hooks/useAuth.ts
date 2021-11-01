// FLuxo de salas
// usuario -> usando a sala
// admin -> usando a sala

import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function useAuth(){
    const value = useContext(AuthContext);

    return value;
}