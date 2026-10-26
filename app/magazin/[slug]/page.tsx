import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice, products } from "@/lib/data";
import AddToCartButton from "@/components/AddToCartButton";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.id }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.id === slug);
  if (!product) notFound();
  return <main className="container" style={{ padding: "80px 0" }}><Link href="/magazin" className="eyebrow">← Înapoi la magazin</Link><div className="product-detail"><div style={{ background: "#e8e2d9" }}><img src={product.image} alt={product.name} style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover" }} /></div><div style={{ alignSelf: "center" }}><p className="eyebrow">{product.category}</p><h1 style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", lineHeight: 1.05 }}>{product.name}</h1><p style={{ color: "#6e675e", lineHeight: 1.8 }}>{product.description}</p>{product.price ? <><strong style={{ display: "block", fontSize: 22, margin: "28px 0" }}>{formatPrice(product.price)}</strong><AddToCartButton product={product} /></> : <><p style={{ color: "#936c4d", margin: "28px 0" }}>Prețul se stabilește în funcție de proiect.</p><Link className="btn dark" href="/solicita-oferta">Solicită o ofertă</Link></>}<div className="line" style={{ marginTop: 36, paddingTop: 20, color: "#6e675e", fontSize: 13 }}>Dimensiuni și finisaje personalizabile. Livrarea se confirmă după evaluarea comenzii.</div></div></div></main>;
}
