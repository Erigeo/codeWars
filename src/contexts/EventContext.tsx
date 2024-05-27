import {useEffect, useState, useContext, createContext} from 'react';
import { User, Evento } from '../interfaces/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getEventData, getUserData } from '../services/UserService';


interface UserEventContextType {
    eventList: Evento[];
    collectUserEvent: () => Promise<void>;
    Renderize: boolean;
    handleClick: () => void;
    collectEventDataById: (id: string) => Evento | undefined;
  }

const UserEventContext =  createContext<UserEventContextType | undefined>(undefined);



export const UserEventProvider = ({children} : any) => {
    const [eventList, setEventList] = useState([]);
    const [Renderize, setRenderize] = useState(false);

    const handleClick = () => {
        setRenderize(prevRenderize => !prevRenderize); // Alternando entre true e false
      };

      const collectEventDataById = (id: string): Evento | undefined => {
        return eventList.find(evento => evento.id === id);
      };

    const collectUserEvent = async() => {
    
        try{
          const idUser = await AsyncStorage.getItem('userId')
          const resultado = await getEventData()
          if(resultado){
            const resultadoFiltrado = resultado.filter((Evento: Evento)=> {
              return Evento.userId == idUser;
            })
           
            setEventList(resultadoFiltrado)
    
          }
        }catch(e){
          console.log("falhoooou aquiii")
    
        }
      }

    return <UserEventContext.Provider value={{eventList, collectUserEvent, Renderize, handleClick, collectEventDataById}}>{children}</UserEventContext.Provider>

}

export const useUserEventData = () => {
    const context = useContext(UserEventContext);
    if (context === undefined) {
        throw new Error('useUserEventData must be used within a UserEventProvider');
      }
      return context;
}