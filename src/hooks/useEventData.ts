// hooks/useEventData.ts

import { useState, useEffect } from 'react';
import { fetchUserRole, getToken, getUserId} from '../services/StorageService';
import { checkUserIsSubscribedToEvent, getEventById, subscribeUserToEvent } from '../services/PlayerService';

import { Alert } from 'react-native';

export function useEventData(event) {
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState('');
  const [isUserSubscribed, setIsUserSubscribed] = useState(false);
  const id = event.id;

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        console.log(event)
        if (id) {

          const role = await fetchUserRole();
          setUserRole(role);
          const userId = await getUserId();

          const subscribed = await checkUserIsSubscribedToEvent(userId, event);
          console.log("subscibred? " + subscribed) 
          setIsUserSubscribed(subscribed);
        }
      } catch (error) {
        console.error('Erro ao carregar dados do evento:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [event.id]);


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
