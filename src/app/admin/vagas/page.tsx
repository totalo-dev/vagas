import styles from "../admin.module.css";
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function VagasList() {
  const vagas = await prisma.job.findMany({
    include: { company: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <h1 style={{ margin: 0 }}>Vagas</h1>
        <Link href="/admin/vagas/nova" className={styles.button}>
          Nova vaga
        </Link>
      </div>

      <div className={styles.card} style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #ccc' }}>
              <th style={{ padding: '0.75rem 0' }}>Vaga</th>
              <th style={{ padding: '0.75rem 0' }}>Empresa</th>
              <th style={{ padding: '0.75rem 0' }}>Status</th>
              <th style={{ padding: '0.75rem 0' }}>Publicação</th>
              <th style={{ padding: '0.75rem 0' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {vagas.map(vaga => (
              <tr key={vaga.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '0.75rem 0' }}>{vaga.title} ({vaga.seniority})</td>
                <td style={{ padding: '0.75rem 0' }}>{vaga.company.name}</td>
                <td style={{ padding: '0.75rem 0' }}>{vaga.status}</td>
                <td style={{ padding: '0.75rem 0' }}>{new Date(vaga.createdAt).toLocaleDateString('pt-BR')}</td>
                <td style={{ padding: '0.75rem 0' }}>
                  <Link href={`/admin/vagas/${vaga.id}/editar`} style={{ color: 'blue', textDecoration: 'underline' }}>Editar</Link>
                </td>
              </tr>
            ))}
            {vagas.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: '1rem 0', textAlign: 'center' }}>Nenhuma vaga encontrada.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
