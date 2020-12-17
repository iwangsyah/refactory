import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  PermissionsAndroid
} from 'react-native';
import {
  requestMultiple,
  checkMultiple,
  PERMISSIONS,
} from 'react-native-permissions';
import Geocoder from 'react-native-geocoder';
import Geolocation from 'react-native-geolocation-service';
import { Background, InputText, Location, Button } from '../../components';
import { NavigationService } from '../../util';
import { Navigation } from '../../configs';
import Images from '../../assets/images';
import Theme from '../../styles/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 50,
    fontFamily: Theme.fontBold,
    marginBottom: 16,
    marginTop: 50,
    textAlign: 'center',
    color: 'white'
  },
  box: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingVertical: 32,
    borderRadius: 8,
    padding: 16
  },
  text: {
    color: Theme.txtSecondaryColor,
    marginBottom: 5
  },
  txtColor: {
    color: Theme.buttonColor,
    fontFamily: Theme.fontBold
  }
})

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      location: {},
    }
  }

  componentWillMount = () => {
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
              title: 'Frodo Location App required Location permission',
              message:
                'We required Location permission in order to get device location ' +
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
        this.setState({
          location: {
            latitude: loc.position.lat,
            longitude: loc.position.lng,
            address: loc.formattedAddress
          }
        })
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <ImageBackground source={Images.bgLogin} style={{ flex: 1 }}>
        <Background transparent style={styles.container}>
          <Text style={styles.title}>Login</Text>
          <View style={styles.box}>
            <InputText title="Email" onChange={email => this.setState({ email })} />
            <InputText title="Password" />
          </View>
          <Button title="Login" />
          <Text style={[styles.text, { textAlign: 'center' }]}>Belum memiliki akun? <Text style={styles.txtColor} onPress={() => NavigationService.navigate(Navigation.REGISTER, { location })}>Register</Text></Text>
          <Location data={this.state.location} />
        </Background>
      </ImageBackground>
    );
  }
}

