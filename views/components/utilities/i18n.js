import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';

i18n.use(Backend).use(LanguageDetector).init({
    backend: {
        loadPath: 'locales/{{lng}}/{{ns}}.json'
    },
    // we init with resources
    // resources: {
    //     en: {
    //         translations: {
    //             logout : 'Log Out',
    //             'Create an Offering': "Create an Offering"
    //         }
    //     },
    //     ru: {
    //         translations: {
    //             logout : 'Выйти',
    //             'Create an Offering': "Создать предложение"
    //         }
    //     }
    // },
    fallbackLng: "en",
    debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
        escapeValue: false, // not needed for react!!
        formatSeparator: ","
    },

    react: {
        wait: true
    }
});

export default i18n;
