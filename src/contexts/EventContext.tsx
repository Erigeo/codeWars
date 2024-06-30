import { useEffect, useState, useContext, createContext, ReactNode } from 'react';
import { Events, Player } from '../interfaces/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getEventById, getUserData } from '../services/PlayerService';

interface UserEventContextType {
  event: Events | undefined;
  eventPlayers: Player[];
  Renderize: boolean;
  handleClick: () => void;
  collectEventDataById: (id: string) => Promise<void>;
  collectPlayersDataByEventId: (event: Events) => Promise<void>;
}

const UserEventContext = createContext<UserEventContextType | undefined>(undefined);

export const UserEventProvider = ({ children }: { children: ReactNode }) => {
  const [event, setEvent] = useState<Events>({} as Events);
  const [Renderize, setRenderize] = useState(false);
  const [eventPlayers, setEventPlayers] = useState<Player[]>([]);

const addPlayer = (player: Player) => {

setEventPlayers(prevEventPlayers => [...prevEventPlayers, player]);

};

  const handleClick = () => {
    setRenderize(prevRenderize => !prevRenderize); // Toggle between true and false
  };

  const collectEventDataById = async (eventId: string) => {
    try {
      if (eventId) {
        const resultado = await getEventById(eventId);
        //console.log(resultado)
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

  const collectPlayersDataByEventId = async (event: Events) => {

    try {
    
    if (event && event.playerIds) {
    
    const playersData = await Promise.all(
    
    event.playerIds.map(playerId => getUserData(playerId))
    
    );
    
    setEventPlayers(playersData);
    
    }
    
    } catch (e) {
    
    console.log(e);
    
    }
    
    };

  return (
    <UserEventContext.Provider value={{ event, Renderize, handleClick, collectEventDataById, collectPlayersDataByEventId, eventPlayers  }}>
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
