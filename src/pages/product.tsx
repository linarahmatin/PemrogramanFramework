import { useRouter } from "next/router";
import { useEffect } from "react";

const Product = () => {
  const router = useRouter();

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");

    if (!isLogin) {
      router.push("/login");
    }
  }, []);

  return <h1>Halaman Product</h1>;
};

export default Product;