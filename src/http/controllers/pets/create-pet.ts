import { makeCreatePetUseCase } from '@/factorys/make-create-pet-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
    const createPetBodySchema = z.object({
        name: z.string(),
        about: z.string(),
        animalType: z.enum(['cat', 'dog']),
        age: z.string(),
        size: z.string(),
        energyStat: z.string(),
        spaceRequirement: z.string(),
    })

    const data = createPetBodySchema.parse(request.body)
    const orgId = request.user.sub

    const createPetUseCase = makeCreatePetUseCase()

    const { pet } = await createPetUseCase.execute({ orgId, ...data })

    return reply.status(201).send(pet)
}
