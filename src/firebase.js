import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword,getAuth,signInWithEmailAndPassword, signOut} from "firebase/auth"
import {addDoc,collection,getFirestore} from "firebase/firestore"
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyC6Cgkk8XZAoxqttHZcnYbngbHg_hXiLgM",
  authDomain: "netflix-clone-40226.firebaseapp.com",
  projectId: "netflix-clone-40226",
  storageBucket: "netflix-clone-40226.firebasestorage.app",
  messagingSenderId: "509347447496",
  appId: "1:509347447496:web:223e40effe507561dddbfd"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app) 
const db=getFirestore(app)
const signup=async(name,email,password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password) 
        const user=res.user
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,  
            authProvider:"local",
            email,
        })
    }catch(error){
        console.log(error) 
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}
const login = async (email,password) =>{
    try {
        await signInWithEmailAndPassword(auth,email,password)  
    }catch(error){
        console.log(error)  
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
} 

const logout = ()=>{
    signOut(auth)
} 

export {auth,db,login,signup,logout}