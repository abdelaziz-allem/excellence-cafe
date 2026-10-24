"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useState, useTransition } from "react";
import {
  deleteCategory,
  moveCategory,
  saveCategory,
  type FormState,
} from "@/app/dashboard/actions";
import { ConfirmButton } from "./ConfirmButton";

type CategoryValues = {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  note: string;
  itemCount: number;
};

function CategoryForm({
  category,
  onDone,
}: {
  category?: CategoryValues;
  onDone: () => void;
}) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveCategory, {});

  useEffect(() => {
    if (state.ok) onDone();
  }, [state, onDone]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        startTransition(() => action(formData));
      }}
      className="grid gap-4 sm:grid-cols-2"
    >
      {category && <input type="hidden" name="id" value={category.id} />}
      <label className="block">
        <span className="dash-label">Name</span>
        <input name="name" required defaultValue={category?.name} className="dash-input mt-1.5" />
      </label>
      <label className="block">
        <span className="dash-label">Link name</span>
        <input
          name="slug"
          defaultValue={category?.slug}
          placeholder="Generated from the name"
          className="dash-input mt-1.5"
        />
      </label>
      <label className="block">
        <span className="dash-label">Subtitle</span>
        <input
          name="subtitle"
          defaultValue={category?.subtitle}
          placeholder="e.g. Served daily 7:30 – 11:30 AM"
          className="dash-input mt-1.5"
        />
      </label>
      <label className="block">
        <span className="dash-label">Highlighted note</span>
        <input
          name="note"
          defaultValue={category?.note}
          placeholder="e.g. 20% off before 9:30 AM"
          className="dash-input mt-1.5"
        />
      </label>
      {state.error && (
        <p role="alert" className="text-sm text-red-700 sm:col-span-2">
          {state.error}
        </p>
      )}
      <div className="flex gap-2 sm:col-span-2">
        <button type="submit" disabled={pending} className="dash-btn dash-btn-primary">
          {pending ? "Saving…" : category ? "Save" : "Create category"}
        </button>
        <button type="button" onClick={onDone} className="dash-btn">
          Cancel
        </button>
      </div>
    </form>
  );
}

export function NewCategory() {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="dash-btn dash-btn-primary">
        + New category
      </button>
    );
  }
  return (
    <div className="w-full rounded-lg border border-gold-300 bg-white p-6">
      <CategoryForm onDone={() => setOpen(false)} />
    </div>
  );
}

export function CategoryRow({
  category,
  isFirst,
  isLast,
}: {
  category: CategoryValues;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string>();
  const [pending, startMove] = useTransition();

  if (editing) {
    return (
      <li className="bg-gold-50/50 p-6">
        <CategoryForm category={category} onDone={() => setEditing(false)} />
      </li>
    );
  }

  return (
    <li className="flex flex-wrap items-center gap-4 px-4 py-3 sm:flex-nowrap">
      <div className="flex">
        <button
          type="button"
          aria-label="Move up"
          disabled={isFirst || pending}
          onClick={() => startMove(() => moveCategory(category.id, "up"))}
          className="dash-btn rounded-r-none px-2"
        >
          ↑
        </button>
        <button
          type="button"
          aria-label="Move down"
          disabled={isLast || pending}
          onClick={() => startMove(() => moveCategory(category.id, "down"))}
          className="dash-btn -ml-px rounded-l-none px-2"
        >
          ↓
        </button>
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-espresso">{category.name}</p>
        <p className="truncate text-xs text-mocha">
          /menu#{category.slug}
          {category.subtitle && ` · ${category.subtitle}`}
        </p>
        {error && <p className="mt-1 text-xs text-red-700">{error}</p>}
      </div>
      <Link
        href={`/dashboard/menu?category=${category.id}`}
        className="text-sm text-gold-700 hover:underline"
      >
        {category.itemCount} item{category.itemCount === 1 ? "" : "s"}
      </Link>
      <div className="flex gap-2">
        <button type="button" onClick={() => setEditing(true)} className="dash-btn">
          Edit
        </button>
        <ConfirmButton
          confirmLabel="Sure?"
          onConfirm={async () => setError((await deleteCategory(category.id)).error)}
        />
      </div>
    </li>
  );
}
