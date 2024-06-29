import {useEffect, useState, useContext, createContext} from 'react';
import { Manager, Events } from '../interfaces/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserData } from '../services/ManagerService';


interface UserContextType {
    dataUser: Manager;
    collectData: () => Promise<void>;
    Renderize: boolean;
    handleClick: () => void
  }

const UserContext =  createContext<UserContextType | undefined>(undefined);



export const UserProvider = ({children} : any) => {
    const [dataUser, setDataUser] = useState<Manager>({} as Manager);
    const [Renderize, setRenderize] = useState(false);

    const handleClick = () => {
        setRenderize(prevRenderize => !prevRenderize); // Alternando entre true e false
      };


    const collectData = async() => {
        try{
            const idUser = await AsyncStorage.getItem('userId')
            const resultado = await getUserData(idUser)
            if(resultado){
                setDataUser(resultado)
             }
        }catch(e){
            console.log(e)
        }
    }

    return <UserContext.Provider value={{dataUser, collectData, Renderize, handleClick}}>{children}</UserContext.Provider>

}

export const useUserData = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
      }
      return context;
}