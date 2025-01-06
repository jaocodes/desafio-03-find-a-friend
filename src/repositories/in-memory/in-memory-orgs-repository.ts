import type { Prisma, Org } from '@prisma/client'
import type { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'node:crypto'
import { Decimal } from '@prisma/client/runtime/library'

export class InMemoryOrgsRepository implements OrgsRepository {
    private orgs: Org[] = []

    async create(data: Prisma.OrgCreateInput): Promise<Org> {
        const org = {
            id: data.id ?? randomUUID(),
            name: data.name,
            coordinator_name: data.coordinator_name,
            whatsapp: data.whatsapp,
            email: data.email,
            password_hash: data.password_hash,

            cep: data.cep,
            state: data.state,
            city: data.city,
            street: data.street,
            number: data.number,
            latitude: new Decimal(data.latitude.toString()),
            longitude: new Decimal(data.longitude.toString()),
        }

        this.orgs.push(org)

        return org
    }
    async findByEmail(email: string): Promise<Org | null> {
        const org = this.orgs.find((item) => {
            return item.email === email
        })
        if (!org) {
            return null
        }

        return org
    }
}
