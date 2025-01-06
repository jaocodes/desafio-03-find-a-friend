import type { OrgsRepository } from '@/repositories/orgs-repository'
import type { Org } from '@prisma/client'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'

interface AuthenticateUseCaseRequest {
    email: string
    password: string
}

interface AuthenticateUseCaseResponse {
    org: Org
}

export class AuthenticateUseCase {
    constructor(private orgRepository: OrgsRepository) {}

    async execute({
        password,
        email,
    }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const org = await this.orgRepository.findByEmail(email)

        if (!org) {
            throw new InvalidCredentialsError()
        }
        const passwordsMatches = await compare(password, org.password_hash)

        if (!passwordsMatches) {
            throw new InvalidCredentialsError()
        }

        return { org }
    }
}
