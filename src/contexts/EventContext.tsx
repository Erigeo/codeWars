import { useEffect, useState, useContext, createContext, ReactNode } from 'react';
import { Events } from '../interfaces/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getEventById, getUserData } from '../services/PlayerService';

interface UserEventContextType {
  event: Events | undefined;
  Renderize: boolean;
  handleClick: () => void;
  collectEventDataById: (id: string) => Promise<void>;
}

const UserEventContext = createContext<UserEventContextType | undefined>(undefined);

export const UserEventProvider = ({ children }: { children: ReactNode }) => {
  const [event, setEvent] = useState<Events>({} as Events);
  const [Renderize, setRenderize] = useState(false);

  const handleClick = () => {
    setRenderize(prevRenderize => !prevRenderize); // Toggle between true and false
  };

  const collectEventDataById = async (eventId: string) => {
    try {
      if (eventId) {
        const resultado = await getEventById(eventId);
        //console.log(resultado.data)
        if (resultado) {
          setEvent(resultado);
        }
      }
    } catch (e) {
      console.log(e);
      console.log("Failed to fetch user event");
    }
    return undefined;
  };

  return (
    <UserEventContext.Provider value={{ event, Renderize, handleClick, collectEventDataById }}>
      {children}
    </UserEventContext.Provider>
  );
};

export const useUserEventData = () => {
  const context = useContext(UserEventContext);
  if (context === undefined) {
    throw new Error('useUserEventData must be used within a UserEventProvider');
  }
  return context;
};
