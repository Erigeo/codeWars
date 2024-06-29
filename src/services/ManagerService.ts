import AsyncStorage from "@react-native-async-storage/async-storage";
import { Manager, Events } from "../interfaces/User";
import Api from "./Api";




export async function signUpManager(user: Manager){
  if(!user) return null;
  console.log(user.password)
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