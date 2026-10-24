"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useState } from "react";
import { saveMenuItem, type FormState } from "@/app/dashboard/actions";

type Variant = { key: number; name: string; price: string };

export type MenuItemFormValues = {
  id?: string;
  name: string;
  description: string;
  categoryId: string;
  price: string;
  image: string | null;
  available: boolean;
  variants: { name: string; price: string }[];
};

let nextKey = 0;
const row = (name = "", price = ""): Variant => ({ key: nextKey++, name, price });

export function MenuItemForm({
  item,
  categories,
}: {
  item: MenuItemFormValues;
  categories: { id: string; name: string }[];
}) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveMenuItem, {});
  const [pricing, setPricing] = useState<"single" | "variants">(
    item.variants.length ? "variants" : "single",
  );
  const [variants, setVariants] = useState<Variant[]>(() =>
    item.variants.length
      ? item.variants.map((v) => row(v.name, v.price))
      : [row("Single"), row("Double")],
  );
  const [preview, setPreview] = useState<string | null>(null);
  const [removeImage, setRemoveImage] = useState(false);

  useEffect(() => () => void (preview && URL.revokeObjectURL(preview)), [preview]);

  const shownImage = preview ?? (removeImage ? null : item.image);
  const updateVariant = (key: number, patch: Partial<Variant>) =>
    setVariants((vs) => vs.map((v) => (v.key === key ? { ...v, ...patch } : v)));

  return (
    <form
      // Dispatch manually so React doesn't reset the fields (and chosen photo) on a validation error
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        startTransition(() => action(formData));
      }}
      className="grid gap-8 lg:grid-cols-[1fr_280px]"
    >
      {item.id && <input type="hidden" name="id" value={item.id} />}
      <input type="hidden" name="pricing" value={pricing} />

      <div className="space-y-6 rounded-lg border border-sand bg-white p-6">
        <label className="block">
          <span className="dash-label">Name</span>
          <input name="name" required defaultValue={item.name} className="dash-input mt-1.5" />
        </label>

        <label className="block">
          <span className="dash-label">Category</span>
          <select
            name="categoryId"
            required
            defaultValue={item.categoryId}
            className="dash-input mt-1.5"
          >
            <option value="" disabled>
              Choose a category…
            </option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="dash-label">Description</span>
          <textarea
            name="description"
            rows={3}
            defaultValue={item.description}
            placeholder="Optional — shown under the name on the menu"
            className="dash-input mt-1.5"
          />
        </label>

        <fieldset>
          <legend className="dash-label">Price (USD)</legend>
          <div className="mt-2 inline-flex rounded-md border border-sand p-0.5 text-sm">
            {(
              [
                ["single", "One price"],
                ["variants", "Sizes / options"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setPricing(value)}
                className={`rounded px-3 py-1.5 ${
                  pricing === value ? "bg-espresso text-ivory" : "text-mocha hover:bg-cream"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {pricing === "single" ? (
            <input
              name="price"
              type="number"
              step="0.01"
              min="0"
              required
              defaultValue={item.price}
              placeholder="0.00"
              aria-label="Price"
              className="dash-input mt-3 max-w-40"
            />
          ) : (
            <div className="mt-3 space-y-2">
              {variants.map((v) => (
                <div key={v.key} className="flex gap-2">
                  <input
                    name="variantName"
                    value={v.name}
                    onChange={(e) => updateVariant(v.key, { name: e.target.value })}
                    placeholder="e.g. Large"
                    aria-label="Variant name"
                    className="dash-input"
                  />
                  <input
                    name="variantPrice"
                    type="number"
                    step="0.01"
                    min="0"
                    value={v.price}
                    onChange={(e) => updateVariant(v.key, { price: e.target.value })}
                    placeholder="0.00"
                    aria-label="Variant price"
                    className="dash-input max-w-32"
                  />
                  <button
                    type="button"
                    aria-label="Remove variant"
                    disabled={variants.length === 1}
                    onClick={() => setVariants((vs) => vs.filter((x) => x.key !== v.key))}
                    className="dash-btn px-3"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setVariants((vs) => [...vs, row()])}
                className="dash-btn"
              >
                + Add option
              </button>
            </div>
          )}
        </fieldset>

        <label className="flex items-center gap-2.5 text-sm text-roast">
          <input
            type="checkbox"
            name="available"
            defaultChecked={item.available}
            className="h-4 w-4 accent-gold"
          />
          Show on the public menu
        </label>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border border-sand bg-white p-6">
          <span className="dash-label">Photo</span>
          <div className="relative mt-3 aspect-square overflow-hidden rounded-md bg-cream">
            {shownImage ? (
              // eslint-disable-next-line @next/next/no-img-element -- blob: previews can't go through next/image
              <img src={shownImage} alt="" className="h-full w-full object-cover" />
            ) : (
              <span className="flex h-full items-center justify-center text-xs uppercase tracking-wider text-latte">
                No photo
              </span>
            )}
          </div>
          <input
            type="file"
            name="image"
            accept="image/*,.heic,.heif"
            onChange={(e) => {
              const file = e.target.files?.[0];
              setPreview(file ? URL.createObjectURL(file) : null);
              if (file) setRemoveImage(false);
            }}
            className="mt-3 block w-full text-xs text-mocha file:mr-3 file:rounded-md file:border file:border-sand file:bg-white file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-roast hover:file:bg-gold-50"
          />
          <p className="mt-2 text-xs text-latte">JPG, PNG, WebP or HEIC up to 8 MB.</p>
          {item.image && !preview && (
            <label className="mt-3 flex items-center gap-2 text-xs text-mocha">
              <input
                type="checkbox"
                name="removeImage"
                checked={removeImage}
                onChange={(e) => setRemoveImage(e.target.checked)}
                className="accent-gold"
              />
              Remove current photo
            </label>
          )}
        </div>

        {state.error && (
          <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {state.error}
          </p>
        )}
        <div className="flex gap-2">
          <button type="submit" disabled={pending} className="dash-btn dash-btn-primary flex-1">
            {pending ? "Saving…" : item.id ? "Save changes" : "Create item"}
          </button>
          <Link href="/dashboard/menu" className="dash-btn">
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
}
