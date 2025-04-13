import User from "@/components/custom-ui/user";
import { buttonVariants } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const mySession = await getServerSession(authOptions);
  const isAdmin = mySession?.user?.role === "ADMIN";

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-8 bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold">Hoş Geldiniz</h1>

        {mySession ? (
          <>
            <div className="bg-blue-50 p-4 rounded-md w-full text-center">
              <p className="font-medium">
                Merhaba, {mySession.user.name || mySession.user.email}!
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {isAdmin
                  ? "Admin hesabıyla giriş yaptınız."
                  : "Kullanıcı hesabıyla giriş yaptınız."}
              </p>
            </div>

            {isAdmin && (
              <Link
                className={buttonVariants({ variant: "default" })}
                href="/admin"
              >
                Admin Paneline Git
              </Link>
            )}

            <div className="w-full">
              <h2 className="text-xl font-semibold mb-2">Kullanıcı Oturumu</h2>
              <User />
            </div>
          </>
        ) : (
          <>
            <p className="text-center">
              Sistemi kullanmak için lütfen giriş yapın.
            </p>
            <div className="flex gap-4">
              <Link
                className={buttonVariants({ variant: "default" })}
                href="/sign-in"
              >
                Giriş Yap
              </Link>
              <Link
                className={buttonVariants({ variant: "outline" })}
                href="/sign-up"
              >
                Kayıt Ol
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
