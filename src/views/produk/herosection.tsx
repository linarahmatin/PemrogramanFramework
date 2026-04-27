import styles from "./produk.module.css";

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <h1 className={styles.heroTitle}>Promo Spesial Bulan Ini!</h1>
      <p className="text-blue-100 text-lg">
        Temukan produk impian Anda dengan penawaran yang tidak masuk akal.
      </p>
      <button className="mt-6 bg-white text-blue-600 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition">
        Lihat Katalog
      </button>
    </section>
  );
};

export default HeroSection;