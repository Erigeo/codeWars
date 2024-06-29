import axios from "axios";

const Api = axios.create({
    baseURL: "http://192.168.1.133:8080/cardwars/", //mude o ip sempre que mudar de wifi!

})

export default Api;