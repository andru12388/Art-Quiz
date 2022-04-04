import { SettingsTranslate } from './settingTranslate';

export class Settings extends SettingsTranslate {
  setLocalStorage() {
    localStorage.setItem('input-time', this.inputTime.value);
    localStorage.setItem('box-checked', this.checkbox.checked);
    localStorage.setItem('audio-volume', this.audio.volume);
    localStorage.setItem('lang-user', this.lang);
  }

  getLocalStorage() {
    if (localStorage.getItem('audio-volume')) {
      this.audio.volume = localStorage.getItem('audio-volume');
      this.volumeLevel.value = this.audio.volume * 100;
      this.updateVolume();
      this.audioVolume();
    }
    if (localStorage.getItem('input-time')) {
      this.inputTime.value = localStorage.getItem('input-time');
    }
    if (localStorage.getItem('box-checked')) {
      let isChecked = JSON.parse(localStorage.getItem('box-checked'));
      this.checkbox.checked = isChecked;
      this.checkboxCheck();
    }
    if (localStorage.getItem('lang-user')) {
      this.lang = localStorage.getItem('lang-user');
      this.isLangEn();
    }
  }

  defaultSettings() {
    localStorage.clear();
    if (this.lang === 'en') {
      this.langChecked.classList.toggle('switch-on');
      this.translationRussian();
    }
    this.audio.volume = 0;
    this.audio.muted = true;
    this.updateVolume();
    this.audioVolume();
    this.inputTime.value = '5';
    this.checkbox.checked = false;
    this.checkboxCheck();
  }

  outputTextSaved() {
    if (this.lang === 'en') {
      this.textSave.textContent = 'Saved!';
      this.textSave.style.opacity = '1';
      setTimeout(() => {
        this.textSave.style.opacity = '0';
        this.textSave.style.transition = 'opacity 0.5s ease';
        this.textSave.textContent = '';
      }, 1000);
    } else {
      this.textSave.textContent = 'Сохранено!';
      this.textSave.style.opacity = '1';
      setTimeout(() => {
        this.textSave.style.opacity = '0';
        this.textSave.style.transition = 'opacity 0.5s ease';
        this.textSave.textContent = '';
      }, 1000);
    }
  }

  checkboxCheck() {
    const btnTickets = document.querySelectorAll('.btn-tickets');
    if (this.checkbox.checked === true) {
      this.inputTime.disabled = false;
      btnTickets.forEach((item) => {
        item.disabled = false;
      });
    } else if (this.checkbox.checked === false) {
      this.inputTime.disabled = true;
      btnTickets.forEach((item) => {
        item.disabled = true;
      });
    }
  }

  eventsSettings() {
    this.progressWidth.addEventListener('input', function () {
      const value = this.value;
      this.style.background = `linear-gradient(to right, #FFBCA2 0%, #FFBCA2 ${value}%, #c4c4c4 ${value}%, white 100%)`;
    });

    this.btnMute.addEventListener('click', () => {
      this.updateVolume();
    });
    this.btnUnmute.addEventListener('click', () => {
      this.updateVolume();
    });
    this.volumeLevel.addEventListener('input', () => {
      this.audioVolume();
    });
    this.checkbox.addEventListener('click', () => {
      this.checkboxCheck();
    });
    this.btnDefault.addEventListener('click', () => {
      this.defaultSettings();
    });
    this.btnSave.addEventListener('click', () => {
      this.setLocalStorage();
      this.outputTextSaved();
    });
    this.settingPageClose.onclick = (e) => {
      e.preventDefault();
      this.settingPage.classList.remove('settings_active');
    };

    this.settingPageClose2.onclick = (e) => {
      e.preventDefault();
      this.settingPage.classList.remove('settings_active');
    };
    this.menuSetting.forEach((icons) => {
      icons.onclick = (e) => {
        e.preventDefault();
        this.settingPage.classList.add('settings_active');
      };
    });
  }

  settingsStart() {
    this.soundClick();
    this.translate();
    this.isChecked();
    this.isLangEn();
    this.eventsSettings();
    window.addEventListener('beforeunload', () => {
      this.setLocalStorage();
    });
    window.addEventListener('load', () => {
      this.getLocalStorage();
    });
  }
}
