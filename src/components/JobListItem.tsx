import companyLogoPlaceholder from "@/app/assets/company-logo-placeholder.png";
import { formatMoney, relativeDate } from "@/lib/utils";
import { Job } from "@prisma/client";
import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react";
import Image from "next/image";
import Badge from "./Badge";

interface JobListItemProps {
  job: Job;
}

export default function JobListItem({ job }: JobListItemProps) {
  return (
    <article className="hover:bg-muted/60 flex cursor-pointer gap-3 rounded-lg border p-5">
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

        <div className="text-muted-foreground">
          <p className="flex items-center gap-1.5 sm:hidden">
            <Briefcase className="shrink-0" size={16} />
            {job.type}
          </p>
          <p className="flex items-center gap-1.5">
            <MapPin className="shrink-0" size={16} />
            {job.locationType}
          </p>
          <p className="flex items-center gap-1.5">
            <Globe2 className="shrink-0" size={16} />
            {job.location || "Worldwide"}
          </p>
          <p className="flex items-center gap-1.5">
            <Banknote className="shrink-0" size={16} />
            {formatMoney(job.salary)}
          </p>
          <p className="flex items-center gap-1.5 sm:hidden">
            <Clock className="shrink-0" size={16} />
            {relativeDate(job.createdAt)}
          </p>
        </div>
      </div>
      <div className="hidden shrink-0 flex-col items-end justify-between sm:flex">
        <Badge>{job.type}</Badge>
        <span className="text-muted-foreground flex items-center gap-1.5">
          <Clock className="shrink-0" size={16} />
          {relativeDate(job.createdAt)}
        </span>
      </div>
    </article>
  );
}
