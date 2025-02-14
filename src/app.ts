import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { orgRoutes } from './http/controllers/orgs/routes'
import fastifyJwt from '@fastify/jwt'
import { petRoutes } from './http/controllers/pets/routes'

export const app = fastify()
app.register(fastifyJwt, { secret: env.SECRET_JWT, sign: { expiresIn: '1d' } })
app.register(orgRoutes, { prefix: '/orgs' })
app.register(petRoutes, { prefix: '/pets' })

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply
            .status(400)
            .send({ message: 'Validation error', issues: error.format() })
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error)
    } else {
        // TODO: tratar para uma ferramenta de logs externa
    }
    return reply.status(500).send({ message: 'Internal server error' })
})
