import { DivideData } from '../../module/divideData';

export class QuizArtist extends DivideData {
  constructor() {
    super();
    this.roundAnswer = document.querySelectorAll('.round-answer');
    this.roundImage = document.querySelector('.round-image');
    this.popupImage = document.querySelector('.popup-picture');
    this.popupAuthor = document.querySelector('.popup-author');
    this.popupNamePicture = document.querySelector('.popup-name-picture');
    this.popupNameYears = document.querySelector('.popup-years');
    this.paginationItem = document.querySelectorAll('.pagination-item');
    this.popupResultNumber = document.querySelector('.popup-result-number');
    this.popupResult = document.querySelector('.popup-result');
    this.pageRoundArtist = document.querySelector('.round');
    this.timerQuestion = document.querySelector('.round-time');
    this.popupAnswer = document.querySelector('.popup-answer');
    this.popupIcon = document.querySelector('.popup-icon');
    this.scoreItem = document.querySelectorAll('.score-item');
    this.resultRoundQuiz = document.querySelectorAll('.result-round');
    this.removeFilterImage = null;
    this.removeDisplayNone = null;
    this.resultRound = null;
    this.currentRound = 0;
    this.currentNumImage = 0;
    this.currentAuthor = null;
    this.numQuestion = 0;
    this.currentYear = null;
    this.currentName = null;
    this.numberCurrentAnswer = 0;
    this.interval = null;
    this.counterImageScores = 0; // счетчик для картинок на странице 'Результат'
    this.paginationRound = null;
    this.arrayBooleanAnswer = []; // массив с ответами (Boolean), хранится в localStorage
    this.filterResult = []; // массив сыгранного раунда  (значение filter для картинок), хранится в localStorage
    this.displayNoneResult = []; // массив сыгранного раунда  (значение display для кнопок), хранится в localStorage
    this.correctAnswerResult = []; // массив сыгранного раунда  (значение кол. правил. ответов), хранится в localStorage
    this.dataStart();
    this.eventsSettings();
    this.audio.volume = localStorage.getItem('audio-volume');
  }

  getBooleanAnswer(arr) {
    let arrRound = arr[this.currentRound];
    this.currentNumImage = arrRound[this.numQuestion].imageNum;
    if (this.paginationRound.style.background === 'green') {
      this.arrayBooleanAnswer[this.currentNumImage] = 'true';
    } else if (this.paginationRound.style.background === 'red') {
      this.arrayBooleanAnswer[this.currentNumImage] = 'false';
    }
  }

  clearPagination() {
    this.paginationItem.forEach((clear) => {
      clear.style.background = 'none';
    });
  }

  // вывод фильтров после перезагрузки(localStorage)
  outputFilterResult() {
    this.imageArtistCategory.forEach((item, index) => {
      if (this.filterResult.length > index) {
        if (this.filterResult[index] === null) {
          item.style.filter = 'grayscale(100%)';
        } else {
          item.style.filter = 'grayscale(0%)';
        }
      }
    });
  }

  // вывод видимости кнопок(Результат) после перезагрузки(localStorage)
  outputDisplayNoneResult() {
    this.scoreItem.forEach((item, index) => {
      if (this.displayNoneResult.length > index) {
        if (this.displayNoneResult[index] === null) {
          item.style.display = 'none';
        } else {
          item.style.display = 'flex';
        }
      }
    });
  }

  // вывод кол. прав. ответов после перезагрузки(localStorage)
  outputCorrectAnswerResult() {
    this.resultRoundQuiz.forEach((item, index) => {
      if (this.correctAnswerResult.length > index) {
        if (this.correctAnswerResult[index] === null) {
          item.textContent = '';
        } else {
          item.textContent = `${this.correctAnswerResult[index]}`;
        }
      }
    });
  }

  saveResultQuiz() {
    let str = this.currentRound;
    this.filterResult[str] = 'grayscale(0%)';
    this.displayNoneResult[str] = 'flex';
    this.correctAnswerResult[str] = `${this.numberCurrentAnswer.toString()} / 10`;
  }

