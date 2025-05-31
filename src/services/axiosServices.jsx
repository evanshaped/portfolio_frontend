import axios from 'axios';

const determineBackendURL = () => {
    return 'http://localhost:8000'
}

const axiosBackendInstance = axios.create({
    baseURL: determineBackendURL(),
    timeout: 1000,
    //headers: {'X-Custom-Header': 'foobar'},
    responseType: 'json',

})

export default axiosBackendInstance;