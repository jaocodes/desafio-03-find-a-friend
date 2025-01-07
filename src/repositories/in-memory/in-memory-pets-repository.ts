import type { Prisma, Pet } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import type { FiltersParams, PetsRepository } from '../pets-repository'
import type { InMemoryOrgsRepository } from './in-memory-orgs-repository'

export class InMemoryPetsRepository implements PetsRepository {
    private items: Pet[] = []

    constructor(private orgsRepository: InMemoryOrgsRepository) {}

    async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
        const pet: Pet = {
            id: data.id ?? randomUUID(),
            name: data.name,
            about: data.about,
            age: data.age,
            animal_type: data.animal_type,
            energy_stat: data.energy_stat,
            size: data.size,
            orgId: data.orgId,
            space_requirement: data.space_requirement,
        }

        this.items.push(pet)

        return pet
    }

    async findById(id: string) {
        const pet = this.items.find((item) => item.id === id)

        if (!pet) return null

        return pet
    }

    async findPetsWithFilters({
        city,
        page,
        age,
        animalType,
        energyStat,
        size,
        spaceRequirement,
    }: FiltersParams): Promise<Pet[]> {
        const orgsInCity = await this.orgsRepository.fetchByCity(city)

        const pets = this.items
            .filter((pet) => orgsInCity.some((org) => org.id === pet.orgId))
            .filter((pet) => (age ? pet.age === age : true))
            .filter((pet) => (size ? pet.size === size : true))

            .filter((pet) =>
                animalType ? pet.animal_type === animalType : true,
            )
            .filter((pet) =>
                energyStat ? pet.energy_stat === energyStat : true,
            )
            .filter((pet) =>
                spaceRequirement
                    ? pet.space_requirement === spaceRequirement
                    : true,
            )

        return pets
    }
}
