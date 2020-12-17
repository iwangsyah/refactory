import React from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from 'react-navigation-stack';
import * as Screen from '../screens';
import Images from '../assets/images';
import { Theme, BottomTabBar } from '../styles';
import { Navigation } from '../configs';
import { NavigationService, IphoneXHelper } from '../util';

const HomeNavigation = createStackNavigator(
  {
    [Navigation.HOME]: Screen.Home,
  },
  {
    headerMode: Navigation.HOME,
    defaultNavigationOptions: ({ navigation }) => ({
      header: null,
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }),
    navigationOptions: ({ navigation }) => ({
      headerVisible: false,
      tabBarVisible: navigation.state.index <= 0,
    }),
  },
);


const BottomNavigationHome = createBottomTabNavigator(
  {
    [Navigation.HOME]: {
      screen: HomeNavigation,
    },
  },
  {
    tabBarComponent: ({ navigation }) => (
      <SafeAreaView style={{ backgroundColor: Theme.bgPrimaryColor, height: IphoneXHelper.isIphoneX() ? 76 : 56 }}>
        <View style={BottomTabBar.container}>
          <Ripple
            style={{
              flex: 1,
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            rippleCentered
            onPress={() => navigation.navigate(Navigation.HOME)}>
            <Image
              style={{
                width: 25,
                height: 25,
                tintColor:
                  navigation.state.index == 0
                    ? Theme.primaryColor
                    : Theme.teritaryColor,
              }}
              source={Images.icHome}
            />
          </Ripple>
          <Ripple
            style={{
              flex: 1,
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            rippleCentered
            onPress={() => { }}>
            <Image
              style={{
                width: 25,
                height: 25,
                tintColor:
                  navigation.state.index == 1
                    ? Theme.primaryColor
                    : Theme.teritaryColor,
              }}
              source={Images.icHistory}
            />
          </Ripple>
          <Ripple
            style={{
              flex: 1,
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            rippleCentered
            onPress={() => { }}>
            <Image
              style={{
                width: 25,
                height: 25,
                tintColor:
                  navigation.state.index == 2
                    ? Theme.primaryColor
                    : Theme.teritaryColor,
              }}
              source={Images.icSetting}
            />
          </Ripple>
        </View>
      </SafeAreaView>
    ),
    initialRouteName: Navigation.HOME,
    tabBarOptions: {
      activeTintColor: Theme.primaryColor,
      inactiveTintColor: Theme.teritaryColor,
      style: BottomTabBar.container,
      labelStyle: BottomTabBar.label,
    },
    transitionConfig: () => ({
      // screenInterpolator: StackViewStyleInterpolator.forHorizontal,
    }),
  },
);

const AppStack = createStackNavigator(
  {
    Home: BottomNavigationHome,
  },
  {
    headerMode: Navigation.HOME,
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const AuthStack = createStackNavigator(
  {
    [Navigation.LOGIN]: {
      screen: Screen.Login,
    },
    [Navigation.REGISTER]: {
      screen: Screen.Register,
    },
  },
  {
    headerMode: Navigation.LOGIN,
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const Routes = createSwitchNavigator(
  {
    AuthLoading: Screen.AuthLoadingScreen,
    Auth: AuthStack,
    App: AppStack,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const AppContainer = createAppContainer(Routes);

export default AppContainer;
