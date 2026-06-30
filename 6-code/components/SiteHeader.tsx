import Link from "next/link";
import { siteConfig } from "@/config/site";
import { MainNav } from "@/components/MainNav";
import { MobileNavDrawer } from "@/components/MobileNavDrawer";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface shadow-header">
      <div className="mx-auto flex h-14 max-w-content items-center justify-between px-6 md:h-16">
        <Link
          href="/"
          className="font-heading text-lg text-primary transition-colors hover:text-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
        >
          {siteConfig.siteName}
        </Link>
        <MainNav
          className="hidden md:block"
          aria-label="Основная навигация"
          linkClassName="relative inline-block pb-1 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
          activeClassName="text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-accent after:content-['']"
          inactiveClassName="text-text hover:text-primary"
        />
        <MobileNavDrawer />
      </div>
    </header>
  );
}
