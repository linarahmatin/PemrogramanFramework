import { useRouter } from "next/router";

export default function BlogDetail() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
      <h1>Halaman Blog</h1>
      <p>Slug: {slug}</p>
    </div>
  );
}
