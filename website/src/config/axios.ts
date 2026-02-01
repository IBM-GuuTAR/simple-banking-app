import axios from 'axios'

const backendUrl: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL

const api = axios.create({
  baseURL: backendUrl ?? 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
