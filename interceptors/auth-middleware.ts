import { ENDPOINTS } from "@/constants/endpoints";
import { ROUTES } from "@/constants/routes";
import { Role } from "@/enums/role.enum";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const publicPaths = [
    ROUTES.AUTH.LOGIN,
    ROUTES.AUTH.SIGN_UP,
    ENDPOINTS.API.SIGN_UP,
  ];
  const isPublicPath = publicPaths.some(
    (publicPath) => path === publicPath || path.startsWith(publicPath)
  );

  if (path.startsWith(ENDPOINTS.API.API_AUTH)) {
    return NextResponse.next();
  }

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session && !isPublicPath) {
    const url = new URL(ROUTES.AUTH.LOGIN, req.url);
    url.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(url);
  }

  if (session && (path === ROUTES.AUTH.LOGIN || path === ROUTES.AUTH.SIGN_UP)) {
    return NextResponse.redirect(new URL(ROUTES.ROOT, req.url));
  }

  if (
    path.startsWith(ROUTES.ADMIN.BASE) &&
    session?.role !== Role.ADMIN.toString()
  ) {
    return NextResponse.redirect(new URL(ROUTES.ROOT, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
