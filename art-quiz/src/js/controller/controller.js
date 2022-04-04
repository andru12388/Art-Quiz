import { QuizPictureScore } from '../view/artquiz/quizPictureScore';

export class AppController extends QuizPictureScore {
  constructor() {
    super();
    this.pageCategoryArtist = document.querySelector('.categories');
    this.pageCategoryArtist2 = document.querySelector('.categories2');
    this.nextQuestion = document.querySelector('.popup-next');
    this.nextQuestion2 = document.querySelector('.popup-next2');
    this.popupBackToCategory = document.querySelector('.popup-result-next');
    this.popupBackToHome = document.querySelector('.popup-result-home');
    this.backToHome = document.querySelectorAll('.back-to-home');
    this.backToCategory = document.querySelectorAll('.back-to-category');
    this.scores = document.querySelector('.scores');
  }

  runArtQuiz() {
    this.btnArtistsQuiz.addEventListener('click', () => {
      this.pageCategoryArtist.classList.add('categories_active');
      this.nextQuestion.style.display = 'block';
      this.nextQuestion2.style.display = 'none';
    });

    this.btnPicturesQuiz.addEventListener('click', () => {
      this.pageCategoryArtist2.classList.add('categories2_active');
      this.nextQuestion.style.display = 'none';
      this.nextQuestion2.style.display = 'block';
    });
  }

  btnNextQuestion() {
    this.nextQuestion.addEventListener('click', () => {
      this.nextMatter();
    });
  }

  btnNextQuestion2() {
    this.nextQuestion2.addEventListener('click', () => {
      this.nextMatter2();
    });
  }

  returnCategoryOrHome() {
    this.popupBackToCategory.addEventListener('click', () => {
      this.pageRoundArtist.classList.remove('round_active');
      this.pageRoundArtist2.classList.remove('round2_active');
      this.pageCategoryArtist.classList.add('categories_active');
      this.popupResult.classList.remove('popup-result_active');
      this.numQuestion = 0;
      this.currentNumImage = 0;
      this.clearPagination();
      this.clearPagination2();
    });

    this.popupBackToHome.addEventListener('click', () => {
      this.pageRoundArtist.classList.remove('round_active');
      this.pageRoundArtist2.classList.remove('round2_active');
      this.pageCategoryArtist.classList.remove('categories_active');
      this.pageCategoryArtist2.classList.remove('categories2_active');
      this.popupResult.classList.remove('popup-result_active');
      this.numQuestion = 0;
      this.currentNumImage = 0;
      this.clearPagination();
      this.clearPagination2();
    });
  }

