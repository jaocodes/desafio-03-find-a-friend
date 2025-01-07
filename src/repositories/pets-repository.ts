import type { Pet, Prisma } from '@prisma/client'

export interface FiltersParams {
    page: number
    city: string
    size?: string
    age?: string
    animalType?: 'dog' | 'cat'
    energyStat?: string
    spaceRequirement?: string
}

export interface PetsRepository {
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
    findById(id: string): Promise<Pet | null>
    findPetsWithFilters(filterParams: FiltersParams): Promise<Pet[]>
}
