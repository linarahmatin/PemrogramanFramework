import styles from "./produk.module.scss";
import Link from "next/link";
import Image from "next/image";

type ProductType = {
  id: string; // Di gambar tertulis 'id' (berdasarkan penggunaan products.id)
  name: string;
  price: number;
  image: string;
  category: string;
};

// Di screenshot menggunakan nama 'products' bukan 'produk'
const TampilanProduk = ({ products }: { products: ProductType[] }) => {
  return (
    <div className={styles.produk}>
      <h1 className={styles.produk__title}>Daftar Produk</h1>
      <div className={styles.produk__content}>
        
        {/* Menggunakan Optional Chaining sesuai tanda panah merah pertama */}
        {products?.length > 0 ? (
          <>
            {/* Iterasi menggunakan nama variabel 'products' sesuai tanda panah kedua */}
            {products?.map((products: ProductType) => (
              <Link 
                href={`/produk/${products.id}`} 
                key={products.id} 
                className={styles.produk__content__item}
              >
                <div className={styles.produk__content__item__image}>
                  <Image 
                    src={products.image} 
                    alt={products.name} 
                    width={200} 
                    height={200} 
                  />
                </div>
                <h4 className={styles.produk__content__item__name}>
                  {products.name}
                </h4>
                {/* Bagian price dan category tidak terlihat detail di screenshot, 
                    namun tetap dipertahankan mengikuti struktur data */}
              </Link>
            ))}
          </>
        ) : (
          /* Bagian skeleton */
          <div className={styles.produk__content__skeleton}>
            <div className={styles.produk__content__skeleton__image}></div>
            <div className={styles.produk__content__skeleton__name}></div>
            <div className={styles.produk__content__skeleton__category}></div>
            <div className={styles.produk__content__skeleton__price}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TampilanProduk;