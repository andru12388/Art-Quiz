export class SettingsVolume {
  constructor() {
    this.menuSetting = document.querySelectorAll('.home-settings');
    this.btnArtistsQuiz = document.querySelector('.artists-quiz');
    this.btnPicturesQuiz = document.querySelector('.pictures-quiz');
    this.settingPage = document.querySelector('.settings');
    this.settingPageClose = document.querySelector('.menu-btn');
    this.settingPageClose2 = document.querySelector('.menu-btn2');
    this.progressWidth = document.querySelector('.progress-width');
    this.btnMute = document.querySelector('.btn-mute');
    this.btnUnmute = document.querySelector('#btn-unmute');
    this.volumeLevel = document.querySelector('#volume');
    this.langChecked = document.querySelector('.switch-btn');
    this.checkbox = document.getElementById('input-check1');
    this.inputTime = document.getElementById('input-time');
    this.btnDefault = document.querySelector('.settings-default');
    this.btnSave = document.querySelector('.settings-save');
    this.textSave = document.querySelector('.text-save');

    this.audio = new Audio();
    this.audioCorrect = new Audio();
    this.audioWrong = new Audio();
    this.audioWin = new Audio();
    this.audioCorrect.src = './assets/audio/correct-answer.mp3';
    this.audioWrong.src = './assets/audio/wrong-answer.mp3';
    this.audioWin.src = './assets/audio/win-round.mp3';
    this.lang = 'ru';
    this.audio.muted = true;
    this.audio.volume = 0;
  }

  soundClick() {
    this.volumeLevel.addEventListener('click', () => {
      this.audio.src = './assets/audio/click.mp3';
      this.audio.play();
    });
  }

  audioVolume() {
    if (this.volumeLevel.value <= 0) {
      this.btnMute.classList.add('hidden');
      this.btnUnmute.classList.remove('hidden');
      this.audio.muted = true;
    } else {
      this.btnMute.classList.remove('hidden');
      this.btnUnmute.classList.add('hidden');
      this.audio.muted = false;
    }
    let volumeControl = this.volumeLevel.value;
    this.audio.volume = volumeControl / 100;
  }

  updateVolume() {
    if (!this.audio.muted) {
      this.btnMute.classList.add('hidden');
      this.btnUnmute.classList.remove('hidden');
      this.audio.volume = 0;
      this.volumeLevel.value = `${this.audio.volume}`;
      this.volumeLevel.style.background = 'linear-gradient(to right, #FFBCA2 0%, #FFBCA2 0%, #c4c4c4 0%, #c4c4c4 100%)';
      this.audio.muted = true;
    } else {
      this.btnMute.classList.remove('hidden');
      this.btnUnmute.classList.add('hidden');
      this.volumeLevel.value = this.audio.volume * 100;
      this.volumeLevel.style.background = `linear-gradient(to right, #FFBCA2 ${this.volumeLevel.value}%, #FFBCA2 ${this.volumeLevel.value}%, #c4c4c4 0%, #c4c4c4 100%)`;
      this.audio.muted = false;
    }
  }
}
