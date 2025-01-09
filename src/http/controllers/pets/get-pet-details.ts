import { makeCreatePetUseCase } from '@/factorys/make-create-pet-use-case'
import { makeGetPetDetailsUseCase } from '@/factorys/make-get-pet-details-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPetDetails(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const petDetailsParamsSchema = z.object({
        petId: z.string().uuid(),
    })

    const { petId } = petDetailsParamsSchema.parse(request.params)

    const getPetDetailsUseCase = makeGetPetDetailsUseCase()

    try {
        const { pet } = await getPetDetailsUseCase.execute({ petId })

        return reply.status(200).send({ pet })
    } catch (error) {
        if (error instanceof ResourceNotFoundError)
            return reply.status(404).send({ message: error.message })
    }
}
