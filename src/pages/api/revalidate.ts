import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  revalidated: boolean;
  message?: string;
};


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // ✅ handle query (biar tidak error array)
  const token = Array.isArray(req.query.token)
    ? req.query.token[0]
    : req.query.token;

  const data = Array.isArray(req.query.data)
    ? req.query.data[0]
    : req.query.data;

  // 🔐 validasi token
  if (!token || token !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({
      revalidated: false,
      message: "Insert correct token",
    });
  }

  try {
    if (data === "produk") {
      await res.revalidate("/produk/static");
    }

    return res.status(200).json({
      revalidated: true,
      message: "Revalidation success",
    });
  } catch (error) {
    console.error("Error in API route:", error);

    return res.status(500).json({
      revalidated: false,
      message: "Error during revalidation",
    });
  }
}