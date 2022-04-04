import { QuizArtistScore } from './quizArtistScore';

export class QuizPicture extends QuizArtistScore {
  constructor() {
    super();
    this.scoreItem2 = document.querySelectorAll('.score-item2');
    this.imageArtistCategory2 = document.querySelectorAll('.item-image-artist2');
    this.pageCategoryArtist2 = document.querySelector('.categories2');
    this.pageRoundArtist2 = document.querySelector('.round2');
    this.roundImage2 = document.querySelectorAll('.round-img');
    this.nameAuthorPicture2 = document.querySelector('.name-author');
    this.nextQuestion2 = document.querySelector('.popup-next2');
    this.timerQuestion2 = document.querySelector('.round-time2');
    this.paginationItem2 = document.querySelectorAll('.pagination-item2');
    this.resultRoundQuiz2 = document.querySelectorAll('.result-round2');
    this.interval2 = null;
    this.arrayBooleanAnswer2 = [];
    this.filterResult2 = []; // массив сыгранного раунда  (значение filter для картинок), хранится в localStorage
    this.displayNoneResult2 = []; // массив сыгранного раунда  (значение display для кнопок), хранится в localStorage
    this.correctAnswerResult2 = []; // массив сыгранного раунда  (значение кол. правил. ответов), хранится в localStorage
  }

  clearPagination2() {
    this.paginationItem2.forEach((clear) => {
      clear.style.background = 'none';
    });
  }

  // вывод фильтров после перезагрузки(localStorage)
  outputFilterResult2() {
    this.imageArtistCategory2.forEach((item, index) => {
      if (this.filterResult2.length > index) {
        if (this.filterResult2[index] === null) {
          item.style.filter = 'grayscale(100%)';
        } else {
          item.style.filter = 'grayscale(0%)';
        }
      }
    });
  }

  // вывод видимости кнопок(Результат) после перезагрузки(localStorage)
  outputDisplayNoneResult2() {
    this.scoreItem2.forEach((item, index) => {
      if (this.displayNoneResult2.length > index) {
        if (this.displayNoneResult2[index] === null) {
          item.style.display = 'none';
        } else {
          item.style.display = 'flex';
        }
      }
    });
  }

  // вывод кол. прав. ответов после перезагрузки(localStorage)
  outputCorrectAnswerResult2() {
    this.resultRoundQuiz2.forEach((item, index) => {
      if (this.correctAnswerResult2.length > index) {
        if (this.correctAnswerResult2[index] === null) {
          item.textContent = '';
        } else {
          item.textContent = `${this.correctAnswerResult2[index]}`;
        }
      }
    });
  }

  saveResultQuiz2() {
    let str = this.currentRound;
    this.filterResult2[str] = 'grayscale(0%)';
    this.displayNoneResult2[str] = 'flex';
    this.correctAnswerResult2[str] = `${this.numberCurrentAnswer.toString()} / 10`;
  }

  timer2() {
    let timerNum = this.inputTime.value;
    this.interval2 = setInterval(() => {
      this.timerQuestion2.textContent = `00 :  ${timerNum.toString().padStart(2, '0')}`;
      timerNum--;
      if (timerNum === -1) {
        clearInterval(this.interval2);
        this.popupAnswer.classList.add('popup-answer_active');
        this.popupIcon.style.background = 'url("./assets/svg/error_btn.svg") no-repeat 100% 100%';
        this.paginationItem2[this.numQuestion].style.background = 'red';
        if (this.audio.volume > 0) {
          this.audioWrong.volume = this.audio.volume;
          this.audioWrong.play();
        }
      } else if (this.pageRoundArtist2.classList.value === 'round2') {
        clearInterval(this.interval2);
      }
    }, 1000);
  }

