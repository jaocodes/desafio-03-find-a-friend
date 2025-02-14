import type { FastifyInstance } from 'fastify'
import { createPet } from './create-pet'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { getPetDetails } from './get-pet-details'
import { fetchPets } from './fetch-pets'

export async function petRoutes(app: FastifyInstance) {
    app.post('/create', { onRequest: [verifyJWT] }, createPet)
    app.get('/:id', getPetDetails)
    app.get('', fetchPets)
}
