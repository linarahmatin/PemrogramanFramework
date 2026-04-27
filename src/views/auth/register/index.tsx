import Link from "next/link";
import style from "../../auth/register/register.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";

const TampilanRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const fullname = formData.get("fullname") as string;
    const password = formData.get("password") as string;

    // --- VALIDASI CLIENT SIDE ---
    if (password.length < 6) {
      setIsLoading(false);
      setError("Password minimal 6 karakter");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, fullname, password }),
      });

      const result = await response.json();

      if (response.status === 200) {
        form.reset();
        setIsLoading(false);
        push("/auth/login");
      } else {
        setIsLoading(false);
        // Mengambil pesan error langsung dari API (message dari signUp)
        setError(result.name || "An error occurred");
      }
    } catch (err) {
      setIsLoading(false);
      setError("Network error, please try again");
    }
  };

  return (
    <div className={style.register}>
      <h1 className={style.register__title}>Halaman Register</h1>
      
      {/* MENAMPILKAN PESAN ERROR */}
      {error && (
        <p style={{ 
          color: "white", 
          backgroundColor: "#ff4d4d", 
          padding: "10px", 
          borderRadius: "5px",
          textAlign: "center",
          fontSize: "14px",
          marginBottom: "10px" 
        }}>
          {error}
        </p>
      )}

      <div className={style.register__form}>
        <form onSubmit={handleSubmit}>
          <div className={style.register__form__item}>
            <label htmlFor="email" className={style.register__form__item__label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className={style.register__form__item__input}
              required // VALIDASI WAJIB (HTML5)
            />
          </div>
          <div className={style.register__form__item}>
            <label htmlFor="fullname" className={style.register__form__item__label}>
              Fullname
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Fullname"
              className={style.register__form__item__input}
              required // VALIDASI WAJIB (HTML5)
            />
          </div>
          <div className={style.register__form__item}>
            <label htmlFor="password" className={style.register__form__item__label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Min. 6 characters"
              className={style.register__form__item__input}
              required // VALIDASI WAJIB (HTML5)
            />
          </div>
          <button
            type="submit"
            className={style.register__form__item__button}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
        <br />
        <p className={style.register__form__item__text}>
          Sudah punya akun? <Link href="/auth/login">Ke Halaman Login</Link>
        </p>
      </div>
    </div>
  );
};

export default TampilanRegister;