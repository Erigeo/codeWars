import AsyncStorage from "@react-native-async-storage/async-storage";
import { Player, Events } from "../interfaces/User";
import Api from "./Api";




export async function signUpPlayer(user: Player) {
  if (!user) return null;
  //console.log(user.password)
  try {
    const resultado = await Api.post('api/users/register/player', user)
    //console.log('aquii')
    return resultado.data
  }
  catch (error) {
    console.log(error)
    return null
  }
}



export async function getUserData(id: string) {
  try {
    const token = await AsyncStorage.getItem('token');
    const resultado = await Api.get('api/players/' + id, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    //console.log(resultado.data)

    return resultado.data;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function getEventById(id: string) {
  try {
    const token = await AsyncStorage.getItem('token'); // Obtém o token armazenado

    const resultado = await Api.get('api/events/' + id + '/get', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // TODO tratamento temp
    if (resultado.data.date == undefined || resultado.data.date == null) {
      resultado.data.date = "A definir"
      console.log("date do resultado : ", resultado.data.date) 
    }
    if (resultado.data.location == undefined || resultado.data.date == null) {
      resultado.data.location = "A definir"
    }

    return resultado.data;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function getEventsByPlayerId(playerId: string) {
  try {
    const token = await AsyncStorage.getItem('token'); // Obtém o token armazenado
    const resultado = await Api.get('api/players/' + playerId + '/events', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(resultado.data)

    // TODO tratamento temp
    if (resultado.data.date == undefined || resultado.data.date == null) {
      resultado.data.date = "A definir"
      console.log("date do resultado : ", resultado.data.date) 
    }
    if (resultado.data.location == undefined || resultado.data.date == null) {
      resultado.data.location = "A definir"
    }

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

    // TODO tratamento temp
    if (Evento.date == undefined || Evento.date == null) {
      Evento.date = "A definir"
    }
    if (Evento.location == undefined || Evento.date == null) {
      Evento.location = "A definir"
    }

    const resultado = await Api.post('api/events/createEvent', Evento, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (e) {
    console.log(e);
    return null;
  }
}

//export async function createEtapa(Etapa: Etapas){
//if(!Etapa) return null;
//try{
//const resultado = await Api.post('/etapas', Etapa)
//console.log(resultado.data)
//}catch(e){
//console.log(e)
//return null
//}
//}


export async function verifyEventsByID(userId: String) {

}

export async function checkUserIsSubscribedToEvent(userId: string, event: any) {
  try {
    const playerIsInEvent = event.playerIds.includes(userId);
    console.log("player is in event?" + playerIsInEvent)
    return playerIsInEvent;
  } catch (error) {
    console.error('Erro ao verificar inscrição do usuário:', error);
    return false;
  }
}

export async function subscribeUserToEvent(userId: string, eventId: string, token: string) {
  return await Api.put(`api/players/${userId}/events/add`, eventId, {
    headers: {
      'Content-Type': 'text/plain',
      'Authorization': `Bearer ${token}`,
    },
  });
}


export async function checkEventFull(event: any) {
  try {
    //console.log("valor de evenot? " + event.isFull)
    if (event.isFull == undefined) return (event.numberOfParticipants <= event.playerIds.length)
    return event.isFull;
  }
  catch (e) {
    console.log("Erro ao tentar verificar se evento está cheio:", e)
  }
}

