// hooks/useEventData.ts

import { useState, useEffect } from 'react';
import { fetchUserRole, getToken, getUserId} from '../services/StorageService';
import { checkUserIsSubscribedToEvent, getEventById, subscribeUserToEvent } from '../services/PlayerService';

import { Alert } from 'react-native';

export function useEventData(event, id) {
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState('');
  const [isUserSubscribed, setIsUserSubscribed] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        if (id) {
          await getEventById(id as string);

          const role = await fetchUserRole();
          setUserRole(role);

          const userId = await getUserId();
          const subscribed = await checkUserIsSubscribedToEvent(userId, event);
          setIsUserSubscribed(subscribed);
        }
      } catch (error) {
        console.error('Erro ao carregar dados do evento:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [id]);


  const handleInscricao = async () => {
    try {
      const userId = await getUserId();
      const token = await getToken();
      const response = await subscribeUserToEvent(userId, id, token);

      if (response.status === 200) {
        setIsUserSubscribed(true);
        Alert.alert('Inscrição realizada com sucesso!');
      } else {
        Alert.alert('Erro ao se inscrever no evento.');
      }
    } catch (error) {
      console.error('Erro ao se inscrever no evento:', error);
      Alert.alert('Erro ao se inscrever no evento.');
    }
  };

  return { isLoading, userRole, isUserSubscribed, handleInscricao };
}
