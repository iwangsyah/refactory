import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import Images from '../../assets/images';
import Theme from '../../styles/Theme';
import { Navigation } from '../../configs';
import { NavigationService } from '../../util';
import { Background, InputText, Location, Button } from '../../components';

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

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      location: props.navigation.state.params.location
    }
  }

  renderFoto = () => (
    <View style={{ flexDirection: 'row' }}>
      <Text style={[styles.text, { marginRight: 10 }]}>Foto Profile</Text>
      <TouchableOpacity style={{ width: 60, height: 60, backgroundColor: Theme.bgPrimaryColor, borderRadius: 5 }} />
    </View>
  )

  render() {
    return (
      <ImageBackground source={Images.bgLogin} style={{ flex: 1 }}>
        <Background transparent style={styles.container}>
          <Text style={styles.title}>Register</Text>
          <View style={styles.box}>
            <InputText title="Username" onChange={username => this.setState({ username })} />
            {this.renderFoto()}
            <InputText title="Email" onChange={email => this.setState({ email })} />
            <InputText title="Password" onChange={password => this.setState({ password })} />
          </View>
          <Button title="Register" location={this.state.location} />
          <Text style={[styles.text, { textAlign: 'center' }]}>Sudah memiliki akun? <Text style={styles.txtColor} onPress={() => NavigationService.navigate(Navigation.LOGIN)}>Login</Text></Text>
          <Location data={this.state.location} />
        </Background>
      </ImageBackground>
    );
  }
}

