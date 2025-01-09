import { makeFetchPetsUseCase } from '@/factorys/make-fetch-pets-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchPets(request: FastifyRequest, reply: FastifyReply) {
    const querySchema = z.object({
        city: z.string().min(1),
        page: z.coerce.number().default(1),
        age: z.string().optional(),
        size: z.string().optional(),
        animalType: z.enum(['cat', 'dog']).optional(),
        spaceRequirement: z.string().optional(),
        energyStat: z.string().optional(),
    })

    const { city, age, page, animalType, size, spaceRequirement, energyStat } =
        querySchema.parse(request.query)

    const fetchPetsUseCase = makeFetchPetsUseCase()

    const { pets } = await fetchPetsUseCase.execute({
        city,
        page,
        age,
        animalType,
        energyStat,
        size,
        spaceRequirement,
    })

    return reply.status(200).send({ pets })
}
