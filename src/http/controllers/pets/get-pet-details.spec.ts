import { app } from '@/app'
import { afterAll, beforeAll, expect, describe, it } from 'vitest'
import request from 'supertest'

describe('Get pet details (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to get pet details', async () => {
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

        const responseWithCreatedPet = await request(app.server)
            .post('/pets/create')
            .set('Authorization', `Bearer ${responseWithTokenJWT.body.token}`)
            .send({
                name: 'Floquinho',
                about: 'Sou pequeno e branquinho como um floco de neve',
                age: '1 ano',
                energyStat: 'Muita energia',
                size: 'small',
                animalType: 'dog',
                spaceRequirement: 'Pequeno',
            })

        const response = await request(app.server).get(
            `/pets/${responseWithCreatedPet.body.id}`,
        )
        expect(response.body.orgId).toEqual(expect.any(String))
        expect(response.status).toEqual(200)
    })
})
