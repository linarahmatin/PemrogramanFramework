import Link from "next/link";
import style from "@/views/auth/login/login.module.scss"; 
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const TampilanLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { push, query } = useRouter(); 
  const [error, setError] = useState("");

  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    const form = event.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      setIsLoading(false);
      setError("Password minimal 6 karakter");
      return;
    }

    try {
      // 3. Gunakan signIn dari Next-Auth menggantikan fetch manual
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      if (!res?.error) {
        // Jika Berhasil
        setIsLoading(false);
        push(callbackUrl);
      } else {
        // Jika Gagal (Cek error dari provider)
        setIsLoading(false);
        setError(res?.error || "Login failed");
      }
    } catch (err) {
      setIsLoading(false);
      setError("Network error, please try again");
    }
  };

  return (
    <div className={style.login}>
      <h1 className={style.login__title}>Halaman login</h1>

      {error && (
        <p
          style={{
            color: "white",
            backgroundColor: "#ff4d4d",
            padding: "10px",
            borderRadius: "5px",
            textAlign: "center",
            fontSize: "14px",
            marginBottom: "10px",
          }}
        >
          {error}
        </p>
      )}

      <div className={style.login__form}>
        <form onSubmit={handleSubmit}>
          <div className={style.login__form__item}>
            <label htmlFor="email" className={style.login__form__item__label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className={style.login__form__item__input}
              required
            />
          </div>

          <div className={style.login__form__item}>
            <label htmlFor="password" className={style.login__form__item__label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Min. 6 characters"
              className={style.login__form__item__input}
              required
            />
          </div>
          <button
            type="submit"
            className={style.login__form__item__button}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "login"}
          </button>
          <br /> <br />
          <button
            onClick={() => signIn("google", { callbackUrl, redirect: false })}
            className={style.login__form__item__button}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "sign in with google"}
          </button>
          <br /> <br />
          <button
            onClick={() => signIn("github", { callbackUrl, redirect: false })}
            className={style.login__form__item__button}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "sign in with github"}
          </button>
        </form>
        <br />
        <p className={style.login__form__item__text}>
          Belum punya akun? <Link href="/auth/register">Ke Halaman Register</Link>
        </p>
      </div>
    </div>
  );
};

export default TampilanLogin;
