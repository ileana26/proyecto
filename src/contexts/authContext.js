import { createContext, useContext } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../firebaseConfig/firebase";

export const authContext = createContext();
export const useAuth = () =>{
    const context = useContext(authContext);
    if(!context) throw new Error('there is not auth provider');
    return context;
};

export function AuthProvider ({children}) {
/*    const user = {
        login : true,
    };*/

    const signup = ( usuario, password) =>
    {
        createUserWithEmailAndPassword(auth, usuario, password);
        //console.log(usuario, password);
    };

    const login = (usuario, password) => signInWithEmailAndPassword (auth, usuario, password);

    return ( 
    <authContext.Provider value={{ signup, login}}> {children} </authContext.Provider> );
}