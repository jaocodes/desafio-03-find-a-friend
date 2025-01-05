import type { OrgsRepository } from '@/repositories/orgs-repository'
import type { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

interface RegisterUseCaseRequest {
    name: string
    coordinator_name: string
    whatsapp: string
    email: string
    password: string

    cep: string
    state: string
    city: string
    street: string
    number: string

    latitude: number
    longitude: number
}

interface RegisterUseCaseResponse {
    org: Org
}

export class RegisterUseCase {
    constructor(private orgRepository: OrgsRepository) {}

    async execute({
        password,
        email,
        ...data
    }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
        const orgWithSameEmail = await this.orgRepository.findByEmail(email)

        if (orgWithSameEmail) {
            throw new OrgAlreadyExistsError()
        }
        const password_hash = await hash(password, 6)

        const org = await this.orgRepository.create({
            password_hash,
            email,
            ...data,
        })

        return { org }
    }
}
