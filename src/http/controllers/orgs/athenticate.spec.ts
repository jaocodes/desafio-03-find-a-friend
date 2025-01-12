import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { fakeOrg } from 'tests/faker-data/faker-org'

describe('authenticate org (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to authenticate with correct credentials', async () => {
        const org = fakeOrg()

        await request(app.server).post('/orgs/register').send(org)

        const response = await request(app.server)
            .post('/orgs/authenticate')
            .send({
                email: org.email,
                password: org.password,
            })

        expect(response.statusCode).toEqual(200)
        expect(response.body.token).toEqual(expect.any(String))
    })
})
