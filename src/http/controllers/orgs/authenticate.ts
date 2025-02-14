import { makeAuthenticateUseCase } from '@/factorys/make-authenticate-use-case'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string(),
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    try {
        const authenticateUseCase = makeAuthenticateUseCase()

        const { org } = await authenticateUseCase.execute({
            email,
            password,
        })

        const token = await reply.jwtSign({}, { sign: { sub: org.id } })
        return reply.status(200).send({ token })
    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: error.message })
        }
    }
}
