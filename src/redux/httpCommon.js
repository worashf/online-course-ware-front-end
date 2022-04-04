import axios from "axios";

const httpCommon=(headers)=> axios.create({
    baseURL:"http://localhost:8080/api",
    headers 
})

export default httpCommon