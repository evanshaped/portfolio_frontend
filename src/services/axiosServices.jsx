import axios from 'axios';


export const axiosInstanceCore = axios.create({
    baseURL: '/core-api',
    timeout: 1000,
    //headers: {'X-Custom-Header': 'foobar'},
    responseType: 'json',

})

export const axiosInstanceIdioms = axios.create({
    baseURL: '/idioms-api',
    timeout: 1000,
    //headers: {'X-Custom-Header': 'foobar'},
    responseType: 'json',

})