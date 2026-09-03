import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const adminEmail = 'admin@vagas.com'
  
  const existingUser = await prisma.user.findUnique({
    where: { email: adminEmail }
  })
  
  if (!existingUser) {
    const admin = await prisma.user.create({
      data: {
        name: 'Admin',
        email: adminEmail,
        role: 'ADMIN'
      }
    })
    console.log('Admin user created:', admin)
  } else {
    console.log('Admin user already exists:', existingUser)
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
