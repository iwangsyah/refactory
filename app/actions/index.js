import _ from 'lodash';
import { Astorage } from '../util';
import { ActionTypes as types } from '../configs';

export default class Actions {
  static setUserLogin = (user) => {
    return {
      type: types.SET_USER_LOGIN,
      user
    };
  }

  static setUserLocation = (location) => {
    return {
      type: types.SET_USER_LOCATION,
      location
    };
  }

  static setLoginStory = (users) => {
    return {
      type: types.SET_LOGIN_STORY,
      users
    };
  }

  static setRegisteredUsers = (users) => {
    return {
      type: types.SET_REGISTERED_USERS,
      users
    };
  }
}
