"use client";

import { useCart } from "@/lib/store";

export default function CartIndicator() {
  const count = useCart((state) => state.items.reduce((total, item) => total + item.quantity, 0));
  return <span className="cart-count" style={{ color: "#936c4d" }}>({count})</span>;
}
