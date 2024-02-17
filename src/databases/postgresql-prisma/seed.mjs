import { PrismaClient } from '@prisma/client'
import * as glob from 'glob'
import dayjs from 'dayjs'

const prisma = new PrismaClient({
  log: [
    { level: 'error', emit: 'event' },
    { level: 'query', emit: 'event' }
  ],
  errorFormat: 'pretty'
})

prisma.$on('error', (e) => {
  console.error(e)
})

prisma.$on('query', (e) => {
  console.info(e)
})

const asyncForeach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    const res = await callback(array[index], index, array)
    if (res === false) {
      return res
    }
  }
}

const seed = async () => {
  await asyncForeach(glob.sync('src/databases/postgresql-prisma/seeds/**/!(index)*.mjs'), async fileFullPath => {
    const file = fileFullPath.replace('server/database', '.')
    const SeedImplementation = await import(file)
    if ('seed' in SeedImplementation && typeof SeedImplementation.seed === 'function') {
      const seedName = file.replace('./seeds/', '').replace('.mjs', '')
      console.group(`Seed [${seedName}] install`)
      const seed = await prisma.seed.findFirst({
        where: {
          name: seedName
        }
      })
      if (!seed) {
        console.info(`call`)
        await SeedImplementation.seed(prisma)
        await prisma.seed.create({
          data: {
            name: seedName
          }
        })
        console.info(`successfully installed`)
      } else {
        console.info(`skipp because installed at ${dayjs(seed.createdAt).format('YYYY-MM-DD HH:mm:ss')}`)
      }
      console.groupEnd()
    }
  })
}

(async () => {
  await seed().catch(e => { console.error(e) })
  await prisma.$disconnect()
})()