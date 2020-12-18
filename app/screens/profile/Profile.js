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
import { connect } from 'react-redux';
import { Button, NavBar } from '../../components';
import Images from '../../assets/images';
import { Navigation } from '../../configs';
import { Theme } from '../../styles';
import { NavigationService } from '../../util';
import Actions from '../../actions';

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

export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  clickGeneral(data) {
    switch (data) {
      case KEYFAQ:
        NavigationService.navigate(Navigation.FAQ);
        break;
      case KEYABOUTUS:
        NavigationService.navigate(Navigation.ABOUTUS);
        break;
      case KEYCONTACTUS:
        NavigationService.navigate(Navigation.CONTACTUS);
        break;
      default:
        break;
    }
  }

  renderUser = () => {
    const { user } = this.props;
    console.log('user: ', user);
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

  renderGeneral = () => {
    this.state.listGeneral = [
      { key: KEYFAQ, title: 'FAQ', image: Images.icHelp },
      { key: KEYABOUTUS, title: 'About Us', image: Images.icAbout },
      { key: KEYCONTACTUS, title: 'Contact Us', image: Images.icPhone }
    ];

    return this.state.listGeneral.map((item, index) => (
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
          onPress={() => this.clickGeneral(item.key)}>
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
    ));
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <NavBar title="Profile" bgText={Theme.primaryColor} />
          <ScrollView>
            {this.renderUser()}
            <View style={{ marginTop: 12, paddingHorizontal: 20 }}>
              <Text style={{ fontSize: 16, marginBottom: 8 }}>
                General
              </Text>
              {this.renderGeneral()}
            </View>
            <Button
              title="LOGOUT"
              style={{ paddingHorizontal: 20 }}
              onPress={() => {
                this.props.setUserLogin({})
                NavigationService.navigate(Navigation.LOGIN);
              }}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  setUserLogin: (user) => {
    dispatch(Actions.setUserLogin(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
