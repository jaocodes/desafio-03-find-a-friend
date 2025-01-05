import { app } from './app'
import { env } from './env'
import { register } from './http/register'

app.listen({
    host: '0.0.0.0',
    port: env.PORT,
}).then(() => console.log(`Server running on port ${env.PORT}`))

app.get('/health', (request, reply) => {
    reply.status(200).send()
})

app.post('/register', register)
