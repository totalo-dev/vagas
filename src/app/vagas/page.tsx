import Link from "next/link";
import prisma from "@/lib/prisma";
import { FadeIn } from "@/components/FadeIn";
import styles from "./vagas.module.css";

export const metadata = {
  title: "Todas as Vagas | Vagas",
  description: "Explore todas as vagas de tecnologia abertas na nossa plataforma.",
};

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
  if (hidden) return "Salário não informado";
  if (min && max)
    return `${formatSalaryValue(min)} - ${formatSalaryValue(max)}`;
  if (min) return `A partir de ${formatSalaryValue(min)}`;
  if (max) return `Até ${formatSalaryValue(max)}`;
  return "Salário não informado";
}

export default async function VagasPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const resolvedSearchParams = await searchParams;
  const query = typeof resolvedSearchParams.query === "string" ? resolvedSearchParams.query : "";

  const jobs = await prisma.job.findMany({
    where: {
      status: "PUBLISHED",
      OR: query
        ? [
            { title: { contains: query, mode: "insensitive" } },
            { company: { name: { contains: query, mode: "insensitive" } } },
            { location: { contains: query, mode: "insensitive" } },
          ]
        : undefined,
    },
    orderBy: { createdAt: "desc" },
    include: { technologies: true, company: true },
  });

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 1rem", width: "100%" }}>
      <FadeIn y={10}>
        <header style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 2.5rem)", marginBottom: "1rem" }}>Vagas em tecnologia</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>
            Encontre oportunidades em desenvolvimento, dados, design, infraestrutura, segurança, produto e outras áreas de tecnologia.
          </p>
        </header>
      </FadeIn>
      
      <FadeIn delay={0.1} y={10}>
        <div style={{ marginBottom: "2rem" }}>
          <form method="GET" action="/vagas" className={styles.searchForm}>
            <input
              type="text"
              name="query"
              defaultValue={query}
              placeholder="Cargo, tecnologia ou empresa"
              style={{ flex: 1, padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--background)" }}
            />
            <button type="submit" className="btn-primary">
              Buscar vagas
            </button>
          </form>
          {query && (
            <p style={{ marginTop: "1rem" }}>
              {jobs.length} vagas encontradas
            </p>
          )}
        </div>
      </FadeIn>
      
      <FadeIn delay={0.2} y={10}>
        <div style={{ display: "flex", gap: "2rem", flexDirection: "column" }}>
          {jobs.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem", backgroundColor: "var(--secondary-color)", borderRadius: "8px" }}>
              <h2 style={{ marginBottom: "1rem" }}>Nenhuma vaga encontrada.</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
                Não encontramos oportunidades com esses filtros. Tente remover algum filtro ou fazer uma nova busca.
              </p>
              <Link href="/vagas" className="btn-primary">
                Limpar filtros
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {jobs.map((job) => (
                <div key={job.id} style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "1.5rem", border: "1px solid var(--border-color)", borderRadius: "8px", backgroundColor: "var(--background)" }}>
                  <div className={styles.jobCardHeader} style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                      <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.5rem" }}>{job.title}</h3>
                      <p style={{ color: "var(--text-muted)", fontWeight: "500" }}>{job.company.name}</p>
                    </div>
                    <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
                      {formatTimeAgo(job.createdAt)}
                    </span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    <span style={{ padding: "0.25rem 0.75rem", borderRadius: "9999px", backgroundColor: "var(--secondary-color)", fontSize: "0.875rem" }}>{job.modality}</span>
                    <span style={{ padding: "0.25rem 0.75rem", borderRadius: "9999px", backgroundColor: "var(--secondary-color)", fontSize: "0.875rem" }}>{job.location}</span>
                    <span style={{ padding: "0.25rem 0.75rem", borderRadius: "9999px", backgroundColor: "var(--secondary-color)", fontSize: "0.875rem" }}>{job.seniority}</span>
                  </div>
                  {job.technologies.length > 0 && (
                    <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
                      {job.technologies.map((t: { name: string }) => t.name).join(" ")}
                    </p>
                  )}
                  <div className={styles.jobCardFooter} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem" }}>
                    <span style={{ fontWeight: "600" }}>{formatSalary(job.salaryMin, job.salaryMax, job.salaryHidden)}</span>
                    <div style={{ display: "flex", gap: "1rem" }}>
                      <Link href={`/vagas/${job.slug}`} style={{ padding: "0.5rem 1rem", borderRadius: "6px", backgroundColor: "var(--foreground)", color: "var(--background)", fontWeight: "500" }}>
                        Ver vaga
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </FadeIn>
    </div>
  );
}
