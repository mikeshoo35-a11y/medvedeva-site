export type ServicePillarId = "turnkey" | "ivf-launch" | "audit";

export type AudienceSegmentId = "investor" | "clinic-owner" | "star-doctor";

export type SegmentProminence = "primary" | "supporting";

export type ServicePillar = {
  id: ServicePillarId;
  title: string;
  description: string;
  offerings: string[];
};

export type AudienceSegment = {
  id: AudienceSegmentId;
  title: string;
  prominence: SegmentProminence;
  profile: string;
  painPoints: string[];
  linkedPillarIds: ServicePillarId[];
};

export type ServicesPageContent = {
  pageTitle: string;
  intro: string;
  pillars: ServicePillar[];
  segments: AudienceSegment[];
  ctaContact: { label: string; path: string };
};

export const servicesPageContent: ServicesPageContent = {
  pageTitle: "Услуги",
  intro:
    "Консалтинг для инвесторов и владельцев клиник: безопасность инвестиций, скорость запуска и опытное сопровождение, которое помогает избежать дорогостоящих ошибок на каждом этапе.",
  pillars: [
    {
      id: "turnkey",
      title: "Клиника под ключ",
      description:
        "Полный цикл запуска частной клиники — от концепции и бизнес-модели до лицензирования, оснащения, подбора команды и планируемой окупаемости.",
      offerings: [
        "Концепция и финансовая модель",
        "Лицензирование и регуляторика",
        "Подбор оборудования и проектный надзор",
        "Формирование команды и операционный старт",
      ],
    },
    {
      id: "ivf-launch",
      title: "Запуск направления ЭКО/ВРТ",
      description:
        "Развёртывание репродуктологического направления: эмбриологическая лаборатория, чистые зоны, лицензии, квоты и операционная готовность.",
      offerings: [
        "Проектирование эмбриологической лаборатории",
        "Организация чистых зон по СанПиН",
        "Лицензирование и квоты",
        "Запуск операционных процессов",
      ],
    },
    {
      id: "audit",
      title: "Аудит и сопровождение",
      description:
        "Экспертная проверка и сопровождение решений: аудит бизнес-плана, прейскуранта, подбор оборудования и надзор за проектом.",
      offerings: [
        "Аудит бизнес-плана",
        "Аудит прейскуранта",
        "Подбор и верификация оборудования",
        "Проектный надзор и консультации",
      ],
    },
  ],
  segments: [
    {
      id: "investor",
      title: "Инвестор",
      prominence: "primary",
      profile: "Инвестор из непрофильной сферы, который рассматривает медицинский бизнес как актив.",
      painPoints: [
        "СанПиН, лицензирование и регуляторные риски",
        "Ошибки при выборе оборудования и подрядчиков",
        "Недостаток отраслевого опыта для оценки сроков окупаемости",
      ],
      linkedPillarIds: ["turnkey", "audit"],
    },
    {
      id: "clinic-owner",
      title: "Владелец клиники",
      prominence: "primary",
      profile: "Владелец действующей клиники, который хочет вырасти за счёт репродуктологии.",
      painPoints: [
        "Потолок выручки без направления ЭКО/ВРТ",
        "Сложность запуска эмбриологической лаборатории",
        "Ошибки в прейскуранте и экономике процедур",
      ],
      linkedPillarIds: ["ivf-launch", "audit"],
    },
    {
      id: "star-doctor",
      title: "Врач-эксперт",
      prominence: "supporting",
      profile:
        "Практикующий врач с сильной клинической репутацией, который ищет путь к собственной клинике.",
      painPoints: [
        "Как превратить экспертизу в бизнес с партнёром-инвестором",
        "Какие этапы запуска клиники требуют управленческой поддержки",
      ],
      linkedPillarIds: ["turnkey"],
    },
  ],
  ctaContact: { label: "Связаться", path: "/contact" },
};

export function getPillarById(
  pillars: ServicePillar[],
  id: ServicePillarId,
): ServicePillar | undefined {
  return pillars.find((pillar) => pillar.id === id);
}
