import Api from "./Api"

export async function signIn(email: string, password: string) {
    if(!email || !password) return null
    try{
        const resultado = await Api.post('/login', {
            email, password
        })
        console.log(resultado.data)
        console.log("aquiii")
        return resultado.data
    }catch(e){
        console.log(e)
        console.log('falhou ein')
        return null
    }
}