import firebase from "firebase/compat";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../services/firebase";

//quais informacoes tera no usuario 
type User = {
    id: string;
    name: string;
    avatar: string;
  };

//quais informacoes tera no contexto
type AuthContextType = {
    user: User | undefined ; 
    signInWithGoogle: () => Promise<void>;
  }

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
// Contexto de autenticação
const [user, setUser] = useState<User>();

//Criando hook de autenticação
useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(user => {
    if (user) {
      const { displayName, photoURL, uid} = user;

      if(!displayName || !photoURL){
        throw new Error('Missing information from Google Account');
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }) 

  return () => {
    unsubscribe();
  }
}, [])

async function signInWithGoogle() {
  // Autenticacao do usuario com o firebase
  const provider = new firebase.auth.GoogleAuthProvider();

  const result = await auth.signInWithPopup(provider);

  // Processo de login
  // se um usuario fez a autenticacao
    if (result.user){
      const { displayName, photoURL, uid} = result.user;

      if(!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.');
      }

      setUser({
        id: uid,
        name:displayName,
        avatar: photoURL
      });

    }
}



    return(
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    );
}