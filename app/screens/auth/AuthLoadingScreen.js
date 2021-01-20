import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  Image,
  View,
} from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import Theme from '../../styles/Theme'
import Images from '../../assets/images';
import { Navigation } from '../../configs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

function AuthLoadingScreen(props) {
  const { navigation } = props;
  const reducer = useSelector(state => state);

  useEffect(() => {
    const { user } = reducer.user;
    let route;
    if (_.isEmpty(user)) {
      route = Navigation.AUTH;
    } else {
      route = Navigation.APP;
    }
    setTimeout(() => {
      navigation.navigate(route)
    }, 1000)
  }, [])

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        translucent
        backgroundColor="transparent"
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

export default AuthLoadingScreen;
