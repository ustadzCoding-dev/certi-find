import axios from 'axios'

// Create axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Request interceptor - Add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('certifind_token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response interceptor - Handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle 401 Unauthorized
        if (error.response?.status === 401) {
            localStorage.removeItem('certifind_token')
            // Redirect to login if not already there
            if (window.location.pathname !== '/login') {
                window.location.href = '/login'
            }
        }

        // Handle network errors
        if (!error.response) {
            console.error('Network error:', error.message)
        }

        return Promise.reject(error)
    }
)

export default api
