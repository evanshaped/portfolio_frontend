import axios from 'axios';

const determineBackendURL = () => {
    return '/core-api'
}

const axiosBackendInstance = axios.create({
    baseURL: determineBackendURL(),
    timeout: 1000,
    //headers: {'X-Custom-Header': 'foobar'},
    responseType: 'json',

})

export default axiosBackendInstance;