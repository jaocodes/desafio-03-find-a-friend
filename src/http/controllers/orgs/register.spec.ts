import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { fakeOrg } from 'tests/faker-data/faker-org'

describe('register org (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to register an org', async () => {
        const response = await request(app.server)
            .post('/orgs/register')
            .send(fakeOrg())

        expect(response.statusCode).toEqual(201)
    })
})
