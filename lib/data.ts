export type Product = {
  id: string;
  name: string;
  category: string;
  price: number | null;
  image: string;
  description: string;
  tag?: string;
};

export const products: Product[] = [
  { id: "masa-nuc", name: "Masă Nuc Atelier", category: "Mese", price: 4850, image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85", description: "Masă cu blat din lemn masiv și bază sculpturală.", tag: "Bestseller" },
  { id: "credenza-linea", name: "Credenza Linea", category: "Comode", price: 3200, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85", description: "Depozitare elegantă, cu fronturi furniruite și detalii din alamă." },
  { id: "raft-modulo", name: "Raft Modulo", category: "Rafturi", price: 1680, image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=1200&q=85", description: "Sistem modular pentru obiectele care spun povestea casei tale." },
  { id: "fotoliu-arc", name: "Fotoliu Arc", category: "Scaune", price: 2450, image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=85", description: "Confort generos și tapițerie texturată, realizată la comandă." },
  { id: "masa-cafea", name: "Măsuță Form", category: "Living", price: 1290, image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1200&q=85", description: "Linii organice și finisaj natural pentru zona de relaxare." },
  { id: "biblioteca-nord", name: "Biblioteca Nord", category: "Living", price: null, image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=1200&q=85", description: "Proiect personalizat după spațiul și colecția ta." }
];

export const categories = ["Toate", "Mese", "Scaune", "Comode", "Rafturi", "Living"];

export const projects = [
  { title: "Casa cu lumină", category: "Bucătărie", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85", text: "Bucătărie calmă, desenată în jurul luminii naturale." },
  { title: "Apartament 48", category: "Living", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85", text: "Depozitare integrată și proporții care lasă spațiul să respire." },
  { title: "Dressing Atelier", category: "Dressing", image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1400&q=85", text: "Fiecare obiect își găsește locul într-o compoziție clară." }
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("ro-RO", { style: "currency", currency: "RON", maximumFractionDigits: 0 }).format(price);
