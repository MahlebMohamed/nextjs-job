import JobPage from "@/components/JobPage";
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

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center space-y-5 px-3 md:flex-row">
      <JobPage job={job} />
    </main>
  );
}
