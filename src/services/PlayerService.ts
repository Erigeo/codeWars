import AsyncStorage from "@react-native-async-storage/async-storage";
import { Player, Events } from "../interfaces/User";
import Api from "./Api";




export async function signUpPlayer(user: Player){
  if(!user) return null;
  //console.log(user.password)
  try {
    const resultado = await Api.post('api/users/register/player', user)
    //console.log('aquii')
    return resultado.data
  }
  catch(error){
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
   // console.log(resultado.data)
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


export async function verifyEventsByID(userId: String ){

}


