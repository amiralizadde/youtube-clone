import axios from "axios";
import { api_key } from "../../../Components/utils/utils.jsx";
import {errorResponse} from '../errorHandler/ErrorHandler.jsx'

// let access_token = (JSON.parse(localStorage.getItem('token')))

const apiRequests = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params:{
        key:api_key
    },
    // headers: {
    //     Authorization: `Bearer ${token.token}`,
    // },
  });

  apiRequests.interceptors.request.use( (config)=> {
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  apiRequests.interceptors.response.use( (response) => {
    if (response.status === 200) {
        return response.data
    }
   
    return response;

  },(error) =>{
    const err =  errorResponse(error)
    return Promise.reject(err);
  });

  export default apiRequests