import React from 'react';
import { StyleSheet, AppState, StatusBar, Platform, View } from 'react-native';
import _ from 'lodash';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { IphoneXHelper, NavigationService } from './util';
import Store from './util/Store';
import AppContainer from './containers/Router';

console.disableYellowBox = true;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: {
        state: AppState.currentState,
      },
    };
  }

  render() {
    return (
      <Provider store={Store.store}>
        <PersistGate loading={null} persistor={Store.persistor}>
          <AppContainer
            ref={
              (navigatorRef) =>
                NavigationService.setTopLevelNavigator(navigatorRef) // navigating-without-navigation-prop. ex: tap from notification
            }
          />
        </PersistGate>
      </Provider>
    );
  }
}
