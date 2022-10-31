import axios from 'axios'
const instance = axios.create({ baseURL: 'https://u.y.qq.com', timeout: 6000 })

export default instance
