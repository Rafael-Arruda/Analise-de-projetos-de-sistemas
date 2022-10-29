import {useState, useEffect, createContext} from 'react';
import firebase from '../services/firebaseConnection';
import {toast} from 'react-toastify';

export const AuthContext = createContext({});

function AuthProvider({ children }){

    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        
        function loadStorage(){
            const storageUser = localStorage.getItem('SistemaUser');

            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }

            setLoading(false);
        }

        loadStorage();

    }, [])

    //Fazendo Login
    async function signIn(email, password) {
        setLoadingAuth(true);

        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (value) => {
            let uid = value.user.uid;

            const userProfile = await firebase.firestore().collection('users')
            .doc(uid).get();

            let data = {
                uid: uid,
                nome: userProfile.data().nome,
                avatarUrl: userProfile.data().avatarUrl,
                email: value.user.email,
            };

            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success('Bem vindo de volta!');
        })
        .catch((error) => {
            console.log(error);
            if(error.code === 'auth/user-not-found'){
                setErrorMessage('Este usuário não está cadastrado.');
            }else if(error.code === 'auth/wrong-password') {
                setErrorMessage('A senha inserida está incorreta.');
            }
            toast.error('Algo deu errado!');
            setLoadingAuth(false);
        })
    }

    //Cadastrando Usuário
    async function signUp(email, password, name) {
        setLoadingAuth(true);
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( async (value) => {
            let uid = value.user.uid;

            await firebase.firestore().collection('users')
            .doc(uid).set({
                nome: name,
                avatarUrl: null,
            })
            .then( () => {
                let data = {
                    uid: uid,
                    nome: name,
                    email: value.user.email,
                    avatarUrl: null
                };

                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
                toast.success('Bem vindo a plataforma!');
            })
        })
        .catch((error) => {
            console.log(error);
            if(error.code === 'auth/email-already-in-use'){ 
                setErrorMessage('O email inserido já está cadastrado.');
            }else if(error.code === 'auth/invalid-email') {
                setErrorMessage('O email inserido não é válido.')
            }
            toast.error('Algo deu errado!');
            setLoadingAuth(false);
        })
    }

    function storageUser(data){
        localStorage.setItem('SistemaUser', JSON.stringify(data));
    }

    async function signOut(){
        await firebase.auth().signOut();
        localStorage.removeItem('SistemaUser');
        setUser(null);
    }

    return(
        <AuthContext.Provider 
        value={{ 
            signed: !!user, 
            user, 
            loading, 
            signUp,
            signOut,
            signIn,
            loadingAuth,
            errorMessage,
            setErrorMessage,
            setUser,
            storageUser
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;