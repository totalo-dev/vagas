import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { CandidaturaForm } from "./CandidaturaForm";
import { FadeIn } from "@/components/FadeIn";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const job = await prisma.job.findUnique({
    where: { slug: params.slug },
    include: { company: true },
  });

  if (!job) return { title: "Vaga não encontrada" };

  return {
    title: `${job.title} - ${job.company.name} | Vagas`,
    description: job.description.substring(0, 160),
  };
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

export default async function JobPage({ params }: { params: { slug: string } }) {
  const job = await prisma.job.findUnique({
    where: { slug: params.slug },
    include: { technologies: true, company: true },
  });

  if (!job || job.status !== "PUBLISHED") {
    notFound();
  }

  const publishDate = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(job.createdAt);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "4rem 1rem", width: "100%" }}>
      <FadeIn y={10}>
        <header style={{ marginBottom: "3rem", paddingBottom: "2rem", borderBottom: "1px solid var(--border-color)" }}>
          <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.5rem)", marginBottom: "0.5rem" }}>{job.title}</h1>
          <p style={{ fontSize: "1.25rem", color: "var(--text-muted)", marginBottom: "2rem" }}>{job.company.name}</p>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
            <div>
              <strong style={{ display: "block", color: "var(--text-muted)", fontSize: "0.875rem" }}>Modalidade</strong>
              <span>{job.modality}</span>
            </div>
            <div>
              <strong style={{ display: "block", color: "var(--text-muted)", fontSize: "0.875rem" }}>Localização</strong>
              <span>{job.location}</span>
            </div>
            <div>
              <strong style={{ display: "block", color: "var(--text-muted)", fontSize: "0.875rem" }}>Senioridade</strong>
              <span>{job.seniority}</span>
            </div>
            <div>
              <strong style={{ display: "block", color: "var(--text-muted)", fontSize: "0.875rem" }}>Contratação</strong>
              <span>{job.contractType}</span>
            </div>
            <div>
              <strong style={{ display: "block", color: "var(--text-muted)", fontSize: "0.875rem" }}>Publicada</strong>
              <span>{publishDate}</span>
            </div>
            <div>
              <strong style={{ display: "block", color: "var(--text-muted)", fontSize: "0.875rem" }}>Salário</strong>
              <span>{formatSalary(job.salaryMin, job.salaryMax, job.salaryHidden)}</span>
            </div>
          </div>
        </header>
      </FadeIn>

      <FadeIn delay={0.1} y={10}>
        <main style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          <section>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Sobre a vaga</h2>
            <div style={{ whiteSpace: "pre-wrap" }}>{job.description}</div>
          </section>

          <section>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Responsabilidades</h2>
            <div style={{ whiteSpace: "pre-wrap" }}>{job.responsibilities}</div>
          </section>

          <section>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Requisitos</h2>
            <div style={{ whiteSpace: "pre-wrap" }}>{job.requirements}</div>
          </section>

          {job.differentials && (
            <section>
              <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Diferenciais</h2>
              <div style={{ whiteSpace: "pre-wrap" }}>{job.differentials}</div>
            </section>
          )}

          {job.technologies.length > 0 && (
            <section>
              <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Tecnologias</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {job.technologies.map(t => (
                  <span key={t.id} style={{ padding: "0.25rem 0.75rem", borderRadius: "9999px", backgroundColor: "var(--secondary-color)", fontSize: "0.875rem" }}>
                    {t.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Benefícios</h2>
            <div style={{ whiteSpace: "pre-wrap" }}>{job.benefits || "Benefícios não informados pela empresa."}</div>
          </section>

          <section>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Processo seletivo</h2>
            <div style={{ whiteSpace: "pre-wrap" }}>{job.selectionProcess || "O processo seletivo não foi informado pela empresa."}</div>
          </section>

          <section id="candidatura" style={{ marginTop: "2rem", padding: "2rem", backgroundColor: "var(--secondary-color)", borderRadius: "8px" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>Candidatar-se à vaga</h2>
            <CandidaturaForm jobId={job.id} externalApplyUrl={job.externalApplyUrl} />
          </section>
        </main>
      </FadeIn>
    </div>
  );
}
