import { prisma } from '../config'

async function main(): Promise<void> {
  for (const environment of [
    'Sala de Estar',
    'Dormitório',
    'Banheiro',
    'Escritório',
    'Corredor',
    'Jardim',
    'Quintal',
    'Sacada',
  ]) {
    await prisma.environment.create({
      data: {
        title: environment,
      },
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
