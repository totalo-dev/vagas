"use client";

import { useState } from "react";

import Link from "next/link";

export function CandidaturaForm({ jobId, externalApplyUrl }: { jobId: string, externalApplyUrl: string | null }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  if (externalApplyUrl) {
    return (
      <div>
        <p style={{ marginBottom: "1.5rem" }}>Esta vaga recebe candidaturas em uma plataforma externa.</p>
        <a 
          href={externalApplyUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ display: "inline-block", padding: "0.75rem 1.5rem", borderRadius: "8px", background: "var(--foreground)", color: "var(--background)", fontWeight: "bold" }}
        >
          Candidatar-se na página da empresa
        </a>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div style={{ padding: "2rem", backgroundColor: "var(--background)", borderRadius: "8px", border: "1px solid var(--border-color)", textAlign: "center" }}>
        <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem", color: "green" }}>Candidatura enviada com sucesso.</h3>
        <p style={{ marginBottom: "1.5rem" }}>Sua candidatura foi registrada. Boa sorte no processo seletivo.</p>
        <Link href="/vagas" style={{ display: "inline-block", padding: "0.75rem 1.5rem", borderRadius: "8px", border: "1px solid var(--border-color)", fontWeight: "500" }}>
          Voltar para vagas
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    formData.append("jobId", jobId);

    try {
      const response = await fetch("/api/candidaturas", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Falha ao enviar");

      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {status === "error" && (
        <div style={{ padding: "1rem", backgroundColor: "#fee2e2", color: "#991b1b", borderRadius: "8px" }}>
          Ocorreu um erro ao enviar sua candidatura. Tente novamente.
        </div>
      )}

      <div>
        <label htmlFor="name" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Nome</label>
        <input required type="text" id="name" name="name" style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--background)" }} />
      </div>

      <div>
        <label htmlFor="email" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>E-mail</label>
        <input required type="email" id="email" name="email" style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--background)" }} />
      </div>

      <div>
        <label htmlFor="linkedin" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>LinkedIn <span style={{ color: "var(--text-muted)", fontWeight: "normal" }}>(opcional)</span></label>
        <input type="url" id="linkedin" name="linkedin" style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--background)" }} />
      </div>

      <div>
        <label htmlFor="github" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>GitHub <span style={{ color: "var(--text-muted)", fontWeight: "normal" }}>(opcional)</span></label>
        <input type="url" id="github" name="github" style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--background)" }} />
      </div>

      <div>
        <label htmlFor="resume" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Currículo <span style={{ color: "var(--text-muted)", fontWeight: "normal" }}>(PDF)</span></label>
        <input required type="file" id="resume" name="resume" accept=".pdf" style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px dashed var(--border-color)", background: "var(--background)" }} />
      </div>

      <button 
        type="submit" 
        disabled={status === "submitting"}
        style={{ padding: "0.75rem 1.5rem", borderRadius: "8px", background: "var(--foreground)", color: "var(--background)", fontWeight: "bold", opacity: status === "submitting" ? 0.7 : 1 }}
      >
        {status === "submitting" ? "Enviando..." : "Enviar candidatura"}
      </button>
    </form>
  );
}
