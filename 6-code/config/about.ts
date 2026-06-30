export type TrustFigure = {
  label: string;
  description: string;
};

export type AboutCta = {
  label: string;
  path: string;
};

export type AboutPageContent = {
  consultantName: string;
  positioningHeadline: string;
  positioningSubhead: string;
  specialization: string;
  portraitUrl: string | null;
  trustFigures: TrustFigure[];
  backgroundTitle: string;
  backgroundNarrative: string;
  missionTitle: string;
  missionStatement: string;
  geographyTitle: string;
  geography: string;
  ctaServices: AboutCta;
  ctaContact: AboutCta;
};

export const aboutPageContent: AboutPageContent = {
  consultantName: "Юлия Медведева",
  positioningHeadline: "Международный медико-бизнес эксперт",
  positioningSubhead: "CEO / управляющий партнёр, 10+ лет",
  specialization: "ВРТ / ЭКО",
  portraitUrl: null,
  trustFigures: [
    {
      label: "10+ лет",
      description: "Руководство клиниками как CEO и управляющий партнёр",
    },
    {
      label: "Под ключ",
      description: "Полный цикл запуска клиники до окупаемости",
    },
    {
      label: "№1 ниша",
      description: "ЭКО/ВРТ и эмбриологические лаборатории",
    },
    {
      label: "Международно",
      description: "Лицензирование по подходам СНГ и Европы",
    },
  ],
  backgroundTitle: "Биография",
  backgroundNarrative:
    "Путь от врача-репродуктолога к управляющему партнёру и CEO частных клиник. Соединяю клинические стандарты с управленческой дисциплиной: перевожу медицинские решения в понятные бизнес-метрики — P&L, EBITDA и ROI — для инвесторов и владельцев клиник.",
  missionTitle: "Миссия",
  missionStatement:
    "Превращать сильные медицинские идеи в высокомаржинальный бизнес, где качество лечения и прибыльность усиливают друг друга.",
  geographyTitle: "География проектов",
  geography:
    "Работаю с проектами в России, Казахстане и Узбекистане. Опираюсь на европейские подходы к организации ВРТ/ЭКО и лицензированию — без англоязычного интерфейса для клиентов.",
  ctaServices: { label: "Услуги", path: "/services" },
  ctaContact: { label: "Связаться", path: "/contact" },
};
