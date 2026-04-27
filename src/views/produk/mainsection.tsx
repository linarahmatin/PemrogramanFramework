import styles from "./produk.module.css";

interface MainSectionProps {
  productId: string | string[] | undefined;
}

const MainSection = ({ productId }: MainSectionProps) => {
  return (
    <section className={styles.mainCard}>
      <div className={styles.badge}>Product Intelligence</div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Detail Informasi</h2>
      
      <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
        {productId ? (
          <div>
            <p className="text-gray-500 uppercase tracking-wider text-xs font-semibold">Identifikasi Produk</p>
            <p className="text-2xl font-mono font-black text-blue-700 mt-1">{productId}</p>
          </div>
        ) : (
          <p className="text-gray-500 italic text-center py-4">
            Silahkan pilih produk melalui daftar atau masukkan ID pada URL browser.
          </p>
        )}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-md">
          <span className="block font-bold text-blue-800">Status</span>
          <span className="text-sm text-blue-600">Tersedia</span>
        </div>
        <div className="p-4 bg-green-50 rounded-md">
          <span className="block font-bold text-green-800">Kualitas</span>
          <span className="text-sm text-green-600">Premium Grade</span>
        </div>
      </div>
    </section>
  );
};

export default MainSection;