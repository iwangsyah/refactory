import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import {
  Background,
  ModalFoto,
  InputText,
  Location,
  Button
} from '../../components';
import Actions from '../../actions';
import Images from '../../assets/images';
import { Navigation } from '../../configs';
import { LoginStyle } from '../../styles';
import { NavigationService } from '../../util';

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      imageUri: '',
      isVisible: false,
    }
  }

  _onShowModal = (isVisible) => {
    this.setState({ isVisible })
  }

  _onChangeFoto = (imageUri) => {
    this.setState({ imageUri })
  }

  _onRegister = () => {
    const { loginStory, registeredUsers, setRegisteredUsers } = this.props;
    const { email, username, password, imageUri } = this.state;
    const data = { email, username, password, imageUri }

    if (email && username && password && imageUri) {
      const dataExist = _.find(registeredUsers, (item) => {
        return item.email === email;
      })
      if (dataExist) {
        const index = _.findIndex(loginStory, (item) => (item.email == email));
        if (index < 0) {
          alert('Email sudah terdaftar\ntetapi anda belum pernah login')
        } else {
          alert(`Email sudah terdaftar\nAnda telah login menggunakan\nusername : ${email}\nsebanyak ${loginStory[index].count} kali`);
        }
      } else {
        registeredUsers.push(data)
        setRegisteredUsers(registeredUsers)
        NavigationService.navigate(Navigation.LOGIN)
      }
    } else {
      alert('Semua data harus diisi')
    }
  }

  renderFoto = () => {
    const { imageUri } = this.state;
    let content;
    if (imageUri) {
      content = (
        <View style={[LoginStyle.row, { flex: 5 }]}>
          <Image
            source={{ isStatic: true, uri: imageUri }}
            style={LoginStyle.imagePreview}
          />
          <TouchableOpacity style={LoginStyle.buttonDelete} onPress={() => this._onChangeFoto('')}>
            <Text style={LoginStyle.text}>Hapus Foto</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      content = (
        <View style={{ flex: 5 }}>
          <TouchableOpacity
            style={LoginStyle.iconContainer}
            onPress={() => this._onShowModal(true)}
          >
            <Image
              source={Images.icCamera}
              style={LoginStyle.image} />
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <View style={LoginStyle.row}>
        <Text style={[LoginStyle.text, { flex: 2 }]}>
          Foto Profile
        </Text>
        {content}
      </View>
    )
  }

  render() {
    const { location } = this.props;
    const { email, username, password } = this.state;

    return (
      <ImageBackground source={Images.bgLogin} style={{ flex: 1 }}>
        <Background transparent style={[LoginStyle.container, { paddingHorizontal: 16 }]}>
          <Text style={LoginStyle.title}>Register</Text>
          <View style={LoginStyle.box}>
            <InputText
              title="Username"
              onChange={username => this.setState({ username })}
              value={username}
            />
            {this.renderFoto()}
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
            title="Register"
            onPress={() => this._onRegister()}
          />
          <Text style={[LoginStyle.text, { textAlign: 'center' }]}>Sudah memiliki akun? <Text style={LoginStyle.txtColor} onPress={() => NavigationService.navigate(Navigation.LOGIN)}>Login</Text></Text>
          <Location data={location} />
        </Background>
        <ModalFoto
          visible={this.state.isVisible}
          onClose={() => this._onShowModal(false)}
          onSelectedItem={(imageUri) => this._onChangeFoto(imageUri)}
        />
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
  setRegisteredUsers: (users) => {
    dispatch(Actions.setRegisteredUsers(users));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);

