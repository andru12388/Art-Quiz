import { Settings } from './js/view/setting/settings';
import { DivideData } from './js/module/divideData';
import { AppController } from './js/controller/controller';
import './styles/main.sass';

const settings = new Settings();
settings.settingsStart();
const divideData = new DivideData();
divideData.dataStart();
const controller = new AppController();
controller.roundStart();
