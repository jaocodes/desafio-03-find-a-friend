import type { Pet, Prisma } from '@prisma/client'
import { prisma } from '@/db/prisma'
import type { FiltersParams, PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = await prisma.pet.create({ data })

        return pet
    }
    async findById(id: string): Promise<Pet | null> {
        const pet = await prisma.pet.findUnique({ where: { id } })
        return pet
    }
    async findPetsWithFilters({
        city,
        page,
        ...rest
    }: FiltersParams): Promise<Pet[]> {
        const pets = await prisma.pet.findMany({
            where: {
                age: rest.age,
                animal_type: rest.animalType,
                energy_stat: rest.energyStat,
                size: rest.size,
                space_requirement: rest.spaceRequirement,
                org: {
                    city,
                },
            },
        })

        return pets
    }
}
