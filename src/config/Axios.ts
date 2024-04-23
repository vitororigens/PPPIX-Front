import axios from "axios";


const api = axios.create({
  baseURL: "http://77.37.40.46/api",
  headers: {
    'accept': 'application/json'
  }
});


export default api;
