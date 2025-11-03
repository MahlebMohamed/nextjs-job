import H1 from "@/components/h1";
import JobResults from "@/components/JobResults";
import { JobFilterValues } from "@/lib/validation";
import prisma from "@/lib/prisma";
import JobFilterSidebar from "./JobFilterSidebar";
import { Metadata } from "next";

interface PageProps {
  searchParams: {
    search?: string;
    type?: string;
    location?: string;
    remote?: string;
  };
}

function getTitle({ search, type, location, remote }: JobFilterValues) {
  const titlePrefix = search
    ? `${search} jobs`
    : type
      ? `${type} developer jobs`
      : remote
        ? `Remote developer jobs`
        : "All developer jobs";

  const titleSuffix = location ? `in ${location}` : "";

  return `${titlePrefix} ${titleSuffix}`;
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = await Promise.resolve(searchParams);
  const { search, type, location, remote } = params;

  return {
    title: getTitle({ search, type, location, remote: remote === "true" }),
  };
}

export default async function Home({ searchParams }: PageProps) {
  const { search, type, location, remote } =
    await Promise.resolve(searchParams);

  const filterValues: JobFilterValues = {
    search,
    type,
    location,
    remote: remote === "true",
  };

  const distinctLocations = (await prisma.job
    .findMany({
      select: { location: true },
      distinct: ["location"],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean),
    )) as string[];

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <H1>{getTitle(filterValues)}</H1>
        <p className="text-muted-foreground">
          Find the best developer jobs in your area.
        </p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <JobFilterSidebar
          key={JSON.stringify(filterValues)}
          defaultValues={filterValues}
          locations={distinctLocations}
        />
        <JobResults filterValues={filterValues} />
      </section>
    </main>
  );
}
