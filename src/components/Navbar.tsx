import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";
import { auth } from "@/auth";

export default async function Navbar() {
  const session = await auth();
  const isAuthenticated = !!session;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image src="/icon.svg" alt="Vagas Logo" width={40} height={40} />
          <span>Vagas</span>
        </Link>
        <nav className={styles.nav}>
          <Link href="/vagas" className={styles.link}>
            Vagas
          </Link>

          <Link href="/sobre" className={styles.link}>
            Sobre
          </Link>

          {isAuthenticated ? (
            <Link href="/admin" className={styles.adminLink}>
              Admin
            </Link>
          ) : (
            <Link href="/admin/login" className={styles.loginLink}>
              Login Admin
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
