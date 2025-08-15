import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create sample metrics for your projects
  const portfolioMetric = await prisma.metric.upsert({
    where: { slug: 'portfolio-website' },
    update: {},
    create: {
      slug: 'portfolio-website',
      views: 42,
      likes: 8,
    },
  })

  const awsMetric = await prisma.metric.upsert({
    where: { slug: 'aws-cloud-infrastructure' },
    update: {},
    create: {
      slug: 'aws-cloud-infrastructure',
      views: 38,
      likes: 12,
    },
  })

  const iosMetric = await prisma.metric.upsert({
    where: { slug: 'ios-text-to-speech' },
    update: {},
    create: {
      slug: 'ios-text-to-speech',
      views: 29,
      likes: 5,
    },
  })

  console.log('✅ Created metrics:', {
    portfolio: portfolioMetric,
    aws: awsMetric,
    ios: iosMetric,
  })

  // Create a sample contact message
  const sampleMessage = await prisma.message.create({
    data: {
      name: 'Jane Doe',
      email: 'jane@example.com',
      body: 'Hi! I love your portfolio. Would love to discuss potential opportunities.',
    },
  })

  console.log('✅ Created sample message:', sampleMessage)
}

main()
  .then(async () => {
    await prisma.$disconnect()
    console.log('🎉 Seeding completed!')
  })
  .catch(async (e) => {
    console.error('❌ Seeding failed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
