"use client";

import { useEffect, useState, useTransition } from "react";

// Two-step delete: first click arms the button, second click runs the action.
export function ConfirmButton({
  onConfirm,
  label = "Delete",
  confirmLabel = "Confirm delete",
}: {
  onConfirm: () => Promise<unknown>;
  label?: string;
  confirmLabel?: string;
}) {
  const [armed, setArmed] = useState(false);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!armed) return;
    const t = setTimeout(() => setArmed(false), 4000);
    return () => clearTimeout(t);
  }, [armed]);

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => (armed ? startTransition(async () => void (await onConfirm())) : setArmed(true))}
      className={`dash-btn ${armed ? "!border-red-600 !bg-red-600 !text-white" : "text-red-700"}`}
    >
      {pending ? "Deleting…" : armed ? confirmLabel : label}
    </button>
  );
}
