import companyLogoPlaceholder from "@/app/assets/company-logo-placeholder.png";
import { Job } from "@prisma/client";
import Image from "next/image";
import { Banknote, Briefcase, Globe2, MapPin } from "lucide-react";

interface JobListItemProps {
  job: Job;
}

export default function JobListItem({ job }: JobListItemProps) {
  return (
    <article className="hover:bg-muted/60 flex gap-3 rounded-lg border p-5">
      <Image
        src={job.companyLogo || companyLogoPlaceholder}
        alt={`${job.companyName} logo`}
        width={100}
        height={100}
        className="self-center rounded-lg"
      />
      <div className="flex-grow space-y-3">
        <div>
          <h2 className="text-xl font-medium">{job.title}</h2>
          <p className="text-muted-foreground">{job.companyName}</p>
        </div>
        <p className="text-muted-foreground">
          <p className="flex items-center gap-1.5 sm:hidden">
            <Briefcase className="shrink-0" size={16} />
            {job.type}
          </p>
          <p className="flex items-center gap-1.5 sm:hidden">
            <MapPin className="shrink-0" size={16} />
            {job.locationType}
          </p>
          <p className="flex items-center gap-1.5 sm:hidden">
            <Globe2 className="shrink-0" size={16} />
            {job.type}
          </p>
          <p className="flex items-center gap-1.5 sm:hidden">
            <Banknote className="shrink-0" size={16} />
            {job.type}
          </p>
        </p>
      </div>
    </article>
  );
}
