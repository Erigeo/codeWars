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