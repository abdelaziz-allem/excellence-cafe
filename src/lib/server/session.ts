import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, SESSION_MAX_AGE, decrypt, encrypt, type Session } from "./token";

export async function createSession(session: Session) {
  (await cookies()).set(SESSION_COOKIE, await encrypt(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function deleteSession() {
  (await cookies()).delete(SESSION_COOKIE);
}

export async function getSession() {
  return decrypt((await cookies()).get(SESSION_COOKIE)?.value);
}

// Server actions are public endpoints, so every mutation checks this itself
// rather than relying on the middleware redirect.
export async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/login");
  return session;
}
