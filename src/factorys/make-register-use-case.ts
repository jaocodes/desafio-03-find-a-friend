import { PrismaOrgRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { RegisterUseCase } from '@/use-cases/register'

export function MakeRegisterUseCase() {
    const orgRepository = new PrismaOrgRepository()
    const useCase = new RegisterUseCase(orgRepository)

    return useCase
}
