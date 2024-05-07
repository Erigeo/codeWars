import { User } from "../interfaces/User";
import Api from "./Api";




export async function signUpUser(user: User){
  if(!user) return null;
  console.log(user.password)
  try {
    const resultado = await Api.post('/register', user)
    console.log('aquii')
    console.log(resultado.data)
    return resultado.data
  }
  catch(error){
    console.log(error)
    return null
  }
}

export async function getUserData(id: String){
  try{
    const resultado = await Api.get('/users/'+ id)
    console.log(resultado.data)
    return resultado.data
  }catch(e){
    console.log(e)
    return null
  }
}