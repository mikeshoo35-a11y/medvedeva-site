export type HomeCta = {
  label: string;
  path: string;
};

export type SegmentTeaser = {
  title: string;
  body: string;
};

export type HomePageContent = {
  consultantName: string;
  headline: string;
  subhead: string;
  geography: string;
  investorTeaser: SegmentTeaser;
  clinicOwnerTeaser: SegmentTeaser;
  portraitUrl: string | null;
  ctaPrimary: HomeCta;
  ctaSecondary: HomeCta[];
};

export const homePageContent: HomePageContent = {
  consultantName: "Юлия Медведева",
  headline: "Медико-бизнес эксперт",
  subhead: "ВРТ / ЭКО и клиники под ключ",
  geography: "Россия, Казахстан, Узбекистан",
  investorTeaser: {
    title: "Инвестор",
    body: "Клиника под ключ — безопасные инвестиции в медицинский бизнес",
  },
  clinicOwnerTeaser: {
    title: "Владелец клиники",
    body: "Запуск отделения ЭКО — от лаборатории до регуляторики",
  },
  portraitUrl: null,
  ctaPrimary: { label: "Связаться", path: "/contact" },
  ctaSecondary: [
    { label: "Обо мне", path: "/about" },
    { label: "Услуги", path: "/services" },
  ],
};
