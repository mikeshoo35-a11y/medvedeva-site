"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { MainNav } from "@/components/MainNav";

function MenuIcon() {
  return (
    <svg
      width="20"
      height="14"
      viewBox="0 0 20 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M0 1H20" stroke="currentColor" strokeWidth="2" />
      <path d="M0 7H20" stroke="currentColor" strokeWidth="2" />
      <path d="M0 13H20" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function MobileNavDrawer() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const close = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) {
        return;
      }

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      );

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    const firstLink = panelRef.current?.querySelector<HTMLElement>("a[href]");
    firstLink?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        className="rounded-sm p-3 text-primary transition-colors hover:text-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label="Меню навигации"
        onClick={() => setOpen((value) => !value)}
      >
        <MenuIcon />
      </button>

      {open ? (
        <>
          <div
            role="presentation"
            className="fixed inset-0 z-40 bg-primary-dark/40 transition-opacity"
            onClick={close}
          />
          <div
            id={panelId}
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Мобильная навигация"
            className="fixed inset-y-0 right-0 z-50 w-60 max-w-[calc(100%-5rem)] bg-surface shadow-lg transition-transform duration-250 ease-out"
          >
            <MainNav
              className="px-6 py-8"
              listClassName="flex flex-col gap-4"
              aria-label="Мобильная навигация"
              linkClassName="block text-base font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
              activeClassName="text-primary font-semibold"
              inactiveClassName="text-text hover:text-primary"
              onLinkClick={close}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
