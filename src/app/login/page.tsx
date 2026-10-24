import type { Metadata } from "next";
import { LogoMark } from "@/components/Logo";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-espresso px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center text-gold-200">
          <LogoMark className="mx-auto h-14 w-auto" />
          <p className="mt-4 font-display text-2xl text-ivory">Excellence Café</p>
          <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-gold-300">
            Dashboard
          </p>
        </div>
        <div className="mt-10 bg-ivory p-8">
          <LoginForm from={from} />
        </div>
      </div>
    </main>
  );
}
