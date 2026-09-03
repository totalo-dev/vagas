"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".animate-text", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
      
      gsap.from(".animate-search", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: "power3.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.hero} ref={heroRef}>
      <div className={styles.content}>
        <h1 className={`${styles.headline} animate-text`}>
          Sua próxima oportunidade em <span style={{ background: "linear-gradient(to right, #007fff, #004c99)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", color: "transparent" }}>tecnologia</span> está aqui
        </h1>
        <p className={`${styles.subheadline} animate-text`}>
          Curadoria de vagas exclusivas para desenvolvedores, designers e profissionais de dados.
        </p>
        
        <div className={`${styles.searchContainer} animate-search`}>
          <form className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>
            <input 
              type="text" 
              placeholder="Ex: React, Node, Frontend, Pleno..." 
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              Buscar Vagas
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
