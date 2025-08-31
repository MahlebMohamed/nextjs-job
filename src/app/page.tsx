import JobListItem from "@/components/JobListItem";
import prisma from "@/lib/prisma";

export default async function Home() {
  const jobs = await prisma.job.findMany();

  return (
    <main>
      {jobs.map((job) => (
        <JobListItem key={job.id} job={job} />
      ))}
    </main>
  );
}
