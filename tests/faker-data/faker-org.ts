import { randomUUID } from 'node:crypto'
import { faker } from '@faker-js/faker'

export function fakeOrg(password?: string) {
    const org = {
        id: randomUUID(),
        name: faker.company.name(),
        coordinator_name: faker.person.fullName(),
        whatsapp: faker.phone.number(),
        email: faker.internet.email(),
        password: password ?? faker.internet.password(),
        cep: faker.location.zipCode(),
        state: faker.location.state(),
        city: faker.location.city(),
        street: faker.location.street(),
        number: String(faker.number.int()),
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
    }

    return org
}
