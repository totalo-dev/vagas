"use client";

import styles from "../../admin.module.css";
import Link from "next/link";
import { useState } from "react";
import { createJob } from "@/app/actions/admin";
import { useRouter } from "next/navigation";

export default function JobForm() {
  const [error, setError] = useState<string | null>(null);
  const [salaryNotDisclosed, setSalaryNotDisclosed] = useState(false);
  const [applicationType, setApplicationType] = useState("url");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    
    const minSalary = formData.get("minSalary");
    const maxSalary = formData.get("maxSalary");
    
    // Determine status from submitter
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
    const status = submitter.value === "draft" ? "DRAFT" : "PUBLISHED";
    const title = formData.get("title") as string;

    const data = {
      title,
      slug: title.toLowerCase().replace(/\s+/g, '-'),
      companyId: formData.get("companyId") as string,
      seniority: formData.get("seniority") as string,
      modality: formData.get("modality") as string,
      location: formData.get("location") as string,
      contractType: formData.get("contractType") as string,
      salaryMin: salaryNotDisclosed ? null : (minSalary ? Number(minSalary) : null),
      salaryMax: salaryNotDisclosed ? null : (maxSalary ? Number(maxSalary) : null),
      salaryHidden: salaryNotDisclosed,
      description: formData.get("aboutJob") as string,
      responsibilities: formData.get("responsibilities") as string,
      requirements: formData.get("requirements") as string,
      differentials: formData.get("differentials") as string,
      benefits: formData.get("benefits") as string,
      selectionProcess: formData.get("hiringProcess") as string,
      status: status,
      externalApplyUrl: applicationType === "url" ? (formData.get("applicationUrl") as string) : null,
    };

    try {
      await createJob(data);
      router.push("/admin/vagas");
    } catch (err: unknown) {
      setError((err as Error).message || "Erro ao criar vaga.");
    }
  }

  return (
    <div className={styles.card}>
      <h2 style={{ marginTop: 0 }}>Nova Vaga</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="title">Cargo</label>
            <input className={styles.input} type="text" id="title" name="title" required />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="companyId">Empresa</label>
            <input className={styles.input} type="text" id="companyId" name="companyId" required placeholder="Digite o nome da empresa" />
          </div>
          

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="seniority">Senioridade</label>
            <select className={styles.select} id="seniority" name="seniority">
              <option value="INTERNSHIP">Estágio</option>
              <option value="JUNIOR">Júnior</option>
              <option value="MID_LEVEL">Pleno</option>
              <option value="SENIOR">Sênior</option>
              <option value="SPECIALIST">Especialista</option>
            </select>
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="modality">Modalidade</label>
            <select className={styles.select} id="modality" name="modality">
              <option value="REMOTE">Remoto</option>
              <option value="HYBRID">Híbrido</option>
              <option value="ONSITE">Presencial</option>
            </select>
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="location">Localização</label>
            <input className={styles.input} type="text" id="location" name="location" placeholder="Ex: Brasil, São Paulo..." />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="contractType">Tipo de contratação</label>
            <select className={styles.select} id="contractType" name="contractType">
              <option value="CLT">CLT</option>
              <option value="PJ">PJ</option>
              <option value="INTERNSHIP">Estágio</option>
              <option value="FREELANCER">Freelancer</option>
              <option value="TEMPORARY">Temporário</option>
            </select>
          </div>
        </div>

        <h3 style={{ marginTop: '2rem' }}>Remuneração</h3>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={salaryNotDisclosed} 
              onChange={(e) => setSalaryNotDisclosed(e.target.checked)} 
            />
            Salário não informado
          </label>
        </div>
        {!salaryNotDisclosed && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="minSalary">Salário mínimo</label>
              <input className={styles.input} type="number" id="minSalary" name="minSalary" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="maxSalary">Salário máximo</label>
              <input className={styles.input} type="number" id="maxSalary" name="maxSalary" />
            </div>
          </div>
        )}

        <h3 style={{ marginTop: '2rem' }}>Conteúdo</h3>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="aboutJob">Sobre a vaga</label>
          <textarea className={styles.textarea} id="aboutJob" name="aboutJob" required />
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="responsibilities">Responsabilidades</label>
          <textarea className={styles.textarea} id="responsibilities" name="responsibilities" />
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="requirements">Requisitos</label>
          <textarea className={styles.textarea} id="requirements" name="requirements" />
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="differentials">Diferenciais</label>
          <textarea className={styles.textarea} id="differentials" name="differentials" />
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="benefits">Benefícios</label>
          <textarea className={styles.textarea} id="benefits" name="benefits" />
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="hiringProcess">Processo seletivo</label>
          <textarea className={styles.textarea} id="hiringProcess" name="hiringProcess" />
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="technologies">Tecnologias (separadas por vírgula)</label>
          <input className={styles.input} type="text" id="technologies" name="technologies" />
        </div>

        <h3 style={{ marginTop: '2rem', marginBottom: '24px' }}>Candidatura</h3>
        <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input 
              type="radio" 
              name="appType" 
              value="url" 
              checked={applicationType === "url"} 
              onChange={() => setApplicationType("url")} 
            />
            URL Externa
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input 
              type="radio" 
              name="appType" 
              value="internal" 
              checked={applicationType === "internal"} 
              onChange={() => setApplicationType("internal")} 
            />
            Candidatura Interna
          </label>
        </div>
        
        {applicationType === "url" && (
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="applicationUrl">URL de Candidatura</label>
            <input className={styles.input} type="url" id="applicationUrl" name="applicationUrl" />
          </div>
        )}

        <div className={styles.formActions}>
          <Link href="/admin/vagas" className={styles.buttonSecondary}>Cancelar</Link>
          <button type="submit" name="action" value="draft" className={styles.buttonSecondary}>Salvar rascunho</button>
          <button type="submit" name="action" value="publish" className={styles.button}>Publicar vaga</button>
        </div>
      </form>
    </div>
  );
}
