import { beforeEach, describe, expect, it } from 'vitest'
import { GetPetDetailsUseCase } from './get-pet-details'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let sut: GetPetDetailsUseCase

describe('Get pet details use-case', () => {
    beforeEach(() => {
        petsRepository = new InMemoryPetsRepository()
        sut = new GetPetDetailsUseCase(petsRepository)
    })

    it('should be able to get pet details', async () => {
        await petsRepository.create({
            id: 'some-id',
            name: 'Floquinho',
            about: 'Sou pequeno e branquinho como um floco de neve',
            age: '1 ano',
            energy_stat: 'Muita energia',
            size: 'small',
            orgId: 'org-id',
            animal_type: 'dog',
            space_requirement: 'Pequeno',
        })

        const { pet } = await sut.execute({ petId: 'some-id' })

        expect(pet.name).toEqual('Floquinho')
    })

    it('should not be able to get pet details with invalid id', async () => {
        await petsRepository.create({
            id: 'some-id',
            name: 'Floquinho',
            about: 'Sou pequeno e branquinho como um floco de neve',
            age: '1 ano',
            energy_stat: 'Muita energia',
            size: 'small',
            orgId: 'org-id',
            animal_type: 'dog',
            space_requirement: 'Pequeno',
        })

        await expect(() =>
            sut.execute({ petId: 'wrong-id' }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})
