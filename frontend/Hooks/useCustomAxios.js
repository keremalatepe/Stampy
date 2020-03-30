import React from 'react'
import axios from 'axios'
import { makeUseAxios } from 'axios-hooks'
import { AsyncStorage } from 'react-native';


const useAxios = () => {
    myaxios = axios.create(
        { 
            
          baseURL: 'http://167.71.11.118:8000/api/',
          headers: {'Authorization': null}
       }
    )
    
    myaxios.interceptors.request.use(
        async config => {
          const token = await AsyncStorage.getItem('token')
          if (token) {
            config.headers.Authorization = "Token "+token
          }
          return config
        },
        error => {
          console.warn("error", error)
          return Promise.reject(error)
        }
      );
      

    return makeUseAxios({axios: myaxios})
      

}
export default useAxios();
