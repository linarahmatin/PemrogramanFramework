import { useRouter } from "next/router";

const halamanToko = () => {
  const { query } = useRouter();
  const { slug } = query;

  return (
    <div>
      <h1>Halaman Toko</h1>

      <p>
        Kategori: {Array.isArray(slug) ? slug[0] : "Semua Kategori"}
      </p>

      <p>
        Toko:{" "}
        {Array.isArray(slug) && slug.length > 1
          ? `${slug[0]}-${slug[1]}`
          : "-"}
      </p>
    </div>
  );
};

export default halamanToko;