import React from 'react';
import { StyleSheet, View, Image, ActivityIndicator, StatusBar } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import _ from 'lodash';
import { Store } from '../../util';
import Theme from '../../styles/Theme'
import Images from '../../assets/images';
import { Navigation } from '../../configs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.primaryColor,
  },
  image: {
    width: 200,
    height: 80
  },
  indicator: {
    position: 'absolute',
    zIndex: 2
  }
});

const FocusAwareStatusBar = withNavigationFocus(({ isFocused, ...rest }) =>
  isFocused ? <StatusBar {...rest} /> : null,
);

export default class AuthLoadingScreen extends React.Component {

  componentDidMount = () => {
    const { user } = Store.store.getState();
    let route;
    if (_.isEmpty(user)) {
      route = Navigation.AUTH;
    } else {
      route = Navigation.APP;
    }
    setTimeout(() => {
      this.props.navigation.navigate(route)
    }, 1000)
  }

  render() {
    return (
      <View style={styles.container}>
        <FocusAwareStatusBar
          translucent
          backgroundColor="red"
        />
        <ActivityIndicator
          size="large"
          style={styles.indicator}
        />
        <Image
          source={Images.icLogo}
          style={styles.image}
        />
      </View>
    );
  }
}

