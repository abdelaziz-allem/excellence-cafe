"use client";

import Link from "next/link";
import { useTransition } from "react";
import { deleteMenuItem, moveMenuItem, setMenuItemAvailable } from "@/app/dashboard/actions";
import { ConfirmButton } from "./ConfirmButton";

export function ItemRowActions({
  id,
  available,
  canMoveUp,
  canMoveDown,
}: {
  id: string;
  available: boolean;
  canMoveUp: boolean;
  canMoveDown: boolean;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-2">
      <label className="flex cursor-pointer items-center gap-2 text-xs text-mocha" title="Show on menu">
        <input
          type="checkbox"
          checked={available}
          disabled={pending}
          onChange={(e) => startTransition(() => setMenuItemAvailable(id, e.target.checked))}
          className="h-4 w-4 accent-gold"
        />
        On menu
      </label>
      {(canMoveUp || canMoveDown) && (
        <div className="flex">
          <button
            type="button"
            aria-label="Move up"
            disabled={!canMoveUp || pending}
            onClick={() => startTransition(() => moveMenuItem(id, "up"))}
            className="dash-btn rounded-r-none px-2"
          >
            ↑
          </button>
          <button
            type="button"
            aria-label="Move down"
            disabled={!canMoveDown || pending}
            onClick={() => startTransition(() => moveMenuItem(id, "down"))}
            className="dash-btn -ml-px rounded-l-none px-2"
          >
            ↓
          </button>
        </div>
      )}
      <Link href={`/dashboard/menu/${id}`} className="dash-btn">
        Edit
      </Link>
      <ConfirmButton onConfirm={() => deleteMenuItem(id)} confirmLabel="Sure?" />
    </div>
  );
}
