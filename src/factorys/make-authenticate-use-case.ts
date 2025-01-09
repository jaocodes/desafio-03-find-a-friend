import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'

export function makeAuthenticateUseCase() {
    const orgRepository = new PrismaOrgsRepository()
    const useCase = new AuthenticateUseCase(orgRepository)

    return useCase
}
