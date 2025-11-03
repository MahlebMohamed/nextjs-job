import NotFound from "@/app/not-found";
import JobPage from "@/components/JobPage";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

const getJob = cache(async (slug: string) => {
  const job = await prisma.job.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!job) notFound();

  return job;
});

export async function generateStaticParams() {
  const jobs = await prisma.job.findMany({
    select: { slug: true },
  });

  return jobs.map((job) => ({
    slug: job.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJob(slug);

  return {
    title: job?.title,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await getJob(slug);

  const { applicationEmail, applicationUrl } = job;
  const applicationLink = applicationEmail
    ? `mailto:${applicationEmail}`
    : applicationUrl;

  if (!applicationLink) {
    console.error("No application link found for job");
    return <NotFound />;
  }

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center space-y-5 px-3 md:flex-row md:items-start">
      <JobPage job={job} />
      <aside>
        <Button asChild>
          <a href={applicationLink} className="w-40 md:w-fit">
            Apply Now
          </a>
        </Button>
      </aside>
    </main>
  );
}
