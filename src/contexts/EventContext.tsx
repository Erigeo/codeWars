import React, { useEffect, useState, useContext, createContext, ReactNode } from 'react';
import { Events, Pairing, Player } from '../interfaces/User';
import { getEventById, getUserData } from '../services/PlayerService';
import { finishEvent } from '../services/ManagerService';

interface UserEventContextType {
  event: Events | undefined;
  eventPlayers: Player[];
  availablePairings: Pairing[];
  playerDetails: any[];
  Renderize: boolean;
  RenderizeBattle: boolean;
  eventoFinalizado: boolean;
  setEventPlayers: (players: Player[]) => void;
  handleClickBattle: () => void;
  handleClick: () => void;
  finalizarEvent: (id: string) => Promise<void>;
  collectEventDataById: (id: string) => Promise<void>;
  collectPlayersDataByEventId: (event: Events) => Promise<void>;
  getAvailablePairings: (event: Events) => void;
  fetchPlayerDetails: (availablePairings: Pairing[]) => Promise<void>;
}

const UserEventContext = createContext<UserEventContextType | undefined>(undefined);

export const UserEventProvider = ({ children }: { children: ReactNode }) => {
  const [event, setEvent] = useState<Events>({} as Events);
  const [Renderize, setRenderize] = useState(false);
  const [RenderizeBattle, setRenderizeBattle] = useState(false);
  const [eventPlayers, setEventPlayers] = useState<Player[]>([]);
  const [availablePairings, setAvailablePairings] = useState<Pairing[]>([]);
  const [playerDetails, setPlayerDetails] = useState<any[]>([]);
  const [eventoFinalizado, setEventoFinalizado] = useState(false);

  const handleClick = () => {
    setRenderize(prevRenderize => !prevRenderize); // Alternar entre true e false
  };

  const handleClickBattle = () => {
    setRenderizeBattle(prevRenderizeBattle => !prevRenderizeBattle); // Alternar entre true e false
  };
  

  const collectEventDataById = async (eventId: string) => {
    try {
      if (eventId) {
        const resultado = await getEventById(eventId);
        if (resultado) {
          setEventoFinalizado(false)
          setEvent(resultado);
        }
      }
    } catch (e) {
      console.log(e);
      console.log("Failed to fetch user event");
    }
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

  const getAvailablePairings = async (event: Events) => {
    try {
      if (event && event.pairings) {
        const filteredPairings = event.pairings.filter(pairing => pairing.playerOneId && pairing.playerTwoId && pairing.result === -1);
        setAvailablePairings(filteredPairings);
        
        // Percorrer os filteredPairings e adicionar o condicional
        filteredPairings.forEach(pairing => {
          if (pairing.playerOneId === 'Bye' || pairing.playerTwoId === 'Bye') {
            setEventoFinalizado(true)
          }
        });
  
        await fetchPlayerDetails(filteredPairings);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchPlayerDetails = async (availablePairings: Pairing[]) => {
    const details = await Promise.all(
      availablePairings.map(async (pairing) => {
        if (pairing.playerOneId === 'Bye' || pairing.playerTwoId === 'Bye') {
          setEventoFinalizado(true);
          return null;
        } else {
          const playerOne = await getUserData(pairing.playerOneId);
          const playerTwo = await getUserData(pairing.playerTwoId);
          return {
            ...pairing,
            playerOne,
            playerTwo,
          };
        }
      })
    ).then(results => results.filter(detail => detail !== null)); // filter out null values
  
    setPlayerDetails(details);
  };

  const finalizarEvent = async(eventId: string) => {
      try {
        if (eventId) {
          const resultado = await finishEvent(eventId);
        }
      } catch (e) {
        console.log(e);
        console.log("Failed to fetch user event");
      }
  }
  

  useEffect(() => {
    if (event) {
      getAvailablePairings(event);
    }
  }, [event]);




  return (
    <UserEventContext.Provider value={{
      event,
      Renderize,
      handleClick,
      collectEventDataById,
      collectPlayersDataByEventId,
      eventPlayers,
      availablePairings,
      fetchPlayerDetails,
      playerDetails,
      getAvailablePairings,
      eventoFinalizado,
      finalizarEvent,
      setEventPlayers,
      handleClickBattle,
      RenderizeBattle
    }}>
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