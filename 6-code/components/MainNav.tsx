"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig, type NavItem } from "@/config/site";

type MainNavProps = {
  items?: NavItem[];
  className?: string;
  listClassName?: string;
  linkClassName?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  onLinkClick?: () => void;
  "aria-label"?: string;
};

function isActive(pathname: string, itemPath: string): boolean {
  if (itemPath === "/") {
    return pathname === "/";
  }
  return pathname === itemPath || pathname.startsWith(`${itemPath}/`);
}

export function MainNav({
  items = siteConfig.navItems,
  className = "",
  listClassName = "flex flex-wrap items-center gap-6",
  linkClassName = "",
  activeClassName = "",
  inactiveClassName = "",
  onLinkClick,
  "aria-label": ariaLabel,
}: MainNavProps) {
  const pathname = usePathname();

  return (
    <nav className={className} aria-label={ariaLabel}>
      <ul className={listClassName}>
        {items.map((item) => {
          const active = isActive(pathname, item.path);
          return (
            <li key={item.id}>
              <Link
                href={item.path}
                className={`${linkClassName} ${
                  active ? activeClassName : inactiveClassName
                }`}
                aria-current={active ? "page" : undefined}
                onClick={onLinkClick}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
