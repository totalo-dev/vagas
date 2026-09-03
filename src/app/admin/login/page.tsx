"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { authenticate } from "@/app/actions/auth";
import styles from "./login.module.css";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={styles.button} disabled={pending}>
      {pending ? "Entrando..." : "Entrar"}
    </button>
  );
}

export default function LoginPage() {
  const [errorMessage, formAction] = useActionState(authenticate, undefined);

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h1 className={styles.title}>Admin Login</h1>
        <form action={formAction}>
          {errorMessage && (
            <div className={styles.error}>{errorMessage}</div>
          )}
          
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="admin@vagas.com"
              required
              className={styles.input}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Senha
            </label>
            <input
              id="password"
              type="password"
              name="password"
              required
              className={styles.input}
            />
          </div>
          
          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
