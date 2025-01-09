import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('authenticate org (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to authenticate with correct credentials', async () => {
        await request(app.server).post('/register').send({
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

        const response = await request(app.server).post('/authenticate').send({
            email: 'jhon@example.com',
            password: '12345678',
        })

        expect(response.statusCode).toEqual(200)
        expect(response.body.token).toEqual(expect.any(String))
    })
})
