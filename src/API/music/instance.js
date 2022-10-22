import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://n-api.arizona-v.com/',
    headers: {
        accept: 'application/json'
    }
})

export default instance