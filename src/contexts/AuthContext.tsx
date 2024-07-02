import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserDataManager } from '../services/ManagerService';
import { getUserData } from '../services/PlayerService';
import { Manager, Player } from '../interfaces/User';

interface UserContextType {
  dataUser: Player | null;
  dataManager: Manager | null;
  collectData: () => Promise<void>;
  Renderize: boolean;
  handleClick: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [dataUser, setDataUser] = useState<Player | null>(null);
  const [dataManager, setDataManager] = useState<Manager | null>(null);
  const [Renderize, setRenderize] = useState(false);

  const handleClick = () => {
    setRenderize((prevRenderize) => !prevRenderize);
  };

  const collectData = async () => {
    try {
      const idUser = await AsyncStorage.getItem('userId');
      const userRole = await AsyncStorage.getItem('userRole');
      let resultado = null;
      if (userRole === 'ROLE_PLAYER' && idUser) {
        resultado = await getUserData(idUser);
        if (resultado) {
          setDataUser(resultado);
        }
      } else if (userRole === 'ROLE_MANAGER' && idUser) {
        resultado = await getUserDataManager(idUser);
        if (resultado) {
          setDataManager(resultado);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    collectData();
  }, []);

  return (
    <UserContext.Provider value={{ dataUser, dataManager, collectData, Renderize, handleClick }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserProvider');
  }
  return context;
};