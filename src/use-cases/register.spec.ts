import { MakeRegisterUseCase } from '@/factorys/make-register-use-case'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { describe, it, expect } from 'vitest'
import { RegisterUseCase } from './register'

describe('Register use-case', () => {
    it('should be able to register a org', async () => {
        const orgRepository = new InMemoryOrgsRepository()
        const registerUsecase = new RegisterUseCase(orgRepository)

        const createdOrg = await registerUsecase.execute({
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

        expect(createdOrg.org.id).toEqual(expect.any(String))
    })
})
