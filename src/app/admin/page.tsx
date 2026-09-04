import styles from "./admin.module.css";
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function AdminDashboard() {
  const [published, drafts, closed, companies, categories] = await Promise.all([
    prisma.job.count({ where: { status: "PUBLISHED" } }),
    prisma.job.count({ where: { status: "DRAFT" } }),
    prisma.job.count({ where: { status: "CLOSED" } }),
    prisma.company.count(),
    prisma.technology.count(),
  ]);

  const indicators = {
    published,
    drafts,
    closed,
    companies,
    categories
  };

  return (
    <div>
      <div className={styles.dashboardGrid}>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{indicators.published}</div>
          <div className={styles.statLabel}>Vagas publicadas</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{indicators.drafts}</div>
          <div className={styles.statLabel}>Rascunhos</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{indicators.closed}</div>
          <div className={styles.statLabel}>Vagas encerradas</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{indicators.companies}</div>
          <div className={styles.statLabel}>Empresas</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{indicators.categories}</div>
          <div className={styles.statLabel}>Categorias</div>
        </div>
      </div>
      
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
        <Link href="/admin/vagas/nova" className={styles.button}>
          Adicionar vaga
        </Link>
      </div>
    </div>
  );
}
