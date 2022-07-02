import prisma from 'lib/prisma';
import { getJobs } from 'lib/data';
import Jobs from 'components/Jobs';
import { useSession } from 'next-auth/react';

export default function Home({ jobs }) {
  const { data: session, status } = useSession();
  return (
    <div className="mt-10">
      <div className="text-center p-4 m-4">
        <h2 className="mb-10 text-4xl font-bold">Find a job!</h2>
      </div>
      <Jobs jobs={jobs} />
    </div>
  );
}

export async function getServerSideProps(context) {
  let jobs = await getJobs(prisma);
  jobs = JSON.parse(JSON.stringify(jobs));

  return {
    props: {
      jobs,
    },
  };
}
