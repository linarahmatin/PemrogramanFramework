import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import fetcher from "../../utils/swr/fetcher";
import dynamic from "next/dynamic"; // 

// import TampilanProduk from "@/views/produk";

// ✅ ganti dengan dynamic import
const TampilanProduk = dynamic(() => import("@/views/produk"), {
  loading: () => <p>Loading produk...</p>,
});

const Kategori = () => {
  const router = useRouter();
  const isLogin = true;

  const { data, error, isLoading } = useSWR("/api/produk", fetcher);

  useEffect(() => {
    if (!isLogin) {
      router.push("/auth/login");
    }
  }, [isLogin, router]);

  if (!isLogin) return <p>Redirecting...</p>;

  return (
    <div>
      <TampilanProduk products={isLoading ? [] : data?.data || []} />
    </div>
  );
};

export default Kategori;