  timer() {
    let timerNum = this.inputTime.value;
    this.interval = setInterval(() => {
      this.timerQuestion.textContent = `00 :  ${timerNum.toString().padStart(2, '0')}`;
      timerNum--;
      if (timerNum === -1) {
        clearInterval(this.interval);
        this.popupAnswer.classList.add('popup-answer_active');
        this.popupIcon.style.background = 'url("./assets/svg/error_btn.svg") no-repeat 100% 100%';
        this.paginationItem[this.numQuestion].style.background = 'red';
        if (this.audio.volume > 0) {
          this.audioWrong.volume = this.audio.volume;
          this.audioWrong.play();
        }
      } else if (this.pageRoundArtist.classList.value === 'round') {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  answerRound() {
    this.roundAnswer.forEach((answer) => {
      answer.addEventListener('click', (event) => {
        this.paginationRound = event.target.parentNode.previousElementSibling.children[this.numQuestion];

        if (event.target.textContent === this.currentAuthor) {
          this.numberCurrentAnswer++;
          this.popupAnswer.classList.add('popup-answer_active');
          this.popupIcon.style.background = 'url("./assets/svg/correct_btn.svg") no-repeat 100% 100%';
          this.paginationRound.style.background = 'green';
          if (this.checkbox.checked === true) {
            clearInterval(this.interval);
          }
          if (this.audio.volume > 0) {
            this.audioCorrect.volume = this.audio.volume;
            this.audioCorrect.play();
          }
        } else {
          this.popupAnswer.classList.add('popup-answer_active');
          this.popupIcon.style.background = 'url("./assets/svg/error_btn.svg") no-repeat 100% 100%';
          this.paginationRound.style.background = 'red';
          if (this.checkbox.checked === true) {
            clearInterval(this.interval);
          }
          if (this.audio.volume > 0) {
            this.audioWrong.volume = this.audio.volume;
            this.audioWrong.play();
          }
        }
        this.getBooleanAnswer(this.categoryQuestionArtist);
      });
    });
  }

  getImageRoundArtist(arr) {
    try {
      let arrRound = arr[this.currentRound];
      this.currentNumImage = arrRound[this.numQuestion].imageNum;
      this.currentAuthor = arrRound[this.numQuestion].author;
      let answerHtml = this.getRandomArrAnswer();
      this.roundAnswer.forEach((answer, index) => {
        answer.textContent = answerHtml[index];
      });
      const img = new Image();
      img.src = `https://raw.githubusercontent.com/andru12388/image-data/master/full/${this.currentNumImage}full.webp`;
      img.onload = () => {
        this.roundImage.style.backgroundImage = `url(${img.src})`;
      };
    } catch (error) {
      return;
    }
  }

  getPicturePopup(arr) {
    try {
      let arrRound = arr[this.currentRound];
      this.currentNumImage = arrRound[this.numQuestion].imageNum;
      this.currentAuthor = arrRound[this.numQuestion].author;
      this.currentYear = arrRound[this.numQuestion].year;
      this.currentName = arrRound[this.numQuestion].name;
      const img = new Image();
      img.src = `https://raw.githubusercontent.com/andru12388/image-data/master/img/${this.currentNumImage}.webp`;
      img.onload = () => {
        this.popupImage.style.backgroundImage = `url(${img.src})`;
      };
      this.popupNamePicture.textContent = this.currentName;
      this.popupAuthor.textContent = this.currentAuthor;
      this.popupNameYears.textContent = `, ${this.currentYear}`;
    } catch (error) {
      this.numQuestion = 0;
      this.currentNumImage = 0;
      this.clearPagination();
      this.removeFilterImage.style.filter = 'grayscale(0%)';
      this.removeDisplayNone.style.display = 'flex';
      this.popupResultNumber.textContent = `${this.numberCurrentAnswer.toString()} / 10`;
      this.resultRound.textContent = `${this.numberCurrentAnswer.toString()} / 10`;
      this.saveResultQuiz();
      this.numberCurrentAnswer = 0;
      this.popupResult.classList.add('popup-result_active');
      this.pageRoundArtist.classList.remove('round_active');
      if (this.audio.volume > 0) {
        this.audioWin.volume = this.audio.volume;
        this.audioWin.play();
      }
      return;
    }
  }

  numberRound() {
    this.imageArtistCategory.forEach((item) => {
      item.onclick = (event) => {
        this.removeFilterImage = event.target;
        this.removeDisplayNone = event.target.nextElementSibling;
        this.resultRound = event.target.parentElement.previousElementSibling.children[1];
        let str = event.target.className.substring(event.target.className.length - 2);
        if (str[0] === '0') {
          str.substring(1);
        }
        this.currentRound = +str;
        this.getPicturePopup(this.categoryQuestionArtist);
        this.getImageRoundArtist(this.categoryQuestionArtist);
        if (this.checkbox.checked === true) {
          this.timer();
        } else {
          this.timerQuestion.textContent = '';
        }
        this.counterImageScores = 0;
        this.pageRoundArtist.classList.add('round_active');
      };
    });
  }

  nextMatter() {
    this.popupAnswer.classList.remove('popup-answer_active');
    this.numQuestion++;
    this.currentNumImage++;
    this.getPicturePopup(this.categoryQuestionArtist);
    this.getImageRoundArtist(this.categoryQuestionArtist);
    if (this.checkbox.checked === true) {
      this.timer();
    } else {
      this.timerQuestion.textContent = '';
    }
  }
}
