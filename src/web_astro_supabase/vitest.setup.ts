import { loadEnv } from 'vite'

// Load environment variables
const env = loadEnv('test', process.cwd(), 'VITE_')

// Make them available to your tests
Object.entries(env).forEach(([key, value]) => {
    process.env[key] = value
})