import { QuizPicture } from './quizPicture';

export class QuizPictureScore extends QuizPicture {
  scoresDataOfPicture2() {
    let author = [];
    let namePicture = [];
    let year = [];
    this.categoryQuestionPictures[this.currentScore].forEach((item) => {
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

  getPictureScores2(arr, n = 120) {
    this.scoresImage.forEach((item) => {
      item.style.filter = 'grayscale(100%)';
    });
    this.scoresDataOfPicture2();
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

  outputScores2() {
    this.counterImageScores = 0;
    for (let i = 0; i < 12; i++) {
      if (this.currentScore === i) this.getPictureScores2(this.arrayBooleanAnswer2, i * 10 + 120);
      continue;
    }
  }
}