  getBooleanAnswer2(arr) {
    let arrRound = arr[this.currentRound];
    this.currentNumImage = arrRound[this.numQuestion].imageNum;
    if (this.paginationRound.style.background === 'green') {
      this.arrayBooleanAnswer2[this.currentNumImage] = 'true';
    } else if (this.paginationRound.style.background === 'red') {
      this.arrayBooleanAnswer2[this.currentNumImage] = 'false';
    }
  }

  getImageRoundArtist2(arr) {
    try {
      let arrRound = arr[this.currentRound];
      this.currentNumImage = arrRound[this.numQuestion].imageNum;
      this.currentAuthor = arrRound[this.numQuestion].author;
      this.nameAuthorPicture2.textContent = this.currentAuthor;
      this.allUniqueImage();
      let answerHtml = this.getRandomArrAnswer2();
      this.roundImage2.forEach((elem, index) => {
        elem.setAttribute('num', `${answerHtml[index]}`);
        const img = new Image();
        img.src = `https://raw.githubusercontent.com/andru12388/image-data/master/img/${answerHtml[index]}.webp`;
        img.onload = () => {
          elem.style.backgroundImage = `url(${img.src})`;
        };
      });
    } catch (error) {
      return;
    }
  }

  getPicturePopup2(arr) {
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
      this.clearPagination2();
      this.removeFilterImage.style.filter = 'grayscale(0%)';
      this.removeDisplayNone.style.display = 'flex';
      this.popupResultNumber.textContent = `${this.numberCurrentAnswer.toString()} / 10`;
      this.resultRound.textContent = `${this.numberCurrentAnswer.toString()} / 10`;
      this.saveResultQuiz2();
      this.numberCurrentAnswer = 0;
      this.popupResult.classList.add('popup-result_active');
      this.pageRoundArtist2.classList.remove('round2_active');
      if (this.audio.volume > 0) {
        this.audioWrong.volume = this.audio.volume;
        this.audioWin.play();
      }
      return;
    }
  }

  numberRound2() {
    this.imageArtistCategory2.forEach((item) => {
      item.onclick = (event) => {
        this.removeFilterImage = event.target;
        this.removeDisplayNone = event.target.nextElementSibling;
        this.resultRound = event.target.parentElement.previousElementSibling.children[1];
        let str = event.target.className.substring(event.target.className.length - 2);
        if (str[0] === '0') {
          str.substring(1);
        }
        this.currentRound = +str;
        this.getPicturePopup2(this.categoryQuestionPictures);
        this.getImageRoundArtist2(this.categoryQuestionPictures);
        if (this.checkbox.checked === true) {
          this.timer2();
        } else {
          this.timerQuestion2.textContent = '';
        }
        this.counterImageScores = 0;
        this.pageRoundArtist2.classList.add('round2_active');
      };
    });
  }

  answerRound2() {
    this.roundImage2.forEach((answer) => {
      answer.addEventListener('click', (event) => {
        this.paginationRound = event.target.parentElement.nextElementSibling.children[this.numQuestion];

        if (event.target.getAttribute('num') === this.currentNumImage) {
          this.numberCurrentAnswer++;
          this.popupAnswer.classList.add('popup-answer_active');
          this.popupIcon.style.background = 'url("./assets/svg/correct_btn.svg") no-repeat 100% 100%';
          this.paginationRound.style.background = 'green';
          if (this.checkbox.checked === true) {
            clearInterval(this.interval2);
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
            clearInterval(this.interval2);
          }
          if (this.audio.volume > 0) {
            this.audioWrong.volume = this.audio.volume;
            this.audioWrong.play();
          }
        }
        this.getBooleanAnswer2(this.categoryQuestionPictures);
      });
    });
  }

  nextMatter2() {
    this.popupAnswer.classList.remove('popup-answer_active');
    this.numQuestion++;
    this.currentNumImage++;
    this.getPicturePopup2(this.categoryQuestionPictures);
    this.getImageRoundArtist2(this.categoryQuestionPictures);
    if (this.checkbox.checked === true) {
      this.timer2();
    } else {
      this.timerQuestion2.textContent = '';
    }
  }
}
