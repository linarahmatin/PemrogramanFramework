// import { ProductType } from "@/types/Product.type";
import { ProductType } from "../../types/product.type";
import styles from "../detailproduct/detailProduct.module.scss";
import Image from "next/image";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

const DetailProduk = ({ products }: { products: ProductType }) => {
  return (
    <div className={`${styles.container} ${montserrat.className}`}>
      <h1 className={styles.mainTitle}>Detail Produk</h1>

      <div className={styles.produkdetail}>
        {/* IMAGE */}
        <div className={styles.produkdetail__image}>
          <Image
            src={products.image || "/placeholder.png"}
            alt={products.name || "Gambar Produk"}
            width={500}
            height={500}
            priority
            className={styles.produkdetail__image__img}
          />
        </div>

        {/* INFO */}
        <div className={styles.produkdetail__info}>
          <h1 className={styles.produkdetail__name}>
            {products.name || "Nama Produk"}
          </h1>

          <p className={styles.produkdetail__category}>
            {products.category || "Kategori"}
          </p>

          <p className={styles.produkdetail__price}>
            {products.price
              ? new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(products.price)
              : "Rp 0"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailProduk;