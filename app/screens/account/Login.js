import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  PermissionsAndroid
} from 'react-native';
import _ from 'lodash';
import {
  requestMultiple,
  checkMultiple,
  PERMISSIONS,
} from 'react-native-permissions';
import { connect } from 'react-redux';
import Geocoder from 'react-native-geocoder';
import Geolocation from 'react-native-geolocation-service';
import { Background, InputText, Location, Button } from '../../components';
import { NavigationService } from '../../util';
import { Navigation } from '../../configs';
import { LoginStyle } from '../../styles';
import Images from '../../assets/images';
import Actions from '../../actions';


export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  componentDidMount = () => {
    this._requestLocationPermission();
  }

  async _requestLocationPermission() {
    if (Platform.OS === 'ios') {
      const always = PERMISSIONS.IOS.LOCATION_ALWAYS;
      const whenInUse = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
      checkMultiple([always, whenInUse]).then((statuses) => {
        if (
          statuses[always] === 'granted' ||
          statuses[whenInUse] === 'granted'
        ) {
          this._getLocation();
        } else {
          requestMultiple([always, whenInUse]).then((statuses) => {
            console.log(statuses)
          });
        }
      });
    } else {
      const chckLocationPermission = PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (chckLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('granted');
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Refactory Location App required Location permission',
              message:
                'Refactory needs your location ' +
                'Please grant us.',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            this._getLocation();
          } else {
            alert("You don't have access for the location");
          }
        } catch (err) {
          alert(err);
        }
      }
    }
  }

  _getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const location = {
          lat: latitude,
          lng: longitude,
        };
        this._geocode(location);
      },
      (error) => console.log(error),
      { enableHighAccuracy: false, timeout: 3000 },
    );
  };

  _geocode = (location) => {
    Geocoder.geocodePosition(location)
      .then((res) => {
        const loc = res[1] || res[0];
        this.props.setUserLocation(
          {
            latitude: loc.position.lat,
            longitude: loc.position.lng,
            address: loc.formattedAddress
          }
        )
      })
      .catch((err) => console.log(err));
  };

  _onLogin = () => {
    const { loginStory, registeredUsers, setUserLogin, setLoginStory } = this.props;
    const { email, password } = this.state;
    let user;
    if (email && password) {
      const dataExist = _.find(registeredUsers, (item) => {
        user = item;
        return item.email === email;
      })
      if (dataExist && dataExist.password == password) {
        const index = _.findIndex(loginStory, (item) => (item.email == email));
        let count;
        if (index < 0) {
          count = 1
          loginStory.push({ email, count });
        } else {
          count = loginStory[index].count + 1
        }
        setUserLogin(user)
        setLoginStory(loginStory);
        alert(`anda telah login menggunakan\nusername : ${email}\nsebanyak ${count} kali`);
        NavigationService.navigate(Navigation.APP)
      } else if (dataExist) {
        alert('Password salah');
        this.setState({ password: '' });
      } else {
        alert('Email belum terdaftar');
        this.setState({ email: '', password: '' });
      }
    } else {
      alert('Semua data harus diisi')
    }
  }

  render() {
    const { location } = this.props;
    const { email, password } = this.state;

    return (
      <ImageBackground source={Images.bgLogin} style={{ flex: 1 }}>
        <Background transparent style={[LoginStyle.container, { paddingHorizontal: 16 }]}>
          <Text style={LoginStyle.title}>Login</Text>
          <View style={LoginStyle.box}>
            <InputText
              title="Email"
              keyboardType="email-address"
              onChange={email => this.setState({ email: _.toLower(email) })}
              value={_.toLower(email)}
            />
            <InputText
              title="Password"
              secureTextEntry
              onChange={password => this.setState({ password })}
              value={password}
            />
          </View>
          <Button
            title="Login"
            onPress={() => this._onLogin()}
          />
          <Text style={[LoginStyle.text, { textAlign: 'center' }]}>Belum memiliki akun? <Text style={LoginStyle.txtColor} onPress={() => NavigationService.navigate(Navigation.REGISTER)}>Register</Text></Text>
          <Location data={location} />
        </Background>
      </ImageBackground>
    );
  }
}

const mapStateToProps = (state) => ({
  location: state.user.location,
  loginStory: state.loginStory.users,
  registeredUsers: state.registeredUsers.users
});

const mapDispatchToProps = (dispatch) => ({
  setUserLogin: (user) => {
    dispatch(Actions.setUserLogin(user));
  },
  setLoginStory: (users) => {
    dispatch(Actions.setLoginStory(users));
  },
  setUserLocation: (location) => {
    dispatch(Actions.setUserLocation(location));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

