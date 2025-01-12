import { app } from '@/app'
import { afterAll, beforeAll, expect, describe, it } from 'vitest'
import request from 'supertest'
import { fakeOrg } from 'tests/faker-data/faker-org'
import { fakePet } from 'tests/faker-data/faker-pet'

describe('Create a pet (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create a pet logged as org', async () => {
        const org = fakeOrg()

        await request(app.server).post('/orgs/register').send(org)

        const responseWithTokenJWT = await request(app.server)
            .post('/orgs/authenticate')
            .send({ email: org.email, password: org.password })

        const response = await request(app.server)
            .post('/pets/create')
            .set('Authorization', `Bearer ${responseWithTokenJWT.body.token}`)
            .send(fakePet())

        expect(response.status).toEqual(201)
    })
})
