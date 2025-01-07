import { describe, it, expect, beforeEach } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { ResourseNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: CreatePetUseCase

describe('Create a pet use-case', () => {
    beforeEach(async () => {
        orgsRepository = new InMemoryOrgsRepository()
        petsRepository = new InMemoryPetsRepository(orgsRepository)
        sut = new CreatePetUseCase(petsRepository, orgsRepository)

        await orgsRepository.create({
            id: 'org-id',
            name: 'Happy Pet',
            coordinator_name: 'Jhon Cruz',
            whatsapp: '91984087807',
            email: 'jhon@example.com',
            password_hash: await hash('12345678', 6),
            cep: '68743200',
            state: 'PA',
            city: 'Castanhal',
            street: 'Barão do Rio Branco',
            number: '38-B',
            latitude: -1.2843669,
            longitude: -47.9242824,
        })
    })

    it('should be able to create a pet', async () => {
        const { pet } = await sut.execute({
            name: 'Floquinho',
            about: 'Sou pequeno e branquinho como um floco de neve',
            age: '1 ano',
            energyStat: 'Muita energia',
            size: 'small',
            orgId: 'org-id',
            animalType: 'dog',
            spaceRequirement: 'Pequeno',
        })

        expect(pet.id).toEqual(expect.any(String))
    })

    it('should not be able to create a pet if org does not exists', async () => {
        await expect(() =>
            sut.execute({
                name: 'Floquinho',
                about: 'Sou pequeno e branquinho como um floco de neve',
                age: '1 ano',
                energyStat: 'Muita energia',
                size: 'small',
                orgId: 'org-fake',
                animalType: 'dog',
                spaceRequirement: 'Pequeno',
            }),
        ).rejects.toBeInstanceOf(ResourseNotFoundError)
    })
})
