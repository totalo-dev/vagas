import styles from "./page.module.css";
import HeroSection from "@/components/HeroSection";
import JobList from "@/components/JobList";

export default function Home() {
  return (
    <div className={styles.container}>
      <HeroSection />
      <section className={styles.jobsSection}>
        <div className={styles.sectionHeader}>
          <h2>Vagas Recentes</h2>
          <p>Encontre a oportunidade ideal para o seu perfil.</p>
        </div>
        <JobList />
      </section>
    </div>
  );
}
