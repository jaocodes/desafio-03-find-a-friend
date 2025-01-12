import { app } from '@/app'
import { afterAll, beforeAll, expect, describe, it } from 'vitest'
import request from 'supertest'
import { fakeOrg } from 'tests/faker-data/faker-org'
import { fakePet } from 'tests/faker-data/faker-pet'

describe('Fetch a list of pets (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to fetch pets by city', async () => {
        const org = fakeOrg()

        await request(app.server).post('/orgs/register').send(org)

        const responseWithTokenJWT = await request(app.server)
            .post('/orgs/authenticate')
            .send({ email: org.email, password: org.password })

        const petsToCreate = [fakePet(), fakePet(), fakePet()]

        await Promise.all(
            petsToCreate.map((pet) => {
                return request(app.server)
                    .post('/pets/create')
                    .set(
                        'Authorization',
                        `Bearer ${responseWithTokenJWT.body.token}`,
                    )
                    .send(pet)
            }),
        )

        const response = await request(app.server)
            .get('/pets')
            .query({ city: org.city })
            .send()

        expect(response.status).toEqual(200)
        expect(response.body.pets).toHaveLength(3)
    })

    it('should be able to fetch pets by city and age', async () => {
        const org = fakeOrg()

        await request(app.server).post('/orgs/register').send(org)

        const responseWithTokenJWT = await request(app.server)
            .post('/orgs/authenticate')
            .send({ email: org.email, password: org.password })

        const petsToCreate = [
            fakePet({ age: '1' }),
            fakePet({ age: '2' }),
            fakePet({ age: '1' }),
        ]

        await Promise.all(
            petsToCreate.map((pet) => {
                return request(app.server)
                    .post('/pets/create')
                    .set(
                        'Authorization',
                        `Bearer ${responseWithTokenJWT.body.token}`,
                    )
                    .send(pet)
            }),
        )

        const response = await request(app.server)
            .get('/pets')
            .query({ city: org.city, age: '1' })
            .send()

        expect(response.status).toBe(200)
        expect(response.body.pets).toHaveLength(2)
    })

    it('should be able to fetch pets by city and animal type', async () => {
        const org = fakeOrg()

        await request(app.server).post('/orgs/register').send(org)

        const responseWithTokenJWT = await request(app.server)
            .post('/orgs/authenticate')
            .send({ email: org.email, password: org.password })

        const petsToCreate = [
            fakePet({ animalType: 'cat' }),
            fakePet({ animalType: 'dog' }),
            fakePet({ animalType: 'cat' }),
        ]

        await Promise.all(
            petsToCreate.map((pet) => {
                return request(app.server)
                    .post('/pets/create')
                    .set(
                        'Authorization',
                        `Bearer ${responseWithTokenJWT.body.token}`,
                    )
                    .send(pet)
            }),
        )

        const response = await request(app.server)
            .get('/pets')
            .query({ city: org.city, animalType: 'dog' })
            .send()

        expect(response.status).toBe(200)
        expect(response.body.pets).toHaveLength(1)
    })

    it('should be able to fetch pets by city and size', async () => {
        const org = fakeOrg()

        await request(app.server).post('/orgs/register').send(org)

        const responseWithTokenJWT = await request(app.server)
            .post('/orgs/authenticate')
            .send({ email: org.email, password: org.password })

        const petsToCreate = [
            fakePet({ size: 'small' }),
            fakePet({ size: 'large' }),
            fakePet({ size: 'small' }),
        ]

        await Promise.all(
            petsToCreate.map((pet) => {
                return request(app.server)
                    .post('/pets/create')
                    .set(
                        'Authorization',
                        `Bearer ${responseWithTokenJWT.body.token}`,
                    )
                    .send(pet)
            }),
        )

        const response = await request(app.server)
            .get('/pets')
            .query({ city: org.city, size: 'small' })
            .send()

        expect(response.status).toBe(200)
        expect(response.body.pets).toHaveLength(2)
    })

    it('should be able to fetch pets by city and spaceRequirement', async () => {
        const org = fakeOrg()

        await request(app.server).post('/orgs/register').send(org)

        const responseWithTokenJWT = await request(app.server)
            .post('/orgs/authenticate')
            .send({ email: org.email, password: org.password })

        const petsToCreate = [
            fakePet({ spaceRequirement: 'small' }),
            fakePet({ spaceRequirement: 'medium' }),
            fakePet({ spaceRequirement: 'small' }),
        ]

        await Promise.all(
            petsToCreate.map((pet) => {
                return request(app.server)
                    .post('/pets/create')
                    .set(
                        'Authorization',
                        `Bearer ${responseWithTokenJWT.body.token}`,
                    )
                    .send(pet)
            }),
        )

        const response = await request(app.server)
            .get('/pets')
            .query({ city: org.city, spaceRequirement: 'medium' })
            .send()

        expect(response.status).toBe(200)
        expect(response.body.pets).toHaveLength(1)
    })

    it('should be able to fetch pets by city and energyStat', async () => {
        const org = fakeOrg()

        await request(app.server).post('/orgs/register').send(org)

        const responseWithTokenJWT = await request(app.server)
            .post('/orgs/authenticate')
            .send({ email: org.email, password: org.password })

        const petsToCreate = [
            fakePet({ energyStat: 'low' }),
            fakePet({ energyStat: 'very high' }),
            fakePet({ energyStat: 'low' }),
        ]

        await Promise.all(
            petsToCreate.map((pet) => {
                return request(app.server)
                    .post('/pets/create')
                    .set(
                        'Authorization',
                        `Bearer ${responseWithTokenJWT.body.token}`,
                    )
                    .send(pet)
            }),
        )

        const response = await request(app.server)
            .get('/pets')
            .query({ city: org.city, energyStat: 'low' })
            .send()

        expect(response.status).toBe(200)
        expect(response.body.pets).toHaveLength(2)
    })

    it('should be able to fetch pets by all filters', async () => {
        const org = fakeOrg()

        await request(app.server).post('/orgs/register').send(org)

        const responseWithTokenJWT = await request(app.server)
            .post('/orgs/authenticate')
            .send({ email: org.email, password: org.password })

        const petsToCreate = [
            fakePet({
                age: '1',
                size: 'small',
                animalType: 'cat',
                spaceRequirement: 'small',
                energyStat: 'low',
            }),
            fakePet({
                age: '2',
                size: 'small',
                animalType: 'dog',
                spaceRequirement: 'medium',
                energyStat: 'very high',
            }),
            fakePet({
                age: '2',
                size: 'large',
                animalType: 'dog',
                spaceRequirement: 'large',
                energyStat: 'low',
            }),
            fakePet({
                age: '2',
                size: 'small',
                animalType: 'cat',
                spaceRequirement: 'medium',
                energyStat: 'medium',
            }),
            fakePet({
                age: '3',
                size: 'medium',
                animalType: 'dog',
                spaceRequirement: 'medium',
                energyStat: 'medium',
            }),
        ]

        await Promise.all(
            petsToCreate.map((pet) => {
                return request(app.server)
                    .post('/pets/create')
                    .set(
                        'Authorization',
                        `Bearer ${responseWithTokenJWT.body.token}`,
                    )
                    .send(pet)
            }),
        )

        let response = await request(app.server)
            .get('/pets')
            .query({
                city: org.city,
                age: '1',
                size: 'small',
                animalType: 'cat',
                spaceRequirement: 'small',
                energyStat: 'low',
            })
            .send()

        expect(response.status).toBe(200)
        expect(response.body.pets).toHaveLength(1)

        response = await request(app.server)
            .get('/pets')
            .query({
                city: org.city,
                age: '2',
                animalType: 'dog',
            })
            .send()

        expect(response.status).toBe(200)
        expect(response.body.pets).toHaveLength(2)
    })
})
