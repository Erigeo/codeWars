import {useEffect, useState, useContext, createContext} from 'react';
import { Events } from '../interfaces/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getEventById, getUserData } from '../services/PlayerService';


interface UserEventContextType {
    event: Events;
    Renderize: boolean;
    collectUserEvent: () => Promise<void>;
    handleClick: () => void;
    collectEventDataById: (id: string) => Events | undefined;
  }

const UserEventContext =  createContext<UserEventContextType | undefined>(undefined);



export const UserEventProvider = ({children} : any) => {
    const [event, setEvent] = useState<Events>();
    const [Renderize, setRenderize] = useState(false);

    const handleClick = () => {
        setRenderize(prevRenderize => !prevRenderize); // Alternando entre true e false
      };

      const collectEventDataById = (id: string): Events | undefined => {
        return event;
      };

    const collectUserEvent = async() => {
    
        try{
          const idUser = await AsyncStorage.getItem('userId')
          const resultado = await getEventById(idUser);
          if(resultado){
            
            setEvent(resultado.data)
    
          }
        }catch(e){
          console.log("falhoooou aquiii")
    
        }
      }

    return <UserEventContext.Provider value={{event, collectUserEvent, Renderize, handleClick, collectEventDataById}}>{children}</UserEventContext.Provider>

}

export const useUserEventData = () => {
    const context = useContext(UserEventContext);
    if (context === undefined) {
        throw new Error('useUserEventData must be used within a UserEventProvider');
      }
      return context;
}