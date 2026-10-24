"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/server/db";
import { createSession, deleteSession } from "@/lib/server/session";

export type LoginState = { error?: string; email?: string };

export async function login(_: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const from = String(formData.get("from") ?? "");

  if (!email || !password) return { error: "Enter your email and password.", email };

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return { error: "Incorrect email or password.", email };
  }

  await createSession({ userId: user.id, name: user.name, email: user.email });
  // Only follow same-site dashboard paths
  redirect(from.startsWith("/dashboard") ? from : "/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
