import { QuizArtist } from './quizArtist';

export class QuizArtistScore extends QuizArtist {
  constructor() {
    super();
    this.scoresAuthor = document.querySelectorAll('.scores-author');
    this.scoresYears = document.querySelectorAll('.scores-years');
    this.scoresNameImage = document.querySelectorAll('.scores-name-image');
    this.scoresImage = document.querySelectorAll('.scores-image-artist');
    this.scoresTitle = document.querySelectorAll('.scores-title');
    this.currentScore = null;
  }

  scoresDataOfPicture() {
    let author = [];
    let namePicture = [];
    let year = [];
    this.categoryQuestionArtist[this.currentScore].forEach((item) => {
      author.push(item.author);
      namePicture.push(item.name);
      year.push(item.year);
    });
    this.scoresAuthor.forEach((items, index) => {
      items.textContent = author[index];
    });
    this.scoresYears.forEach((items, index) => {
      items.textContent = year[index];
    });
    this.scoresNameImage.forEach((items, index) => {
      items.textContent = namePicture[index];
    });
  }

  getPictureScores(arr, n = 0) {
    this.scoresImage.forEach((item) => {
      item.style.filter = 'grayscale(100%)';
    });
    this.scoresDataOfPicture();
    for (let i = n; i < n + 10; i++) {
      const img = new Image();
      img.src = `https://raw.githubusercontent.com/andru12388/image-data/master/img/${i}.webp`;
      this.scoresImage[this.counterImageScores].style.backgroundImage = `url(${img.src})`;
      if (arr[i] === 'true') {
        this.scoresImage[this.counterImageScores].style.filter = 'grayscale(0%)';
      }
      this.counterImageScores++;
    }
  }

  outputScores() {
    this.counterImageScores = 0;
    for (let i = 0; i < 12; i++) {
      if (this.currentScore === i) this.getPictureScores(this.arrayBooleanAnswer, i * 10);
      continue;
    }
  }
}
