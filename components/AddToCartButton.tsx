"use client";

import { useState } from "react";
import type { Product } from "@/lib/data";
import { useCart } from "@/lib/store";

export default function AddToCartButton({ product }: { product: Product }) {
  const add = useCart((state) => state.add);
  const [added, setAdded] = useState(false);
  return <button className="btn dark" onClick={() => { add(product); setAdded(true); }}>{added ? "Adăugat în coș" : "Adaugă în coș"}</button>;
}
