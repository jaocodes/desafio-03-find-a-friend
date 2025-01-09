import type { OrgsRepository } from '@/repositories/orgs-repository'
import type { PetsRepository } from '@/repositories/pets-repository'
import type { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreatePetUseCaseRequest {
    name: string
    about: string
    animalType: 'cat' | 'dog'
    age: string
    size: string
    energyStat: string
    spaceRequirement: string
    orgId: string
}

interface CreatePetUseCaseResponse {
    pet: Pet
}

export class CreatePetUseCase {
    constructor(
        private petsRepository: PetsRepository,
        private orgsRepository: OrgsRepository,
    ) {}

    async execute({
        about,
        age,
        animalType,
        energyStat,
        name,
        size,
        spaceRequirement,
        orgId,
    }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
        const org = await this.orgsRepository.findById(orgId)

        if (!org) throw new ResourceNotFoundError()

        const pet = await this.petsRepository.create({
            about,
            age,
            animal_type: animalType,
            energy_stat: energyStat,
            name,
            orgId,
            size,
            space_requirement: spaceRequirement,
        })

        return { pet }
    }
}
