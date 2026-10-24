"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

export function LoginForm({ from }: { from?: string }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="from" value={from ?? ""} />
      <label className="block">
        <span className="dash-label">Email</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={state.email}
          className="dash-input mt-1.5"
        />
      </label>
      <label className="block">
        <span className="dash-label">Password</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="dash-input mt-1.5"
        />
      </label>
      {state.error && (
        <p role="alert" className="text-sm text-red-700">
          {state.error}
        </p>
      )}
      <button type="submit" disabled={pending} className="btn-gold w-full disabled:opacity-60">
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
