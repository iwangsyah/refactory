import _ from 'lodash';
import AsyncStorage from '@react-native-community/async-storage'
import { StorageKey as key } from '../configs';

export default class Astorage {
  static getUserLogin = () => AsyncStorage.getItem(key.USERLOGIN);
  static setUserLogin = params => AsyncStorage.setItem(key.USERLOGIN, params);
}
