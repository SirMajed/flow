import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      svn: "Stakeholders value network",
      landingBody: "To analyze stakeholders and relations",
      contributors: "Contributors",
      startNow: "Get started",
      contributorsToProject: "Contributors to this project",
      alhasin: 'Majed Alhasin',
      khayat: 'Abdulrahman Khayyat',
      baik: 'Murad Baik',
      alhazmi: 'Abdullah Alhazmi',
      ghuraibi: 'Ryan Alghuraibi',
      softwareEngineer: 'Software Engineer',
      back: 'Back',
      finalDiagram:'Final diagram',
      filterStakeholders:'Filter stakeholders',
      filterRelations:'Filter relations',
      startOver: 'Start over',
      download: 'Download'
    }
  },
  ar: {
    translation: {
      svn: "شبكة أصحاب المصلحة",
      landingBody: "لتحليل أصحاب المصلحة و العلاقات",
      contributors: "المساهمين",
      startNow: "إبدأ الآن",
      contributorsToProject: "المساهمين في بناء هذا المشروع",
      alhasin: 'ماجد الحاسن',
      khayat: 'عبدالرحمن خياط',
      baik: 'مراد بيك',
      alhazmi: 'عبدالله الحازمي',
      ghuraibi: 'ريان الغريبي',
      softwareEngineer: 'مهندس برمجيات',
      back: 'العودة',
      finalDiagram:'الرسمة النهائية',
      filterStakeholders:'تصفية اصحاب المصلحة',
      filterRelations:'تصفية العلاقات',
      startOver: "البدء من جديد",
      download: "تحميل"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "ar", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;