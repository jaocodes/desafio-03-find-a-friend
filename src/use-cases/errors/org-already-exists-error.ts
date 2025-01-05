export class OrgAlreadyExistsError extends Error {
    constructor() {
        super('Org with the same email already exists')
    }
}
