import styles from "./admin.module.css";
import Link from "next/link";

export default function AdminDashboard() {
  // In the future, fetch these indicators from the database via Server Actions
  const indicators = {
    published: 0,
    drafts: 0,
    closed: 0,
    companies: 0,
    categories: 0
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
