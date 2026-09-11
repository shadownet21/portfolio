import Image from "next/image";
export function BrandIcon({ brand, size = 20, className = "" }: { brand: "github" | "linkedin"; size?: number; className?: string }) {
  return <span className={`inline-flex shrink-0 ${className}`} aria-hidden="true">
    {brand === "github" ? <>
      <Image src="/images/brands/github-black.svg" alt="" width={size} height={size} className="github-light" unoptimized />
      <Image src="/images/brands/github-white.svg" alt="" width={size} height={size} className="github-dark" unoptimized />
    </> : <Image src="/images/brands/linkedin.png" alt="" width={size} height={size} className="object-contain" />}
  </span>;
}
