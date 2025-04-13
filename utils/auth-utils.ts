import { ROUTES } from "@/constants/routes";
import { Role } from "@/enums/role.enum";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function requireAuth(redirectTo: string = ROUTES.AUTH.LOGIN) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(redirectTo);
  }

  return session;
}

export async function requireRole(
  role: string | string[],
  redirectTo: string = ROUTES.ROOT
) {
  const session = await requireAuth();

  if (Array.isArray(role)) {
    if (!role.includes(session.user.role)) {
      redirect(redirectTo);
    }
  } else if (session.user.role !== role) {
    redirect(redirectTo);
  }

  return session;
}

export async function requireAdmin(redirectTo: string = ROUTES.ROOT) {
  return requireRole(Role.ADMIN.toString(), redirectTo);
}
