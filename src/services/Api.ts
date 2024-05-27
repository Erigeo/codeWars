import axios from "axios";

const Api = axios.create({
    baseURL: "http://192.168.1.133:3000", //mude o ip sempre que mudar de wifi!

})

export default Api;