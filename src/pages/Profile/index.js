import { useState, useContext } from 'react';

import './profile.css'
import Header from '../../components/Header';
import Title from '../../components/Title';
import avatar from '../../assets/avatar.png';
import firebase from '../../services/firebaseConnection'

import { AuthContext } from '../../contexts/auth';

import {FiSettings, FiUpload} from 'react-icons/fi'

export default function Profile() {
    const { user, signOut, setUser, storageUser } = useContext(AuthContext);

    const [name, setName] = useState(user && user.nome);
    const [email, setEmail] = useState(user && user.email);

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
    const [imageAvatar, setImageAvatar] = useState(null);

    function handleFile(e) {

        if(e.target.files[0]) {
            const image = e.target.files[0];

            if(image.type === 'image/jpeg' || image.type === 'image/png') {
                setImageAvatar(image);
                setAvatarUrl(URL.createObjectURL(e.target.files[0]))
            }else {
                alert('Envie uma imagem do tipo PNG ou JPEG');
                setImageAvatar(null);
                return null;
            }
        }

    }

    async function handleUpload() {
        const currentUid = user.uid;
        const uploadTask = await firebase.storage()
        .ref(`images/${currentUid}/${imageAvatar.name}`)
        .put(imageAvatar)
        .then( async () => {
            console.log('FOTO ENVIADA COM SUCESSO')
            await firebase.storage().ref(`images/${currentUid}`)
            .child(imageAvatar.name).getDownloadURL()
            .then(async (url) => {
                let urlFoto = url;

                await firebase.firestore().collection('users')
                .doc(user.uid)
                .update({
                    avatarUrl: urlFoto,
                    nome: name
                })
                .then(() => {
                    let data = {
                        ...user, 
                        avatarUrl: urlFoto,
                        nome: name
                    };
                    setUser(data)
                    storageUser(data)
                    
                })
            })
        })
    }   

    async function handleSave(e) {
        e.preventDefault();
        
        if(imageAvatar === null && name !== '') {
            await firebase.firestore().collection('users')
            .doc(user.uid)
            .update({
                nome: name
            })
            .then(() => {
                let data = {
                    ...user,
                    nome: name
                };
                setUser(data);
                storageUser(data);
            });
        }
        else if(name !== '' && imageAvatar !== null) {
            handleUpload();
        }
    }

    return(
        <div>
            <Header/>

            <div className='content'>
                <Title name="Minha conta">
                    <FiSettings size={25} color="#000"/>
                </Title>

                <div className='container'>
                    <form className='form-profile' onSubmit={handleSave}>
                        <label className='label-avatar'>
                            <span>
                                <FiUpload size={25} color="#fff"/>
                            </span>

                            <input type="file" accept="image/*" onChange={handleFile}/> <br/>
                            { avatarUrl === null ? 
                                <img src={avatar} alt="Foto de perfil do usuário" width="150" height="150"/>
                                :
                                <img src={avatarUrl} alt="Foto de perfil do usuário" width="150" height="150"/>
                            }
                        </label>

                        <label>Nome</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                        
                        <label>Email</label>
                        <input type="text" value={email} disabled={true}/>
                        
                        <button type="submit">Salvar</button>
                    </form>
                </div>

                <div className='container'>
                    <button className='logout-btn' onClick={() => signOut()}>
                        Sair
                    </button>
                </div>
            </div>
        </div>
    )
}