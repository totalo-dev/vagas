'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { jobSchema, companySchema } from '@/lib/validations';

async function checkAdmin() {
  const session = await auth();
  if (!session || (session.user as { role?: string })?.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }
}

export async function createJob(data: Record<string, unknown>) {
  await checkAdmin();
  
  if (data.companyId) {
    let company = await prisma.company.findUnique({ where: { id: data.companyId as string } });
    if (!company) {
      company = await prisma.company.findFirst({ where: { name: data.companyId as string } });
    }
    if (!company) {
      company = await prisma.company.create({ data: { name: data.companyId as string } });
    }
    data.companyId = company.id;
  }
  
  const parsed = jobSchema.parse(data);
  const result = await prisma.job.create({ data: parsed });
  revalidatePath('/admin/vagas');
  return result;
}

export async function updateJob(id: string, data: Record<string, unknown>) {
  await checkAdmin();
  
  if (data.companyId) {
    let company = await prisma.company.findUnique({ where: { id: data.companyId as string } });
    if (!company) {
      company = await prisma.company.findFirst({ where: { name: data.companyId as string } });
    }
    if (!company) {
      company = await prisma.company.create({ data: { name: data.companyId as string } });
    }
    data.companyId = company.id;
  }

  const parsed = jobSchema.parse(data);
  const result = await prisma.job.update({ where: { id }, data: parsed });
  revalidatePath('/admin/vagas');
  return result;
}

export async function deleteJob(id: string) {
  await checkAdmin();
  const result = await prisma.job.delete({ where: { id } });
  revalidatePath('/admin/jobs');
  return result;
}

export async function createCompany(data: unknown) {
  await checkAdmin();
  const parsed = companySchema.parse(data);
  const result = await prisma.company.create({ data: parsed });
  revalidatePath('/admin/companies');
  return result;
}

export async function updateCompany(id: string, data: unknown) {
  await checkAdmin();
  const parsed = companySchema.parse(data);
  const result = await prisma.company.update({ where: { id }, data: parsed });
  revalidatePath('/admin/companies');
  return result;
}

export async function deleteCompany(id: string) {
  await checkAdmin();
  const result = await prisma.company.delete({ where: { id } });
  revalidatePath('/admin/companies');
  return result;
}
