import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { FetchPetsUseCase } from './fetch-pets'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: FetchPetsUseCase

describe('Get pets by city use-case', () => {
    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository()
        petsRepository = new InMemoryPetsRepository(orgsRepository)
        sut = new FetchPetsUseCase(petsRepository)
    })

    it('should be able to get pets by city', async () => {
        await orgsRepository.create({
            id: 'org-01',
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

        await orgsRepository.create({
            id: 'org-02',
            name: 'Happy Pet',
            coordinator_name: 'Jhon Cruz',
            whatsapp: '91984087807',
            email: 'jhon@example.com',
            password_hash: await hash('12345678', 6),
            cep: '68743200',
            state: 'PA',
            city: 'Belém',
            street: 'Barão do Rio Branco',
            number: '38-B',
            latitude: -1.2843669,
            longitude: -47.9242824,
        })

        await petsRepository.create({
            id: 'some-id-01',
            name: 'Floquinho',
            about: 'Sou pequeno e branquinho como um floco de neve',
            age: '1 ano',
            energy_stat: 'Muita energia',
            size: 'small',
            orgId: 'org-01',
            animal_type: 'dog',
            space_requirement: 'Pequeno',
        })

        await petsRepository.create({
            id: 'some-id-02',
            name: 'Bolinha',
            about: 'Sou pequeno e gordinho',
            age: '1 ano',
            energy_stat: 'Muita energia',
            size: 'small',
            orgId: 'org-01',
            animal_type: 'dog',
            space_requirement: 'Pequeno',
        })

        await petsRepository.create({
            id: 'some-id-03',
            name: 'Mariano',
            about: 'Gato de pelo amarelo',
            age: '1 ano',
            energy_stat: 'Muita energia',
            size: 'small',
            orgId: 'org-02',
            animal_type: 'cat',
            space_requirement: 'Pequeno',
        })

        const { pets } = await sut.execute({ page: 0, city: 'Castanhal' })
        const { pets: petsBelem } = await sut.execute({
            page: 0,
            city: 'Belém',
        })

        const { pets: petsNoWhere } = await sut.execute({
            page: 0,
            city: 'Nowhere',
        })

        expect(pets).toHaveLength(2)
        expect(petsBelem).toHaveLength(1)
        expect(petsNoWhere).toHaveLength(0)
    })
})
