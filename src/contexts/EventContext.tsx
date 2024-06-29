import { useEffect, useState, useContext, createContext, ReactNode } from 'react';
import { Events } from '../interfaces/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getEventById, getUserData } from '../services/PlayerService';

interface UserEventContextType {
    event: Events | undefined;
    Renderize: boolean;
    collectUserEvent: () => Promise<void>;
    handleClick: () => void;
    collectEventDataById: (id: string) => Events | undefined;
}

const UserEventContext = createContext<UserEventContextType | undefined>(undefined);

export const UserEventProvider = ({ children }: { children: ReactNode }) => {
    const [event, setEvent] = useState<Events | undefined>(undefined);
    const [Renderize, setRenderize] = useState(false);

    const handleClick = () => {
        setRenderize(prevRenderize => !prevRenderize); // Alternando entre true e false
    };

    const collectEventDataById = (id: string): Events | undefined => {
        return event;
    };

    const collectUserEvent = async () => {
        try {
            const idUser = await AsyncStorage.getItem('userId');
            if (idUser) {
                const resultado = await getEventById(idUser);
                console.log(resultado)
                if (resultado) {
                    setEvent(resultado);
                    console.log(resultado); // Mova este log para depois de definir o evento
                    if (resultado.id) {
                        console.log(resultado.id); // Certifique-se de que o resultado tem um ID
                    }
                }
            }
        } catch (e) {
            console.log(e);
            console.log("Falhou ao buscar o evento do usuário");
        }
    };

    return (
        <UserEventContext.Provider value={{ event, collectUserEvent, Renderize, handleClick, collectEventDataById }}>
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
