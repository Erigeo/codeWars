import AsyncStorage from "@react-native-async-storage/async-storage";
import { Manager, Events, Pairing } from "../interfaces/User";
import Api from "./Api";




export async function signUpManager(user: Manager){
  if(!user) return null;
  //console.log(user.password)
  try {
    const resultado = await Api.post('api/users/register/manager', user)
    return resultado.data
  }
  catch(error){
    console.log(error)
    return null
  }
}

export async function getUserDataManager(id: string) {
  try {
    const token = await AsyncStorage.getItem('token'); 
    const resultado = await Api.get('api/users/manager/' + id, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return resultado.data;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function getEventData() {
  try {
    const token = await AsyncStorage.getItem('jwt_token'); // Obtém o token armazenado
    const resultado = await Api.get('api/eventos', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return resultado.data;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function createEvent(Evento: Events) {
  if (!Evento) return null;
  try {
    const token = await AsyncStorage.getItem('token'); 
    const id = await AsyncStorage.getItem('userId')
    const resultado = await Api.post('api/events/createEvent?managerId='+ Evento.managerId, Evento, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return resultado.data
  } catch (e) {
    console.log(e);
    return null;
  }
}


export async function savePairings(pairings: Pairing[], eventId: string): Promise<boolean | null> {
  if (!pairings) return null;

  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      console.log('Token não encontrado');
      return null;
    }

    const resultado = await Api.post(`api/events/${eventId}/savePairings`, pairings, {
      headers: {
        Authorization: `Bearer ${token}`
      }

    });
    const resultado1 = await Api.post(`api/events/${eventId}/finalizeRound`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if(resultado && resultado1){
      return true;
    }
  } catch (e) {
    console.error('Erro ao salvar os emparelhamentos:', e);
    return null;
  }
}

export async function finalizeRound(eventId: string) {
  if (!eventId) return null;

  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      console.log('Token não encontrado');
      return null;
    }

    const resultado = await Api.post(`api/events/${eventId}/finalizeRound`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return true;
  } catch (e) {
    console.error('Erro ao finalizar o round:', e);
    return null;
  }
}





export async function startEvent(id: string) {
  try {
    const token = await AsyncStorage.getItem('token'); 
    if (!token) {
      console.log('Token not found');
      return null;
    }

    console.log(`Token found: ${token}`);
    console.log(`Starting event with ID: ${id}`);

    const resultado = await Api.post(`api/events/${id}/start`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Event started:', resultado.data);

    const pairing = await Api.post(`api/events/${id}/generatePairings`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Pairings generated:', pairing.data);

    return true;
  } catch (e) {
    if (e.response) {
      console.log(`Error: ${e.response.status} - ${e.response.data}`);
    } else {
      console.log(e);
    }
    return null;
  }
}