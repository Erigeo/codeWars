import Api from "./Api"

export async function signIn(email: string, password: string) {
    if(!email || !password) return null
    try{
        const resultado = await Api.post('auth/login', {
            email, password
        })
        const { token} = resultado.data; //extrair
        return token
    }catch(e){
        console.log(e)
        console.log('falhou ein')
        return null
    }
}