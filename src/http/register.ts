import { MakeRegisterUseCase } from '@/factorys/make-register-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerOrgBodySchema = z.object({
        name: z.string(),
        coordinator_name: z.string(),
        whatsapp: z.string(),
        email: z.string().email(),
        password: z.string(),
        cep: z.string(),
        state: z.string(),
        city: z.string(),
        street: z.string(),
        number: z.string(),
        latitude: z.number().refine((value) => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine((value) => {
            return Math.abs(value) <= 180
        }),
    })

    const {
        email,

        password,
        ...data
    } = registerOrgBodySchema.parse(request.body)

    const registerUseCase = MakeRegisterUseCase()

    const createdOrg = await registerUseCase.execute({
        email,
        password,
        ...data,
    })

    reply.status(201).send(createdOrg)
}
