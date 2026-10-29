import Link from "next/link";
import { projects } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default function Portfolio() {
  return <main className="container" style={{ paddingTop: 80 }}><Reveal><p className="eyebrow">Lucrat cu intenție</p><h1 style={{ fontSize: 64, margin: "18px 0 65px" }}>Portofoliu <em className="accent-text">selectat.</em></h1></Reveal><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "70px 24px" }}>{projects.map((project, index) => <Reveal key={project.title} delay={index * 100}><Link href="/contact" className="project-card" style={{ display: "block", gridColumn: index === 1 ? "2" : "auto", marginTop: index === 1 ? 100 : 0 }}><div className="image-hover" style={{ height: index === 0 ? 570 : 440, background: `url(${project.image}) center/cover` }} /><p style={{ margin: "16px 0 4px", fontSize: 18 }}>{project.title}</p><p style={{ margin: 0, color: "#81786d", lineHeight: 1.6, maxWidth: 360 }}>{project.text}</p></Link></Reveal>)}</div></main>;
}
