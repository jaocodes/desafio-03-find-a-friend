import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare, hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterUseCase

describe('Register use-case', () => {
    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository()
        sut = new RegisterUseCase(orgsRepository)
    })

    it('should be able to register a org', async () => {
        const { org } = await sut.execute({
            name: 'Happy Pet',
            coordinator_name: 'Jhon Cruz',
            whatsapp: '91984087807',
            email: 'jhon@example.com',
            password: '12345678',
            cep: '68743200',
            state: 'PA',
            city: 'Castanhal',
            street: 'Barão do Rio Branco',
            number: '38-B',
            latitude: -1.2843669,
            longitude: -47.9242824,
        })

        expect(org.id).toEqual(expect.any(String))
    })

    it('should hash org password upon registration', async () => {
        const { org } = await sut.execute({
            name: 'Happy Pet',
            coordinator_name: 'Jhon Cruz',
            whatsapp: '91984087807',
            email: 'jhon@example.com',
            password: '12345678',
            cep: '68743200',
            state: 'PA',
            city: 'Castanhal',
            street: 'Barão do Rio Branco',
            number: '38-B',
            latitude: -1.2843669,
            longitude: -47.9242824,
        })

        const isPasswordCorrectHashed = await compare(
            '12345678',
            org.password_hash,
        )

        expect(isPasswordCorrectHashed).toBe(true)
    })

    it('should not be able to register a org with the same email', async () => {
        await orgsRepository.create({
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

        await expect(() =>
            sut.execute({
                name: 'Happy Pet',
                coordinator_name: 'Jhon Cruz',
                whatsapp: '91984087807',
                email: 'jhon@example.com',
                password: '12345678',
                cep: '68743200',
                state: 'PA',
                city: 'Castanhal',
                street: 'Barão do Rio Branco',
                number: '38-B',
                latitude: -1.2843669,
                longitude: -47.9242824,
            }),
        ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
    })
})
