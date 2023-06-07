import axios from 'axios'
import router from './router'

const instance = axios.create({
	// baseURL: import.meta.env.DEV ? 'http://localhost:8080/api/' : '/api/'
	baseURL: '/api/'
})
instance.interceptors.response.use(
	res => {
		if (res.status === 200) {
			return Promise.resolve(res)
		} else {
			return Promise.reject(res)
		}
	},
	err => {
		if (err.response.status == 403) {
			router.push('/login')
		} else {

		}
		return Promise.reject(err.response)
	}
)
export default instance