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
      download: 'Download',
      stakeholders: 'Stakeholders',
      relations: 'Relations',
      results: 'Results',
      backToHomePage: 'Back to home page',
      chooseWay: 'Choose your way',
      uploadStakeholdersFile: 'Upload stakeholders file',
      uploadRelationsFile: 'Upload relations file',
      or: 'OR',
      stakeholdersDescription: 'You can create stakeholders by yourself or you can upload csv file',
      relationsDescription: 'You can create relations by yourself or you can upload csv file',
      pleaseAddStakeholdersFirst: 'Please add stakeholders first!',
      addStakeholder: 'Add stakeholder',
      stakeholderName: 'Name',
      stakeholderType: 'Type',
      actions: 'Actions',
      deleteTable: 'Delete table',
      downloadTableAsCsv: 'Download data as (.csv)',
      nextStep: 'Next',
      createStakeholders: 'Create stakeholders',
      createRelations: 'Create relations',
      from: 'From',
      to: 'To',
      relation: 'Relation',
      fontWeight: 'Font weight',
      relationType: 'Type',
      relationColor: 'Color',
      viewStakeholders: 'View stakeholders',
      viewRelations: 'View relations',
      updateRelation: 'Update relation',
      createRelation: 'Create relation',
      createStakeholder: 'Create stakeholder',
      pleaseAddRelations: 'Please add relations!',
      choose: 'Choose',
      noData: 'There are no data, create them first',
      stakeholderHasBeenCreated: 'Stakeholder has been created successfully',
      relationHasBeenCreated: 'Relation has been created successfully',
      stakeholderAlreadyExists: 'Stakeholder name already exists, enter unique name',
      fillInputs: 'Please fill the inputs',
      numberOnly: 'Number only',
      caution: 'Caution',
      youCannotCreateRelations: 'You cannot create relations before creating stakeholders',
      clickToGoBackToStakeholders:'Click here to go back to stakeholders page',
      add: 'Add',
      update: 'Update',
      updated:'Updated successfully',
      areYouSureToStart: 'Are you sure you want to start from the beginning?',
      noDataToDraw: 'There are no data to generate the diagram',
      pleaseFillSkAndRelations: 'Please fill stakeholders and relations to generate the diagram',
      red: 'Red',
      black: 'Black',
      brown: 'Brown',
      yellow: 'Yellow',
      blue: 'Blue',
      green: 'Green',
      orange:'Orange'

      
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
      download: "تحميل",
      stakeholders: 'اصحاب المصلحة',
      relations: 'العلاقات',
      results: 'النتائج',
      backToHomePage: 'العودة للصفحة الرئيسية',
      chooseWay: 'اختر الطريقة المناسبة',
      uploadStakeholdersFile: 'رفع ملف اصحاب المصلحة',
      uploadRelationsFile: 'رفع ملف العلاقات',
      or: 'أو',
      stakeholdersDescription: 'يمكنك إنشاء اصحاب المصلحة بنفسك وتعبئة البيانات او يمكنك رفع ملف بصيغة إكسل لقراءة البيانات والتعديل عليها      ',
      relationsDescription: 'يمكنك إنشاء العلاقات بنفسك وتعبئة البيانات او يمكنك رفع ملف بصيغة إكسل لقراءة البيانات والتعديل عليها      ',
      pleaseAddStakeholdersFirst: 'الرجاء اضافة اصحاب المصلحة اولا!',
      addStakeholder: 'اضافة صاحب مصلحة',
      stakeholderName: 'الاسم',
      stakeholderType: 'النوع',
      actions: 'خيارات',
      deleteTable: 'حذف الجدول',
      downloadTableAsCsv: 'تحميل البيانات بصيغة (.csv)',
      nextStep: 'التالي',
      createStakeholders: 'إنشاء صاحب مصلحة',
      createRelations: 'إنشاء علاقة',
      from: 'من',
      to: 'إلى',
      relation: 'العلاقة',
      fontWeight: 'وزن الحط',
      relationType: 'نوع العلاقة',
      relationColor: 'لون العلاقة',
      viewStakeholders: 'عرض اصحاب المصلحة',
      viewRelations: 'عرض العلاقات',
      updateRelation: 'تحديث العلاقة',
      createRelation:'إنشاء علاقة',
      createStakeholder: 'إنشاء صاحب مصلحة',
      pleaseAddRelations: 'الرجاء اضافة العلاقات!',
      choose:'إختر',
      noData: 'لا توجد بيانات, قم بإنشاؤها ',
      stakeholderHasBeenCreated: 'تم إنشاء صاحب المصلحة بنجاح',
      relationHasBeenCreated: 'تم إنشاء العلاقة بنجاح',
      stakeholderAlreadyExists: 'صاحب المصلحة موجود مسبقا, الرجاء ادخال اسم آخر',
      fillInputs:'قم بتعبئة حقول الإدخال',
      numberOnly:'رقم فقط',
      caution: 'تنبيه',
      youCannotCreateRelations: '*لا يمكنك انشاء العلاقات قبل ان تضيف اصحاب المصلحة',
      clickToGoBackToStakeholders:'اضغط هنا للعودة الى صفحة (اصحاب المصلحة)',
      add: 'إضافة',
      update: 'تحديث',
      updated: 'تم التحديث',
      areYouSureToStart: 'هل انت متأكد من البدء من جديد؟',
      noDataToDraw: 'لا توجد بيانات للرسم عليها',
      pleaseFillSkAndRelations: 'الرجاء تعبئة بيانات اصحاب المصلحة و العلاقات لإنشاء الرسمة',
      red: 'احمر',
      black: 'اسود',
      brown: 'بني',
      yellow: 'اصفر',
      blue: 'ازرق',
      green: 'اخضر',
      orange:'برتقالي'
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