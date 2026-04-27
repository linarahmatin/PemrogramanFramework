import Link from "next/link";
import styles from "./register.module.css";

const HalamanRegister = () => {
  return (
    <div className={styles.register}>
      <h1>Halaman Register</h1>

      <input type="text" placeholder="Username" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />

      <button>Register</button>

      <Link href="/auth/login">Ke Halaman Login</Link>
    </div>
  );
};

export default HalamanRegister;