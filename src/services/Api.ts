import axios from "axios";

const Api = axios.create({
    baseURL: "http://10.112.163.165:3000",

})

export default Api;