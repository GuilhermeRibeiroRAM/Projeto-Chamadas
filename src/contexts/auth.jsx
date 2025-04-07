import { useState, createContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { auth, db } from '../services/firebaseConnection';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Criação do Contexto

export const authContext = createContext({});

// Provedor do Contexto

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);

    const navigate = useNavigate();

    // Função de Login
    function SignIn(email, password) {
        console.log(email);
        console.log(password);
        alert('Logado com sucesso!');
    }

    // Função de Cadastro
    async function SignUp(name, email, password) {
        setLoadingAuth(true);
            await createUserWithEmailAndPassword(auth, email, password)
                .then(async(value) => {
                    let uid = value.user.uid;

                    await setDoc(doc(db, "users", uid),{
                        nome: name,
                        avatarUrl: null
                    })
                    .then(() =>{
                        
                        let data ={
                            uid: uid,
                            nome: name,
                            email: value.user.email,
                            avatarUrl: null
                        };
                        setUser(data)
                        setLoadingAuth(false);
                        navigate("/dashboard");
                        
                    })
                })
                .catch((error) =>{
                    console.log(error);
                        setLoadingAuth(false);
                            navigate("/dashboard");
                })
    }

    return (
        <authContext.Provider
            value={{
                signed: !!user,
                user,
                SignIn,
                SignUp,
                loadingAuth
            }}>
            {children}
        </authContext.Provider>
    );
}

export default AuthProvider;