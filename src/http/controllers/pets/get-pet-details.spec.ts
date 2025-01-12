import { app } from '@/app'
import { afterAll, beforeAll, expect, describe, it } from 'vitest'
import request from 'supertest'
import { fakeOrg } from 'tests/faker-data/faker-org'
import { fakePet } from 'tests/faker-data/faker-pet'

describe('Get pet details (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to get pet details', async () => {
        const org = fakeOrg()

        await request(app.server).post('/orgs/register').send(org)

        const responseWithTokenJWT = await request(app.server)
            .post('/orgs/authenticate')
            .send({ email: org.email, password: org.password })

        const responseWithCreatedPet = await request(app.server)
            .post('/pets/create')
            .set('Authorization', `Bearer ${responseWithTokenJWT.body.token}`)
            .send(fakePet())

        const response = await request(app.server).get(
            `/pets/${responseWithCreatedPet.body.id}`,
        )

        console.log(response.body)
        expect(response.body.orgId).toEqual(expect.any(String))
        expect(response.status).toEqual(200)
    })
})