  returnToHomeOrCategory() {
    this.backToHome.forEach((links) => {
      links.onclick = (e) => {
        e.preventDefault();
        this.pageRoundArtist.classList.remove('round_active');
        this.pageRoundArtist2.classList.remove('round2_active');
        this.pageCategoryArtist.classList.remove('categories_active');
        this.pageCategoryArtist2.classList.remove('categories2_active');
        this.scores.classList.remove('scores_active');
        this.numQuestion = 0;
        this.currentNumImage = 0;
        this.clearPagination();
        this.clearPagination2();
      };
    });

    this.backToCategory.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.pageRoundArtist.classList.remove('round_active');
        this.pageRoundArtist2.classList.remove('round2_active');
        this.pageCategoryArtist.classList.add('categories_active');
        this.scores.classList.remove('scores_active');
        this.numQuestion = 0;
        this.currentNumImage = 0;
        this.clearPagination();
        this.clearPagination2();
      });
    });
  }

  visibleScoresInfo() {
    this.scoresImage.forEach((item) => {
      item.addEventListener('click', (event) => {
        let currentBlock = event.target.nextElementSibling;
        currentBlock.classList.add('scores-info_active');
        currentBlock.onclick = () => {
          currentBlock.classList.remove('scores-info_active');
        };
      });
    });
  }

  outputImageScore() {
    this.scoreItem.forEach((item) => {
      item.addEventListener('click', (event) => {
        let nameScoresTitle = event.target.parentElement.previousElementSibling.children[0].innerText;
        let str = event.target.className.substring(event.target.className.length - 2);
        if (str[0] === '0') {
          str.substring(1);
        }
        this.currentScore = +str;
        this.scoresTitle.forEach((el) => (el.textContent = nameScoresTitle));
        this.outputScores();
        this.scores.classList.add('scores_active');
      });
    });
  }

  outputImageScore2() {
    this.scoreItem2.forEach((item) => {
      item.addEventListener('click', (event) => {
        let nameScoresTitle = event.target.parentElement.previousElementSibling.children[0].innerText;
        let str = event.target.className.substring(event.target.className.length - 2);
        if (str[0] === '0') {
          str.substring(1);
        }
        this.currentScore = +str;
        this.scoresTitle.forEach((el) => (el.textContent = nameScoresTitle));
        this.outputScores2();
        this.scores.classList.add('scores_active');
      });
    });
  }

  setLocalStorage() {
    localStorage.setItem('arrayBooleanAnswer', JSON.stringify(this.arrayBooleanAnswer));
    localStorage.setItem('arrayBooleanAnswer2', JSON.stringify(this.arrayBooleanAnswer2));
    localStorage.setItem('filterResult', JSON.stringify(this.filterResult));
    localStorage.setItem('filterResult2', JSON.stringify(this.filterResult2));
    localStorage.setItem('displayNoneResult', JSON.stringify(this.displayNoneResult));
    localStorage.setItem('displayNoneResult2', JSON.stringify(this.displayNoneResult2));
    localStorage.setItem('correctAnswerResult', JSON.stringify(this.correctAnswerResult));
    localStorage.setItem('correctAnswerResult2', JSON.stringify(this.correctAnswerResult2));
  }

  getLocalStorage() {
    if (localStorage.getItem('filterResult')) {
      this.filterResult = JSON.parse(localStorage.getItem('filterResult'));
      this.outputFilterResult();
    }
    if (localStorage.getItem('filterResult2')) {
      this.filterResult2 = JSON.parse(localStorage.getItem('filterResult2'));
      this.outputFilterResult2();
    }
    if (localStorage.getItem('displayNoneResult')) {
      this.displayNoneResult = JSON.parse(localStorage.getItem('displayNoneResult'));
      this.outputDisplayNoneResult();
    }
    if (localStorage.getItem('displayNoneResult2')) {
      this.displayNoneResult2 = JSON.parse(localStorage.getItem('displayNoneResult2'));
      this.outputDisplayNoneResult2();
    }
    if (localStorage.getItem('correctAnswerResult')) {
      this.correctAnswerResult = JSON.parse(localStorage.getItem('correctAnswerResult'));
      this.outputCorrectAnswerResult();
    }
    if (localStorage.getItem('correctAnswerResult2')) {
      this.correctAnswerResult2 = JSON.parse(localStorage.getItem('correctAnswerResult2'));
      this.outputCorrectAnswerResult2();
    }
    if (localStorage.getItem('arrayBooleanAnswer')) {
      this.arrayBooleanAnswer = JSON.parse(localStorage.getItem('arrayBooleanAnswer'));
      this.outputScores();
    }
    if (localStorage.getItem('arrayBooleanAnswer2')) {
      this.arrayBooleanAnswer2 = JSON.parse(localStorage.getItem('arrayBooleanAnswer2'));
      this.outputScores2();
    }
  }

  roundStart() {
    this.runArtQuiz();
    this.numberRound();
    this.answerRound();
    this.btnNextQuestion();
    this.returnCategoryOrHome();
    this.returnToHomeOrCategory();
    this.visibleScoresInfo();
    this.outputImageScore();
    this.numberRound2();
    this.answerRound2();
    this.outputImageScore2();
    this.btnNextQuestion2();
    window.addEventListener('beforeunload', () => {
      this.setLocalStorage();
    });
    window.addEventListener('load', () => {
      this.getLocalStorage();
    });
  }
}
