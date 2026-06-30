export type NavItem = {
  id: string;
  label: string;
  path: string;
};

export type SiteConfig = {
  siteName: string;
  navItems: NavItem[];
};

export const siteConfig: SiteConfig = {
  siteName: "Юлия Медведева",
  navItems: [
    { id: "home", label: "Главная", path: "/" },
    { id: "about", label: "Обо мне", path: "/about" },
    { id: "services", label: "Услуги", path: "/services" },
    { id: "contact", label: "Контакты", path: "/contact" },
  ],
};
