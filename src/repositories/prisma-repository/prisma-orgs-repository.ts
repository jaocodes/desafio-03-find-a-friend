import type { Prisma, Org } from '@prisma/client'
import type { OrgsRepository } from '../orgs-repository'
import { prisma } from '@/db/prisma'

export class PrismaOrgRepository implements OrgsRepository {
    async create(data: Prisma.OrgCreateInput): Promise<Org> {
        const org = await prisma.org.create({ data })

        return org
    }
    async findByEmail(email: string) {
        const org = await prisma.org.findUnique({ where: { email } })

        return org
    }
}
