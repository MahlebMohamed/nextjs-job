"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Select from "@/components/ui/select";
import { jobTypes } from "@/lib/job-types";
import { jobFilterSchema, JobFilterValues } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface JobFilterSidebarProps {
  defaultValues: JobFilterValues;
  locations: string[];
}

// async function filterJob(formData: FormData) {
//   "use server";

//   const values = Object.fromEntries(formData.entries());
//   const result = jobFilterSchema.safeParse(values);
// if (!result.success) {
//   console.error("Validation failed: ", result.error.format());
//   return;
// }
// const { search, type, location, remote } = jobFilterSchema.parse(values);

//   const searchParams = new URLSearchParams({
//     ...(search && { search: search.trim() }),
//     ...(type && { type }),
//     ...(location && { location }),
//     ...(remote && { remote: "true" }),
//   });

//   redirect(`/?${searchParams.toString()}`);
// }

export default function JobFilterSidebar({
  defaultValues,
  locations,
}: JobFilterSidebarProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());
    const result = jobFilterSchema.safeParse(values);
    if (!result.success) {
      console.error("Validation failed: ", result.error.format());
      return;
    }
    const { search, type, location, remote } = jobFilterSchema.parse(values);

    const searchParams = new URLSearchParams({
      ...(search && { search: search.trim().toString() }),
      ...(type && { type: type.toString() }),
      ...(location && { location: location.toString() }),
      ...(remote && { remote: "true" }),
    });

    startTransition(() => {
      router.push(`/?${searchParams.toString()}`);
    });
  }

  return (
    <aside className="bg-background sticky top-0 h-fit rounded-lg border p-4 md:w-[260px]">
      <form
        action="/"
        method="GET"
        onSubmit={handleSubmit}
        key={JSON.stringify(defaultValues)}
      >
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="search">Search</Label>
            <Input
              type="text"
              name="search"
              id="search"
              placeholder="Title, Company, etc."
              defaultValue={defaultValues.search}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <Select id="type" name="type" defaultValue={defaultValues.type}>
              <option value="">All types</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select
              id="location"
              name="location"
              defaultValue={defaultValues.location}
            >
              <option value="">All locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex flex-row gap-2">
            <input
              id="remote"
              type="checkbox"
              name="remote"
              className="scale-125 accent-black"
              defaultChecked={defaultValues.remote}
            />
            <label htmlFor="remote">Remote</label>
          </div>

          <Button
            className="w-full cursor-pointer"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Loading..." : "Filter jobs"}
          </Button>
        </div>
      </form>
    </aside>
  );
}
