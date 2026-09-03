import styles from "./JobList.module.css";
import Link from "next/link";
import prisma from "@/lib/prisma";

function formatTimeAgo(date: Date) {
  const diffInDays = Math.floor(
    (new Date().getTime() - date.getTime()) / (1000 * 3600 * 24),
  );
  if (diffInDays === 0) return "Hoje";
  if (diffInDays === 1) return "Há 1 dia";
  return `Há ${diffInDays} dias`;
}

function formatSalaryValue(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatSalary(min: number | null, max: number | null, hidden: boolean) {
  if (hidden) return "A combinar";
  if (min && max)
    return `${formatSalaryValue(min)} - ${formatSalaryValue(max)}`;
  if (min) return `A partir de ${formatSalaryValue(min)}`;
  if (max) return `Até ${formatSalaryValue(max)}`;
  return "A combinar";
}

export default async function JobList() {
  const jobs = await prisma.job.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    include: { company: true },
    take: 10,
  });

  return (
    <div className={styles.jobList}>
      {jobs.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            padding: "2rem",
            color: "var(--text-muted)",
          }}
        >
          Nenhuma vaga encontrada no momento.
        </p>
      ) : (
        jobs.map((job) => (
          <Link
            href={`/vagas/${job.slug}`}
            key={job.id}
            className={styles.jobCard}
          >
            <div className={styles.cardHeader}>
              <h3 className={styles.jobTitle}>{job.title}</h3>
              <span className={styles.date}>
                {formatTimeAgo(job.createdAt)}
              </span>
            </div>
            <p className={styles.companyName}>{job.company.name}</p>
            <div className={styles.jobTags}>
              <span className={styles.tag}>{job.location}</span>
              <span className={styles.tag}>{job.contractType}</span>
              <span className={styles.tagSalario}>
                {formatSalary(job.salaryMin, job.salaryMax, job.salaryHidden)}
              </span>
            </div>
          </Link>
        ))
      )}
      <div className={styles.viewMoreContainer}>
        <Link href="/vagas" className={styles.viewMoreButton}>
          Ver Todas as Vagas
        </Link>
      </div>
    </div>
  );
}
