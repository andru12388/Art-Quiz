import { SettingsVolume } from './settingsVolume';

export class SettingsTranslate extends SettingsVolume {
  constructor() {
    super();
    this.textDeveloper = document.querySelector('.app-dev');
    this.settingTitleSetting = document.querySelector('.title-setting');
    this.settingTitleVolume = document.querySelector('.text-volume');
    this.settingTitleLang = document.querySelector('.text-lang');
    this.settingTitleTime = document.querySelector('.text-time');
    this.settingTitleAnswer = document.querySelector('.text-answer');
    this.clickOn = new Event('on.switch');
    this.clickOff = new Event('off.switch');
  }

  isChecked() {
    this.langChecked.addEventListener('click', () => {
      this.langChecked.classList.toggle('switch-on');
      if (this.langChecked.classList.contains('switch-on') === true) {
        this.langChecked.dispatchEvent(this.clickOn);
      } else {
        this.langChecked.dispatchEvent(this.clickOff);
      }
    });
  }

  isLangEn() {
    if (this.lang === 'en') {
      this.translationEnglish();
      this.langChecked.classList.toggle('switch-on');
    }
  }

  translationEnglish() {
    this.lang = 'en';
    this.btnArtistsQuiz.textContent = 'Artist quiz';
    this.btnPicturesQuiz.textContent = 'Pictures quiz';
    this.textDeveloper.textContent = 'App developer: Andrei Aliseyeu';
    this.settingTitleSetting.textContent = 'Settings';
    this.settingTitleVolume.textContent = 'Volume';
    this.settingTitleLang.textContent = 'Language';
    this.settingTitleTime.textContent = 'Time game';
    this.settingTitleAnswer.textContent = 'Time to answer';
    this.btnDefault.textContent = 'Default';
    this.btnSave.textContent = 'Save';
  }

  translationRussian() {
    this.lang = 'ru';
    this.btnArtistsQuiz.textContent = 'Художники';
    this.btnPicturesQuiz.textContent = 'Картины';
    this.textDeveloper.textContent = 'Разработчик приложения: Алисеев Андрей';
    this.settingTitleSetting.textContent = 'Настройки';
    this.settingTitleVolume.textContent = 'Громкость';
    this.settingTitleLang.textContent = 'Язык';
    this.settingTitleTime.textContent = 'Время в игре';
    this.settingTitleAnswer.textContent = 'Время на ответ';
    this.btnDefault.textContent = 'Сброс';
    this.btnSave.textContent = 'Сохранить';
  }

  translate() {
    this.langChecked.addEventListener('on.switch', () => {
      this.translationRussian();
    });
    this.langChecked.addEventListener('off.switch', () => {
      this.translationEnglish();
    });
  }
}
