import { randomUUID } from 'node:crypto'
import { faker } from '@faker-js/faker'

interface Pet {
    id: string
    orgId: string
    name: string
    about: string
    age: string
    size: string
    animalType: string
    energyStat: string
    spaceRequirement: string
}

export function fakePet(fakePet: Partial<Pet> = {}) {
    const {
        id = randomUUID(),
        orgId = randomUUID(),
        name = faker.animal.petName(),
        about = faker.word.words(10),
        age = String(faker.number.int()),
        size = faker.helpers.arrayElement(['small', 'medium', 'large']),
        animalType = faker.helpers.arrayElement(['cat', 'dog']),
        energyStat = faker.helpers.arrayElement([
            'low',
            'medium',
            'high',
            'very high',
        ]),
        spaceRequirement = faker.helpers.arrayElement([
            'small',
            'medium',
            'large',
        ]),
    } = fakePet

    return {
        id,
        orgId,
        name,
        about,
        age,
        size,
        animalType,
        energyStat,
        spaceRequirement,
    }
}
