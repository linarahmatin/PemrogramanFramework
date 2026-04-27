import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// Pakai ./ karena foldernya ada di tingkat yang sama dengan file ini
import withAuth from "@/middleware/withAuth";

export function mainMiddleware(req: NextRequest) {
  return NextResponse.next();
}

export default withAuth(mainMiddleware, [
  "/admin",
  "/profile",
  "/produk",
  "/editor",
]);
