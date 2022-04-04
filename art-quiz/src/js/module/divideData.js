import { images } from './images';
import { Settings } from '../view/setting/settings';

export class DivideData extends Settings {
  constructor() {
    super();
    this.chunk = 10;
    this.questionArtist = [];
    this.questionPictures = [];
    this.categoryQuestionArtist = [];
    this.categoryQuestionPictures = [];
    this.uniqueArtist = [];
    this.uniqueArtist2 = [];
    this.uniqueImage = [];
    this.imageArtistCategory = document.querySelectorAll('.item-image-artist');
    this.imageArtistCategory2 = document.querySelectorAll('.item-image-artist2');
  }

  getQuestion() {
    images.forEach((item, index) => {
      if (index >= 0 && index <= 119) {
        this.questionArtist.push(item);
      }
      if (index >= 120 && index <= 239) {
        this.questionPictures.push(item);
      }
    });
  }

  getCategory() {
    this.questionArtist.forEach((item, index) => {
      if (index < Math.ceil(this.questionArtist.length / this.chunk)) {
        this.categoryQuestionArtist.push(this.questionArtist.slice(index * this.chunk, index * this.chunk + this.chunk));
      }
    });
    this.questionPictures.forEach((item, index) => {
      if (index < Math.ceil(this.questionPictures.length / this.chunk)) {
        this.categoryQuestionPictures.push(this.questionPictures.slice(index * this.chunk, index * this.chunk + this.chunk));
      }
    });
  }

  getImageCategory(arr, elements) {
    let bgNum = arr.map((el) => el[0].imageNum);
    elements.forEach((item, index) => {
      const img = new Image();
      img.src = `https://raw.githubusercontent.com/andru12388/image-data/master/img/${bgNum[index]}.webp`;
      img.onload = () => {
        item.style.backgroundImage = `url(${img.src})`;
      };
    });
  }

  allAuthorArtistCat() {
    let artist = [];
    this.questionArtist.forEach((person, index) => {
      artist.push(this.questionArtist[index].author);
    });
    let set = new Set(artist);
    set.forEach((value) => {
      this.uniqueArtist.push(value);
    });
  }

  getRandomArrAnswer() {
    let randomArrAnswer = this.uniqueArtist.sort(() => Math.random() - Math.random()).slice(0, 6);
    let arrAnswer = [];
    arrAnswer.push(this.currentAuthor);
    for (const iterator of randomArrAnswer) {
      if (arrAnswer.length < 4) {
        if (iterator === this.currentAuthor) {
          continue;
        } else {
          arrAnswer.push(iterator);
        }
      }
    }
    return arrAnswer.sort(() => Math.random() - 0.5);
  }

  allUniqueImage() {
    let artist = Object.entries(images).map((item) => item[1]);
    this.uniqueArtist2 = artist.filter((person) => person.author !== this.currentAuthor);
    this.uniqueImage = this.uniqueArtist2.map((item) => item.imageNum);
  }

  getRandomArrAnswer2() {
    let randomArrAnswer = this.uniqueImage.sort(() => Math.random() - Math.random()).slice(0, 3);
    let arrAnswer = [];
    arrAnswer.push(this.currentNumImage);
    for (const iterator of randomArrAnswer) {
      if (arrAnswer.length < 4) {
        arrAnswer.push(iterator);
      }
    }
    return arrAnswer.sort(() => Math.random() - 0.5);
  }

  dataStart() {
    this.getQuestion();
    this.getCategory();
    this.allAuthorArtistCat();
    this.allUniqueImage();
    this.getImageCategory(this.categoryQuestionArtist, this.imageArtistCategory);
    this.getImageCategory(this.categoryQuestionPictures, this.imageArtistCategory2);
  }
}
