import Link from "next/link";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="bg-primary-dark text-text-inverse">
      <div className="mx-auto flex max-w-content flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between">
        <p className="font-heading text-base opacity-90">{siteConfig.siteName}</p>
        <nav aria-label="Навигация в подвале">
          <ul className="flex flex-wrap gap-6">
            {siteConfig.navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.path}
                  className="text-sm opacity-85 transition-opacity hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
