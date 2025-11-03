"use server";

import prisma from "@/lib/prisma";
import { toSlug } from "@/lib/utils";
import { createJobSchema } from "@/lib/validation";
import { Prisma } from "@prisma/client";
import { put } from "@vercel/blob";
import { nanoid } from "nanoid";
import path from "path";

export type CreateJobResponse =
  | { success: true; jobId: string }
  | { success: false; error: string };

export async function createJobPosting(
  formData: FormData,
): Promise<CreateJobResponse> {
  try {
    const values = Object.fromEntries(formData.entries());
    const parsed = createJobSchema.safeParse(values);

    if (!parsed.success) {
      return { success: false, error: "Invalid input data." };
    }

    const {
      title,
      type,
      companyName,
      companyLogo,
      locationType,
      location,
      applicationEmail,
      applicationUrl,
      description,
      salary,
    } = parsed.data;

    const slug = `${toSlug(title)}-${nanoid(10)}`;
    let companyLogoUrl: string | undefined = undefined;

    if (companyLogo) {
      const blob = await put(
        `comapy-logos/${slug}${path.extname(companyLogo.name)}`,
        companyLogo,
        {
          access: "public",
          addRandomSuffix: false,
        },
      );
      companyLogoUrl = blob.url;
    }

    const job = await prisma.job.create({
      data: {
        slug,
        title: title.trim(),
        type,
        locationType,
        location,
        applicationEmail: applicationEmail?.trim(),
        applicationUrl: applicationUrl?.trim(),
        description: description?.trim(),
        salary: parseInt(salary),
        companyName: companyName.trim(),
        companyLogo: companyLogoUrl,
      },
    });

    return { success: true, jobId: job.id.toString() };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          success: false,
          error: "A job with this title already exists.",
        };
      }
    }

    console.error("Error creating job:", error);
    return {
      success: false,
      error: "Internal server error. Please try again later.",
    };
  }
}
