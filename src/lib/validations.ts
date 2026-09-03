import { z } from 'zod';

export const jobSchema = z.object({
  id: z.string().optional(),
  slug: z.string().min(1, "Slug is required"),
  title: z.string().min(1, "Title is required"),
  companyId: z.string().min(1, "Company is required"),

  seniority: z.enum(["INTERNSHIP", "JUNIOR", "MID_LEVEL", "SENIOR", "SPECIALIST"]),
  modality: z.enum(["REMOTE", "HYBRID", "ONSITE"]),
  location: z.string().min(1, "Location is required"),
  contractType: z.enum(["CLT", "PJ", "INTERNSHIP", "FREELANCER", "TEMPORARY"]),
  salaryMin: z.number().optional().nullable(),
  salaryMax: z.number().optional().nullable(),
  salaryHidden: z.boolean().default(false),
  description: z.string().min(1, "Description is required"),
  responsibilities: z.string().min(1, "Responsibilities are required"),
  requirements: z.string().min(1, "Requirements are required"),
  differentials: z.string().optional().nullable(),
  benefits: z.string().optional().nullable(),
  selectionProcess: z.string().optional().nullable(),
  status: z.enum(["DRAFT", "PUBLISHED", "CLOSED"]).default('DRAFT'),
  externalApplyUrl: z.string().url().optional().nullable(),
});

export const companySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  logoUrl: z.string().url().optional().nullable(),
  website: z.string().url().optional().nullable(),
  description: z.string().optional().nullable(),
});
