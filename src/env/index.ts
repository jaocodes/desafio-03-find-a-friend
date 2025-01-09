import { z } from 'zod'

const envShema = z.object({
    PORT: z.coerce.number().default(3333),
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    SECRET_JWT: z.string(),
})

const _env = envShema.safeParse(process.env)

if (_env.success === false) {
    console.error('❌ Invalid environment variables', _env.error.format())
    throw new Error('Invalid environment variables.')
}

export const env = _env.data
