export const metadata = {
  title: "Sobre | Vagas",
  description: "Entenda o nosso propósito e como funciona o Vagas.",
};

export default function SobrePage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "4rem 1rem", width: "100%" }}>
      <header style={{ marginBottom: "3rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "1rem" }}>Sobre o Vagas</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "clamp(1rem, 3vw, 1.2rem)", lineHeight: "1.6" }}>
          Nosso objetivo é minimizar o atrito entre a busca por vagas e a candidatura.
        </p>
      </header>
      
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Nossa Missão</h2>
        <p style={{ lineHeight: "1.8", color: "var(--foreground)" }}>
          O Vagas nasceu da necessidade de ter um portal fechado, com curadoria manual e alto foco 
          na experiência do candidato. Chega de formulários intermináveis de ATS e processos que duram meses. 
          Aqui, destacamos as melhores vagas de tecnologia, com total transparência e facilidade.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Como Funciona</h2>
        <ul style={{ lineHeight: "1.8", paddingLeft: "1.5rem", color: "var(--foreground)" }}>
          <li style={{ marginBottom: "0.5rem" }}>Curadoria rigorosa de vagas abertas no mercado.</li>
          <li style={{ marginBottom: "0.5rem" }}>Foco em informações essenciais (Salário, Stack, Senioridade).</li>
          <li style={{ marginBottom: "0.5rem" }}>Processo de candidatura rápido e sem fricção.</li>
        </ul>
      </section>
    </div>
  );
}
