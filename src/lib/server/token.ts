import { SignJWT, jwtVerify } from "jose";

// Kept free of next/headers so middleware can import it too
export type Session = { userId: string; name: string; email: string };

export const SESSION_COOKIE = "ec_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

const key = () => new TextEncoder().encode(process.env.SESSION_SECRET);

export async function encrypt(session: Session) {
  return new SignJWT(session)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(key());
}

export async function decrypt(token?: string): Promise<Session | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify<Session>(token, key(), { algorithms: ["HS256"] });
    return { userId: payload.userId, name: payload.name, email: payload.email };
  } catch {
    return null;
  }
}
