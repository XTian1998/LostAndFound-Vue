import axios from 'axios'

export function request(config) {
    const instance = axios.create({
        baseURL: 'http://127.0.0.1:5000',
        timeout: 3000,
    })


    instance.interceptors.request.use(config => {
        config.headers.Authorization = window.sessionStorage.getItem('token')
        return config
    }, err => {
        console.log(err)
    })
    return instance(config)
}

