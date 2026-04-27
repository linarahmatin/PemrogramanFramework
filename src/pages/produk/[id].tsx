import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ProductType } from "../../types/product.type";
import styles from "@/views/DetailProduct/detailProduct.module.scss";

const DetailProduk = () => {
  const { query } = useRouter();
  const { id } = query;

  const [product, setProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/produk/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data.data));
    }
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <h1>Detail Produk</h1>

      <div className={styles.produkdetail}>
        <div className={styles.produkdetail__image}>
          <img src={product.image} alt={product.name} />
        </div>

        <div className={styles.produkdetail__info}>
          <h1 className={styles.produkdetail__name}>{product.name}</h1>
          <p className={styles.produkdetail__category}>{product.category}</p>
          <p className={styles.produkdetail__price}>
            Rp {product.price?.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </>
  );
};

export default DetailProduk;