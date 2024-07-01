import React, { useEffect, useState, useContext, createContext, ReactNode } from 'react';
import { Events, Pairing, Player } from '../interfaces/User';
import { getEventById, getUserData } from '../services/PlayerService';

interface UserEventContextType {
  event: Events | undefined;
  eventPlayers: Player[];
  availablePairings: Pairing[];
  playerDetails: any[];
  Renderize: boolean;
  handleClick: () => void;
  collectEventDataById: (id: string) => Promise<void>;
  collectPlayersDataByEventId: (event: Events) => Promise<void>;
  getAvailablePairings: (event: Events) => void;
  fetchPlayerDetails: (availablePairings: Pairing[]) => Promise<void>;
}

const UserEventContext = createContext<UserEventContextType | undefined>(undefined);

export const UserEventProvider = ({ children }: { children: ReactNode }) => {
  const [event, setEvent] = useState<Events>({} as Events);
  const [Renderize, setRenderize] = useState(false);
  const [eventPlayers, setEventPlayers] = useState<Player[]>([]);
  const [availablePairings, setAvailablePairings] = useState<Pairing[]>([]);
  const [playerDetails, setPlayerDetails] = useState<any[]>([]);

  const handleClick = () => {
    setRenderize(prevRenderize => !prevRenderize); // Alternar entre true e false
  };

  const collectEventDataById = async (eventId: string) => {
    try {
      if (eventId) {
        const resultado = await getEventById(eventId);
        if (resultado) {
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
        
        
        await fetchPlayerDetails(filteredPairings);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchPlayerDetails = async (availablePairings: Pairing[]) => {
    const details = await Promise.all(
      availablePairings.map(async (pairing) => {
        const playerOne = await getUserData(pairing.playerOneId);
        const playerTwo = await getUserData(pairing.playerTwoId);
        return {
          ...pairing,
          playerOne,
          playerTwo,
        };
      })
    );
    setPlayerDetails(details);
  };

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
      getAvailablePairings
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