import type { Prisma } from '@prisma/client'
import type { OrgsRepository } from '../orgs-repository'
import { prisma } from '@/db/prisma'

export class PrismaOrgsRepository implements OrgsRepository {
    async findById(id: string) {
        const org = await prisma.org.findUnique({ where: { id } })

        return org
    }
    async findByCity(city: string) {
        const org = await prisma.org.findMany({ where: { city } })

        return org
    }
    async create(data: Prisma.OrgCreateInput) {
        const org = await prisma.org.create({ data })

        return org
    }
    async findByEmail(email: string) {
        const org = await prisma.org.findUnique({ where: { email } })

        return org
    }
}
