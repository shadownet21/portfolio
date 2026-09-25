import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function NotFoundContent() {
  return <main className="container-shell grid min-h-screen place-items-center py-20 text-center"><div><p className="eyebrow">Erreur 404 · Error 404</p><h1 className="section-title mt-4">Page introuvable · Page not found</h1><p className="muted mt-4">Cette page n’existe pas ou a été déplacée.<br />This page does not exist or has been moved.</p><Link href="/fr" className="button-primary mt-8"><ArrowLeft size={18} aria-hidden="true" />Accueil · Home</Link></div></main>;
}
