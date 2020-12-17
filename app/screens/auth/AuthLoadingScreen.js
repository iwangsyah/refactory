import React from 'react';
import { StyleSheet, View, Image, ActivityIndicator, StatusBar } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Theme from '../../styles/Theme'
import { Astorage } from '../../util';
import Images from '../../assets/images';

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

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Auth')
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

