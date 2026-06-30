export type ContactFieldLabels = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export type ContactValidationMessages = {
  nameRequired: string;
  emailRequired: string;
  emailInvalid: string;
  messageRequired: string;
};

export type ContactPageContent = {
  title: string;
  intro: string;
  fieldLabels: ContactFieldLabels;
  submitLabel: string;
  successMessage: string;
  errorMessage: string;
  validation: ContactValidationMessages;
};

export const contactPageContent: ContactPageContent = {
  title: "Контакты",
  intro:
    "Оставьте заявку на консультацию — для инвесторов, владельцев клиник и ведущих врачей, которые планируют запуск или развитие направления ВРТ/ЭКО.",
  fieldLabels: {
    name: "Имя",
    email: "Email",
    phone: "Телефон",
    message: "Сообщение",
  },
  submitLabel: "Отправить",
  successMessage: "Заявка отправлена. Мы свяжемся с вами в ближайшее время.",
  errorMessage:
    "Не удалось отправить заявку. Проверьте подключение и попробуйте ещё раз.",
  validation: {
    nameRequired: "Укажите имя",
    emailRequired: "Укажите email",
    emailInvalid: "Укажите корректный email",
    messageRequired: "Укажите сообщение",
  },
};
