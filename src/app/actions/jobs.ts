"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { JobStatus, Seniority, Modality, ContractType } from "@prisma/client";
import { auth } from "@/auth";

export async function getJobs() {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return { success: true, data: jobs };
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return { success: false, error: "Failed to fetch jobs" };
  }
}

export async function createJob(data: {
  title: string;
  slug: string;
  companyId: string;
  seniority: Seniority;
  modality: Modality;
  location: string;
  contractType: ContractType;
  salaryMin?: number | null;
  salaryMax?: number | null;
  salaryHidden?: boolean;
  description: string;
  responsibilities: string;
  requirements: string;
  differentials?: string | null;
  benefits?: string | null;
  selectionProcess?: string | null;
  status?: JobStatus;
  externalApplyUrl?: string | null;
}) {
  const session = await auth();
  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const newJob = await prisma.job.create({
      data: {
        title: data.title,
        slug: data.slug,
        companyId: data.companyId,

        seniority: data.seniority,
        modality: data.modality,
        location: data.location,
        contractType: data.contractType,
        salaryMin: data.salaryMin,
        salaryMax: data.salaryMax,
        salaryHidden: data.salaryHidden ?? false,
        description: data.description,
        responsibilities: data.responsibilities,
        requirements: data.requirements,
        differentials: data.differentials,
        benefits: data.benefits,
        selectionProcess: data.selectionProcess,
        status: data.status || "DRAFT",
        externalApplyUrl: data.externalApplyUrl,
      },
    });

    revalidatePath("/admin/vagas");
    revalidatePath("/vagas");

    return { success: true, data: newJob };
  } catch (error) {
    console.error("Error creating job:", error);
    return { success: false, error: "Failed to create job" };
  }
}
