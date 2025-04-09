import { useState, createContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from '../services/firebaseConnection';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { toast } from "react-toastify";

// Criação do Contexto
export const authContext = createContext({});

// Provedor do Contexto
// No provedor do contexto terá toda a parte direcionada aos métodos e toda a lógica
function AuthProvider({ children }) { // O children é uma prop especial que representa todo o conteúdo que será encapsulado dentro do componente AuthProvider quando ele for usado

    const [user, setUser] = useState(null); // Informações do usuário
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() =>{
        async function loadUser() {
            const storageUser = localStorage.getItem('@ticketsPRO')

            if(storageUser){
                setUser(JSON.parse(storageUser))
                    setLoading(false);
            }
            setLoading(false);
        }
        loadUser
    },[])

    // Função de Login
    async function SignIn(email, password) {
        setLoadingAuth(true);

        await signInWithEmailAndPassword(auth, email, password)
            .then(async (value) => { // value = dados do usuário
                let uid = value.user.uid;

                const docRef = doc(db, "users", uid); // Acessando o db
                const docSnap = await getDoc(docRef);   // Pegando os dados

                let data = { // Informações inseridas na tabela do banco
                    uid: uid,
                    nome: docSnap.data().nome, // docSnap usado pois a informação está somente no banco, diferentemente do email, que está no campo de evento
                    email: value.user.email,
                    avatarUrl: docSnap.data().avatarUrl
                };

                setUser(data);
                setLoadingAuth(false);
                storageUser(data);
                navigate('/dashboard');
                toast.success("Login feito com Sucesso!");
            })
            .catch((error) =>{
                console.log(error);
                setLoadingAuth(false);
                toast.error("O usuário não existe!");
            })
    }

    // Função de Cadastro
    async function SignUp(name, email, password) {
        setLoadingAuth(true);
        await createUserWithEmailAndPassword(auth, email, password)
            .then(async (value) => {
                let uid = value.user.uid;
                await setDoc(doc(db, "users", uid), {
                    nome: name,
                    avatarUrl: null,
                    email: email
                })
                    .then(() => {
                        let data = { // Trazendo os dados do banco pra uma variável
                            uid: uid,
                            nome: name,
                            email: value.user.email,
                            avatarUrl: null
                        };
                        setUser(data);
                        setLoadingAuth(false); // Ponto que diz que o usuário foi cadastrado no banco
                        storageUser(data);
                        toast.success("Seja Bem-Vindo(a) ao Sistema!");
                        navigate("/dashboard");
                    })
            })
            .catch((error) => {
                console.log(error);
                setLoadingAuth(false);
                toast.error("Informações inválidas, tente novamente!")
            })
    }

    function storageUser(data){
        localStorage.setItem('@ticketsPRO', JSON.stringify(data))
    }

    async function logout() {
        await signOut();
        localStorage.removeItem('@ticketsPRO');
        setUser(null);
    }

    return (
        // Provendo o Contexto criado (authContext)
        // Todo provider deve receber um value, ou seja, quais informações que serão acessadas pelos componentes
        <authContext.Provider
            value={{
                signed: !!user,
                user,
                SignIn,
                SignUp,
                logout,
                loadingAuth,
                loading
            }}>
            {children}
        </authContext.Provider>
    );
}

export default AuthProvider;