import type { PetsRepository } from '@/repositories/pets-repository'
import type { Pet } from '@prisma/client'

interface FetchPetsUseCaseRequest {
    page: number
    city: string
    size?: string
    age?: string
    animalType?: 'dog' | 'cat'
    energyStat?: string
    spaceRequirement?: string
}

interface FetchPetsUseCaseResponse {
    pets: Pet[]
}

export class FetchPetsUseCase {
    constructor(private petsRepository: PetsRepository) {}

    async execute({
        city,
        page,
        ...rest
    }: FetchPetsUseCaseRequest): Promise<FetchPetsUseCaseResponse> {
        const pets = await this.petsRepository.findPetsWithFilters({
            city,
            page,
            ...rest,
        })

        return { pets }
    }
}
