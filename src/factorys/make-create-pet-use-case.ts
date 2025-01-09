import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { CreatePetUseCase } from '@/use-cases/create-pet'

export function makeCreatePetUseCase() {
    const orgRepository = new PrismaOrgsRepository()
    const petRepository = new PrismaPetsRepository()
    const useCase = new CreatePetUseCase(petRepository, orgRepository)

    return useCase
}
