import axios from "axios";

const Api = axios.create({
    baseURL: "http://192.168.1.133:3000",

})

export default Api;