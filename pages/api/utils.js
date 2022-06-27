import prisma from 'lib/prisma';

export default async function handler(req, res) {
  // refuses all non POST methods
  if (req.method !== 'POST') return res.end();

  if (req.body.task === 'clean_database') {
    await prisma.job.deleteMany({});
    await prisma.user.deleteMany({});
  }

  if (req.body.task === 'generate_one_job') {
    const users = await prisma.user.findMany({
      where: {},
    });

    await prisma.job.create({
      data: {
        title: 'a job title',
        description: 'a job description',
        author: {
          connect: { id: users[0].id },
        },
      },
    });
  }

  if (req.body.task === 'generate_users_and_jobs') {
    await prisma.job.create;
  }

  res.end();
}
