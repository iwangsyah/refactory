/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  View,
  Text
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Navigation, ActionTypes as types } from '../../configs';
import { Button, NavBar } from '../../components';
import Images from '../../assets/images';
import { Theme } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.bgPrimaryColor,
  },
  userContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#F6F6F6',
    borderBottomWidth: 12,
    padding: 20,
  },
  itemContainer: {
    flex: 1,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lineSeparator: {
    height: 1,
    backgroundColor: '#E8E8E8',
  },
  contentSeparator: {
    height: 10,
    backgroundColor: '#F6F6F6',
  },
});


const KEYFAQ = 'KEYFAQ';
const KEYABOUTUS = 'KEYABOUTUS';
const KEYCONTACTUS = 'KEYCONTACTUS';

function Profile(props) {
  const { navigation } = props;
  const reducer = useSelector(state => state);
  const dispatch = useDispatch();
  const listGeneral = [
    { key: KEYFAQ, title: 'FAQ', image: Images.icHelp },
    { key: KEYABOUTUS, title: 'About Us', image: Images.icAbout },
    { key: KEYCONTACTUS, title: 'Contact Us', image: Images.icPhone }
  ];

  const _setUserLogin = (user) => {
    dispatch({ type: types.SET_USER_LOGIN, user });
  }

  const _onClickGeneral = (data) => {
    switch (data) {
      case KEYFAQ:
        navigation.navigate(Navigation.FAQ);
        break;
      case KEYABOUTUS:
        navigation.navigate(Navigation.ABOUTUS);
        break;
      case KEYCONTACTUS:
        navigation.navigate(Navigation.CONTACTUS);
        break;
      default:
        break;
    }
  }

  const renderUser = () => {
    const { user } = reducer.user;
    return (
      <View style={{ alignItems: 'center', marginVertical: 16 }}>
        <Image
          source={{ isStatic: true, uri: user.imageUri }}
          style={{ width: 100, height: 100, backgroundColor: Theme.lineColor, borderRadius: 50 }}
        />
        <Text style={{ fontSize: 16, fontFamily: Theme.fontBold, marginVertical: 5 }}>
          {user.username}
        </Text>
        <Text>
          {user.email}
        </Text>
      </View>
    );
  };

  const renderGeneral = () => (
    listGeneral.map((item, index) => (
      <View
        style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}
        key={item.key}>
        <Image
          source={item.image}
          style={{
            width: 12,
            height: 12,
            resizeMode: 'contain',
          }}
        />
        <TouchableOpacity
          style={{ flex: 1, justifyContent: 'space-between', marginLeft: 15 }}
          onPress={() => _onClickGeneral(item.key)}>
          <View style={styles.itemContainer}>
            <Text>
              {item.title}
            </Text>
            <Image
              source={Images.icArrowRight}
              style={{ width: 12, height: 12 }}
            />
          </View>
          <View style={styles.lineSeparator} />
        </TouchableOpacity>
      </View>
    ))
  );

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <NavBar title="Profile" bgText={Theme.primaryColor} />
        <ScrollView>
          {renderUser()}
          <View style={{ marginTop: 12, paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 16, marginBottom: 8 }}>
              General
              </Text>
            {renderGeneral()}
          </View>
          <Button
            title="LOGOUT"
            style={{ paddingHorizontal: 20 }}
            onPress={() => {
              _setUserLogin({})
              navigation.navigate(Navigation.LOGIN);
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
}

export default Profile;
