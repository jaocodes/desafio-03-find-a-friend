import { app } from '@/app'
import { afterAll, beforeAll, expect, describe, it } from 'vitest'
import request from 'supertest'

describe('Create a pet (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create a pet logged as org', async () => {
        await request(app.server).post('/orgs/register').send({
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

        const responseWithTokenJWT = await request(app.server)
            .post('/orgs/authenticate')
            .send({ email: 'jhon@example.com', password: '12345678' })

        const response = await request(app.server)
            .post('/pets/create')
            .set('Authorization', `Bearer ${responseWithTokenJWT.body.token}`)
            .send({
                name: 'Floquinho',
                about: 'Sou pequeno e branquinho como um floco de neve',
                age: '1 ano',
                energyStat: 'Muita energia',
                size: 'small',
                orgId: 'org-id',
                animalType: 'dog',
                spaceRequirement: 'Pequeno',
            })

        expect(response.status).toEqual(201)
    })
})
