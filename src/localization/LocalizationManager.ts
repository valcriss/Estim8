const fs = require('fs');

class LocalizationManager {
  en: any;
  fr: any;

  constructor() {
    const enContent = fs.readFileSync('./locales/en.json', 'utf8');
    this.en = enContent ? JSON.parse(enContent) : {};
    const frContent = fs.readFileSync('./locales/fr.json', 'utf8');
    this.fr = frContent ? JSON.parse(frContent) : {};
  }

  getTranslation(key: string): string {
    const lang = this.getLanguageFromBrowser();
    if (lang === 'fr') {
      return this.fr[key] || key;
    } else {
      return this.en[key] || key;
    }
  }

  private getLanguageFromBrowser(): string {
    try {
      const lang = navigator.language;
      if (lang.includes('-')) {
        return lang.split('-')[0].toLowerCase();
      } else {
        return lang.toLowerCase();
      }
    } catch (error) {
      console.error('Error detecting browser language:', error);
      return 'en';
    }
  }
}

export default new LocalizationManager()