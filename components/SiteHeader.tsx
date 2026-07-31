import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="w-full max-w-md mx-auto px-4 pt-6 flex flex-col items-center gap-1">
      <Link
        href="/"
        className="flex items-center gap-2 group"
      >
        <div className="w-9 h-9 rounded-[14px] bg-[#1e1f23] ring-1 ring-[#2b2c31] flex items-center justify-center group-hover:ring-[#8ab4f8]/40 transition-all">
          <img src="/logo.svg" alt="Sill" className="w-5 h-5" />
        </div>
        <span className="text-sm font-semibold text-foreground tracking-tight">
          Sill
        </span>
      </Link>
    </header>
  );
}